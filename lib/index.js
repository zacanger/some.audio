if (process.env.NODE_ENV === 'production') {
  require('boring-cluster')('server', { name: 'some.audio' })
} else {
  require('./server')
}
