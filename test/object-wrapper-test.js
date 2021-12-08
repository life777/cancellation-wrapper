import assert from 'assert';
import { wrap, CancellationToken } from '../dist/wrapper.js';

describe('Wrap Object', () => {
    const simpleApi = {
        add: (a, b) => a + b,
        multiply: (a, b) => a * b,
        power: function (a, b) {
            let result = 1;
            for (let i = 1; i <= b; ++i) {
                result = this.multiply(result, a);
            }
            return result;
        }
    };
    const wrappedSimpleApi = wrap(simpleApi);
    const asyncApi = {
        add: (a, b) => new Promise(res => { res(a + b); }),
        multiply: (a, b) => new Promise(res => { res(a * b); }),
        power: function (a, b) {
                return new Promise(async (res) => {
                let result = 1;
                for (let i = 1; i <= b; ++i) {
                    result = await this.multiply(result, a);
                }
                res(result);
            })
        }
    };
    const wrappedAsyncApi = wrap(asyncApi);

    describe("Compare wrapped and usual api", () => {
        it('Compare add function', () => {
            assert.equal(simpleApi.add(1, 2), wrappedSimpleApi.add(1, 2));
        });

        it('Compare multiply function', () => {
            assert.equal(simpleApi.multiply(1, 2), wrappedSimpleApi.multiply(1, 2));
        });

        it('Compare power function', () => {
            assert.equal(simpleApi.power(1, 2), wrappedSimpleApi.power(1, 2));
        });
    });

    describe("Compare async wrapped and usual api", () => {
        it('Compare add function', async () => {
            const r1 = await asyncApi.add(1, 2);
            const token = new CancellationToken();
            const r2 = await wrappedAsyncApi.add(1, 2, token);

            assert.equal(r1, r2);
        });

        it('Compare add function', async () => {
            const r1 = await asyncApi.multiply(1, 2);
            const token = new CancellationToken();
            const r2 = await wrappedAsyncApi.multiply(1, 2, token);

            assert.equal(r1, r2);
        });

        it('Compare add function', async () => {
            const r1 = await asyncApi.power(1, 2);
            const token = new CancellationToken();
            const r2 = await wrappedAsyncApi.power(1, 2, token);

            assert.equal(r1, r2);
        });
    });

    describe("Abort async wrapped and usual api", () => {
        it('Abort add function', async () => {
            const token = new CancellationToken();
            const r = wrappedAsyncApi.add(1, 2, token).then(() => false, () => true);
            token.cancel();
            assert.ok(await r);
        });

        it('Abort multiply function', async () => {
            const token = new CancellationToken();
            const r = wrappedAsyncApi.multiply(1, 2, token).then(() => false, () => true);
            token.cancel();
            assert.ok(await r);
        });

        it('Abort power function', async () => {
            const token = new CancellationToken();
            const r = wrappedAsyncApi.power(1, 2, token).then(() => false, () => true);
            token.cancel();
            assert.ok(await r);
        });
    });
});