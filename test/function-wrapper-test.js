const assert = require('assert');
const { wrapFn, CancellationToken } = require('../dist/wrapper.js');

describe('Wrap function', () => {
    it('Wrap simple function', () => {
        const add = (a, b) => a + b;
        const wrappedAdd = wrapFn(add);

        assert.equal(add(1, 2), wrappedAdd(1, 2));
    });

    it('Wrap simple function that returns promise', async () => {
        const add = (a, b) => new Promise(res => { res(a + b); });
        const wrappedAdd = wrapFn(add);

        const res1 = await add(1, 2);
        const res2 = await wrappedAdd(1, 2);
        assert.equal(res1, res2);
    });

    it('Call simple function that returns promise', async () => {
        const add = (a, b) => new Promise(res => { res(a + b); });
        const wrappedAdd = wrapFn(add);

        const token = new CancellationToken();
        const isPassed = await wrappedAdd(1, 2, token).then(() => true, () => false);

        assert.ok(isPassed);
    });

    it('Cancel simple function that returns promise', async () => {
        const add = (a, b) => new Promise(res => { res(a + b); });
        const wrappedAdd = wrapFn(add);

        const token = new CancellationToken();
        const isAborted = wrappedAdd(1, 2, token).then(() => false, () => true);

        token.cancel();

        assert.ok(await isAborted);
    });
});