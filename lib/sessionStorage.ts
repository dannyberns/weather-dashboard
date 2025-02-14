export const sessionStorageHandler = {
  set: (key: string, value: unknown) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  get: <T>(key: string): T | null => {
    if (typeof window !== "undefined") {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : null;
    }
    return null;
  },
  remove: (key: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(key);
    }
  },
};
