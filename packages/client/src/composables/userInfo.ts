import { readonly, ref } from 'vue';
import type { Ref } from 'vue';

export interface UserInfo {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  display_name: string;
  email: string;
  url: string;
  token: string;
  avatar?: string;
  mailMd5: string;
}

export type UserInfoRef = Ref<UserInfo | null>;

const USER_KEY = 'WALINE_USER';

const userInfo = ref<UserInfo | null>(null);

export const useUserInfo = (): {
  userInfo: UserInfoRef;
  setUserInfo: (userInfo: UserInfo | null) => void;
} => {
  if (!userInfo.value)
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userInfo.value =
        JSON.parse(localStorage.getItem(USER_KEY) || '') ||
        JSON.parse(sessionStorage.getItem(USER_KEY) || '') ||
        null;
    } catch (err) {
      // do nothing
    }

  return {
    userInfo: readonly(userInfo),
    setUserInfo: (info: UserInfo | null): void => {
      userInfo.value = info;
    },
  };
};
