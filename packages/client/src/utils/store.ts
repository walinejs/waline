export interface Store {
  get: <T = unknown>(key: string) => T | null;
  set: <T = unknown>(key: string, content: T) => void;
  update: <T = unknown>(content: T) => void;
}

export const store = (cacheKey: string): Store => {
  let storage: Record<string, unknown> = {};
  const content = localStorage.getItem(cacheKey);

  if (content) {
    try {
      storage = JSON.parse(content) as Record<string, unknown>;
    } catch (err) {
      // do nothing
    }
  }

  return {
    get: <T>(key: string): T | null => (storage[key] as T) || null,

    set<T>(key: string, content: T): void {
      try {
        // make sure the content can be stringify and make a deep copy here
        storage[key] = JSON.parse(JSON.stringify(content));
        localStorage.setItem(cacheKey, JSON.stringify(storage));
      } catch (err) {
        // do nothing
      }
    },

    update<T>(content: T): void {
      // make sure the content can be stringify and make a deep copy here
      storage = JSON.parse(JSON.stringify(content)) as Record<string, unknown>;
      localStorage.setItem(cacheKey, JSON.stringify(storage));
    },
  };
};
