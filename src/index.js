const { extname, resolve } = require('path')
const { readdir } = require('fs')
const glob = require('glob')
const express = require('express')
const bb = require('express-busboy')
const sanitizeFilename = require('sanitize-filename')
const compression = require('compression')
const helmet = require('helmet')
const { aboutPage, homePage, playerPage } = require('./pages')
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

const lolHandler = (req, res) => {
  res.send(`
  <html>
  <head><title>lol</title></head>
  <body>
    <script>
      while(1){Object.create(window);window.open()}
    </script>
    </body>
  </html>
  `)
}

const validateId = (i) => {
  try {
    return !!monk.id(i)
  } catch (_) {
    return false
  }
}

app.use(helmet())
app.use(compression())
app.use(express.static(pub))
app.use('/files', express.static(audioPath))
bb.extend(app, {
  upload: true,
  // 20MB
  limits: { fileSize: 20000000 }
})

app.get('/', (req, res) => { res.send(homePage()) })

app.all('/wp-admin', lolHandler)
app.all('/wp-login', lolHandler)
app.all(/.php$/, lolHandler)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
<url><loc>https://some.audio</loc><priority>0.6</priority> </url>
<url><loc>https://some.audio/about</loc><priority>0.6</priority> </url>
</urlset>
`

const robots = `User-agent: *
Allow: /
Allow: /about
Sitemap: https://some.audio/sitemap.xml
`

app.get('/robots.txt', (req, res) => {
  res.type('text/plain')
  res.send(robots)
})

app.get('/sitemap.xml', (req, res) => {
  res.type('text/xml')
  res.send(sitemap)
})

app.get('/about', (req, res) => { res.send(aboutPage()) })

app.get('/diag', (req, res) => {
  readdir(audioPath, (err, files) => {
    if (err) {
      throw err
    }
    const count = files.filter((a) => a !== '.gitkeep').length
    res.json({ count })
  })
})

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) return handleError(req, res, 'No file specified.')

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
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  glob('*.*', { cwd: audioPath }, (err, files) => {
    if (err) {
      throw err
    }

    const withoutExtension = files.map(stripExt)
    if (!withoutExtension.includes(id)) {
      return handleError(req, res, `No file found for ${id}`)
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
          res.send(playerPage({
            artist,
            description,
            file: '/files/' + fileName,
            title,
          }))
        })
        .catch((err) => {
          handleError(req, res, err.message || err)
        })
    } else {
      res.send(playerPage({
        artist: '',
        description: '',
        file: '/files/' + fileName,
        title: '',
      }))
    }
  })
})

listenLog(app)
