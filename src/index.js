const { resolve } = require('path')
const express = require('express')
const bb = require('express-busboy')
const compression = require('compression')
const helmet = require('helmet')
const {
  about,
  diag,
  home,
  lol,
  player,
  robots,
  sitemap,
  upload,
} = require('./api')
const {
  audioPath,
  badRoutes,
  listenLog,
} = require('./util')

const app = express()
const pub = resolve(__dirname, '..', 'public')

const monk = require('monk')
const db = monk(process.env.MONGO_URI || 'localhost/someaudio')

app.use(helmet())
app.use(compression())
app.use(express.static(pub))
app.use('/files', express.static(audioPath))
bb.extend(app, {
  upload: true,
  // 20MB
  limits: { fileSize: 20000000 }
})

app.get('/', home)
app.all(badRoutes, lol)
app.get('/robots.txt', robots)
app.get('/sitemap.xml', sitemap)
app.get('/about', about)
app.get('/diag', diag)
app.post('/upload', upload(db))
app.get('/:id', player(db))

listenLog(app)
