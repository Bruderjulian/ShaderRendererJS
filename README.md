
# ShaderRenderer

A Render for Shaders written in JS

## Contents

- [Description](#description)
- [Setup](#setup)
- [Usage](#usage)
  - [Libary](#usage-libary)
  - [Shaders](#usage-shader)
- [Examples](#examples)
- [Contributing](#Contributing)
- [License](#License)


## Description

It renders an given Shader on a canvas by calculating the color (with the given Shader Function) for every Pixel. 

### Please Note 
It is in Alpha Phase and many Bugs and missing Features are currently included!! 
## Setup

The Renderer can be included with a specified path through a Html script tag:

```html
<script src="./ShaderRenderer.js"></script>
```

or just import it: 

```javascript
import { ShaderRenderer } from "./ShaderRenderer.js";
```
equivalent to: 

```javascript
import * from "./ShaderRenderer.js";
```

### Math Utilities
it is recommened to include also the Math Utilities because it provides useful math functions for writing shaders (see [Shaders](#usage-shader)). You can also make your own.

```html
<script src="./MathUtils.js"></script>
```

#### TODO:

### Lite Version
The Lite Version is a smaller Version of the full one. All Debugging and Logging functionalities are removed and some avaliable Options are also removed (See below)!

Missing:
- Debugging and Logging
- Drawing with Rectengles (performence)
- Config Value checking
- Time recording

### Compact Version
The Compact Version has only needed functionalities.







## Usage - Renderer

After ShaderRenderer Class is imported, you need to create a Instance of `ShaderRenderer` Class with a reference to the canvas Element and given options.

### Options
- fps: 1 to 60 Frames per second (as target! Default: 30)
- pixelsize: size of a sibgle pixel (Default: 4)
- canvasWidth: Width of canvas (Default: 800)
- canvasHeight: Height of canvas (Default: 800)
- speed: Control Value for Time parameter ([See Shader Parameter](#Shader_Parameter)) 

### Functions

#### render
renders a single Frame on canvas

#### init 
initializes the Renderer. By specifing a mode only certain things are initialized.
Modes:
- all (By Default)
- canvas (has extra `initCanvas` Function for that)
- settings

#### init 
resets the Renderer. By specifing a mode only certain things are reseted.
Modes:
- all (By Default)
- canvas
- settings

#### setShader
sets the current Shader to an added Shader by given name.

#### setCustomShader
sets the current Shader to an Custom Shader by inputting a Function and Options (currently only `drawMode` avaliable).

#### getShader
gets an imported Shader with given name

#### addShader
adds a Shader to the Renderer if it is a valid Shader by calling the `validShader` Function. Requires Name and a `ShaderObject`. Optional Override Value if a Shader with specified Name already exists(Default: false).

#### importShader
imports a ShaderObject from a path with a Name and automatically calls addShader if the `Add` property is set to `true` (Default: true).

#### setConfigValue
sets or modifies an instance property or a ShaderObject property if ShaderName is specified. Checks if Value is in a valid Range before setting it if `min-max` Range is defined.

#### getConfigValue
gets the Value of an instance property or a ShaderObject property if ShaderName is specified.

#### refresh
starts the rendering

#### setVisibility
shows or hiddes the canvas

#### setFps
sets Fps property to given Value

#### setSpeed
sets Speed property to given Value

#### setPixelsize
sets Pixelsize property to given Value

#### setCanvas
sets Canvas Reference. If `isName` Parameter set to `true`, it'll get the Element from DOM by given Name.

#### setAnimate
Enables or disables continous rendering!

#### setDebugMode
sets the Debug mode

## Usage - Shader

### Shader Parameter
- iTime: Time constant (Calculated with speed variable by `miliseconds ^ 2 / speed`)
#### ToDo
- CanvasWidth & CanvasHeight
- UserInput
- Date
##  Example

```javascript
// import of the Renderer and reference to the canvas  
import { ShaderRenderer } from "./ShaderRenderer.js";
const canvas = document.getElementById("canvas");

// Create a Instance of ShaderRenderer class 
var renderer = new ShaderRenderer(canvas, {
  fps: 30,
  speed: 800,
  pixelsize: 4,
  canvasWidth: 800,
  canvasHeight: 800,
  alpha: false,
});
// init Renderer 
renderer.init("all");

// import Shader
renderer.importShader("./shaderExample.js", "shaderExample", true);

// start
renderer.refresh();
```
## Contributing

Pull requests are VERY welcome. For major changes, please make an issue first
to discuss it.

## License

[MIT](https://choosealicense.com/licenses/mit/)
## Documentation

[Documentation](https://linktodocumentation)

