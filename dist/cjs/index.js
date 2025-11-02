'use strict';

var utils = require('./utils-Dx3b-ykJ.js');
var vueSetPath = require('./vueSetPath.js');
require('vue');



exports.getByPath = utils.getByPath;
exports.isArray = utils.isArray;
exports.isNumeric = utils.isNumeric;
exports.isObject = utils.isObject;
exports.splitPath = utils.splitPath;
exports.deleteMany = vueSetPath.deleteMany;
exports.deleteOne = vueSetPath.deleteOne;
exports.setMany = vueSetPath.setMany;
exports.setOne = vueSetPath.setOne;
