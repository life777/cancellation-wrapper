// It isn't a complete version of token.
// It will be changed when TC39 decides about cancellation primitive: https://github.com/tc39/proposal-cancellation

export class CancellationTokenSource {
    constructor (token) {
        Object.defineProperty(this, "cancellationRequested", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: false,
            get: () => token.cancelled
        });
    }
}

export class CancellationToken {
    constructor () {
        this.cancelled = false;
        this.token = new CancellationTokenSource(this);
    }

    cancel () {
        this.cancelled = true;
    }
}