import { useStorage } from '@vueuse/core';

import type { Ref } from 'vue';

export interface UserInfo {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  display_name: string;
  email: string;
  url: string;
  token: string;
  avatar: string;
  mailMd5: string;
  objectId: string | number;
  type: 'administrator' | 'guest';
}

export const USER_KEY = 'WALINE_USER';

export type UserInfoRef = Ref<UserInfo | Record<string, never>>;

let userInfoStorage: UserInfoRef | null = null;

export const useUserInfo = (): UserInfoRef =>
  userInfoStorage ||
  (userInfoStorage = useStorage<UserInfo | Record<string, never>>(
    'USER_KEY',
    {}
  ));
