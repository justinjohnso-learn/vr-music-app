var soundID = "castle";
function loadSound () {
  createjs.Sound.registerSound("castle.mp3", soundID);
}

function playSound () {
  createjs.Sound.play(soundID);
}

function setEventListeners () {
  const scene = document.querySelector('a-scene')
  scene.addEventListener('proxycontrols.paircode', function (e) {
    console.log(e.detail.pairCode);
  });
  const camera = $('#camera')
  $(camera).on('gamepadbuttondown', function(){
    playSound()
    console.log("BANANA")
  })
  //camera.addEventListener('gamepadbuttondown', function (e) {
    //console.log('Button "%d" has been pressed.', e.index);
  //});
  console.log("event listeners set!")
}

$(document).ready(function() {
  loadSound();
  setEventListeners();
});
