import { isEqual } from "./is-equal";

describe('isEqual', () => {
    it('compares primitive values', () => {
        expect(isEqual(1, 1)).toBe(true);
        expect(isEqual(1, '1')).toBe(false);
        expect(isEqual('text', 'text')).toBe(true);
    });

    it('compares arrays', () => {
        expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it('compares plain objects', () => {
        expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
        expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
    });

    it('compares nested objects', () => {
        expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true);
        expect(isEqual({ a: { b: 2 } }, { a: { b: { c: 2 } } })).toBe(false);
    });

    it('compares objects with different key orders', () => {
        expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });

    it('compares Date objects', () => {
        const date1 = new Date();
        const date2 = new Date(date1.getTime());
        expect(isEqual(date1, date2)).toBe(true);
        expect(isEqual(new Date(), new Date(2000, 0, 1))).toBe(false);
    });

    it('compares RegExp objects', () => {
        expect(isEqual(/test/i, /test/i)).toBe(true);
        expect(isEqual(/test/i, /test/)).toBe(false);
    });

    it('compares functions', () => {
        const func1 = () => {};
        const func2 = func1;
        expect(isEqual(func1, func2)).toBe(true); // same reference
    
        const func3 = () => {};
        expect(isEqual(func1, func3)).toBe(false); // different instances
    });
    

    it('compares Maps', () => {
        const map1 = new Map([['a', 1], ['b', 2]]);
        const map2 = new Map([['a', 1], ['b', 2]]);
        const map3 = new Map([['b', 2], ['a', 1]]); // same entries, different order
        expect(isEqual(map1, map2)).toBe(true);
        expect(isEqual(map1, map3)).toBe(true);
    
        const map4 = new Map([['a', 1]]);
        expect(isEqual(map1, map4)).toBe(false);
    
        const map5 = new Map([['a', 1], ['b', 3]]);
        expect(isEqual(map1, map5)).toBe(false);
    });

    it('compares Sets', () => {
        const set1 = new Set([1, 2, 3]);
        const set2 = new Set([1, 2, 3]);
        expect(isEqual(set1, set2)).toBe(true);
        expect(isEqual(new Set(), new Set([1]))).toBe(false);
    });

    it('handles circular references', () => {
        const obj1: any = { a: 1 };
        obj1.self = obj1;
        const obj2: any = { a: 1 };
        obj2.self = obj2;
        expect(isEqual(obj1, obj2)).toBe(true);
    });

});
