const layout = require('./layout')

const shellText = `
<br>
You can use some.audio from your shell:
<br>
<code>
<br>curl \
  <br> -F "title=Awesome Title" \\
  <br> -F artist="The Best Band" \\
  <br> -F description="I love this song!" \\
  <br> -F "file=@some.mp3" \\
  <br> -H 'User-Agent: some-audio-shell-client' \\
  <br> https://some.audio/upload
</code>
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
