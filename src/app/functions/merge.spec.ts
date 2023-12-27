import { merge } from "./merge";

describe('merge', () => {
    it('merges primitive values', () => {
        const result = merge({ a: 1 }, { b: 'text' });
        expect(result).toEqual({ a: 1, b: 'text' });
    });

    it('merges objects with different properties', () => {
        const result = merge({ a: 1 }, { b: 2 });
        expect(result).toEqual({ a: 1, b: 2 });
    });

    it('merges nested objects', () => {
        const obj1 = { a: { b: 2 } };
        const obj2 = { a: { c: 3 } };
        const result = merge({}, obj1, obj2);
        expect(result).toEqual({ a: { b: 2, c: 3 } });
    });

    it('concatenates arrays', () => {
        const result = merge({ a: [1, 2] }, { a: [3, 4] });
        expect(result).toEqual({ a: [1, 2, 3, 4] });
    });

    it('handles undefined and null values', () => {
        const result = merge({ a: undefined }, { b: null });
        expect(result).toEqual({ a: undefined, b: null });
    });

    it('merges objects with array properties', () => {
        const result = merge({ a: [1, 2] }, { a: [3], b: [4] });
        expect(result).toEqual({ a: [1, 2, 3], b: [4] });
    });

    it('merges objects with special types like Date', () => {
        const date = new Date();
        const result = merge({ a: date }, { b: /abc/ });
        expect(result).toEqual({ a: date, b: /abc/ });
    });

    it('merges with an empty target object', () => {
        const result = merge({}, { a: 1 });
        expect(result).toEqual({ a: 1 });
    });

    it('merges with an empty source object', () => {
        const result = merge({ a: 1 }, {});
        expect(result).toEqual({ a: 1 });
    });

    it('merges objects with function properties', () => {
        const func = () => 42;
        const result = merge({ a: func }, { b: 2 });
        expect(result).toEqual({ a: func, b: 2 });
    });

    it('handles circular references', () => {
        const obj1: any = { a: 1 };
        obj1.self = obj1;
        const obj2: any = { b: 2 };
        obj2.self = obj2;
        const result = merge({}, obj1, obj2);
        expect(result.self).toBe(result);
    });

    it('does not mutate the original objects', () => {
        const obj1 = { a: { b: 1 } };
        const obj2 = { a: { c: 2 } };
        merge({}, obj1, obj2);
        expect(obj1).toEqual({ a: { b: 1 } });
        expect(obj2).toEqual({ a: { c: 2 } });
    });
});
