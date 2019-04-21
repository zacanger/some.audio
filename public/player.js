/* eslint-disable */

// TODO: remove this section down to the copyright notice
// once main player works on mobile. this whole chunk
// results in the same thing as what's in the `noscript` tag.
function testMobileOrTablet (device) {
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(device) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(device.substr(0, 4))
};
const testNewPlayer = (() => {
  try {
    return window.location.search.includes('testnewplayer')
  } catch (_) {
    return false
  }
})
window.possiblyMobile = testMobileOrTablet(navigator.userAgent || navigator.vendor || window.opera) || !testNewPlayer;
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
const mobileBlock = ({ audioSrc: file, title, description, author: artist }) => `
<audio controls>
  <source src="${file}">
</audio>
<div classname="meta">
  ${getMetaSection({ artist, title, description })}
</div>
`
const contentForMobile = (info) => {
  document.getElementById('player').innerHTML = mobileBlock(info)
}
// end mobile-specific chunk

/*
modified from https://github.com/sergivb01/AudioPlayer-3/

TODO:
make it work on mobile, make seek clicks intuitive

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
    if (window.possiblyMobile) {
      return contentForMobile(info)
    }

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

    // quick hack to get mobile working
    function resumeAudio () {
      ctx.resume()
      document.removeEventListener('click', resumeAudio)
    }
    document.addEventListener('click', resumeAudio)

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