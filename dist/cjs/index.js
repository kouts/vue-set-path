'use strict';

var utils = require('./utils-DAOzTXpc.js');
var vueSetPath = require('./vueSetPath.js');
require('vue');



exports.UNSAFE_KEYS = utils.UNSAFE_KEYS;
exports.assertSafePath = utils.assertSafePath;
exports.getByPath = utils.getByPath;
exports.isArray = utils.isArray;
exports.isNumeric = utils.isNumeric;
exports.isObject = utils.isObject;
exports.isUnsafeKey = utils.isUnsafeKey;
exports.splitPath = utils.splitPath;
exports.deleteMany = vueSetPath.deleteMany;
exports.deleteOne = vueSetPath.deleteOne;
exports.setMany = vueSetPath.setMany;
exports.setOne = vueSetPath.setOne;
