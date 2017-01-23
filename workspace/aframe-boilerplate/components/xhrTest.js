
// use XHR to load an audio track, and
// decodeAudioData to decode it and stick it in a buffer.
// Then we put the buffer into the source

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var songLength;
var analyser = audioCtx.createAnalyser();

function getData() {
  source = audioCtx.createBufferSource();
  request = new XMLHttpRequest();

  request.open('GET', 'castle.mp3', true);

  request.responseType = 'arraybuffer';


  request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        //console.log(audioData)
        myBuffer = buffer;
        songLength = buffer.duration;
        source.buffer = myBuffer;
        //source.playbackRate.value = playbackControl.value;
        source.connect(audioCtx.destination);
        source.connect(analyser)
        console.log(source.buffer)
        //source.loop = true;

        //loopstartControl.setAttribute('max', Math.floor(songLength));
        //loopendControl.setAttribute('max', Math.floor(songLength));
      },

      function(e){"Error with decoding audio data" + e.err});

  }

  request.send();
}

function playIt(){
  getData();
  source.start(0);
}
//debugger
