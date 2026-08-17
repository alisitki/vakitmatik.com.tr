# Vakitmatik.org Redirect Project

This Vercel project is the controlled migration layer from `vakitmatik.org` to
the canonical `https://www.vakitmatik.com.tr` host.

## Rules

- Every response is an explicit `301` permanent redirect.
- Known commercial and indexed URL groups go to the closest live `.com.tr`
  destination.
- Product-detail URLs temporarily go to the live `/cami-saati/` family page.
  They must only be changed to detail routes after those routes return `200` in
  production.
- Old downloads are not copied or served. They go to the live support entry
  until compatibility and security have been reviewed.
- The final catch-all is intentionally last and sends unknown legacy URLs to the
  canonical homepage.

## Verification

Run the configuration tests from this directory:

```sh
npm test
```

After a preview deployment, verify representative paths with `vercel curl` and
confirm that every `Location` value is an absolute canonical URL whose final
response is `200`.

## Production boundary and rollback

Adding `vakitmatik.org` or changing its nameservers is a separate production
action. Keep the current SH nameservers recorded before cutover. Rollback means
restoring those exact nameservers while the old hosting remains active. SH
hosting must not be cancelled until the Vercel domain, HTTPS certificate, path
redirects, and rollback window have all been verified.
