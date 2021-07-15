import { s as splitPath, _ as _typeof, b as isArray, a as isNumeric, i as isObject, g as getByPath } from './utils-3a98f9e7.js';
import Vue from 'vue';

var setOne = function setOne(obj, pathStr, value) {
  var path = splitPath(pathStr);
  var length = path.length;
  var lastIndex = length - 1;

  for (var index = 0; index < length; index++) {
    var prop = path[index]; // If we are not on the last index
    // we start building the data object from the path

    if (index !== lastIndex) {
      var objValue = obj[prop]; // If objValue exists, is not primitive and is not observable, then make it so using Vue.set

      if (objValue && _typeof(objValue) === 'object') {
        // eslint-disable-next-line no-prototype-builtins
        if (!objValue.hasOwnProperty('__ob__')) {
          Vue.set(obj, prop, objValue);
        } // Array to object transformation
        // Check if parent path is an array, we are not on the last item
        // and the next key in the path is not a number


        if (isArray(objValue) && !isNumeric(path[index + 1])) {
          Vue.set(obj, prop, {});
        }
      } else {
        // Create an empty object or an empty array based on the next path entry
        if (isNumeric(path[index + 1])) {
          Vue.set(obj, prop, []);
        } else {
          Vue.set(obj, prop, {});
        }
      }
    } else {
      // If we are on the last index then we just assign the the value to the data object
      // Note: If we used obj[prop] = value; arrays wouldn't be updated.
      Vue.set(obj, prop, value);
    }

    obj = obj[prop];
  }
};
var setMany = function setMany(obj, path, value) {
  if (typeof path === 'string') {
    setOne(obj, path, value);
  } else if (isObject(path)) {
    for (var key in path) {
      setOne(obj, key, path[key]);
    }
  } else {
    throw Error('Arguments must be either string or object.');
  }
};
var deleteOne = function deleteOne(obj, pathStr) {
  var path = splitPath(pathStr);
  var prop = path.pop();
  Vue["delete"](getByPath(obj, path), prop);
};
var deleteMany = function deleteMany(obj, path) {
  if (typeof path === 'string') {
    deleteOne(obj, path);
  } else if (isArray(path)) {
    path.forEach(function (item) {
      deleteOne(obj, item);
    });
  } else {
    throw Error('Arguments must be either string or array.');
  }
};

export { deleteMany, deleteOne, setMany, setOne };
