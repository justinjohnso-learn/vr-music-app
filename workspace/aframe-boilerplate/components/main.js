$(document).ready(function() {

  console.log( "ready!"  );

  const scene = document.querySelector('a-scene')
  scene.addEventListener('proxycontrols.paircode', function (e) {
    console.log(e.detail.pairCode);
  });

  const camera = $('#camera')
  //camera.addEventListener('gamepadbuttondown', function (e) {
    //console.log('Button "%d" has been pressed.', e.index);
  //});
  
  $(camera).on('gamepadbuttondown', function(e){
    console.log(e.index)
    console.log("I hate cucumbers")
  })

});



