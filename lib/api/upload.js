const { extname } = require('path')
const mmm = require('mmmagic')
const { parseFile } = require('music-metadata')
const moveFile = require('zeelib/lib/mv').default
const sanitizeFilename = require('sanitize-filename')
const {
  audioPath,
  handleError
} = require('../util')
const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE)

module.exports = (db) => (req, res) => {
  if (!req.files || !req.files.file) {
    res.status(400)
    return handleError(req, res, 'No file specified.')
  }

  const { title = '', artist = '', description = '' } = req.body
  const file = req.files.file
  const ext = req.query.ext ? sanitizeFilename(req.query.ext) : extname(file.filename)
  const getNewPath = (n) => `${audioPath}/${n}${ext}`
  const timestamp = new Date().toJSON()

  const saveFile = ({
    title,
    artist,
    description,
    timestamp,
    file
  }) => {
    db.get('files')
      .insert({ title, artist, description, timestamp })
      .then(({ _id }) => {
        moveFile(file, getNewPath(_id), (err) => {
          if (err) {
            console.trace(err)
            return
          }
          const url = `https://some.audio/${_id}\n`
          const ua = req.get('user-agent') || req.get('User-Agent') || ''
          if (ua === 'some-audio-shell-client') {
            res.send(url)
          } else if (req.accepts('text/html')) {
            res.redirect(`/${_id}`)
          } else if (req.accepts('application/json')) {
            res.json(url)
          } else {
            res.send(url)
          }
        })
      })
      .catch((err) => {
        res.status(500)
        handleError(req, res, err.message || err)
      })
  }

  if (file.truncated) {
    res.status(413)
    return handleError(req, res, 'File is too large')
  }

  magic.detectFile(file.file, (err, mimeString) => {
    if (err) {
      return handleError(req, res, err)
    }

    if (!/audio/i.test(mimeString)) {
      return handleError(req, res, 'Invalid audio file.')
    }

    if (!title && !artist && !description) {
      parseFile(file.file)
        .then(({ common }) => {
          const {
            artist: parsedArtist = '',
            desription: parsedDescription = '',
            title: parsedTitle = ''
          } = common

          saveFile({
            artist: parsedArtist,
            description: parsedDescription,
            file: file.file,
            timestamp,
            title: parsedTitle
          })
        })
        .catch((err) => handleError(req, res, err))
    } else {
      saveFile({
        artist,
        description,
        file: file.file,
        timestamp,
        title
      })
    }
  })
}
