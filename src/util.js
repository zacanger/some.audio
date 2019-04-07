const fs = require('fs')
const cluster = require('cluster')
const { errorPage } = require('./pages')

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

const handleError = (res, err) => {
  console.trace(err)
  res.send(errorPage(err))
}

const stripExt = (s = '') =>
  s.replace(/\.[^/.]+$/, '')

module.exports = {
  handleError,
  listenLog,
  moveFile,
  stripExt,
}
