const layout = require('./layout')

module.exports = (text) =>
  layout(`
    <div>
      <h1>Internal Error</h1>
      <p>${text}</p>
    </div>
  `)
