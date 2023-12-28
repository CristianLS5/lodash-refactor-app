import { sortedUniqBy } from "./sorted-uniq-by";

describe('sortedUniqBy', () => {
    it('removes duplicate elements based on the iteratee', () => {
        const array = [1.1, 1.2, 2.3, 2.3, 3.5];
        const unique = sortedUniqBy(array, Math.floor);
        expect(unique).toEqual([1.1, 2.3, 3.5]);
    });

    it('handles an array with no duplicates', () => {
        const array = [1.1, 2.2, 3.3];
        const unique = sortedUniqBy(array, Math.floor);
        expect(unique).toEqual([1.1, 2.2, 3.3]);
    });

    it('returns an empty array for an empty input', () => {
        const array: number[] = [];
        const unique = sortedUniqBy(array, Math.floor);
        expect(unique).toEqual([]);
    });

    it('handles non-numeric values', () => {
        const array = ['apple', 'banana', 'apple', 'cherry'].sort((a, b) =>
            a.charAt(0).localeCompare(b.charAt(0)));
            // After this sorting, when you pass this array to the sortedUniqBy 
            // function, it can effectively remove consecutive duplicates 
            // based on the first character.
        const unique = sortedUniqBy(array, word => word.charAt(0));
        expect(unique).toEqual(['apple', 'banana', 'cherry']);
    });


    it('works with complex objects', () => {
        const array = [{ id: 1, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' }];
        const unique = sortedUniqBy(array, item => item.id);
        expect(unique).toEqual([{ id: 1, value: 'a' }, { id: 2, value: 'c' }]);
    });
});
