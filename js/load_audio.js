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
  optiondiv.appendChild(speedlbl);

  var sliderlbl = document.createElement("label")
  var slider = document.createElement("input")
  slider.setAttribute('type','range')
  slider.setAttribute('min','1')
  slider.setAttribute('max','10')
  slider.setAttribute('value','2')

  sliderlbl.appendChild(document.createTextNode("0.5x"))
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

function insert_mov(day){
  var maindiv = document.createElement('div')
  var collapsebtn = document.createElement('button')
  collapsebtn.innerHTML=day
  collapsebtn.setAttribute('class', 'collapsible')
  maindiv.appendChild(collapsebtn)
  var content = document.createElement('div')
  content.setAttribute('class', 'content')
  maindiv.appendChild(content)
  content.style.display = 'none'
  document.body.appendChild(maindiv)
  
  var optiondiv = document.createElement("div")
  optiondiv.setAttribute('style','display: flex; margin: 1rem 0; gap: 1rem;')
  content.appendChild(optiondiv)

  var playbtn = document.createElement("button")
  playbtn.setAttribute('class','playbutton')
  var playtxt = document.createTextNode("PLAY")
  
  playbtn.appendChild(playtxt);
  optiondiv.appendChild(playbtn);

  var speedlbl = document.createElement("label")
  speedlbl.appendChild(document.createTextNode("Playback rate: 1.0x"))
  speedlbl.setAttribute('id','rate'+day)
  speedlbl.setAttribute('class','speedlabel')
  optiondiv.appendChild(speedlbl);

  var sliderlbl = document.createElement("label")
  var slider = document.createElement("input")
  slider.setAttribute('type','range')
  slider.setAttribute('min','1')
  slider.setAttribute('max','10')
  slider.setAttribute('value','2')

  sliderlbl.appendChild(document.createTextNode("0.5x"))
  sliderlbl.appendChild(slider)
  sliderlbl.appendChild(document.createTextNode("5.0x"))
  sliderlbl.setAttribute('class', 'speedslider')
  optiondiv.appendChild(sliderlbl);

  // Add video to html
  var viddiv = document.createElement("video")
  viddiv.setAttribute('class','player')
//  viddiv.setAttribute('controls',true)
  viddiv.preservesPitch = false

  content.appendChild(viddiv)
  var vidsrc = document.createElement('source')
  vidsrc.setAttribute('src', 'vids/mov_'+day+'.mov')
  vidsrc.setAttribute('type', 'video/mp4')
  viddiv.appendChild(vidsrc)
  var vidsrc2 = document.createElement('source')
  vidsrc2.setAttribute('src', 'vids/mov_'+day+'.mp4')
  vidsrc.setAttribute('type', 'video/mp4')
  viddiv.appendChild(vidsrc2)

  var timediv = document.createElement("div")
  content.appendChild(timediv)
  var timeslider = document.createElement("input")
  timeslider.setAttribute('class', 'timeslider')
  timediv.appendChild(timeslider)
  timeslider.setAttribute('type','range')
  timeslider.setAttribute('min','0')
  timeslider.setAttribute('max','1000')
  timeslider.setAttribute('value','0')

  function updateTime(sld){
    let perc = viddiv.currentTime/viddiv.duration
    sld.value = (timeslider.max-timeslider.min)*perc + timeslider.min
    if(perc==100)
      playtxt.textContent = "PLAY"
  }
  var intID = setInterval(updateTime,100,timeslider)
  // Set the playback rate
  slider.addEventListener('input', (e) => {
    var speed = speedMultiple*e.target.valueAsNumber
    speedlbl.textContent = 'Playback rate: '+speed.toFixed(1)+'x'
    viddiv.playbackRate = speed
  })

  // Play/pause
  playbtn.addEventListener('click', () => {
    if (viddiv.paused){
      playtxt.textContent = "PAUSE"
      viddiv.play()
      viddiv.muted=false
      viddiv.volume=1
    }
    else{
      playtxt.textContent = "PLAY"
      viddiv.pause()
    }
  })

  timeslider.addEventListener('input', () => {
    let perc = timeslider.value/(timeslider.max-timeslider.min)
    viddiv.currentTime = viddiv.duration * perc
    viddiv.pause()
  })
  function sliderdropped(){
    let perc = viddiv.currentTime/viddiv.duration
    timeslider.value = (timeslider.max-timeslider.min)*perc + timeslider.min
    if(perc==100)
      playtxt.textContent = "PLAY"
    else if (playtxt.textContent == "PAUSE")
      viddiv.play()
    else
      viddiv.pause()
  }

  timeslider.addEventListener('mouseup',sliderdropped)
  timeslider.addEventListener('touchend',sliderdropped)
}

// Make a list of days
var times = [];
for(let i = 80; i <= 105; i++){
  s = i.toString()
  if(s.length <= 2)
    s = '0' + s
  times.push(s)
}

times.forEach(insert_mov)

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}