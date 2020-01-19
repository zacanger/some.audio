const glob = require('glob')
const stripExt = require('zeelib/lib/remove-extension').default
const { playerPage } = require('../pages')
const { audioPath, handleError, validateId } = require('../util')

module.exports = (db) => (req, res) => {
  const id = req.params.id
  glob('*.*', { cwd: audioPath }, (err, files) => {
    if (err) {
      throw err
    }

    const withoutExtension = files.map(stripExt)
    if (!withoutExtension.includes(id)) {
      res.status(404)
      return handleError(req, res, `No file found for ${id}`)
    }

    const fileName = files.find((f) => stripExt(f) === id)

    if (validateId(id)) {
      db.get('files')
        .findOne({ _id: id })
        .then(({ artist = '', description = '', title = '' } = {}) => {
          res.send(
            playerPage({
              artist,
              description,
              file: '/files/' + fileName,
              id,
              title,
            })
          )
        })
        .catch((err) => {
          res.status(500)
          handleError(req, res, err.message || err)
        })
    } else {
      res.send(
        playerPage({
          artist: '',
          description: '',
          file: '/files/' + fileName,
          id,
          title: '',
        })
      )
    }
  })
}
