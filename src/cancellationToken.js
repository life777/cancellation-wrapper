// It isn't a complete version of token.
// It will be changed when TC39 decides about cancellation primitive: https://github.com/tc39/proposal-cancellation

export class CancellationToken {
    constructor () {
        this.cancelled = false;
    }

    set cancellationRequested (_) {
        throw new Error("cancellationRequested can't be changed");
    }

    get cancellationRequested () {
        return this.cancelled
    }

    cancel () {
        this.cancelled = true;
    }
}