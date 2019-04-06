const config = require('../config')
const svgLogo = require('fs').readFileSync('public/logo.svg').toString()

module.exports = (body) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${config.name}</title>
    <link rel="stylesheet" type="text/css" href="/styles.css">
  </head>
  <body>
    <a href="/">${svgLogo}</a>
    ${body}
    <footer><small>${config.legal}</small></footer>
  </body>
</html>
`
