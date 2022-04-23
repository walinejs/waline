export interface UserInfo {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  display_name: string;
  email: string;
  url: string;
  token: string;
  avatar: string;
  mailMd5: string;
}

const USER_KEY = 'WALINE_USER';

export const getUserInfo = (): UserInfo | null => {
  try {
    const localStorageData = localStorage.getItem(USER_KEY);
    const sessionStorageData = sessionStorage.getItem(USER_KEY);

    return localStorageData
      ? (JSON.parse(localStorageData) as UserInfo)
      : sessionStorageData
      ? (JSON.parse(sessionStorageData) as UserInfo)
      : null;
  } catch (err) {
    return null;
  }
};
