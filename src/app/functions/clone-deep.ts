export function cloneDeep<T>(obj: T): T {
    return structuredClone(obj);
}
