const { homePage } = require('../pages')

module.exports = (req, res) => {
  res.send(homePage())
}
