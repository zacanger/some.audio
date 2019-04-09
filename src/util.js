const fs = require('fs')
const { resolve } = require('path')
const cluster = require('cluster')
const monk = require('monk')
const { errorPage } = require('./pages')

const audioPath = resolve(__dirname, '..', 'files')

const moveFile = (oldPath, newPath, cb) => {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      if (err.code === 'EXDEV') {
        const readStream = fs.createReadStream(oldPath)
        const writeStream = fs.createWriteStream(newPath)
        readStream.on('error', cb)
        writeStream.on('error', cb)
        readStream.on('close', () => { fs.unlink(oldPath, cb) })
        readStream.pipe(writeStream)
      } else {
        cb(err)
      }
      return
    }
    cb()
  })
}

const port = process.env.PORT || 3000
const listenLog = (app) => {
  app.listen(port, () => {
    const clusterMessage = process.env.NODE_ENV === 'production'
      ? `worker ${cluster.worker.id} `
      : ''
    console.log(`some.audio ${clusterMessage}listening on ${port}`)
  })
}

const tryJson = (a) => {
  try {
    return JSON.stringify(a)
  } catch (_) {
    return a
  }
}

const handleError = (req, res, err) => {
  console.trace(err)
  if (req.accepts('text/html')) {
    res.send(errorPage(err))
  } else if (req.accepts('application/json')) {
    res.send(tryJson(err))
  } else {
    res.send(err)
  }
}

const stripExt = (s = '') =>
  s.replace(/\.[^/.]+$/, '')

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
  moveFile,
  stripExt,
  validateId,
}
