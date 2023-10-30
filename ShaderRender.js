import { isObject } from "../math/is.js";

export class ShaderRender {
  constructor(canvas, options, shaderFunction) {
    this.canvas = canvas;
    this.options = options;
    if (typeof shaderFunction === "function") {
      this.computeShader = shaderFunction;
    }
    this.shaders = {};

    this.defaults = {
      fps: 30,
      fpsmin: 0,
      fpsmax: 100,
      speed: 1000,
      speedmin: 1,
      speedmax: 4000,
      pixelsize: 4,
      pixelsizemin: 1,
      pixelsizemax: 5,
      canvasWidth: 800,
      canvasHeight: 800,
      alpha: false,
    };
    this.globals = {
      iTime: 0,
    };

    this.fps = options.fps || this.defaults.fps;
    this.speed = options.speed || this.defaults.speed;
    this.pixelsize = options.pixelsize || this.defaults.pixelsize;
    this.canvasWidth = options.canvasWidth || this.defaults.canvasWidth;
    this.canvasHeight = options.canvasHeight || this.defaults.canvasHeight;
    this.options.alpha = options.alpha || this.defaults.alpha;

    this.timeList = [];
    this.debug = false;
  }

  loop() {
    setTimeout(
      function () {
        if (this.animate == true) {
          requestAnimationFrame(this.loop.bind(this));
        }
        this.render();
      }.bind(this),
      1000 / this.fps
    );
  }

