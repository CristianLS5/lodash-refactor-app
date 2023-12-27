export function remove<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[] {
    const removedItems = [];
    for (let i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i], i, array)) {
            removedItems.unshift(array.splice(i, 1)[0]);
        }
    }
    return removedItems;
}