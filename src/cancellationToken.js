// It isn't a complete version of token.
// It will be changed when TC39 decides about cancellation primitive: https://github.com/tc39/proposal-cancellation

export class CancellationToken {
    constructor (source) {
        Object.defineProperty(this, "cancellationRequested", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: false,
            get: () => source.cancelled
        });
    }
}

export class CancellationTokenSource {
    constructor () {
        this.cancelled = false;
        this.token = new CancellationToken(this);
    }

    cancel () {
        this.cancelled = true;
    }
}