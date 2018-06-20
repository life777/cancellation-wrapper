"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// It isn't a complete version of token.
// It will be changed when TC39 decides about cancellation primitive: https://github.com/tc39/proposal-cancellation

var CancellationToken = exports.CancellationToken = function CancellationToken(source) {
    _classCallCheck(this, CancellationToken);

    Object.defineProperty(this, "cancellationRequested", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: false,
        get: function get() {
            return source.cancelled;
        }
    });
};

var CancellationTokenSource = exports.CancellationTokenSource = function () {
    function CancellationTokenSource() {
        _classCallCheck(this, CancellationTokenSource);

        this.cancelled = false;
        this.token = new CancellationToken(this);
    }

    _createClass(CancellationTokenSource, [{
        key: "cancel",
        value: function cancel() {
            this.cancelled = true;
        }
    }]);

    return CancellationTokenSource;
}();