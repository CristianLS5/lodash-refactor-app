export function isEqual(a: any, b: any, aStack: any[] = [], bStack: any[] = []): boolean {
    // Identical objects are equal
    if (a === b) return true;

    // Handle Date and RegExp objects
    if ((a instanceof Date && b instanceof Date) || (a instanceof RegExp && b instanceof RegExp)) {
        return a.toString() === b.toString();
    }

    // Handle functions
    if (typeof a === 'function' && typeof b === 'function') {
        return a === b; // Compare references directly
    }

    // Handle Maps
    if (a instanceof Map && b instanceof Map) {
        if (a.size !== b.size) return false;
        for (let [key, val] of a) {
            if (!b.has(key) || !isEqual(val, b.get(key), aStack, bStack)) {
                return false;
            }
        }
        return true;
    }

    // Handle Sets
    if (a instanceof Set && b instanceof Set) {
        if (a.size !== b.size) return false;
        for (let item of a) {
            if (!b.has(item)) {
                return false;
            }
        }
        return true;
    }

    // Check if the value is a non-null object
    const isObject = (obj: any) => obj !== null && typeof obj === 'object';

    // If either is not an object, return false
    if (!isObject(a) || !isObject(b)) return false;

    // Handle circular references
    let length = aStack.length;
    while (length--) {
        if (aStack[length] === a) return bStack[length] === b;
    }
    aStack.push(a);
    bStack.push(b);

    // Handle arrays and objects
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i], aStack, bStack)) return false;
        }
    } else {
        const keysA = Object.keys(a);
        if (keysA.length !== Object.keys(b).length) return false;
        for (let key of keysA) {
            if (!(key in b) || !isEqual(a[key], b[key], aStack, bStack)) return false;
        }
    }

    aStack.pop();
    bStack.pop();
    return true;
}
