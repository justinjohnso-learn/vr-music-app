// DON'T FORGET TO TAP ON MOBILE SCREEN TO UNLOCK AUDIO
//

// Handle gamepad click functions
//
function gamepadListeners () {
  $('#camera').on('gamepadbuttondown:0', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    cursor.emit('gamepadA', { cursorTarget: intersectedEl,
                              buttonColor: 'green',
                              soundjs: soundjs
                              }, true)
    console.log("A")
  });

  $('#camera').on('gamepadbuttondown:7', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    cursor.emit('gamepadRT', { cursorTarget: intersectedEl,
                              buttonColor: 'red',
                              soundjs: soundjs
                              }, true)
    console.log("RT")
  });

  $('#camera').on('gamepadbuttondown:1', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    cursor.emit('gamepadB', { cursorTarget: intersectedEl,
                              buttonColor: 'blue',
                              soundjs: soundjs
                              }, true)
    console.log("B")
  });
}

// Set event listeners
//
function setEventListeners () {
  var scene = document.querySelector('a-scene')
  scene.addEventListener('proxycontrols.paircode', function (e) {
    console.log(e.detail.pairCode);
  });

  scene.addEventListener('gamepadA', function(e){
    var cursorTarget = e.detail.cursorTarget
    var buttonColor = e.detail.buttonColor
    var soundjs = e.detail.soundjs
    soundjs.soundjsPlay()
    //console.log(cursorTarget.components.soundjs.data.soundjsSrc)
    console.log (soundjs)
    //document.querySelector('#levels').setAttribute('audioanalyser', {src: soundjs.data.soundjsSrc})
    //soundjs.audioEl.play()
    cursorTarget.setAttribute('material', 'color', buttonColor);
   //console.log(e, e.detail)
  })

  scene.addEventListener('gamepadRT', function(e){
    var cursorTarget = e.detail.cursorTarget
    var buttonColor = e.detail.buttonColor
    var soundjs = e.detail.soundjs
    soundjs.soundjsLoop()
    cursorTarget.setAttribute('material', 'color', buttonColor);
    //console.log(e, e.detail)
  })

  scene.addEventListener('gamepadB', function(e){
    var cursorTarget = e.detail.cursorTarget
    var buttonColor = e.detail.buttonColor
    var soundjs = e.detail.soundjs
    soundjs.soundjsStop()
    cursorTarget.setAttribute('material', 'color', buttonColor);
    //console.log(e, e.detail)
  })

  gamepadListeners();
  console.log("event listeners set!")
}


// Init entity audio component
//
AFRAME.registerComponent('soundjs', {
  schema: {
    soundjsID: {type: 'string'},
    soundjsSrc: {type: 'string'}
  },
  init: function() {
    //var audioEl;
    var el = this.el
    //var soundID = this.data.soundjsID;
    //var soundSrc = this.data.soundjsSrc;
    //var source = audioCtx.createBufferSource();
    createjs.Sound.registerSound(soundSrc, soundID);
    createjs.Sound.addEventListener("fileload", handleFileLoad);
    var myInstance = createjs.Sound.createInstance(soundID)
    //var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    //function getData(myInstance, el, soundID, soundSrc) {
      //request = new XMLHttpRequest();
      //request.open('GET', soundSrc, true);
      //request.responseType = 'arraybuffer';
      //request.onload = function() {
        //console.log(request.response)
        //var audioData = request.response;
        //audioCtx.decodeAudioData(audioData, function(buffer) {
            ////console.log(audioData)
            //myBuffer = buffer;
            //songLength = buffer.duration;
            //source.buffer = myBuffer;
            //myInstance.sourceNode = source.buffer
            ////source.playbackRate.value = playbackControl.value;
            //source.connect(audioCtx.destination);
            ////source.connect(analyser)
            //console.log(source)
            //el.emit('didAThing', {source: source,
                                  //src: soundID,
                                  //context: audioCtx}, true)
          //},
          //function(e){"Error with decoding audio data" + e.err});
      //}
      //request.send();
    //}


    function handleFileLoad(event) {
      //getData(myInstance, el, soundID, soundSrc);
      //audioEl.src = soundSrc
      console.log("Preloaded:", event.src);
    }
      //myInstance.sourceNode = soundSrc
      //console.log(myInstance.sourceNode)
      //console.log(myInstance)
      //audioEl = this.audioEl = document.createElement('audio');
      //audioEl.crossOrigin = 'anonymous';
      //audioEl.autoplay = true;
      //audioEl.id = 'soundjsAudio';
      //el.appendChild(audioEl);
      el.setAttribute('audioanalyser', {src: myInstance});
  },

  soundjsPlay: function(){
    createjs.Sound.play(this.data.soundjsID)
  },
  soundjsStop: function(){
    createjs.Sound.stop(this.data.soundjsID)
  },
  soundjsLoop: function(){
    createjs.Sound.play(this.data.soundjsID, {loop: -1});
  }
});

$(document).ready(function() {
  //loadSound();
  setEventListeners();
});
