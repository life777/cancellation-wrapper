import { wrapFn } from "./cancellationFunctionWrapper.js";

/* wraps only methods of the object and won't wrap methods from prototype chain */
export const wrap = api => {
    return Object.keys(api).reduce((akk, method) => {
        if (typeof akk[method] === "function") {
            akk[method] = wrapFn(akk[method], akk);
        }

        return akk;
    }, api);
};