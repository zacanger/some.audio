const layout = require('./layout')

const todoText = `
## TODO

* Better player view
* Make it secure
* Use S3 or DO Spaces or similar for storage
* Move off Mongo to real DB
* Expire files after some time?
* Rewrite in something hipster (Rust?)
* Set up CI/CD/CD (Circle?)
* Write at least one goddamn test
* Users? Auth? OAuth?
* Validate input file size and reject
`

const aboutText = `
some.audio is a free, simple, and anonymous audio hosting service,
built to fill the space between Tumblr and SoundCloud and to provide
a similar experience to Pastebin.
<br>
This is a personal project without funding, so please consider
donating (see the PayPal button below).
<pre style="text-align:left;">
${todoText}
</pre>
`

module.exports = () =>
  layout(`
    <div>
      <p>${aboutText}</p>
    </div>
  `)
