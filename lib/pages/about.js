const layout = require('./layout')

const shellScript = require('fs')
  .readFileSync(
    require('path').resolve(__dirname, '..', '..', 'scripts', 'some-audio.sh')
  ).toString()

const shellText = `
<br>
You can use some.audio from your shell, if you have a POSIX-like shell and cURL:
<pre><code>
${shellScript}
</code>
</pre>
`

const aboutText = `
some.audio is a free, simple, and anonymous audio hosting service,
built to fill the space between Tumblr and SoundCloud and to provide
a similar experience to Pastebin.
<br>
This is a small project without funding, so please consider
donating (see the PayPal button below).
<br>
${shellText}
`

module.exports = () =>
  layout(`
    <div class="about-content">
      <p>${aboutText}</p>
    </div>
  `)
