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

export const getUserInfo = (): UserInfo | Record<string, never> => {
  let userInfo: UserInfo | Record<string, never> = {};

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    userInfo =
      JSON.parse(localStorage.getItem(USER_KEY) || '') ||
      JSON.parse(sessionStorage.getItem(USER_KEY) || '') ||
      {};
  } catch (err) {
    // do nothing
  }

  return userInfo;
};
