# Small wrapper for accepting cancellation tokens
Wraps your api methods and functions and make possible to pass a cancellable tokens.

Examples:

1. If your function returns a `PromiseLike` object and you need to cancel it by passing cancellation token as a last argument, than you can use `wrapFn` function. 

```js
import { wrapFn, CancellationToken } from "wrapper";

const yourFn = (a, b) => new Promise(res => {
    res(a + b);
});

const cancellableYourFn = wrapFn(yourFn);
const token = new CancellationToken();
const result = cancellableYourFn(1, 2, token).then(
    res => res + 1,
    err => 0
).then(
    res => console.log(res) // 0 will be in console
);

// in a few moments you need to abort your action
token.cancel();
```

2. If you don't want to mess up with every function and you have some API obejct with list of methods that returns a `PromiseLike` object and you need to cancel it by passing cancellation token as a last argument, than you can use `wrap` function.

```js
import { wrap, CancellationToken } from "wrapper";

const yourApi = {
    add: (a, b) => new Promise(res => {
        res(a + b);
    }),
    multiply: (a, b) => new Promise(res => {
        res(a * b);
    }),
    power: (a, b) => new Promise(res => {
        res(a ** b);
    })
}

const cancellableYourApi = wrap(yourApi);
const token = new CancellationToken();
const result = cancellableYourApi.multiply(1, 2, token).catch(
    err => 0
).then(
    res => console.log(res) // 0 will be in console
);

// in a few moments you need to abort your action
token.cancel();
```
