"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = exports.wrapFn = undefined;

var _cancellationFunctionWrapper = require("./cancellationFunctionWrapper");

var _cancellationMethodsWrapper = require("./cancellationMethodsWrapper");

exports.wrapFn = _cancellationFunctionWrapper.wrapFn;
exports.wrap = _cancellationMethodsWrapper.wrap;