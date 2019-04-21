/* eslint-disable */

/*
MIT License

Copyright (c) 2018 Hunor Karamán

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function Microne (parentEl) {
  this.audio = null
  this._src = null
  this._events = []
  this.isPlaying = false

  this.pChar = '>'
  this.sChar = '||'

  this.el = document.createElement('div')

  applyStyle(this.el, {
    width: '100%',
    height: '100%',
    border: '1px solid #000',
    cursor: 'auto',
    position: 'relative'
  })

  this.fillEl = document.createElement('div')

  applyStyle(this.fillEl, {
    background: '#eee',
    height: '100%',
    width: '0%',
    pointerEvents: 'none'
  })

  this.el.appendChild(this.fillEl)

  this.playButton = document.createElement('div')
  this.playButton.innerHTML = this.pChar

  applyStyle(this.playButton, {
    cursor: 'pointer',
    fontFamily: 'monospace',
    fontSize: '14px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '25px',
    height: '25px',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontWeight: 'bold'
  })

  this.el.appendChild(this.playButton)

  this.init = function () {
    parentEl.appendChild(this.el)
    this.el.addEventListener('click', elClick)
    this.playButton.addEventListener('click', playClick)
  }

  this.source = function (src, preload) {
    this._src = src
    if (preload !== false) {
      this.audio = new Audio(src)
      this.audio.addEventListener('timeupdate', timeUpdate)
      this.audio.addEventListener('ended', audioEnded)
    }
  }

  this.play = function () {
    if (!this.audio && this._src) {
      this.source(this._src)
      this.applyEvents()
    }

    this.isPlaying = true
    this.audio.play()
    this.playButton.innerHTML = this.sChar
    this.el.style.cursor = 'pointer'
  }

  this.pause = function () {
    this.isPlaying = false
    this.audio.pause()
    this.playButton.innerHTML = this.pChar
    this.el.style.cursor = 'auto'
  }

  this.applyEvents = function () {
    for (var i in this._events) {
      this.audio.addEventListener(this._events[i].e, this._events[i].h)
    }
    this._events = []
  }

  this.on = function (e, h) {
    this._events.push({e, h})
    if (this.audio) {
      this.audio.addEventListener(e, h)
    }
  }

  var t = this

  function applyStyle (domElem, style) {
    Object.assign(domElem.style, style)
  }

  function elClick (e) {
    e.preventDefault()

    if (e.target != t.playButton && t.isPlaying) {
      x = e.pageX - t.el.offsetLeft
      t.audio.currentTime = t.audio.duration * (x * 100 / t.el.offsetWidth) / 100
    }
  }

  function playClick (e) {
    e.preventDefault()

    if (t.isPlaying) {
      t.pause()
    } else {
      t.play()
    }
  }

  function timeUpdate (e) {
    var at = (t.audio.currentTime * 100 / t.audio.duration).toFixed(3)
    t.fillEl.style.width = at + '%'
  }

  function audioEnded () {
    t.pause()
    t.audio.currentTime = 0
    t.fillEl.style.width = '0%'
  }

  this.init()
  return this
}
