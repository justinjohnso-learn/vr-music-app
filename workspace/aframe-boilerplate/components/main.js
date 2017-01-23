// DON'T FORGET TO TAP ON MOBILE SCREEN TO UNLOCK AUDIO
//

// Handle gamepad click functions
//
function gamepadListeners () {
  $('#camera').on('gamepadbuttondown:0', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    intersectedEl.emit('gamepadA', { cursorTarget: intersectedEl,
                              soundjs: soundjs
                              }, true)
    console.log("A")
  });

  $('#camera').on('gamepadbuttondown:6', function () {
    //var intersectedEl = cursor.components.cursor.intersectedEl
    //var soundjs = intersectedEl.components['soundjs']
    document.querySelector('a-scene').emit('gamepadLT', true)
    console.log("LT")
  });

  $('#camera').on('gamepadbuttondown:7', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    intersectedEl.emit('gamepadRT', { cursorTarget: intersectedEl,
                              soundjs: soundjs
                              }, true)
    console.log("RT")
  });

  $('#camera').on('gamepadbuttondown:1', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    intersectedEl.emit('gamepadB', { cursorTarget: intersectedEl,
                              soundjs: soundjs
                              }, true)
    console.log("B")
  });
  
  $('#camera').on('gamepadbuttondown:3', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var soundjs = intersectedEl.components['soundjs']
    intersectedEl.emit('gamepadY', { cursorTarget: intersectedEl,
                              soundjs: soundjs
                              }, true)
    console.log("Y")
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
    var soundjs = e.detail.soundjs
    soundjs.soundjsPlay(cursorTarget)
    cursorTarget.removeAttribute('animation', {pauseEvents: 'soundDone', property: 'color', dir: 'alternate', dur: 1500, easing: 'easeInSine', loop: true, to: '#F00'})
    cursorTarget.setAttribute('animation', {pauseEvents: 'soundDone', property: 'color', dir: 'alternate', dur: 1500, easing: 'easeInSine', loop: true, to: '#228B22'})
  })


  scene.addEventListener('gamepadLT', function(e){
    soundjsStopAll()
  })

  scene.addEventListener('gamepadRT', function(e){
    var cursorTarget = e.detail.cursorTarget
    var soundjs = e.detail.soundjs
    soundjs.soundjsLoop()
    cursorTarget.removeAttribute('animation', {pauseEvents: 'soundDone', property: 'color', dir: 'alternate', dur: 1500, easing: 'easeInSine', loop: true, to: '#228B22'})
    cursorTarget.setAttribute('animation', {pauseEvents: 'soundDone', property: 'color', dir: 'alternate', dur: 1500, easing: 'easeInSine', loop: true, to: '#F00'})
  })

  scene.addEventListener('gamepadY', function(e){
    var cursorTarget = e.detail.cursorTarget
    var soundjs = e.detail.soundjs
    soundjs.soundjsPause()
    cursorTarget.removeAttribute('animation', {pauseEvents: 'soundDone', property: 'color', dir: 'alternate', dur: 1500, easing: 'easeInSine', loop: true, to: '#228B22'})
    cursorTarget.removeAttribute('animation', {pauseEvents: 'soundDone', property: 'color', dir: 'alternate', dur: 1500, easing: 'easeInSine', loop: true, to: '#F00'})
    //cursorTarget.setAttribute('material', 'color', '#6060FF');
  })
  
  scene.addEventListener('gamepadB', function(e){
    var cursorTarget = e.detail.cursorTarget
    var soundjs = e.detail.soundjs
    soundjs.soundjsStop()
    cursorTarget.removeAttribute('animation', {pauseEvents: 'soundDone', property: 'color', dir: 'alternate', dur: 1500, easing: 'easeInSine', loop: true, to: '#228B22'})
    cursorTarget.removeAttribute('animation', {pauseEvents: 'soundDone', property: 'color', dir: 'alternate', dur: 1500, easing: 'easeInSine', loop: true, to: '#F00'})
    cursorTarget.setAttribute('material', 'color', '#6060FF');
  })

  function handleFileLoad(event) {
    console.log("Preloaded:", event.id);
    //console.log(event)
  }
  createjs.Sound.addEventListener("fileload", handleFileLoad);

  gamepadListeners();

  console.log("event listeners set!")
}

function soundjsStopAll(){
  createjs.Sound.stop()
  var allObjects = document.querySelectorAll('[soundjs]')
  var objArr = Array.from(allObjects)
  objArr.forEach(function(object){
    object.emit("soundDone")
  })
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
      console.log("complete")
    })
    this.data.soundjsInstance = myInstance
    //el.setAttribute('audioanalyser', {src: myInstance});
  },

  soundjsPlay: function(el){
    var myInstance = this.data.soundjsInstance
    myInstance.loop = 0
    myInstance.on("complete", function(){
      el.emit("soundDone")
      console.log("complete")
    })
    myInstance.play(this.data.id, {interrupt: createjs.Sound.INTERRUPT_ANY})
    this.data.soundjsInstance = myInstance
    if (this.el.localName !== 'a-cylinder'){
      myInstance.duration = 7100
    };
    if (this.el.id === "note"){
      myInstance.duration = 444
    };
  },
  soundjsStop: function(){
    this.data.soundjsInstance.stop()
  },
  soundjsPause: function(){
    var myInstance = this.data.soundjsInstance
    myInstance.paused = true
  },
  soundjsLoop: function(){
    this.data.soundjsInstance.stop()
    var myInstance = createjs.Sound.play(this.data.id, {loop: -1})
    if (this.el.localName !== 'a-cylinder'){
      myInstance.duration = 7100
    };
    if (this.el.id === "note"){
      myInstance.duration = 444
    };
    this.data.soundjsInstance = myInstance
  }
});

$(document).ready(function() {
  //loadSound();
  setEventListeners();
});
