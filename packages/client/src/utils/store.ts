export interface Store {
  get: <T = unknown>(key: string) => T | null;
  set: <T = unknown>(content: T) => void;
}

export const store = (cacheKey: string): Store => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T>(key: string): T | null {
    const userInfoString = localStorage.getItem(cacheKey);

    if (userInfoString) {
      try {
        const result = JSON.parse(userInfoString) as Record<string, T>;

        return result[key] || null;
      } catch (err) {
        // do nothing
      }
    }

    return null;
  },

  set<T>(content: T): void {
    localStorage.setItem(cacheKey, JSON.stringify(content));
  },
});
