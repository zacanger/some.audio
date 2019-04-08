const layout = require('./layout')

const copyScript = `
document.querySelector('.url').innerText = window.location.href;
function copyLink (ev) {
  var range = window.document.createRange();
  range.selectNode(document.querySelector('.url'));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  var success = window.document.execCommand('copy');
}
document.querySelector('.copy-link').onclick = copyLink;
`

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
    <!--
      <script type="text/javascript" src="/player.js"></script>
      <div class="player-wrapper">
        <div id="player"></div>
        <script type="text/javascript">
          initPlayer('#player', {
            audioSrc: '${file}',
            title: '${title}',
            description: '${description}',
            author: '${artist}'
          }, {
            on: true,
            bg: '#ecf0f1',
            textColor: '#000',
            lineColor: '#2ecc71'
          })
        </script>
        <noscript>
        -->
          <audio controls>
            <source src="${file}">
          </audio>
          <div classname="meta">
            ${getMetaSection({ artist, title, description })}
          </div>
          <!--
        </noscript>
        -->
        <div class="copy-link">
          <small><span>Click to copy link</span></small>
          <small><span class="url"></span></small>
        </div>
      </div>
      <script type="text/javascript">
        ${copyScript}
      </script>
    </div>
  `)
