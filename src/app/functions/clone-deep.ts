export function cloneDeep<T>(obj: T): T {
    try {
      return structuredClone(obj);
    } catch (error) {
      return customCloneDeep(obj);
    }
  }
  
  function customCloneDeep<T>(obj: T, map = new WeakMap()): T {
    if (typeof obj !== 'object' || obj === null) {
      return obj; // Return non-objects or null as is
    }
  
    if (map.has(obj)) {
      return map.get(obj);
    }
  
    const clonedObj: any = Array.isArray(obj) ? [] : {};
    map.set(obj, clonedObj);
  
    for (const key in obj) {
      const value = (obj as any)[key];
      // Skip cloning for functions
      clonedObj[key] = typeof value === 'function' ? value : customCloneDeep(value, map);
    }
  
    return clonedObj;
  }
  