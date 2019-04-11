if (process.env.NODE_ENV === 'production') {
  require('boring-cluster')('src', { name: 'some.audio' })
} else {
  require('./src')
}
