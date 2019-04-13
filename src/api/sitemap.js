const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
  <loc>https://some.audio/</loc>
  <lastmod>2019-04-09T20:41:55+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://some.audio/about</loc>
  <lastmod>2019-04-09T20:41:55+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://some.audio/upload</loc>
  <lastmod>2019-04-09T20:41:55+00:00</lastmod>
  <priority>0.60</priority>
</url>
</urlset>
`

module.exports = (req, res) => {
  res.type('text/xml')
  res.send(sitemap)
}
