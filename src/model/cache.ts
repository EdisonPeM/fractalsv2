const CACHE: { [key: string]: any } = {};

export function saveInCache(key: string, value: any) {
  CACHE[key] = value;
}

export function hasChanged(key: string, value: any): boolean {
  return CACHE[key] === undefined || CACHE[key] !== value;
}

export function compareAndSave(key: string, value: any): boolean {
  if (hasChanged(key, value)) {
    saveInCache(key, value);
    return true;
  }

  return false;
}
