# Vakitmatik Dashboard

Separate read-only reporting dashboard for Vakitmatik Google Ads and Search Console data.

## Local Setup

```bash
cd apps/dashboard
npm install
cp .env.example .env.local
npm run hash-password "replace-with-a-long-password"
npm run dev
```

Set `DASHBOARD_PASSWORD_HASH` to the generated `scrypt:...` value. Do not store the plaintext password.

## Vercel

- Create a separate Vercel project with root directory `apps/dashboard`.
- Attach `dashboard.vakitmatik.com.tr` to that project.
- Add only dashboard server-side env values to this project.
- The cron job is defined in `apps/dashboard/vercel.json` and calls `/api/cron/daily-report` daily at `04:00 UTC` (`07:00 Europe/Istanbul`).
- Site traffic cards read the public site's Vercel Web Analytics data. Configure these dashboard-only env values:
  - `VERCEL_API_TOKEN`
  - `VERCEL_TEAM_ID`
  - `VERCEL_ANALYTICS_PROJECT_ID`

If `RESEND_API_KEY`, `REPORT_EMAIL_FROM`, or `REPORT_EMAIL_TO` is not configured, the cron route still builds the daily report but skips email delivery and returns `emailId: null`.

Current production report routing:

- `REPORT_EMAIL_FROM`: `Vakitmatik Rapor <bilgi@vakitmatik.com.tr>`
- `REPORT_EMAIL_TO`: `reksan@reksanreklam.com.tr`

`vakitmatik.com.tr` uses Google Workspace for mailbox hosting. Do not change the existing Google MX records. If Resend is used for dashboard transactional email, add only the Resend verification records and merge SPF into the existing single SPF TXT record instead of creating a second SPF record.

If `GOOGLE_ADS_CUSTOMER_ID` points to a manager/MCC account without a child ad account, campaign metrics are shown as empty instead of failing. Once an actual ad account exists, set `GOOGLE_ADS_CUSTOMER_ID` to that client account and keep `GOOGLE_ADS_LOGIN_CUSTOMER_ID` as the MCC.

## Old Site Traffic

The dashboard counts old-site traffic through Vercel Web Analytics `referrer_hostname`. The old `vakitmatik.org` button must not use `rel="noreferrer"`, otherwise the browser strips the referrer and the visit appears as direct traffic. If the button opens a new tab, use `rel="noopener"` only.

## Scope

MVP is read-only. It does not change Google Ads campaign settings, budgets, billing, or negative keywords.
