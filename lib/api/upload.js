const { extname } = require('path')
const moveFile = require('zeelib/lib/move-file')
const sanitizeFilename = require('sanitize-filename')
const {
  audioPath,
  handleError,
} = require('../util')

module.exports = (db) => (req, res) => {
  if (!req.files || !req.files.file) {
    res.status(400)
    return handleError(req, res, 'No file specified.')
  }

  const { title = '', artist = '', description = '' } = req.body
  const file = req.files.file
  const ext = req.query.ext ? sanitizeFilename(req.query.ext) : extname(file.filename)

  if (file.truncated) {
    res.status(413)
    return handleError(req, res, 'File is too large')
  }

  const getNewPath = (n) => `${audioPath}/${n}${ext}`
  const timestamp = new Date().toJSON()
  db.get('files')
    .insert({ title, artist, description, timestamp })
    .then(({ _id }) => {
      moveFile(file.file, getNewPath(_id), (err) => {
        if (err) {
          console.trace(err)
          return
        }

        const url = `https://some.audio/${_id}`
        const ua = req.get('user-agent') || req.get('User-Agent') ||  ''
        if (ua === 'some-audio-shell-client') {
          res.send(url + '\n')
        } else if (req.accepts('text/html')) {
          res.redirect(`/${_id}`)
        } else if (req.accepts('application/json')) {
          res.json(url + '\n')
        } else {
          res.send(url + '\n')
        }
      })
    })
    .catch((err) => {
      res.status(500)
      handleError(req, res, err.message || err)
    })
}
