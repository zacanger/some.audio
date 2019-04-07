const layout = require('./layout')

const getMetaSection = ({ artist, title, description }) => {
  const at = (title || artist)
    ? `<strong><span>${title}${
      artist
        ? ' &middot; ' + artist
        : ''
      }</span></strong>`
    : ''
  const d = description
    ? `<br><span>${description}</span>`
    : ''
  return `${at}\n${d}\n`
}

module.exports = ({
  artist = '',
  description = '',
  file = '',
  title = '',
}) =>
  layout(`
    <div>
      <script type="text/javascript" src="microne.js"></script>
      <div style="margin-top:32px;">
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
        <div classname="meta">
          ${getMetaSection({ artist, title, description })}
        </div>
      </div>
    </div>
  `)
