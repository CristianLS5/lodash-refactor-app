import { cloneDeep } from "./clone-deep";

describe('cloneDeep', () => {
    it('should clone primitive values', () => {
        const num = 42;
        expect(cloneDeep(num)).toEqual(num);

        const str = "Hello, world!";
        expect(cloneDeep(str)).toEqual(str);
    });

    it('should clone arrays', () => {
        const array = [1, 2, { a: '3', b: [4, 5] }];
        const clonedArray = cloneDeep(array);
        expect(clonedArray).toEqual(array);
        expect(clonedArray).not.toBe(array);
    });

    it('should clone plain objects', () => {
        const obj = { a: 1, b: { c: 2, d: 3 } };
        const clonedObj = cloneDeep(obj);
        expect(clonedObj).toEqual(obj);
        expect(clonedObj).not.toBe(obj);
    });

    it('should clone Date objects', () => {
        const date = new Date();
        const clonedDate = cloneDeep(date);
        expect(clonedDate).toEqual(date);
        expect(clonedDate).not.toBe(date);
    });

    it('should clone Set objects', () => {
        const set = new Set([1, 2, 3]);
        const clonedSet = cloneDeep(set);
        expect(clonedSet).toEqual(set);
        expect(clonedSet).not.toBe(set);
    });

    it('should clone Map objects', () => {
        const map = new Map([['a', 1], ['b', 2]]);
        const clonedMap = cloneDeep(map);
        expect(clonedMap).toEqual(map);
        expect(clonedMap).not.toBe(map);
    });

    // Add more test cases for other types like RegExp, ArrayBuffer, etc.

    // Test for nested objects
    it('should clone nested objects', () => {
        const nestedObj = { a: { b: { c: 1 } } };
        const clonedNestedObj = cloneDeep(nestedObj);
        expect(clonedNestedObj).toEqual(nestedObj);
        expect(clonedNestedObj).not.toBe(nestedObj);
    });

    // Test for circular references
    it('should handle circular references', () => {
        const circularObj: any = { a: 1 };
        circularObj.self = circularObj;
        const clonedCircularObj = cloneDeep(circularObj);
        expect(clonedCircularObj).toEqual(circularObj);
        expect(clonedCircularObj.self).toBe(clonedCircularObj);
    });

    // Add more test cases as needed
});
