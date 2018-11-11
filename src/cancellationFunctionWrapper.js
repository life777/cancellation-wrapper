import { CancellationError } from "./cancellationError";
import { CancellationToken } from "./cancellationToken";

const isPromiseLike = p => p 
                        && typeof p.then === "function"
                        && typeof p.catch === "function";

const wrapFn = (fn, ctx = null) => (...rest) => {
    let last = rest[rest.length - 1];
    if (last instanceof CancellationToken) {
        let token = rest.pop();
        let result = fn.apply(ctx, rest);

        if (isPromiseLike(result)) {
            return result.then(r => {
                if (token.cancellationRequested) {
                    throw new CancellationError();
                }

                return r;
            });
        }

        return result;
    }

    return fn.apply(ctx, rest);
};

export { wrapFn };