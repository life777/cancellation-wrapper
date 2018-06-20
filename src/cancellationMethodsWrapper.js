import { wrapFn } from "./cancellationFunctionWrapper";

/* wraps only methods of the object and won't wrap methods from prototype chain */
const wrap = api => {
    return Object.keys(api).reduce((akk, method) => {
        if (typeof akk[method] === "function") {
            akk[method] = wrapFn(akk[method]);
        }

        return akk;
    }, api);
};

export { wrap };