# [![some.audio](./public/logo-small.png)](https://some.audio)

Simple, anonymous audio file host

[![CircleCI](https://circleci.com/gh/zacanger/some.audio.svg?style=svg)](https://circleci.com/gh/zacanger/some.audio) [![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger)

## Notes

To install and run locally, `npm ci` and `npm start`. You'll need to have
Docker and Docker Compose installed.

To deploy, merge to master.

There's no view engine, because I don't like any of them. Views are just
template strings.

Try to keep at least core functionality working without JS. There's no reason an
app as stupid-simple as this should need client-side JS to do things.

See the [todo list](./TODO.md)
