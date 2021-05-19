import type { UserInfo } from '../composables';

const CACHE_KEY = 'ValineCache';

export const store = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItem(key: string): string {
    const userInfoString = localStorage.getItem(CACHE_KEY);

    if (userInfoString) {
      try {
        const result = JSON.parse(userInfoString) as UserInfo;

        return result[key as keyof UserInfo] || '';
      } catch (err) {
        // do nothing
      }
    }

    return '';
  },
  setItem<T = UserInfo>(content: T): void {
    localStorage.setItem(CACHE_KEY, JSON.stringify(content));
  },
};
