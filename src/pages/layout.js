const config = require('../config')

module.exports = (body) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${config.name}</title>
    <link rel="stylesheet" type="text/css" href="/styles.css"
  </head>
  <body>
    ${body}
    <footer><small>${config.legal}</small></footer>
  </body>
</html>
`
