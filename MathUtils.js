function palette(t, a, b, c, d) {
  const val = 6.28318;
  return [
    a[0] + b[1] * Math.cos(val * (c[0] * t + d[0])),
    a[1] + b[2] * Math.cos(val * (c[1] * t + d[1])),
    a[2] + b[2] * Math.cos(val * (c[2] * t + d[2])),
  ];
}

function length(x, y) {
  return Math.sqrt(x * x + y * y);
}

function distance(x1, y1, x2, y2) {
  var d1 = x1 - x2;
  var d2 = y1 - y2;
  return length(d1, d2);
}

function smoothstep(min, max, x) {
  if (x <= min) return 0;
  if (x >= max) return 1;
  x = (x - min) / (max - min);

  return x * x * (3 - 2 * x);
}

function clamp(value, minVal, maxVal) {
  return Math.min(Math.max(value, minVal), maxVal);
}

function fract(value) {
  return value - Math.floor(value);
}

function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function dot2(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function cross(x, y) {
  return [
    x[1] * y[2] - y[1] * x[2],
    x[2] * y[0] - y[2] * x[0],
    x[0] * y[1] - y[0] * x[1],
  ];
}

function mix(x, y, a) {
  return x * (1 - a) + y * a;
}

function step(edge, input) {
  return (input >= edge) + 0;
}

function sign(value) {
  var a = value > 0;
  return a - (value < 0);
}

function mod(x, y) {
  return x - y * Math.floor(x / y);
}

function inversesqrt(x) {
  return 1 / Math.sqrt(x);
}

function normalize2(v) {
  return rsqrt(dot2(v, v)) * v;
}

function rsqrt(a) {
  return pow(a, -0.5);
}

function lerp(x, y, t) {
  return (1 - t) * x + t * y;
}
function mapLinear(x, a1, a2, b1, b2) {
  return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
}
