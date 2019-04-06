const { existsSync, statSync } = require('fs')
const { extname, resolve } = require('path')
const glob = require('glob')
const express = require('express')
const bb = require('express-busboy')
const sanitizeFilename = require('sanitize-filename')
const { getSlug, handleError, listenLog, moveFile } = require('./util')
const { homePage, filePage } = require('./pages')
const { audioPath } = require('./config')
const app = express()
const pub = resolve(__dirname, '..', 'public')
const statCache = {}

app.use(express.static(pub))
app.use('/files', express.static(audioPath))
bb.extend(app, { upload: true })

app.get('/', (req, res) => { res.send(homePage()) })

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) return handleError(res, 'No file specified.')

  const file = req.files.file
  const ext = req.query.ext ? sanitizeFilename(req.query.ext) : extname(file.filename)
  const getName = (n) => `${audioPath}/${n}${ext}`

  if (ext.toLowerCase() === '.php') return handleError(res, 'lol go away')

  let name = getSlug(file.file)
  const fn = file.filename.replace(ext, '')

  if (existsSync(getName(name))) {
    name = `${fn}-${name}`
  }

  if (existsSync(getName(name))) {
    name = `${name.replace(`${fn}-`, '')}-${fn}`
  }

  if (existsSync(getName(name))) {
    return handleError(
      res,
      'Could not generate semi-unique filename based on hash of file contents and filename.'
    )
  }

  moveFile(file.file, getName(name), (err) => {
    if (err) {
      console.trace(err)
      return
    }

    res.redirect(`/${name}`)
  })
})

const stripExt = (s = '') =>
  s.replace(/\.[^/.]+$/, '')

app.get('/:id', (req, res) => {
  const id = req.params.id
  glob('*.*', { cwd: audioPath }, (err, files) => {
    if (err) throw err

    const fullFiles = files.map((f) => {
      if (statCache[f]) return statCache[f]
      const stat = statSync(`${audioPath}/${f}`)
      const o = {
        name: f,
        size: stat.size,
        mtime: stat.mtime
      }
      statCache[f] = o
      return o
    })

    const withoutExtension = fullFiles.map((f) => stripExt(f.name))
    if (!withoutExtension.includes(id)) {
      return handleError(res, 'No file found')
    }

    const fileName = fullFiles.find((f) => stripExt(f.name) === id).name
    res.send(filePage('/files/' + fileName))
  })
})

listenLog(app)
