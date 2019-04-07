const { extname, resolve } = require('path')
const glob = require('glob')
const express = require('express')
const bb = require('express-busboy')
const sanitizeFilename = require('sanitize-filename')
const { aboutPage, homePage, filePage } = require('./pages')
const {
  handleError,
  listenLog,
  moveFile,
  stripExt,
} = require('./util')

const app = express()
const pub = resolve(__dirname, '..', 'public')
const audioPath = resolve(__dirname, '..', 'files')

const monk = require('monk')
const db = monk(process.env.MONGO_URI || 'localhost/someaudio')

const validateId = (i) => {
  try {
    return !!monk.id(i)
  } catch (_) {
    return false
  }
}

app.use(express.static(pub))
app.use('/files', express.static(audioPath))
bb.extend(app, {
  upload: true,
  // 20MB
  limits: { fileSize: 20000000 }
})

app.get('/', (req, res) => { res.send(homePage()) })

app.get('/about', (req, res) => { res.send(aboutPage()) })

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) return handleError(res, 'No file specified.')

  const { title = '', artist = '', description = '' } = req.body
  const file = req.files.file
  const ext = req.query.ext ? sanitizeFilename(req.query.ext) : extname(file.filename)

  if (file.truncated) {
    return handleError(res, 'File is too large')
  }

  if (!/audio/i.test(file.mimetype)) {
    return handleError(res, 'Invalid audio file')
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
        res.redirect(`/${_id}`)
      })
    })
    .catch((err) => {
      handleError(res, err.message || err)
    })
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  glob('*.*', { cwd: audioPath }, (err, files) => {
    if (err) throw err

    const withoutExtension = files.map(stripExt)
    if (!withoutExtension.includes(id)) {
      return handleError(res, 'No file found')
    }

    const fileName = files.find((f) => stripExt(f) === id)

    if (validateId(id)) {
      db.get('files')
        .findOne({ _id: id })
        .then(({
          artist = '',
          description = '',
          title = ''
        } = {}) => {
          res.send(filePage({
            artist,
            description,
            file: '/files/' + fileName,
            title,
          }))
        })
        .catch((err) => {
          handleError(res, err.message || err)
        })
    } else {
      res.send(filePage({
        artist: '',
        description: '',
        file: '/files/' + fileName,
        title: '',
      }))
    }
  })
})

listenLog(app)
