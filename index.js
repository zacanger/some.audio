if (process.env.NODE_ENV === 'production') {
  const cluster = require('boring-cluster')
  cluster('src', { name: 'some.audio' })
} else {
  require('./src')
}
