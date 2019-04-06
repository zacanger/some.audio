const layout = require('./layout')
const { name } = require('../config')

module.exports = (id) =>
  layout(`
    <div>
      <div style="margin-top:32px;">
        <audio controls>
          <source src="${id}">
        </audio>
      </div>
    </div>
  `)
