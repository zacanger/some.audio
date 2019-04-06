const fs = require('fs')
const { resolve } = require('path')
const { createHash } = require('crypto')
const cluster = require('cluster')
const uniqueSlug = require('unique-slug')
const config = require('./config')
const { errorPage } = require('./pages')

const getSlug = (s) =>
  uniqueSlug(
    createHash('md5').update(
      fs.readFileSync(
        resolve(s)
      )).digest('base64'))

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

const listenLog = (app) => {
  app.listen(config.port, () => {
    const clusterMessage = process.env.NODE_ENV === 'production'
      ? `worker ${cluster.worker.id} `
      : ''
    console.log(`${config.name} ${clusterMessage}listening on ${config.port}`)
  })
}

const handleError = (res, err) => {
  console.trace(err)
  res.send(errorPage(err))
}

module.exports = {
  getSlug,
  handleError,
  listenLog,
  moveFile,
}
