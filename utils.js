function sum(...arrays) {
  const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
  const result = Array.from({ length: n });
  return result.map((_, i) =>
    arrays.map((xs) => xs[i] || 0).reduce((sum, x) => sum + x, 0)
  );
}

function average(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  const avg = parseInt((sum / arr.length || 0).toFixed(3));
  return avg;
}

function convertIndex(idx, size) {
  let x = idx % size;
  if (x == 0) x = size;
  let y = Math.floor((idx - x) / size);
  return [x - 1, y];
}

function hue2rgb(hue) {
  hue = fract(hue); //only use fractional part of hue, making it loop
  var r = abs(hue * 6.0 - 3.0) - 1.0; //red
  var g = 2.0 - abs(hue * 6.0 - 2.0); //green
  var b = 2.0 - abs(hue * 6.0 - 4.0); //blue
  return [clamp(r, 0.0, 1.0), clamp(g, 0.0, 1.0), clamp(b, 0.0, 1.0), 1.0]; //combine components
}
function hsv2rgb(hsv) {
  var rgb = hue2rgb(hsv[0]); //apply hue
  rgb = [
    lerp(1.0, rgb[0], 1.0 - hsv[1]) * hsv[2],
    lerp(1.0, rgb[1], 1.0 - hsv[1]) * hsv[2],
    lerp(1.0, rgb[2], 1.0 - hsv[1]) * hsv[2],
    lerp(1.0, rgb[3], 1.0 - hsv[1]) * hsv[2],
  ]; //apply saturation
  return rgb;
}

function mapColor(val) {
  return clamp(Math.round(Math.abs(val) * 255), 0, 255);
}
