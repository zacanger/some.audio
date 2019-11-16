const { resolve } = require('path')
const cluster = require('cluster')
const isJson = require('zeelib/lib/is-json')
const monk = require('monk')
const pino = require('pino')({
  redact: {
    paths: ['req.headers.cookie'],
    censor: '****'
  }
})
const { errorPage } = require('./pages')
const { name: packageName, version } = require('../package.json')

const audioPath = resolve(__dirname, '..', 'files')

const port = process.env.PORT || 3000
const listenLog = (app) => {
  app.listen(port, () => {
    const clusterMessage = process.env.NODE_ENV === 'production'
      ? `worker ${cluster.worker.id} `
      : ''
    pino.info(`${packageName} version ${version} ${clusterMessage}listening on ${port}`)
  })
}

const tryJson = (a) =>
  isJson(a) ? JSON.stringify(a) : a

const handleError = (req, res, err) => {
  pino.error(err)
  const ua = req.get('user-agent') || req.get('User-Agent') || ''
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
  '/.env',
  '/downloader',
  '/w00tw00t.at.blackhats.romanian.anti-sec:',
  '/webdav',
  '/wp-admin',
  '/wp-login',
  /.asp$/i,
  /.dll$/i,
  /.exe$/i,
  /.htm$/i,
  /.jsp$/i,
  /.php$/i,
  /admin/i,
  /blog/i,
  /manager/i,
  /phpmyadmin/i,
  /simpla/i
]

module.exports = {
  audioPath,
  badRoutes,
  handleError,
  listenLog,
  packageName,
  pino,
  validateId,
  version
}
