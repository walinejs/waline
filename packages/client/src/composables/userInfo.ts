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
}

export const USER_KEY = 'WALINE_USER';

export type UserInfoRef = Ref<UserInfo | Record<string, never>>;

export const useUserInfo = (): UserInfoRef =>
  useStorage<UserInfo | Record<string, never>>('USER_KEY', {});
