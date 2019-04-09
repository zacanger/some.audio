const { aboutPage } = require('../pages')

module.exports = (req, res) => {
  res.send(aboutPage())
}
