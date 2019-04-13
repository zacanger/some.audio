const { resolve } = require('path')
const cluster = require('cluster')
const isJson = require('zeelib/lib/is-json')
const monk = require('monk')
const { errorPage } = require('./pages')
const { name: packageName, version } = require('../package.json')

const audioPath = resolve(__dirname, '..', 'files')

const port = process.env.PORT || 3000
const listenLog = (app) => {
  app.listen(port, () => {
    const clusterMessage = process.env.NODE_ENV === 'production'
      ? `worker ${cluster.worker.id} `
      : ''
    console.log(`${packageName} version ${version} ${clusterMessage}listening on ${port}`)
  })
}

const tryJson = (a) =>
  isJson(a) ? JSON.stringify(a) : a

const handleError = (req, res, err) => {
  console.trace(err)
  const ua = req.get('user-agent') || req.get('User-Agent') ||  ''
  if (ua === 'some-audio-shell-client') {
    res.send(err + '\n')
  } else if (req.accepts('text/html')) {
    res.send(errorPage(err))
  } else if (req.accepts('application/json')) {
    res.send(tryJson(err))
  } else {
    res.send(err)
  }
}

const validateId = (i) => {
  try {
    return !!monk.id(i)
  } catch (_) {
    return false
  }
}

const badRoutes = [
  '/wp-admin',
  '/wp-login',
  /.php$/,
]

module.exports = {
  audioPath,
  badRoutes,
  handleError,
  listenLog,
  packageName,
  validateId,
  version,
}
