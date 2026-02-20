/* eslint-disable typescript/no-unsafe-member-access */
import type { BaseAPIOptions } from './utils.js';

export interface UserInfo {
  /**
   * 显示姓名
   *
   * User name displayed
   */
  display_name: string;

  /**
   * 用户电子邮件地址
   *
   * User email
   */
  email: string;

  /**
   * 用户网站地址
   *
   * User website
   */
  url: string;

  /**
   * 用户令牌
   *
   * User token
   */
  token: string;

  /**
   * 用户头像
   *
   * User avatar
   */
  avatar: string;

  /**
   * 用户对象 ID
   *
   * User object ID
   */
  objectId: number;

  /**
   * 用户身份
   *
   * User role
   */
  type: 'administrator' | 'guest';
}

const isMobile = (): boolean => {
  const ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
};

export const login = ({
  lang,
  serverURL,
}: BaseAPIOptions): Promise<UserInfo & { remember: boolean }> => {
  const width = 450;
  const height = 450;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  if (isMobile()) {
    location.href = `${serverURL.replace(/\/$/, '')}/ui/login?lng=${encodeURIComponent(lang)}&redirect=${encodeURIComponent(location.href)}`;

    // On mobile, we perform a full-page redirect; the login flow is handled entirely
    // in the redirected page, so this promise intentionally never resolves to avoid
    // overwriting existing userInfo with an empty object.
    return new Promise<UserInfo & { remember: boolean }>(() => {
      // no-op
    });
  }

  const handler = window.open(
    `${serverURL.replace(/\/$/, '')}/ui/login?lng=${encodeURIComponent(lang)}`,
    '_blank',
    `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`,
  );

  handler?.postMessage({ type: 'TOKEN', data: null }, '*');

  return new Promise((resolve) => {
    // oxlint-disable-next-line typescript/no-explicit-any
    const receiver = ({ data }: any): void => {
      // oxlint-disable-next-line typescript/strict-boolean-expressions
      if (!data || typeof data !== 'object' || data.type !== 'userInfo') return;

      // oxlint-disable-next-line typescript/strict-boolean-expressions
      if (data.data.token) {
        handler?.close();

        window.removeEventListener('message', receiver);

        resolve(data.data as UserInfo & { remember: boolean });
      }
    };

    window.addEventListener('message', receiver);
  });
};
