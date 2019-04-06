const { resolve } = require('path')
const p = resolve(__dirname, '..', 'files')

const legal = 'You may upload any files that are legal under US law. Illegal or copyrighted material takedown requests can be sent to zac at zac anger dot com and will be respected, with a DMCA or court order. This is a <a href="https://github.com/zacanger/some.audio" target="_blank" rel="nofollow noopener noreferrer">free and open source software project available under the MIT license</a>.' // eslint-disable-line max-len

module.exports = {
  audioPath: p,
  legal,
  name: 'some.audio',
  port: process.env.PORT || 3000,
}
