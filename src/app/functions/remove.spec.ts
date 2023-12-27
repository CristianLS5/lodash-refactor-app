import { remove } from "./remove"; // Adjust the import path accordingly

describe('remove', () => {
    it('removes elements based on a predicate', () => {
        const array = [1, 2, 3, 4, 5];
        const removed = remove(array, n => n % 2 === 0);
        expect(removed).toEqual([2, 4]);
        expect(array).toEqual([1, 3, 5]);
    });

    it('does not remove any elements if the predicate never returns true', () => {
        const array = [1, 2, 3, 4, 5];
        const removed = remove(array, n => n > 5);
        expect(removed).toEqual([]);
        expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    it('handles empty arrays', () => {
        const array: number[] = [];
        const removed = remove(array, n => n % 2 === 0);
        expect(removed).toEqual([]);
        expect(array).toEqual([]);
    });

    it('uses only the index in the predicate', () => {
        const array = [1, 2, 3, 4, 5];
        const removed = remove(array, (item, index, arr) => index === 2);
        expect(removed).toEqual([3]);
        expect(array).toEqual([1, 2, 4, 5]);
    });

    it('uses element, index, and array in the predicate', () => {
        const array = [10, 20, 30, 40, 50];
        // Remove elements that are multiples of 10 and are at even indices (0, 2, 4)
        // and where the array still includes at least one element more than 15.
        const removed = remove(array, (item, index, arr) => item % 10 === 0 && index % 2 === 0 && arr.some(el => el > 15));
        expect(removed).toEqual([10, 30, 50]); // Expecting to remove 10, 30, and 50
        expect(array).toEqual([20, 40]); // Original array should have 10, 30, and 50 removed
    });
    
    

    it('uses index and array in the predicate', () => {
        const array = [10, 20, 30, 40, 50];
        const removed = remove(array, (item, index, arr) => index % 2 === 0 && arr.includes(50));
        expect(removed).toEqual([50]); // Only 50 should be removed
        expect(array).toEqual([10, 20, 30, 40]); // The array should now not include 50
    });
    
    

    it('mutates the original array', () => {
        const array = [1, 2, 3, 4, 5];
        remove(array, n => n % 2 === 0);
        expect(array).toEqual([1, 3, 5]);
    });
});
