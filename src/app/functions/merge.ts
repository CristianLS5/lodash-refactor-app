export function merge(target: any, ...sources: any[]): any {
    const mergedObjects = new Map<any, any>();

    function internalMerge(target: any, source: any): any {
        if (Array.isArray(source)) {
            if (Array.isArray(target)) {
                return target.concat(source); // Concatenating arrays
            } else {
                return source.slice(); // Cloning the source array
            }
        }

        if (isObject(source) && !isSpecialObject(source)) {
            if (!isObject(target) || Array.isArray(target) || isSpecialObject(target)) {
                target = {};
            }

            if (mergedObjects.has(source)) {
                return mergedObjects.get(source);
            } else {
                mergedObjects.set(source, target);
            }

            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    const sourceValue = source[key];
                    const targetValue = target[key];

                    if (Array.isArray(sourceValue)) {
                        target[key] = Array.isArray(targetValue) ? targetValue.concat(sourceValue) : sourceValue.slice();
                    } else if (isObject(sourceValue) && !isSpecialObject(sourceValue)) {
                        target[key] = internalMerge(targetValue, sourceValue);
                    } else {
                        target[key] = sourceValue;
                    }
                }
            }
        } else {
            target = source;
        }

        return target;
    }

    sources.forEach(source => {
        target = internalMerge(target, source);
    });

    return target;
}

function isObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function isSpecialObject(item: any): boolean {
    return item instanceof Date || item instanceof RegExp;
}
