const robots = `User-agent: *
Allow: /
Allow: /about
Sitemap: https://some.audio/sitemap.xml
`

module.exports = (req, res) => {
  res.type('text/plain')
  res.send(robots)
}
