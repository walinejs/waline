import { getUserList, WalineUser } from '../api';
import { DEFAULT_LANG, DEFAULT_LOCALES } from '../config';
import { WalineLocale } from '../typings';
import { getRoot } from '../utils';

export interface WalineUserListOptions {
  /**
   * Waline 服务端地址
   *
   * Waline serverURL
   */
  serverURL: string;

  /**
   * 获取用户列表的数量
   *
   * fetch number of user list
   */
  count: number;

  /**
   * 需要挂载的元素
   *
   * Element to be mounted
   */
  el?: string | HTMLElement;

  /**
   * 错误提示消息所使用的语言
   *
   * Language of error message
   *
   * @default navigator.language
   */
  lang?: string;

  /**
   * 自定义 waline 语言显示
   *
   * @see [自定义语言](https://waline.js.org/client/i18n.html)
   *
   * Custom display language in waline
   *
   * @see [I18n](https://waline.js.org/en/client/i18n.html)
   */
  locale?: WalineLocale;

  /**
   * 列表模式还是头像墙模式
   *
   * list mode or avatar wall mode
   */
  mode: 'list' | 'wall';
}

export interface WalineUserListResult {
  /**
   * 用户数据
   *
   * User Data
   */
  users: WalineUser[];

  /**
   * 取消挂载挂件
   *
   * Umount widget
   */
  destroy: () => void;
}

export const UserList = ({
  el,
  serverURL,
  count,
  locale,
  lang = navigator.language,
  mode = 'list',
}: WalineUserListOptions): Promise<WalineUserListResult> => {
  const root = getRoot(el);
  const controller = new AbortController();

  return getUserList({
    serverURL,
    pageSize: count,
    lang,
    signal: controller.signal,
  }).then((users) => {
    if (!root || !users.length)
      return {
        users,
        destroy: (): void => controller.abort(),
      };

    locale = {
      ...(DEFAULT_LOCALES[lang] || DEFAULT_LOCALES[DEFAULT_LANG]),
      ...(typeof locale === 'object' ? locale : {}),
    } as WalineLocale;

    root.innerHTML = `<ul class="wl-user-${mode}">${users
      .map((user, index) =>
        [
          `<li class="wl-user-item" aria-label="${user.nick}">`,
          user.link && `<a href="${user.link}" target="_blank">`,
          '<div class="wl-user-avatar">',
          `<img src="${user.avatar}" alt="${user.nick}">`,
          `<span class="wl-user-badge">${index + 1}</span>`,
          '</div>',
          '<div class="wl-user-meta">',
          '<div class="wl-user-name">',
          user.nick,
          user.level &&
            `<span class="wl-badge">${
              locale ? locale[`level${user.level}`] : `Level ${user.level}`
            }</span>`,
          user.label && `<span class="wl-badge">${user.label}</span>`,
          '</div>',
          user.link && user.link,
          '</div>',
          user.link && '</a>',
          '</li>',
        ]
          .filter((v) => v)
          .join(''),
      )
      .join('')}</ul>`;

    return {
      users,
      destroy: (): void => {
        controller.abort();
        root.innerHTML = '';
      },
    };
  });
};
