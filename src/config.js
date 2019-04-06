const { resolve } = require('path')
const p = resolve(__dirname, '..', 'files')
console.log(p)

const legal = 'You may upload any files that are legal under US law. Illegal or copyrighted material takedown requests can be sent to zac at zac anger dot com and will be respected, with a DMCA or court order. This is a free and open source software project available under the WTFPL. Source code can be found at github.com/zacanger/audiohost.' // eslint-disable-line max-len

module.exports = {
  audioPath: p,
  legal,
  name: 'audiohost',
  port: 3000
}
