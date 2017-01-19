// Handle audio
// DON'T FORGET TO TAP ON MOBILE SCREEN TO UNLOCK AUDIO
//
//function loadSound () {
  //createjs.Sound.registerSound("castle.mp3", "castle");
  //createjs.Sound.registerSound("spine.mp3", "spine");
  //createjs.Sound.registerSound("tomes.mp3", "tomes");
  //createjs.Sound.addEventListener("fileload", handleFileLoad);
  //function handleFileLoad(event) {
    //var scene = document.querySelector('a-scene')
    //var audioEntity = document.createElement('a-entity')
    //audioEntity.id = event.id;
    //scene.appendChild(audioEntity);
    //console.log(audioEntity)
    //console.log("Preloaded:", event.src);
    ////audioEntity.setAttribute('fireAudio', createjs.Sound.play(event.id))
  //}
//}

//var soundID = "";
//function playSound (soundID) {
  //createjs.Sound.play(soundID);
//}

//function stopSound (soundID) {
  //createjs.Sound.stop(soundID);
//}

//function loopSound (soundID) {
  //createjs.Sound.play(soundID, {loop: -1});
//}

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
    var soundID = this.data.soundjsID;
    var soundSrc = this.data.soundjsSrc;
    console.log(this)
    createjs.Sound.registerSound(soundSrc, soundID);
    createjs.Sound.addEventListener("fileload", handleFileLoad);
    function handleFileLoad(event) {
      console.log("Preloaded:", event.src);
    }
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
