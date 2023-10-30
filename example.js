import { ShaderRender } from "./ShaderRender.js";
const canvas = document.getElementById("canvas");
var renderer = new ShaderRender(canvas, {
  fps: 30,
  speed: 800,
  pixelsize: 4,
  canvasWidth: 800,
  canvasHeight: 450,
  alpha: false,
});

renderer.init("all");
renderer.importShader("../shader/shader1.js", "ShaderArt", true);
renderer.importShader("../shader/shader2.js", "PrettyHip", true);
renderer.importShader("../shader/shader3.js", "Beam", true);
renderer.importShader("../shader/shader4.js", "Wave", true);
renderer.importShader("../shader/shader5.js", "Voronoise", true);
renderer.importShader("../shader/shader6.js", "Workshop", true);
renderer.importShader("../shader/shader7.js", "Rainbow_Showoff", true);
renderer.importShader("../shader/shader8.js", "Quicky", true);



document
  .getElementById("shaderSelector")
  .addEventListener("change", function (evt) {
    renderer.setShader(evt.target.value);
    renderer.timeList = [];
  });

document
  .getElementById("draw")
  .addEventListener("click", renderer.render.bind(renderer));
document.getElementById("pixelSize").addEventListener("change", function (evt) {
  renderer.setPixelsize(evt.target.value);
  renderer.timeList = [];
});
document
  .getElementById("speedSelector")
  .addEventListener("change", function (evt) {
    renderer.setSpeed(parseInt(evt.target.value));
  });
document
  .getElementById("fpsSelector")
  .addEventListener("change", function (evt) {
    renderer.setFps(parseInt(evt.target.value));
  });

document.getElementById("animate").addEventListener("click", function (evt) {
  if (renderer.animate) {
    renderer.setAnimate(false);
    evt.target.innerHTML = "Run";
  } else {
    renderer.setAnimate(true);
    evt.target.innerHTML = "Stop";
    renderer.refresh();
  }
});

setInterval(function () {
  document.getElementById("time").innerHTML =
    "Average Render Time: " +
    average(renderer.timeList) + " ms";
}, 800);

