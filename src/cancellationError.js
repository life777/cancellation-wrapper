export class CancellationError extends Error {
    constructor () {
        super("Cancelled");
        this.isCancelled = true;
    }
}