"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrapFn = undefined;

var _cancellationError = require("./cancellationError");

var _cancellationToken = require("./cancellationToken");

var isPromiseLike = function isPromiseLike(p) {
    return p && typeof p.then === "function" && typeof p.catch === "function";
};

var wrapFn = function wrapFn(fn) {
    return function () {
        for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
        }

        var last = rest[rest.length - 1];
        if (last instanceof _cancellationToken.CancellationToken) {
            var token = rest.pop();
            var result = fn.apply(null, rest);

            if (isPromiseLike(result)) {
                return result.then(function (r) {
                    if (token.cancellationRequested) {
                        throw new _cancellationError.CancellationError();
                    }

                    return r;
                });
            }

            return result;
        }

        return fn.apply(null, rest);
    };
};

exports.wrapFn = wrapFn;