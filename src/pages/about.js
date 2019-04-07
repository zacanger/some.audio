const layout = require('./layout')

const aboutText = `
some.audio is a free, simple, and anonymous audio hosting service,
built to fill the space between Tumblr and SoundCloud and to provide
a similar experience to Pastebin.
<br>
This project is free software, available at
<a
  href="https://github.com/zacanger/some.audio"
  target="_blank"
  rel="noopener noreferrer nofollow"
>
  GitHub
</a>.
<br>
This is a personal project without funding, so please consider
donating (see the PayPal button below).
<pre>
## TODO

* Use S3 or DO Spaces or similar for storage
* Set up DB for file meta info
* Change files view to include meta info
* Change form to allow for meta info
* Expire files after some time?
* Rewrite in something hipster (Rust?)
* Make it look less bad
* Set up CI/CD/CD (Circle?)
* Write at least one goddamn test
* Users? Auth? OAuth?
* Validate input file size and reject
* Better player view
</pre>
`

module.exports = () =>
  layout(`
    <div>
      <p>${aboutText}</p>
    </div>
  `)
