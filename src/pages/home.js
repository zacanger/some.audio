const layout = require('./layout')

const validationScript = `
function showFile (files) {
  var inputLabel = document.getElementById('file-picker');
  var inputEl = document.getElementById('file');
  var filename = files[0].name;
  inputLabel.innerText = filename;
  if (typeof FileReader !== 'undefined') {
    var size = inputEl.files[0].size / 1024 / 1024;
    if (size > 20) {
      inputLabel.innerText = 'File is too large!';
      inputEl.value = '';
    }
  }
}
`

/* eslint-disable max-len */
module.exports = () =>
  layout(`
    <div>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <div class="upload-form">
          <script type="text/javascript">
            ${validationScript}
          </script>
          <input required accept="audio/*" type="file" id="file" name="file" autocomplete="off" onchange="showFile(this.files)">
          <label for="file" id="file-picker">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
              </svg>
              <span>Choose a file&hellip;</span>
            </label>
            <label for="title">Title:</label>
            <input name="title" id="title" type="text" placeholder="Awesome Song">
            <label for="artist">Artist:</label>
            <input name="artist" placeholder="The Best Band" id="artist" type="text">
            <label for="artist">Description:</label>
            <textarea name="description" placeholder="This song is so awesome, yo." id="description" type="text" rows="2"></textarea>
            <span class="submit-row">Max file size: 20MB <button type="submit">Submit</button></span>
        </div>
      </form>
    </div>
  `)
