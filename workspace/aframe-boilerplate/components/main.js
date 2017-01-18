var soundID = "castle";

function loadSound () {
  createjs.Sound.registerSound("castle.mp3", soundID);
  //createjs.Sound.addEventListener("fileload", handleFileLoad);
  //function handleFileLoad(event) {
    //console.log("Preloaded:", event.src);
  //}
}

function playSound () {
  createjs.Sound.play(soundID);
}

function stopSound () {
  createjs.Sound.stop(soundID);
}

function loopSound() {
  createjs.Sound.play(soundID, {loop: -1});
}

function gampadListeners () {
  var gamepadX = $('#camera').on('gamepadbuttondown:0', function () {
    cursor.emit('gamepadA', {target: 'cursor-listener'}, false)
    //cursor.dataset.button = "A"
    //playSound()
    //cursor.components.cursor.onMouseDown();
    //cursor.components.cursor.onMouseUp();
    console.log("A")
  });

  var gamepadRT = $('#camera').on('gamepadbuttondown:7', function () {
    cursor.emit('gamepadRT', {target: 'cursor-listener'}, false)
    //cursor.dataset.button = "RT"
    //loopSound()
    //cursor.components.cursor.onMouseDown();
    //cursor.components.cursor.onMouseUp();
    console.log("RT")
  });

  var gamepadB = $('#camera').on('gamepadbuttondown:1', function () {
    var intersectedEl = cursor.components.cursor.intersectedEl
    var buttonColor = cursor.components.cursor.intersectedEl.components['cursor-listener'].data.buttonColor
    cursor.emit('gamepadB', { cursorTarget: intersectedEl,
                              buttonColor: 'blue'
                              }, true)
      //stopSound()
      console.log("B")
  });
}

function setEventListeners () {
  var scene = document.querySelector('a-scene')
  scene.addEventListener('proxycontrols.paircode', function (e) {
    console.log(e.detail.pairCode);
  });

  //var camera = $('#camera')
  //$(camera).on('gamepadbuttondown', function(){
    //playSound()
    //console.log("BANANA")
  //})
  
  scene.addEventListener('gamepadB', function(e){
    console.log(e, e.detail)
    var cursorTarget = e.detail.cursorTarget
    var targetData = e.detail.cursorTarget.components['cursor-listener'].data
    var buttonColor = e.detail.buttonColor
    cursorTarget.setAttribute('material', 'color', buttonColor);
  })

  // Component to change to random color on click.
  AFRAME.registerComponent('cursor-listener', {
    schema: {
      buttonColor: {type: 'string'}
    },
    update: function () {
      var data = this.data;  // Component property values.
      var el = this.el;  // Reference to the component's entity.
      el.addEventListener('gamepadB', function (event) {
        console.log(event)
        //var cursorData  = cursor.dataset.button
        //if (cursorData === "A") {
          //buttonColor = "blue"
        //} else if (cursorData === "B") {
          //buttonColor = "green"
        //} else if (cursorData === "RT") {
          //buttonColor = "red"
        //}
        this.setAttribute('material', 'color', this.buttonColor);
      });
    }
  });

  //AFRAME.registerComponent('cursor-listener', {
    //init: function () {
      //$(this.el).on('click', function (evt) {
        //var cursorData  = evt.originalEvent.detail.cursorEl.dataset.button
        //if (cursorData === "A") {
          //playSound()
        //}
        //if (cursorData === "B") {
          //stopSound()
        //}
        //if (cursorData === "RT") {
          //loopSound()
        //}
      //});
    //}
  //});
  
  gampadListeners();

  console.log("event listeners set!")
}

$(document).ready(function() {
  loadSound();
  setEventListeners();
});
