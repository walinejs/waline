import { readonly, ref } from 'vue';
import { getUserInfo } from '../utils';

import type { Ref } from 'vue';
import type { UserInfo } from '../utils';

export type UserInfoRef = Ref<UserInfo | Record<string, never>>;

const userInfo: UserInfoRef = ref({});

export const useUserInfo = (): {
  userInfo: UserInfoRef;
  setUserInfo: (userInfo: UserInfo | Record<string, never>) => void;
} => {
  if (!userInfo.value.token) {
    const info = getUserInfo();

    if (info) userInfo.value = info;
  }

  return {
    userInfo: readonly(userInfo),
    setUserInfo: (info: UserInfo | Record<string, never>): void => {
      userInfo.value = info;
    },
  };
};
