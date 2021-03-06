const { readdir } = require('fs')
const { audioPath, packageName, version } = require('../util')

module.exports = (req, res) => {
  readdir(audioPath, (err, files) => {
    if (err) {
      throw err
    }
    const count = files.filter((a) => a !== '.gitkeep').length
    res.json({
      name: packageName,
      version,
      count,
    })
  })
}
