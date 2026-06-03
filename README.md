# Vakitmatik Site

Next.js App Router ile hazirlanmis statik Vakitmatik landing ve urun katalog sitesi.

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
- SEO static dosyalari `public/robots.txt` ve `public/sitemap.xml` altindadir.
- Buyuk urun gorselleri WebP olarak servis edilir; orijinal PNG dosyalari yedek olarak korunur.
