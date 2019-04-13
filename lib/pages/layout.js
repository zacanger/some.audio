const svgLogo = require('fs').readFileSync('public/logo.svg').toString()
const paypalSection = require('./paypal')
const legalNotice = require('./legal')
const meta = require('./meta')

module.exports = (body) => `
<!doctype html>
<html lang="en">
  <head>
    ${meta}
  </head>
  <body>
    <header>
      <a class="logo-link" href="/">${svgLogo}</a>
      <a href="/about">about</a>
    </header>
    <div class="content">
      ${body}
    </div>
    <footer>
      <small>
        ${paypalSection}
        ${legalNotice}
      </small>
    </footer>
  </body>
</html>
`
