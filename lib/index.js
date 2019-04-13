if (process.env.NODE_ENV === 'production') {
  require('boring-cluster')('./lib/server', { name: 'some.audio' })
} else {
  require('./server')
}
