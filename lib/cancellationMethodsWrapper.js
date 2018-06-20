"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrap = undefined;

var _cancellationFunctionWrapper = require("./cancellationFunctionWrapper");

/* wraps only methods of the object and won't wrap methods from prototype chain */
var wrap = function wrap(api) {
    return Object.keys(api).reduce(function (akk, method) {
        if (typeof akk[method] === "function") {
            akk[method] = (0, _cancellationFunctionWrapper.wrapFn)(akk[method]);
        }

        return akk;
    }, api);
};

exports.wrap = wrap;