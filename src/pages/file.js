const layout = require('./layout')

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
