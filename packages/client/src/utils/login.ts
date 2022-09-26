/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export interface LoginOptions {
  lang: string;
  serverURL: string;
}

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

export const login = ({
  lang,
  serverURL,
}: LoginOptions): Promise<UserInfo & { remember: boolean }> => {
  const width = 450;
  const height = 450;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const handler = window.open(
    `${serverURL}/ui/login?lng=${encodeURIComponent(lang)}`,
    '_blank',
    `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`
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
