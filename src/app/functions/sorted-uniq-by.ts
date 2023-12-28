export function sortedUniqBy<T>(array: T[], iteratee: (item: T) => unknown): T[] {
    return array
        .filter((value, index, arr) =>
            index === 0 || iteratee(value) !== iteratee(arr[index - 1]));
}