export function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

export function isString(value) {
  return Object.prototype.toString.call(obj) === "[object String]";
}

export function isObject(obj) {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
}

export function isArray(arr) {
  return (
    Array.isArray(arr) ||
    function (value) {
      return toString.call(value) === "[object Array]";
    }
  );
}

export function isNan(value) {
  return Number.isNaN(value);
}

export function isVector(v, len) {
  if (len == undefined) len = v.length;
  return isArray(v) && !v.some(Number.isNaN) && v.length == len;
}