  render() {
    var date1 = new Date().getTime();
    this.globals.iTime = document.timeline.currentTime / this.speed;
    this.globals.canvasWidth = this.canvasWidth;
    this.globals.canvasHeight = this.canvasHeight;
    var pxsize = this.pixelsize;
    /*
    if (typeof this.computeShader !== "function")
      this.computeShader = function () {
        return { r: 0, g: 0, b: 0, a: 255 };
      };
    */
    if (this.shaderObj) {
      var drawMode = this.shaderObj.drawMode || "data";
    } else var drawMode = "data";
    var x, y, color, j, i;
    for (i = 0; i < this.canvasHeight; i += pxsize) {
      for (j = 0; j < this.canvasWidth; j += pxsize) {
        color = this.computeShader(j, i, this.globals);
        if (drawMode == "data") {
          this.DataDraw(j, i, color, pxsize);
        } else if (drawMode == "rect") {
          this.RectDraw(this.ctx2, j, i, color, pxsize);
        }
      }
    }
    //this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (drawMode == "data") {
      this.ctx2.putImageData(this.imageData, 0, 0);
    }
    this.ctx.drawImage(this.canvas2, 0, 0);
    this.timeList.push(new Date().getTime() - date1);
  }

  DataDraw(x, y, px, pxsize) {
    var data = this.imageData.data;
    var subX, subY, idx;
    if (pxsize == 1) {
      idx = (y * this.canvasWidth + x) * 4;
      data[idx] = px.r;
      data[++idx] = px.g;
      data[++idx] = px.b;
      data[++idx] = 255;
    } else {
      for (subY = 0; subY < pxsize; subY++) {
        for (subX = 0; subX < pxsize; subX++) {
          idx = ((y + subY) * this.canvasWidth + subX + x) * 4;
          data[idx] = px.r;
          data[++idx] = px.g;
          data[++idx] = px.b;
          data[++idx] = 255;
        }
      }
    }
  }

  RectDraw(ctxtemp, x, y, px, pxsize) {
    ctxtemp.fillStyle =
      "rgba(" + px.r + "," + px.g + "," + px.b + "," + px.a / 255 + ")";
    y = this.canvasHeight - y - pxsize;
    ctxtemp.fillRect(x, y, pxsize, pxsize);
  }

  init(mode) {
    if (mode == "canvas" || mode == "all") {
      this.initCanvas();
    }
    if (mode == "settings" || mode == "all") {
      this.fps = this.fps || this.defaults.fps;
      this.speed = this.speed || this.defaults.speed;
      this.animate = false;
      this.globals.iTime = document.timeline.currentTime || 0;
    }
    this.timeList = [];
    this.computeShader =
      this.computeShader ||
      function dafaultShader(x, y, globals) {
        var uv = [x / globals.canvasWidth, y / globals.canvasHeight];
        var col = [
          0.5 + 0.5 * Math.cos(globals.iTime + uv[0]),
          0.5 + 0.5 * Math.cos(globals.iTime + uv[0] + 2),
          0.5 + 0.5 * Math.cos(globals.iTime + uv[1] + 4),
        ];
        return {
          r: mapColor(col[0]),
          g: mapColor(col[1]),
          b: mapColor(col[2]),
          a: 255,
        };
      };
  }

  initCanvas() {
    this.pixelsize = this.pixelsize || this.defaults.pixelsize;
    var opt = { alpha: this.options.alpha };
    this.ctx = this.canvas.getContext("2d", opt);
    this.canvas2 = document.createElement("canvas");
    this.ctx2 = this.canvas2.getContext("2d", opt);
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.canvas.hidden = false;
    this.canvas2.width = this.canvasWidth;
    this.canvas2.height = this.canvasHeight;
    this.canvas2.hidden = true;

    this.imageData = this.ctx.createImageData(
      this.canvasWidth,
      this.canvasHeight
    );
  }

  reset(mode = "all") {
    this.animate = false;
    this.globals.iTime = 0;
    this.computeShader = undefined;
    if (mode == "canvas" || mode == "all") {
      this.ctx = undefined;
      if (this.canvas2 != undefined) this.canvas2.remove();
      this.ctx2 = undefined;
    }
    if (mode == "settings" || mode == "all") {
      this.fps = this.defaults.fps;
      this.speed = this.defaults.speed;
      this.pixelsize = this.defaults.pixelsize;
      this.canvasWidth = this.defaults.canvasWidth;
      this.canvasHeight = this.defaults.canvasHeight;
    }
  }

  setCustomShader(shader, drawMode) {
    if (typeof shader !== "function") return;
    this.shaderObj = {
      drawMode: drawMode,
    };
    this.computeShader = shader;
  }

  setShader(name) {
    if (typeof name !== "string") return;
    if (this.shaders.hasOwnProperty(name)) {
      this.shaderObj = this.shaders[name];
      this.computeShader = this.shaderObj.computeFunction;
    } else if (name == "none") {
      this.shaderObj = {};
      this.computeShader = undefined;
    } else if (this.debug) {
      console.warn("RenderFunction with Name '" + name + "' doesn't exists!");
    }
  }

  getShader(name) {
    if (typeof name != "string") return;
    if (this.shaders.hasOwnProperty(name)) {
      return this.shaders[name];
    } else if (this.debug)
      console.warn("Shader with Name '" + name + "' doesn't exists!");
  }

  addShader(name, obj, override = false) {
    if (typeof name !== "string") return;
    if (!this.validShader(obj)) {
      console.error("Invalid Shader Object!");
    }
    if (!this.shaders.hasOwnProperty(name)) {
      this.shaders[name] = obj;
    } else if (override) {
      this.shaders[name] = obj;
    } else if (this.debug) {
      console.warn("Shader with Name '" + name + "' already exists!");
    }
  }

  importShader(path, name, add = true) {
    if (typeof path !== "string" || typeof name !== "string") return;
    import(path)
      .then((module) => {
        module = module[name];
        if (add && this.validShader(module)) {
          this.addShader(module.name, module, true);
        } else {
          return module;
        }
      })
      .catch((err) => {
        console.error(
          "Could not import Shader with Name '" +
            name +
            "' at Path '" +
            path +
            "' because -",
          err
        );
      });
  }

  configureShader(name, data) {
    if (typeof name !== "string" || !isObject(data)) return;
    if (this.shaders.hasOwnProperty(name)) {
      return Object.assign(this.shaders[name], data);
    } else if (this.debug)
      console.warn("Shader Object with Name '" + name + "'couldn't be found");
  }
  validShader(obj) {
    if (
      !isObject(obj) ||
      !obj.comeputeFunction ||
      !obj.name ||
      typeof obj.comeputeFunction !== "function" ||
      typeof obj.name !== "string"
    )
      return true;
    return false;
  }

  setDebugMode(bool) {
    if (typeof bool !== "boolean") return;
    this.debug = bool;
  }

  setConfigValue(name, value, shaderName) {
    if (typeof name != "string") return;
    if (this.shaders[shaderName] !== undefined) {
      this.shaders[shaderName][name] = value;
    } else {
      if (this.defaults.hasOwnProperty(name + "min")) {
        this[name] =
          value <= this.defaults[name + "max"] &&
          value >= this.defaults[name + "min"]
            ? value
            : this[name];
      } else {
        this[name] = value;
        if (this.debug)
          console.warn(
            "Config Value with Name '" + name + "' couldn't be checked!"
          );
      }
    }
    console.log(this[name]);
  }

  getConfigValue(name, shaderName) {
    if (typeof name != "string") return;
    if (this.shaders[shaderName] !== undefined) {
      return (this.shaders[shaderName][name] = value);
    } else {
      if (this.hasOwnProperty(name)) {
        return this[name];
      } else if (this.debug)
        console.warn("Config Value with Name '" + name + "' doesn't exists!");
    }
  }

  refresh() {
    this.loop();
  }

  setVisibility(visible) {
    if (typeof visible !== "boolean") return;
    this.canvas.hidden = !visible;
  }

  setFps(amount) {
    this.setConfigValue("fps", parseInt(amount, 10));
  }

  setSpeed(amount) {
    this.setConfigValue("speed", parseInt(amount, 10));
  }

  setPixelsize(amount) {
    this.setConfigValue("pixelsize", parseInt(amount, 10));
    this.init("canvas");
  }

  setCanvas(canvasIn, IsName = false) {
    var canvastemp = canvasIn;
    if (IsName == true && typeof canvastemp === "string") {
      canvastemp = document.getElementById(canvastemp);
    }
    if (canvastemp != undefined && canvastemp != null) {
      this.canvas = canvastemp;
      this.init("canvas");
    } else if (this.debug) {
      console.warn(
        "Canvas element with Name '" + canvasIn + "' doesn't exists"
      );
    }
  }

  setAnimate(bool = !this.animate) {
    if (typeof bool !== "boolean") return;
    this.animate = bool;
  }
}
