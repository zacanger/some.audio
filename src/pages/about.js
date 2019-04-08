const layout = require('./layout')

const aboutText = `
some.audio is a free, simple, and anonymous audio hosting service,
built to fill the space between Tumblr and SoundCloud and to provide
a similar experience to Pastebin.
<br>
This is a personal project without funding, so please consider
donating (see the PayPal button below).
`

module.exports = () =>
  layout(`
    <div>
      <p>${aboutText}</p>
    </div>
  `)
