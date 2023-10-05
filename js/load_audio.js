const el = document.getElementById('wav1')

const options = {
  /** HTML element or CSS selector (required) */
  container: el,
  /** The height of the waveform in pixels */
  height: 64,
  /** Render each audio channel as a separate waveform */
  splitChannels: false,
  /** Stretch the waveform to the full height */
  normalize: false,
  /** The color of the waveform */
  waveColor: '#ff4e00',
  /** The color of the progress mask */
  progressColor: '#dd5e98',
  /** The color of the playpack cursor */
  cursorColor: '#ddd5e9',
  /** The cursor width */
  cursorWidth: 2,
  /** Render the waveform with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
  barWidth: NaN,
  /** Spacing between bars in pixels */
  barGap: NaN,
  /** Rounded borders for bars */
  barRadius: NaN,
  /** A vertical scaling factor for the waveform */
  barHeight: NaN,
  /** Vertical bar alignment **/
  barAlign: '',
  /** Minimum pixels per second of audio (i.e. zoom level) */
  minPxPerSec: 1,
  /** Stretch the waveform to fill the container, true by default */
  fillParent: true,
  /** Audio URL */
  url: '',
  /** Whether to show default audio element controls */
  mediaControls: false,
  /** Play the audio on load */
  autoplay: false,
  /** Pass false to disable clicks on the waveform */
  interact: true,
  /** Allow to drag the cursor to seek to a new position */
  dragToSeek: true,
  /** Hide the scrollbar */
  hideScrollbar: false,
  /** Audio rate */
  audioRate: 1,
  /** Automatically scroll the container to keep the current position in viewport */
  autoScroll: true,
  /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
  autoCenter: true,
  /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
  sampleRate: 8000,
}
  
let new_element = el.cloneNode(true)
new_element.id = 'wav2'
el.after(new_element)

const speedMultiple = 0.5

function insert_wav(timestamp){
  var file = 'waveforms/wav090_'+timestamp+'.wav'

  var wavname = document.createElement('h2')
  wavname.textContent=timestamp
  document.body.appendChild(wavname);
  var optiondiv = document.createElement("div")
  optiondiv.setAttribute('style','display: flex; margin: 1rem 0; gap: 1rem;')
  document.body.appendChild(optiondiv)

  var playbtn = document.createElement("button")
  var playtxt = document.createTextNode("Play/pause")
  
  playbtn.appendChild(playtxt);
  optiondiv.appendChild(playbtn);


  var speedlbl = document.createElement("label")
  speedlbl.appendChild(document.createTextNode("Playback rate: 1.0x"))
  speedlbl.setAttribute('id','rate'+timestamp)
  console.log(speedlbl.id)
  optiondiv.appendChild(speedlbl);

  var sliderlbl = document.createElement("label")
  var slider = document.createElement("input")
  slider.setAttribute('type','range')
  slider.setAttribute('min','1')
  slider.setAttribute('max','10')
  slider.setAttribute('value','2')

  sliderlbl.appendChild(document.createTextNode("1.0x"))
  sliderlbl.appendChild(slider)
  sliderlbl.appendChild(document.createTextNode("5.0x"))
  optiondiv.appendChild(sliderlbl);

  var wavdiv = document.createElement("div")
  document.body.appendChild(wavdiv)
  options.url = file
  options.container=wavdiv
  //options.waveColor='#'+timestamp
  var wavesurfer = WaveSurfer.create(options)
  wavesurfer.setPlaybackRate(wavesurfer.getPlaybackRate(), true)

  // Set the playback rate
  slider.addEventListener('input', (e) => {
    var speed = speedMultiple*e.target.valueAsNumber
    speedlbl.textContent = 'Playback rate: '+speed.toFixed(1)+'x'
    wavesurfer.setPlaybackRate(speed, false)
  })

  // Play/pause
  playbtn.addEventListener('click', () => {
    wavesurfer.playPause()
  })
}

const viddim = ['640','480']
function insert_mov(day){
  var file = 'vids/mov_'+day+'.mov'
  console.log(file)
  var wavname = document.createElement('h2')
  wavname.textContent=day
  document.body.appendChild(wavname);
  var optiondiv = document.createElement("div")
  optiondiv.setAttribute('style','display: flex; margin: 1rem 0; gap: 1rem;')
  document.body.appendChild(optiondiv)

  var playbtn = document.createElement("button")
  var playtxt = document.createTextNode("Play/pause")
  
  playbtn.appendChild(playtxt);
  optiondiv.appendChild(playbtn);


  var speedlbl = document.createElement("label")
  speedlbl.appendChild(document.createTextNode("Playback rate: 1.0x"))
  speedlbl.setAttribute('id','rate'+day)
  console.log(speedlbl.id)
  optiondiv.appendChild(speedlbl);

  var sliderlbl = document.createElement("label")
  var slider = document.createElement("input")
  slider.setAttribute('type','range')
  slider.setAttribute('min','1')
  slider.setAttribute('max','10')
  slider.setAttribute('value','2')

  sliderlbl.appendChild(document.createTextNode("1.0x"))
  sliderlbl.appendChild(slider)
  sliderlbl.appendChild(document.createTextNode("5.0x"))
  optiondiv.appendChild(sliderlbl);

  // Add video to html
  var viddiv = document.createElement("video")
  viddiv.setAttribute('width', viddim[0])
  viddiv.setAttribute('length', viddim[1])
  viddiv.preservesPitch = false

  document.body.appendChild(viddiv)
  vidsrc = document.createElement('source')
  vidsrc.setAttribute('src', file)
  vidsrc.setAttribute('type', 'video/mp4')
  viddiv.appendChild(vidsrc)

  // Set the playback rate
  slider.addEventListener('input', (e) => {
    var speed = speedMultiple*e.target.valueAsNumber
    speedlbl.textContent = 'Playback rate: '+speed.toFixed(1)+'x'
    viddiv.playbackRate = speed
  })

  // Play/pause
  playbtn.addEventListener('click', () => {
    viddiv.paused ? viddiv.play() : viddiv.pause()
  })
}

const times = ['080']

times.forEach(insert_mov)