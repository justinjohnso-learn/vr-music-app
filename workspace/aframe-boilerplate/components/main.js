// DON'T FORGET TO TAP ON MOBILE SCREEN TO UNLOCK AUDIO
//

// Handle gamepad click functions
//
function gamepadListeners () {
  $('a-scene').on('gamepadbuttondown:0', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    intersectedEl.emit('gamepadA', { cursorTarget: intersectedEl,
                              buttonColor: 'green',
                              soundjs: soundjs
                              }, true)
    console.log("A")
  });

  $('#camera').on('gamepadbuttondown:7', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    intersectedEl.emit('gamepadRT', { cursorTarget: intersectedEl,
                              buttonColor: 'red',
                              soundjs: soundjs
                              }, true)
    console.log("RT")
  });

  $('#camera').on('gamepadbuttondown:1', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    intersectedEl.emit('gamepadB', { cursorTarget: intersectedEl,
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
    //console.log(e)
    soundjs.soundjsPlay()
    //console.log (soundjs)
    //cursorTarget.setAttribute('material', 'color', buttonColor);
    //cursorTarget.setAttribute('animation_color', {property: 'color'; dir: 'alternate'; dur: 1000; easing: 'easeInSine'; loop: true; to: '#0F0'})
  })

  scene.addEventListener('gamepadRT', function(e){
    var cursorTarget = e.detail.cursorTarget
    var buttonColor = e.detail.buttonColor
    var soundjs = e.detail.soundjs
    soundjs.soundjsLoop()
    //cursorTarget.setAttribute('material', 'color', buttonColor);
  })

  scene.addEventListener('gamepadB', function(e){
    var cursorTarget = e.detail.cursorTarget
    var buttonColor = e.detail.buttonColor
    var soundjs = e.detail.soundjs
    soundjs.soundjsStop()
    //cursorTarget.setAttribute('material', 'color', buttonColor);
  })

  document.querySelector('a-box').addEventListener('gamepadA', function(e){
    console.log(e)
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
    id: {type: 'string'},
    src: {type: 'string'},
    //volume: {type: 'string'},
    soundjsInstance: {}
  },
  init: function() {
    var el = this.el
    var soundID = this.data.id;
    var soundSrc = this.data.src;
    createjs.Sound.registerSound(soundSrc, soundID);
    var myInstance = createjs.Sound.createInstance(soundID)
    myInstance.on("complete", function(){
      el.emit("soundDone")
    })
    this.data.soundjsInstance = myInstance
    //el.setAttribute('audioanalyser', {src: myInstance});
  },

  soundjsPlay: function(){
    var myInstance = this.data.soundjsInstance
    myInstance.play(this.data.id, {interrupt: createjs.Sound.INTERRUPT_ANY})
  },
  soundjsStop: function(){
    this.data.soundjsInstance.stop()
  },
  soundjsLoop: function(){
    this.data.soundjsInstance.stop()
    var myInstance = createjs.Sound.play(this.data.id, {loop: -1})
    this.data.soundjsInstance = myInstance
  }
});

$(document).ready(function() {
  //loadSound();
  setEventListeners();
});
