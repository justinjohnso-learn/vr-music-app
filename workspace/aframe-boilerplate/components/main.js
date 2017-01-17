let soundID = "castle";

function loadSound () {
  createjs.Sound.registerSound("castle.mp3", soundID);
  console.log("sound loaded!")
}

function playSound () {
  createjs.Sound.play(soundID);
}

//function stopSound () {
  //createjs.Sound.stop(soundID);
//}

//function loopSound() {
  //createjs.Sound.play(soundID, {loop: -1});
//}

//function gampadListeners () {
  //const gamepadX = $('#camera').on('gamepadbuttondown:0', function () {
    //cursor.dataset.button = "A"
    //cursor.components.cursor.onMouseDown();
    //cursor.components.cursor.onMouseUp();
    ////console.log("A")
  //});

  //const gamepadRT = $('#camera').on('gamepadbuttondown:7', function () {
    //cursor.dataset.button = "RT"
    //cursor.components.cursor.onMouseDown();
    //cursor.components.cursor.onMouseUp();
    ////console.log("RT")
  //});

  //const gamepadB = $('#camera').on('gamepadbuttondown:1', function () {
    //cursor.dataset.button = "B"
    //cursor.components.cursor.onMouseDown();
    //cursor.components.cursor.onMouseUp();
    ////console.log("B")
  //});
//}

function setEventListeners () {
  const scene = document.querySelector('a-scene')
  scene.addEventListener('proxycontrols.paircode', function (e) {
    console.log(e.detail.pairCode);
  });

  const camera = $('#camera')
  $(camera).on('gamepadbuttondown', function(){
    playSound()
    //console.log("BANANA")
  })

  // Component to change to random color on click.
  //AFRAME.registerComponent('cursor-listener', {
    //init: function () {
      //let buttonColor = "purple"
      //$(this.el).on('click', function (evt) {
        //let cursorData  = evt.originalEvent.detail.cursorEl.dataset.button
        //if (cursorData === "A") {
          //buttonColor = "blue"
        //} else if (cursorData === "B") {
          //buttonColor = "green"
        //} else if (cursorData === "RT") {
          //buttonColor = "red"
        //}
        //this.setAttribute('material', 'color', buttonColor);
      //});
    //}
  //});

  //AFRAME.registerComponent('cursor-listener', {
    //init: function () {
      //$(this.el).on('click', function (evt) {
        //let cursorData  = evt.originalEvent.detail.cursorEl.dataset.button
        //if (cursorData === "A") {
          //playSound("castle")
        //}
        //if (cursorData === "B") {
          //stopSound("castle")
          //console.log("it works?")
        //}
        //if (cursorData === "RT") {
          //loopSound("castle")
        //}
      //});
    //}
  //});
  
  //gampadListeners();

  console.log("event listeners set!")
}

$(document).ready(function() {
  loadSound();
  setEventListeners();
});
