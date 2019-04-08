/* eslint-disable */
/*
The MIT License (MIT)

Copyright (c) 2016 Sergi Vos

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

const hasClass = (elem, className) =>
  new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ')

const getStyle = (el, style) => {
  const styles = window.getComputedStyle(el)
  return styles.getPropertyValue(style)
}

const formatTime = (time) => {
  const timeArr = [
    Math.floor(((time % 31536000) % 86400) / 3600),
    Math.floor((((time % 31536000) % 86400) % 3600) / 60),
    ((((time % 31536000) % 86400) % 3600) % 60)
  ]

  timeArr[2] = timeArr[2].toString().split('.')[0]

  for (let i = 0; i < timeArr.length; i++) {
    if (timeArr[i] < 10) {
      timeArr[i] = '0' + timeArr[i]
    }
    if (i !== 2) {
      timeArr[i] += ':'
    }
  }

  return timeArr[0] + timeArr[1] + timeArr[2]
}

;(function() {
  const allPlayers = []
  let isInit = false
  const audio = document.createElement('audio')

  audio.className = 'player-audio'
  audio.crossOrigin = 'anonymous'

  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const source = ctx.createBufferSource()
  const audioSrc = ctx.createMediaElementSource(audio)

  audioSrc.connect(ctx.destination)

  function initPlayers (eq) {
    const players = document.querySelectorAll('.player')
    const playersLength = players.length

    for (let i = 0; i < playersLength; i++) {
      allPlayers.push(new Player(players[i], eq));
      allPlayers[i]._init();
    }
  }

  function initPlayer (element, info, eq) {
    const inPlayer = document.querySelector(element)
    const playersLength = allPlayers.length

    createPlayer(inPlayer, info)
    allPlayers.push(new Player(inPlayer, eq))
    allPlayers[playersLength]._init()
  }

  window.addEventListener('resize', function () {
    for (let i = 0; i < allPlayers.length; i++) {
      if (allPlayers[i].isInit) {
        allPlayers[i].reDraw()
      }
    }
  }, true)

  var Player = function Player (player, eq) {
    let this_ = this
    this.player = player
    this.eq = eq.on || false
    this.isPlaying = false
    this.controlBtn = this.player.querySelector('.player-control')
    this.currLine = this.player.querySelector('.line-current')
    this.currTime = this.player.querySelector('.time-current')
    this.fullTime = this.player.querySelector('.time-full')
    this.timeLine = this.player.querySelector('.time-line')
    this.fullVol = this.player.querySelector('.player-volume')
    this.currVol = this.player.querySelector('.volume-line')
    this.canvas = this.player.querySelector('canvas') || false
    this.playerMeta = this.player.querySelector('.player-meta')
    this.visual = this.player.querySelector('.player-visual')
    this.visualProgress = this.player.querySelector('.visual-progress')
    this.mTimeDown = false
    this.mVolumeDown = false
    this.playNow = false
    this.isInit = false
    this.visualData = {
      bg: eq.bg || false,
      height: eq.height || 200,
      lineColor: eq.lineColor || '#000000',
      linesLength: eq.linesLength || 1000,
      textColor: eq.textColor || '#fff',
      width: eq.width || this_.playerMeta.offsetWidth,
    }

    this._init = function () {
      this.controlBtn.addEventListener('click', this.controls)
      audio.addEventListener('timeupdate', this.updateTime)
      this.timeLine.addEventListener('mousedown', this.setTimeClick)
      this.timeLine.addEventListener('mousemove', this.setTimeMove)
      this.timeLine.addEventListener('mouseup', this.onTimeUp)
      this.timeLine.addEventListener('mouseleave', this.onTimeUp)
      this.fullVol.addEventListener('mousedown', this.setVolumeClick)
      this.fullVol.addEventListener('mousemove', this.setVolumeMove)
      this.fullVol.addEventListener('mouseup', this.onVolumeUp)
      this.fullVol.addEventListener('mouseleave', this.onVolumeUp)
      audio.addEventListener('ended', this.ended)
      audio.volume = 0.5
      if (this_.visualData.textColor) {
        this_.playerMeta.style.color = this_.visualData.textColor
      }
      if (this_.visualData.bg) {
        this_.playerMeta.style.background = this_.visualData.bg
      }
    }

    this.buffer = function () {
      this.canvasCtx = this.canvas.getContext('2d')
      this.request = new XMLHttpRequest()
      this.request.open('GET', audio.src, true)
      this.request.responseType = 'arraybuffer'

      this.request.onload = function () {
        this_.audioData = this_.request.response

        ctx.decodeAudioData(this_.audioData, function (buffer) {
          this_.buffer = buffer
          this_.leftChannel = buffer.getChannelData(0)
          this_.draw()
          this_.fullTime.innerHTML = formatTime(audio.duration) || '00:00:00'
          this_.visual.setAttribute('class', 'player-visual player-visual-loaded')
          this_.player.setAttribute('class', 'player player-playing')
          this_.isInit = true
        }, (e) => 'Error with decoding audio data' + e.err)
      }

      this.request.send()
    }

    this.stop = function () {
      audio.pause()
      audio.currentTime = 0
      this_.currTime.innerHTML = '00:00:00'
      this_.currLine.style.width = '0%'
      this_.visualProgress.style.width = '0%'
      this_.isPlaying = false
      this_.playNow = false
      this_.controlBtn.setAttribute('class', 'player-control player-play')
      this_.player.setAttribute('class', 'player')
    }

    this.controls = function () {
      if (hasClass(this_.controlBtn, 'player-play')) {
        if (!this_.playNow) {
          for (let i = 0; i < allPlayers.length; i++) {
            allPlayers[i].stop()
          }
          audio.src = this_.player.dataset.src
          if (this_.eq && this_.canvas && !this_.isInit) {
            this_.buffer()
          }

          audio.volume = getStyle(this_.currVol, 'left').slice(0, -2) / getStyle(this_.fullVol, 'width').slice(0, -2)
        }
        this_.controlBtn.setAttribute('class', 'player-control player-pause')

        if (!this_.isInit) {
          this_.player.setAttribute('class', 'player player-playing player-loading')
        } else {
          this_.player.setAttribute('class', 'player player-playing')
        }

        audio.play()
        this_.isPlaying = true
        this_.playNow = true
      } else {
        this_.controlBtn.setAttribute('class', 'player-control player-play')
        if (this.isInit) {
          this_.player.setAttribute('class', 'player')
        }
        audio.pause()
        this_.isPlaying = false
      }
    }

    this.updateTime = function () {
      if (this_.isPlaying) {
        const time = this.currentTime
        this_.currTime.innerHTML = formatTime(time)
        this_.currLine.style.width = (time * 100) / audio.duration + '%'
        this_.visualProgress.style.width = (time * 100) / audio.duration + '%'
      }
    }

    this.setVolume = function (e) {
      let x
      let setVolume
      let setLeft
      let nowWidth
      let volLineWidth = this_.fullVol.offsetWidth

      if (e.pageX) {
        x = e.pageX
      } else {
        x = e.clientX
      }

      nowWidth = x - this_.fullVol.getBoundingClientRect().left
      setLeft = (nowWidth * 100) / volLineWidth
      this_.currVol.style.left = setLeft + '%'
      audio.volume = setLeft / 100
    }

    this.setVolumeClick = function (e) {
      this_.mVolumeDown = true
      this_.setVolume(e)
    }

    this.onVolumeUp = function () {
      this_.mVolumeDown = false
    }

    this.setVolumeMove = function (e) {
      if (this_.mVolumeDown) {
        this_.setVolume(e)
      }
    }

    this.setTime = function (e) {
      let x
      let setTime
      let setWidth
      let nowWidth
      let timeLineWidth = this_.timeLine.offsetWidth

      if (!this_.playNow) {
        for (let i = 0; i < allPlayers.length; i++) {
          allPlayers[i].stop()
        }
      }
      this_.playNow = true
      audio.pause()

      if (e.pageX) {
        x = e.pageX
      } else {
        x = e.clientX
      }

      nowWidth = x - this_.timeLine.getBoundingClientRect().left
      setWidth = (nowWidth * 100) / timeLineWidth
      this_.currLine.style.width = setWidth + '%'
      audio.currentTime = (setWidth * audio.duration) / 100
    }

    this.setTimeClick = function (e) {
      this_.mTimeDown = true
      this_.setTime(e)
    }

    this.setTimeMove = function (e) {
      if (this_.mTimeDown) {
        this_.setTime(e)
      }
    }

    this.onTimeUp = function () {
      this_.mTimeDown = false
      if (this._isPlaying) {
        audio.play()
      }
    }

    this.ended = function () {
      this_.stop()
    }

    this.draw = function () {
      this_.canvas.width = this_.visualData.width
      this_.canvas.height = this_.visualData.height

      drawVisual()
    }

    this.reDraw = function () {
      this.canvas.width = this.canvas.offsetWidth
      this.canvas.height = this.canvas.offsetHeight

      drawVisual()
    }

    function drawVisual() {
      this_.canvasCtx.clearRect(0, 0, this_.canvas.width, this_.canvas.height)
      this_.canvasCtx.strokeStyle = this_.visualData.lineColor
      this_.canvasCtx.translate(0, this_.canvas.height / 2)
      this_.canvasCtx.lineWidth = 1

      const totallength = this_.leftChannel.length
      const eachBlock = Math.floor(totallength / this_.visualData.linesLength)
      const lineGap = (this_.canvas.width / this_.visualData.linesLength)

      this_.canvasCtx.beginPath()

      for (let i = 0; i <= this_.visualData.linesLength; i++) {
        const audioBuffKey = Math.floor(eachBlock * i)
        const x = i * lineGap
        const y = this_.leftChannel[audioBuffKey] * this_.canvas.height / 2
        this_.canvasCtx.moveTo(x, y)
        this_.canvasCtx.lineTo(x, (y * -1))
      }
      this_.canvasCtx.stroke()
      this_.canvasCtx.restore()
    }
  }

  function createPlayer(el, info) {
    const classes = el.getAttribute('class')
    el.setAttribute('data-src', info.audioSrc)
    el.setAttribute('class', 'player ' + classes)

    el.innerHTML = `
    <div class="player-cover">
      <div class="player-volume volume">
        <div class="volume-full"></div>
        <div class="volume-line"></div>
      </div>
      <div class="player-control player-play"></div>
      <div class="player-loader"></div>
      <div class="player-time time">
        <div class="time-current">00:00:00</div>
        <div class="time-line">
          <div class="line-current"></div>
        </div>
        <div class="time-full">00:00:00</div>
      </div>
    </div>
    <div class="player-meta">
      <div class="player-visual">
        <div class="visual-progress"></div>
        <canvas></canvas>
      </div>
      <div class="player-text">
        <h3 class="player-title">${info.title || ''}</h3>
        <p class="player-author">${info.author || ''}</p>
        <p class="player-desc">${info.description || ''}</p>
      </div>
    </div>
    `
  }

  window.initAll = initPlayers
  window.initPlayer = initPlayer
})();