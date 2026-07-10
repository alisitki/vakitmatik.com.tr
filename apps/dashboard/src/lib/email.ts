import "server-only";

import { createHash } from "crypto";
import { getEnvList, getOptionalEnv } from "./env";
import type { DailyReport } from "./types";
import { formatInteger, formatMoneyMicros, formatPercent } from "./format";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 0;color:#5f6b65">${escapeHtml(label)}</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#16201c">${escapeHtml(
    value,
  )}</td></tr>`;
}

function oldSiteTrackedValue(report: DailyReport) {
  return report.analytics.yesterday.oldSiteTrackedVisits === null
    ? "-"
    : formatInteger(report.analytics.yesterday.oldSiteTrackedVisits);
}

export function dailyReportText(report: DailyReport) {
  const lines = [
    `Vakitmatik günlük rapor - ${report.reportDate}`,
    "",
    `Harcama: ${formatMoneyMicros(report.ads.costMicros, report.ads.currencyCode)}`,
    `Tıklama: ${formatInteger(report.ads.clicks)}`,
    `Gösterim: ${formatInteger(report.ads.impressions)}`,
    `CTR: ${formatPercent(report.ads.ctr)}`,
    `Telefon lead: ${formatInteger(report.ads.phoneLeads)}`,
    `E-posta lead: ${formatInteger(report.ads.emailLeads)}`,
    `Toplam lead: ${formatInteger(report.ads.totalLeads)}`,
    `Lead başı maliyet: ${formatMoneyMicros(report.ads.costPerLeadMicros, report.ads.currencyCode)}`,
    "",
    `SEO tıklama: ${formatInteger(report.seo.summary.clicks)}`,
    `SEO gösterim: ${formatInteger(report.seo.summary.impressions)}`,
    "",
    `Site ziyaretleri: ${formatInteger(report.analytics.yesterday.totalPageviews)}`,
    `Eski siteden gelen referrer: ${formatInteger(report.analytics.yesterday.oldSitePageviews)}`,
    `Eski site takip eventi: ${oldSiteTrackedValue(report)}`,
    report.analytics.yesterday.oldSiteTrackingUnavailableReason
      ? `Eski site ölçüm notu: ${report.analytics.yesterday.oldSiteTrackingUnavailableReason}`
      : "",
  ];

  return lines.join("\n");
}

export function dailyReportHtml(report: DailyReport) {
  return `
    <div style="margin:0;background:#f5f7f4;padding:32px;font-family:Inter,Arial,sans-serif;color:#16201c">
      <table role="presentation" style="width:100%;max-width:720px;margin:0 auto;border-collapse:collapse">
        <tr>
          <td>
            <h1 style="margin:0 0 6px;font-size:24px;line-height:1.2;color:#16201c">Vakitmatik günlük rapor</h1>
            <p style="margin:0 0 24px;color:#5f6b65">${escapeHtml(report.reportDate)} için karar destek özeti</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;border:1px solid #dde4df;border-radius:8px;padding:22px">
            <h2 style="margin:0 0 12px;font-size:16px">Google Ads</h2>
            <table role="presentation" style="width:100%;border-collapse:collapse">
              ${row("Harcama", formatMoneyMicros(report.ads.costMicros, report.ads.currencyCode))}
              ${row("Tıklama", formatInteger(report.ads.clicks))}
              ${row("Gösterim", formatInteger(report.ads.impressions))}
              ${row("CTR", formatPercent(report.ads.ctr))}
              ${row("Telefon lead", formatInteger(report.ads.phoneLeads))}
              ${row("E-posta lead", formatInteger(report.ads.emailLeads))}
              ${row("Toplam lead", formatInteger(report.ads.totalLeads))}
              ${row("Lead başı maliyet", formatMoneyMicros(report.ads.costPerLeadMicros, report.ads.currencyCode))}
            </table>
          </td>
        </tr>
        <tr><td style="height:16px"></td></tr>
        <tr>
          <td style="background:#ffffff;border:1px solid #dde4df;border-radius:8px;padding:22px">
            <h2 style="margin:0 0 12px;font-size:16px">Performans notları</h2>
            <p style="margin:0 0 8px;color:#5f6b65">En iyi keyword: <strong style="color:#16201c">${escapeHtml(
              report.topKeyword?.text ?? "-",
            )}</strong></p>
            <p style="margin:0 0 8px;color:#5f6b65">Zayıf keyword: <strong style="color:#16201c">${escapeHtml(
              report.weakKeyword?.text ?? "-",
            )}</strong></p>
            <p style="margin:0;color:#5f6b65">En çok tıklanan search term: <strong style="color:#16201c">${escapeHtml(
              report.topSearchTerm?.term ?? "-",
            )}</strong></p>
          </td>
        </tr>
        <tr><td style="height:16px"></td></tr>
        <tr>
          <td style="background:#ffffff;border:1px solid #dde4df;border-radius:8px;padding:22px">
            <h2 style="margin:0 0 12px;font-size:16px">SEO</h2>
            <table role="presentation" style="width:100%;border-collapse:collapse">
              ${row("Tıklama", formatInteger(report.seo.summary.clicks))}
              ${row("Gösterim", formatInteger(report.seo.summary.impressions))}
              ${row("CTR", formatPercent(report.seo.summary.ctr))}
              ${row("Ortalama pozisyon", report.seo.summary.position ? report.seo.summary.position.toFixed(1) : "-")}
            </table>
          </td>
        </tr>
        <tr><td style="height:16px"></td></tr>
        <tr>
          <td style="background:#ffffff;border:1px solid #dde4df;border-radius:8px;padding:22px">
            <h2 style="margin:0 0 12px;font-size:16px">Site trafiği</h2>
            <table role="presentation" style="width:100%;border-collapse:collapse">
              ${row("Dünkü ziyaret", formatInteger(report.analytics.yesterday.totalPageviews))}
              ${row("Eski siteden gelen referrer", formatInteger(report.analytics.yesterday.oldSitePageviews))}
              ${row("Eski site takip eventi", oldSiteTrackedValue(report))}
              ${row("Son 7 gün ziyaret", formatInteger(report.analytics.last7Days.totalPageviews))}
              ${row("Son 7 gün eski site referrer", formatInteger(report.analytics.last7Days.oldSitePageviews))}
            </table>
            ${
              report.analytics.yesterday.oldSiteTrackingUnavailableReason
                ? `<p style="margin:12px 0 0;color:#5f6b65;font-size:13px">${escapeHtml(
                    report.analytics.yesterday.oldSiteTrackingUnavailableReason,
                  )}</p>`
                : ""
            }
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function sendDailyReportEmail(report: DailyReport) {
  const apiKey = getOptionalEnv("RESEND_API_KEY");
  const from = getOptionalEnv("REPORT_EMAIL_FROM");
  const to = getOptionalEnv("REPORT_EMAIL_TO");

  if (!apiKey || !from || !to) {
    return null;
  }

  const subject = `Vakitmatik günlük rapor - ${report.reportDate}`;
  const html = dailyReportHtml(report);
  const text = dailyReportText(report);
  const bodyHash = createHash("sha256").update(`${subject}\n${html}\n${text}`).digest("hex").slice(0, 16);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
      "idempotency-key": `vakitmatik-daily-report-${report.reportDate}-${bodyHash}`,
    },
    body: JSON.stringify({
      from,
      to: getEnvList("REPORT_EMAIL_TO"),
      subject,
      html,
      text,
    }),
  });
  const payload = (await response.json()) as {
    id?: string;
    message?: string;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(payload.message || payload.error || "Resend email request failed");
  }

  return payload.id ?? null;
}
