const sanitizeFilename = require('sanitize-filename')
const { extname } = require('path')
const {
  audioPath,
  handleError,
  moveFile,
} = require('../util')

module.exports = (db) => (req, res) => {
  if (!req.files || !req.files.file) {
    return handleError(req, res, 'No file specified.')
  }

  const { title = '', artist = '', description = '' } = req.body
  const file = req.files.file
  const ext = req.query.ext ? sanitizeFilename(req.query.ext) : extname(file.filename)

  if (file.truncated) {
    return handleError(req, res, 'File is too large')
  }

  if (!/audio/i.test(file.mimetype)) {
    return handleError(req, res, 'Invalid audio file')
  }

  const getNewPath = (n) => `${audioPath}/${n}${ext}`
  db.get('files')
    .insert({ title, artist, description })
    .then(({ _id }) => {
      moveFile(file.file, getNewPath(_id), (err) => {
        if (err) {
          console.trace(err)
          return
        }

        const url = `https://some.audio/${_id}`
        if (req.accepts('text/html')) {
          res.redirect(`/${_id}`)
        } else if (req.accepts('application/json')) {
          res.json({ url })
        } else {
          res.send(url)
        }
      })
    })
    .catch((err) => {
      handleError(req, res, err.message || err)
    })
}
