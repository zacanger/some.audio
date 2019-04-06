const layout = require('./layout')

module.exports = (id) =>
  layout(`
    <div>
      <script type="text/javascript" src="microne.js"></script>
      <div style="margin-top:32px;">
        <div id="player" style="width:100px;height:100px;"></div>
        <script type="text/javascript">
          var m = new Microne(document.getElementById('player'));
          m.source('${id}');
        </script>
        <noscript>
          <audio controls>
            <source src="${id}">
          </audio>
        </noscript>
      </div>
    </div>
  `)
