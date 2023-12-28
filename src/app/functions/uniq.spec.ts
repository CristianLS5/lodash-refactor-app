import { uniq } from "./uniq";

describe('uniq', () => {
    it('removes duplicate numbers from an array', () => {
        const array = [1, 2, 2, 3, 4, 4, 5, 1];
        const uniqueArray = uniq(array);
        expect(uniqueArray).toEqual([1, 2, 3, 4, 5]);
    });

    it('removes duplicate strings from an array', () => {
        const array = ['apple', 'banana', 'apple', 'cherry', 'banana'];
        const uniqueArray = uniq(array);
        expect(uniqueArray).toEqual(['apple', 'banana', 'cherry']);
    });

    it('returns an empty array when given an empty array', () => {
        const array: number[] = [];
        const uniqueArray = uniq(array);
        expect(uniqueArray).toEqual([]);
    });

    it('handles arrays with a single element', () => {
        const array = [1];
        const uniqueArray = uniq(array);
        expect(uniqueArray).toEqual([1]);
    });

    it('works with arrays of objects based on reference', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 1 };
        const array = [obj1, obj2, obj1];
        const uniqueArray = uniq(array);
        expect(uniqueArray).toEqual([obj1, obj2]);
    });
});
