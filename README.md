# Vakitmatik Site

Next.js App Router ile hazirlanmis statik Vakitmatik landing ve urun katalog sitesi.

## Proje Yönetimi

Bu repository'de çalışan ajanlar önce kökteki [`AGENTS.md`](AGENTS.md) dosyasını okumalıdır.

- Kontrollü iş akışı: [`docs/project-system/controlled-workflow.md`](docs/project-system/controlled-workflow.md)
- Vakitmatik proje anayasası: [`docs/vakitmatik/project-charter.md`](docs/vakitmatik/project-charter.md)
- Yaşayan yol haritası: [`docs/vakitmatik/roadmap.md`](docs/vakitmatik/roadmap.md)
- Karar kaydı: [`docs/vakitmatik/decision-log.md`](docs/vakitmatik/decision-log.md)

## Komutlar

```bash
npm run dev
npm run lint
npm run build
npm run start
```

`npm run build` statik export uretir ve ciktiyi `out/` klasorune yazar.

## Teknik Notlar

- Production canonical host: `https://www.vakitmatik.com.tr`
- `next.config.ts` icinde `output: "export"` ve `images.unoptimized` aktif.
- Robots dosyasi `public/robots.txt`; sitemap kaynagi `src/app/sitemap.ts` altindadir.
- Buyuk urun gorselleri WebP olarak servis edilir; orijinal PNG dosyalari yedek olarak korunur.
