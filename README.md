# [![some.audio](./public/logo-small.png)](https://some.audio)

Simple, anonymous audio file host

[Support this project](https://paypal.me/zacanger)

## Notes

To install and run locally, `npm ci` and `npm start`. You'll need to either have
Mongo running locally, or provide a MONGO_URI.

Deploy process is currently terrible: git push, ssh, git pull, forever restart.

There's no view engine, because every view engine sucks and is slow. Views are
under src/pages, and they're just HTML in template strings.

Try to keep at least core functionality working without JS. There's no reason an
app as stupid-simple as this should need client-side JS to do things.

## TODO

* Clean up and document API, including good response
  sprunge/ix-style client
* Better styles in general
  * Also clean up that CSS, it's too big
* Make it secure
* Use S3 or DO Spaces or similar for storage
* Move off Mongo to real DB
* Expire files after some time?
* Rewrite in something hipster (Rust?)
* Set up CI/CD/CD (Circle?)
  * Deploy in Docker
* Write at least one goddamn test
* Users? Auth? OAuth?
* Figure out how to make this pay for itself
* Parse audio files server-side if no data provided
