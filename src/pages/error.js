const layout = require('./layout')

module.exports = (text) =>
  layout(`
    <div>
      <p>${text}</p>
    </div>
  `)
