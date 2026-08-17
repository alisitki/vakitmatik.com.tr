import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const configUrl = new URL("../vercel.json", import.meta.url);
const config = JSON.parse(await readFile(configUrl, "utf8"));
const inventoryUrl = new URL(
  "../../../docs/vakitmatik/organic-seo-vakitmatik-org-url-map.csv",
  import.meta.url,
);

function sourceToRegExp(source) {
  if (source === "/") {
    return /^\/$/;
  }

  const wildcardToken = "__VERCEL_PATH_WILDCARD__";
  const escaped = source
    .replaceAll(":path*", wildcardToken)
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replaceAll(wildcardToken, ".*");

  return new RegExp(`^${escaped}$`, "i");
}

function resolveRedirect(pathname) {
  const redirect = config.redirects.find(({ source }) =>
    sourceToRegExp(source).test(pathname),
  );

  if (!redirect) {
    return null;
  }

  return {
    destination: redirect.destination,
    statusCode: redirect.statusCode,
  };
}

const cases = [
  ["/", "https://www.vakitmatik.com.tr/"],
  ["/index.html", "https://www.vakitmatik.com.tr/"],
  ["/robots.txt", "https://www.vakitmatik.com.tr/robots.txt"],
  ["/sitemap.xml", "https://www.vakitmatik.com.tr/sitemap.xml"],
  ["/iletisim.html", "https://www.vakitmatik.com.tr/#iletisim"],
  ["/gizlilik-politikasi.html", "https://www.vakitmatik.com.tr/privacy/"],
  [
    "/fiyatlist/fiyatlist.pdf",
    "https://www.vakitmatik.com.tr/cami-saati-fiyatlari/",
  ],
  [
    "/fiyatlist/fiyatlist.html",
    "https://www.vakitmatik.com.tr/cami-saati-fiyatlari/",
  ],
  [
    "/urunler/vakitmatik/vakit-57.html",
    "https://www.vakitmatik.com.tr/cami-saati/",
  ],
  [
    "/urunler/vakitmatik/vakit-100.html",
    "https://www.vakitmatik.com.tr/cami-saati/",
  ],
  [
    "/urunler/cami-ayet-hadis/mesaj-vakit-8.html",
    "https://www.vakitmatik.com.tr/ayet-hadis-panosu/",
  ],
  [
    "/urunler/cami-ayet-hadis/mesaj-5-ozel.html",
    "https://www.vakitmatik.com.tr/ayet-hadis-panosu/",
  ],
  [
    "/programlar.html",
    "https://www.vakitmatik.com.tr/destek/vakitmatik-ayarlama/",
  ],
  [
    "/kilavuzlar.html",
    "https://www.vakitmatik.com.tr/destek/vakitmatik-ayarlama/",
  ],
  [
    "/update/vakitmatik_usb.html",
    "https://www.vakitmatik.com.tr/destek/vakitmatik-ayarlama/",
  ],
  [
    "/update/vakitmatik_rs232.html",
    "https://www.vakitmatik.com.tr/destek/vakitmatik-ayarlama/",
  ],
  [
    "/update/Data/kk/VakitMatik-V4.pdf",
    "https://www.vakitmatik.com.tr/destek/vakitmatik-ayarlama/",
  ],
  [
    "/update/Data/kk/ReksanEzanmatik%20Kullanma%20K%C4%B1lavuzu.pdf",
    "https://www.vakitmatik.com.tr/destek/vakitmatik-ayarlama/",
  ],
  ["/bilinmeyen-eski-sayfa.html", "https://www.vakitmatik.com.tr/"],
];

const liveTargetAllowlist = new Set([
  "https://www.vakitmatik.com.tr/",
  "https://www.vakitmatik.com.tr/robots.txt",
  "https://www.vakitmatik.com.tr/sitemap.xml",
  "https://www.vakitmatik.com.tr/privacy/",
  "https://www.vakitmatik.com.tr/cami-saati-fiyatlari/",
  "https://www.vakitmatik.com.tr/cami-saati/",
  "https://www.vakitmatik.com.tr/ayet-hadis-panosu/",
  "https://www.vakitmatik.com.tr/destek/vakitmatik-ayarlama/",
]);

test("every rule is an explicit permanent 301 to the canonical HTTPS host", () => {
  assert.ok(config.redirects.length > 0);

  for (const redirect of config.redirects) {
    assert.equal(redirect.statusCode, 301, redirect.source);
    assert.match(
      redirect.destination,
      /^https:\/\/www\.vakitmatik\.com\.tr(?:\/|$)/,
      redirect.source,
    );
    assert.equal("permanent" in redirect, false, redirect.source);
  }
});

test("the catch-all rule remains last", () => {
  assert.equal(config.redirects.at(-1)?.source, "/:path*");
});

test("every legacy source is unique", () => {
  const sources = config.redirects.map(({ source }) => source);
  assert.equal(new Set(sources).size, sources.length);
});

test("no redirect can loop back to the legacy domain", () => {
  for (const redirect of config.redirects) {
    assert.doesNotMatch(redirect.destination, /vakitmatik\.org/i, redirect.source);
  }
});

test("every destination belongs to the verified live-target allowlist", () => {
  for (const redirect of config.redirects) {
    const destination = new URL(redirect.destination);
    destination.hash = "";
    assert.ok(liveTargetAllowlist.has(destination.href), redirect.source);
  }
});

test("all 64 inventoried legacy URLs resolve through the migration map", async () => {
  const csv = await readFile(inventoryUrl, "utf8");
  const rows = csv.trim().split(/\r?\n/).slice(1);

  assert.equal(rows.length, 64);

  for (const row of rows) {
    const oldUrl = row.split(",")[1];
    const pathname = new URL(oldUrl).pathname;
    const resolved = resolveRedirect(pathname);

    assert.ok(resolved, oldUrl);
    assert.equal(resolved.statusCode, 301, oldUrl);
  }
});

for (const [pathname, destination] of cases) {
  test(`${pathname} redirects once to ${destination}`, () => {
    assert.deepEqual(resolveRedirect(pathname), {
      destination,
      statusCode: 301,
    });
  });
}
