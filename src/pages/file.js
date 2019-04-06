const layout = require('./layout')

module.exports = ({ artist, title, description, file }) =>
  layout(`
    <div>
      <script type="text/javascript" src="microne.js"></script>
      <div style="margin-top:32px;">
        <!--
        <div classname="meta">
          <span>${title} &middot; ${artist}</span>
          <span>${description}></span>
        </div>
        -->
        <div id="player" style="width:100px;height:100px;"></div>
        <script type="text/javascript">
          var m = new Microne(document.getElementById('player'));
          m.source('${file}');
        </script>
        <noscript>
          <audio controls>
            <source src="${file}">
          </audio>
        </noscript>
      </div>
    </div>
  `)
