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

export type UserInfoRef = Ref<UserInfo | Record<string, never>>;

const USER_KEY = 'WALINE_USER';

const userInfo: UserInfoRef = ref({});

export const useUserInfo = (): {
  userInfo: UserInfoRef;
  setUserInfo: (userInfo: UserInfo | Record<string, never>) => void;
} => {
  if (!userInfo.value.token)
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userInfo.value =
        JSON.parse(localStorage.getItem(USER_KEY) || '') ||
        JSON.parse(sessionStorage.getItem(USER_KEY) || '') ||
        {};
    } catch (err) {
      // do nothing
    }

  return {
    userInfo: readonly(userInfo),
    setUserInfo: (info: UserInfo | Record<string, never>): void => {
      userInfo.value = info;
    },
  };
};
