import { useStorage } from '@vueuse/core';
import { type Ref } from 'vue';

import { type UserInfo } from '../api/index.js';

export const USER_KEY = 'WALINE_USER';

export type UserInfoRef = Ref<UserInfo | Record<string, never>>;

let userInfoStorage: UserInfoRef | null = null;

export const useUserInfo = (): UserInfoRef =>
  (userInfoStorage ??= useStorage<UserInfo | Record<string, never>>(
    USER_KEY,
    {},
  ));
