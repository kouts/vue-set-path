function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function isObject(obj) {
  return _typeof(obj) === 'object' && !Array.isArray(obj) && obj !== null;
}
function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}
function isArray(arr) {
  return Array.isArray(arr);
}
var UNSAFE_KEYS = Object.freeze(function () {
  var keys = Object.create(null);
  ['__proto__', 'constructor', 'prototype'].forEach(function (unsafeKey) {
    keys[unsafeKey] = true;
  });
  return keys;
}());
function isUnsafeKey(key) {
  return Object.prototype.hasOwnProperty.call(UNSAFE_KEYS, String(key));
}
function assertSafePath(path) {
  var parts = isArray(path) ? path : splitPath(path);
  if (parts.some(isUnsafeKey)) {
    throw Error('Path contains unsafe keys.');
  }
  return parts;
}
function splitPath(str) {
  var regex = /([\w\s-]+)|\[([^\]]+)\]/g;
  var result = [];
  var path;
  while (path = regex.exec(str || '')) {
    if (str[path.index] === '[') {
      result.push(path[2]);
    } else {
      result.push(path[1]);
    }
  }
  return result;
}
function getByPath(obj, path) {
  var parts = isArray(path) ? path : splitPath(path);
  var length = parts.length;
  for (var i = 0; i < length; i++) {
    if (typeof obj[parts[i]] === 'undefined') {
      return undefined;
    }
    obj = obj[parts[i]];
  }
  return obj;
}

export { UNSAFE_KEYS as U, _typeof as _, isNumeric as a, isArray as b, isUnsafeKey as c, assertSafePath as d, getByPath as g, isObject as i, splitPath as s };
