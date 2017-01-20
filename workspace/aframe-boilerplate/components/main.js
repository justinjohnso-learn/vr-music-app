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
    console.log (soundjs)
    cursorTarget.setAttribute('material', 'color', buttonColor);
  })

  scene.addEventListener('gamepadRT', function(e){
    var cursorTarget = e.detail.cursorTarget
    var buttonColor = e.detail.buttonColor
    var soundjs = e.detail.soundjs
    soundjs.soundjsLoop()
    cursorTarget.setAttribute('material', 'color', buttonColor);
  })

  scene.addEventListener('gamepadB', function(e){
    var cursorTarget = e.detail.cursorTarget
    var buttonColor = e.detail.buttonColor
    var soundjs = e.detail.soundjs
    soundjs.soundjsStop()
    cursorTarget.setAttribute('material', 'color', buttonColor);
  })

  function handleFileLoad(event) {
    console.log("Preloaded:", event.src);
    //console.log(event)
  }
  createjs.Sound.addEventListener("fileload", handleFileLoad);

  gamepadListeners();

  console.log("event listeners set!")
}


// Init entity audio component
//
AFRAME.registerComponent('soundjs', {
  schema: {
    soundjsID: {type: 'string'},
    soundjsSrc: {type: 'string'},
    soundjsInstance: {}
  },
  init: function() {
    var el = this.el
    var soundID = this.data.soundjsID;
    var soundSrc = this.data.soundjsSrc;
    createjs.Sound.registerSound(soundSrc, soundID);
    var myInstance = createjs.Sound.createInstance(soundID)
    this.data.soundjsInstance = myInstance
    //el.setAttribute('audioanalyser', {src: myInstance});
  },

  //update: function() {
    //var data = this.data
    //var soundID = this.data.soundjsID;
    //var soundSrc = this.data.soundjsSrc;
    ////var soundjsInstance = this.
    //console.log(data)
  //},

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
