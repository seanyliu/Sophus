/**
 * Awesome tutorial: http://www.canvasdemos.com/2009/07/09/ ..
 *   game-development-tutorials/
 * Author: seanyliu
 */

var global = {
  FPS : 30,
  x : 0,
  y : 0,
  xDirection : 1,
  yDirection : 1,
  image : new Image(),
  canvas : null,
  canvas2D : null
};
global.SECONDSBETWEENFRAMES = 1 / global.FPS;
global.image.src = "images/sprite_sophus_reg.png";


window.onload = init;

function init() {
    "use strict";
  global.canvas = document.getElementById("canvas");
  global.context2D = global.canvas.getContext("2d");
  setInterval(draw, 1000 / global.FPS);
}

function draw() {
  "use strict";
  global.context2D.clearRect(0, 0, global.canvas.width, global.canvas.height);
  global.context2D.drawImage(global.image, global.x, global.y);

  global.x += 1 * global.xDirection;
  global.y += 1 * global.yDirection;

  if (global.x >= 450) {
    global.x = 450;
    global.xDirection = -1;
  } else if (global.x <= 0) {
    global.x = 0;
    global.xDirection = 1;
  }

  if (global.y >= 200) {
    global.y = 200;
    global.yDirection = -1;
  } else if (global.y <= 0) {
    global.y = 0;
    global.yDirection = 1;
  }
}
