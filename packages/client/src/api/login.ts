/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type BaseAPIOptions } from './utils.js';

export interface UserInfo {
  /**
   * 显示姓名
   *
   * User name displayed
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
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
   * 用户邮箱 MD5
   *
   * MD5 of User email
   */
  mailMd5: string;

  /**
   * 用户对象 ID
   *
   * User object ID
   */
  objectId: string | number;

  /**
   * 用户身份
   *
   * User role
   */
  type: 'administrator' | 'guest';
}

export const login = ({
  lang,
  serverURL,
}: BaseAPIOptions): Promise<UserInfo & { remember: boolean }> => {
  const width = 450;
  const height = 450;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const handler = window.open(
    `${serverURL}/ui/login?lng=${encodeURIComponent(lang)}`,
    '_blank',
    `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`,
  );

  handler?.postMessage({ type: 'TOKEN', data: null }, '*');

  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const receiver = ({ data }: any): void => {
      if (!data || typeof data !== 'object' || data.type !== 'userInfo') return;

      if (data.data.token) {
        handler?.close();

        window.removeEventListener('message', receiver);

        resolve(data.data as UserInfo & { remember: boolean });
      }
    };

    window.addEventListener('message', receiver);
  });
};
