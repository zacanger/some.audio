const svgLogo = require('fs').readFileSync('public/logo.svg').toString()
const paypalSection = require('./paypal')
const legalNotice = require('./legal')

module.exports = (body) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>some.audio</title>
    <link rel="stylesheet" type="text/css" href="/styles.css">
    <meta name="description" content="Simple, anonymous audio file host.">
    <meta name="author" content="Zac Anger">
    <meta name="keywords" content="audio, host, mp3, music, filehost">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://some.audio">
    <meta property="og:title" content="some.audio">
    <meta property="og:description" content="Simple, anonymous audio file host.">
    <meta property="og:image" content="https://some.audio/logo.png">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://some.audio">
    <meta property="twitter:title" content="some.audio">
    <meta property="twitter:description" content="Simple, anonymous audio file host.">
    <meta name="twitter:image" content="https://some.audio/logo.png">
  </head>
  <body>
    <header>
      <a href="/">${svgLogo}</a>
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
    <script type="text/javascript">
      console.log('')
      console.log('    hello')
      console.log('')
    </script>
  </body>
</html>
`
