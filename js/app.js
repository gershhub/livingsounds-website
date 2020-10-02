var audioStream = undefined;
var audio_status = 0;
var animation = undefined;
var isPlaying = false;
var p5_main = undefined;
var currentSketch = 0;

var streamURL_ogg = "https://doppler.media.mit.edu/livingsounds.ogg";
var streamURL_mp3 = "https://doppler.media.mit.edu/livingsounds.mp3";

function createAudioElement(id){
    // create audio element
    let ae = document.createElement("AUDIO");
    ae.id = id;
    ae.controls = false;
    ae.setAttribute("crossorigin","anonymous");
    ae.addEventListener('error', function(e) {
      console.log(e);
    });
    if (ae.canPlayType("audio/ogg")) {
        ae.setAttribute("src", streamURL_ogg);
    } else {
        ae.setAttribute("src", streamURL_mp3);
    }
	document.body.appendChild(ae);
    return ae;
}

// creates a click through to enter
function createEnterElement(id){
    let div = document.createElement("DIV");
    var para = document.createElement("p");
    let text = document.createTextNode("Click to Enter");
    div.id = id;
    para.appendChild(text);
    div.appendChild(para);
	document.body.appendChild(div);
    div.onclick = function(){
        setup_audio_canvas();
        this.style.display = "none"
    };
    return div;
}

function setup_audio(){
	// setup audio stream
    try{
        console.debug("Create audioContext for advanced audio processing.");
        audioElement = createAudioElement("advAudio");
        audio_status = 1; // status: advanced audio
        audioStream = new AudioSource(audioElement);
        audioStream.advanced();
        audioStream.play();
        if(!this.audioElement.paused){isPlaying = true;};
	}
    catch(err) {
        console.debug("AudioContext is not supported for advanced audio processing. Switch to use HTML5 audio player.");
        // browser does not support player
        audio_status = 0;
        if(audioStream!=undefined){
            audioStream.cleanup();
            audioStream= undefined;
        }
        this.audioElement.play();
        isPlaying = true;
        console.debug("Error during setup of audioContext:", err)
        console.log("Your browser does't support advanced audio processing. Try again using the latest desktop version of Chrome, Firefox, or Edge.")
    }
    // display volume control
    document.getElementById('playButton').style.backgroundImage = "url('img/volume_up.svg')";
}

function setup_canvas(){
    // identify sketch container
    document.getElementById("sketchContainer").className = document.getElementById("sketchContainer").className.replace( /(?:^|\s)lowOpacity(?!\S)/g , '' );
    // invoke p5
    console.debug("Invoke P5.");
    currentSketch = 0;
    p5_main = new p5(sketches[currentSketch]);
}

function togglePlay() {
  var aud = document.getElementById("advAudio");
  if(aud){
    if(aud.paused){
      document.getElementById("sketchContainer").className = document.getElementById("sketchContainer").className.replace( /(?:^|\s)lowOpacity(?!\S)/g , '' );
      document.getElementById('playButton').style.backgroundImage = "url('img/volume_up.svg')";
      aud.play();
      isPlaying = true;

    }else{
      document.getElementById("sketchContainer").className += "lowOpacity";
      document.getElementById('playButton').style.backgroundImage = "url('img/volume_off.svg')";
      aud.pause();
      isPlaying = false;
    }
  }
};

function initApp(){
  // createEnterElement("enterDiv");
  // loadScript("js/sketches/LivingRings.js");
  // loadScript("js/sketches/drawing.js");
  console.debug("Setup animation canvas.");
  setup_canvas();
}

function loadScript(url) {
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}

function registerEntry(){
  gtag('event', 'button_press', {
  'event_category': 'onboarding',
  'event_label': 'app_start'
  });
}

/******************************************************************************/
/*****************************sketch definitions*******************************/
/******************************************************************************/

// Maine, by Nan Zhao (NAYO)

let Maine_setup = function(p) {
  document.getElementById('homeBodyApp').style.backgroundImage = "url('../img/MaineAnimation/bg.jpg')";
  document.getElementById('homeBodyApp').style.backgroundColor = "#000000";
  document.getElementById('logoContainer').style.display = "none";
  document.getElementById('designCredit').innerHTML = "Animation by " + "<a href='https://nayo.info' target='_blank'>Nan Zhao @ NAYO</a>";
  let images = []
  p.preload = function() {
    images[0] = p.loadImage('../img/MaineAnimation/Buoy-CIFF.png');
    images[1] = p.loadImage('../img/MaineAnimation/Buoy-SI.png');
    images[2] = p.loadImage('../img/MaineAnimation/Buoy-nayo.png');
  }
  p.setup = function() {
    cnv = p.createCanvas(p.windowWidth, 720);
    cnv.style('display', 'block');
    cnv.style('z-index', -1);
    cnv.parent('sketchContainer');
    animation = new MaineAnimation(p.width, p.height, p, images)
  };
  p.draw = function() {
    if(this.animation!=undefined) {
        animation.draw(audioStream)
    }
  };
}


var sketches = [Maine_setup];