function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
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
function splitPath(str) {
  var regex = /(\w+)|\[([^\]]+)\]/g;
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

export { _typeof as _, isNumeric as a, isArray as b, getByPath as g, isObject as i, splitPath as s };
