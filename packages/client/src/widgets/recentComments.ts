import type { RecentCommentData } from '@waline/api';
import { getRecentComment } from '@waline/api';

import { useUserInfo } from '../composables/index.js';
import { getRoot } from '../utils/index.js';

export interface WalineRecentCommentsOptions {
  /**
   * Waline 服务端地址
   *
   * Waline serverURL
   */
  serverURL: string;

  /**
   * 获取最新评论的数量
   *
   * Fetch number of latest comments
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
}

export interface WalineRecentCommentsResult {
  /**
   * 评论数据
   *
   * Comment Data
   */
  comments: RecentCommentData[];

  /**
   * 取消挂载挂件
   *
   * Umount widget
   */
  destroy: () => void;
}

export const RecentComments = ({
  el,
  serverURL,
  count,
  lang = navigator.language,
}: WalineRecentCommentsOptions): Promise<WalineRecentCommentsResult> => {
  const userInfo = useUserInfo();
  const root = getRoot(el);
  const controller = new AbortController();

  return getRecentComment({
    serverURL,
    count,
    lang,
    signal: controller.signal,
    token: userInfo.value.token,
  }).then((comments) => {
    if (root && comments.length > 0) {
      const document = root.ownerDocument;
      const list = document.createElement('ul');
      list.className = 'wl-recent-list';

      for (const comment of comments) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        item.className = 'wl-recent-item';
        link.textContent = comment.nick;

        try {
          const target = new URL(comment.url, document.baseURI);
          if (target.protocol === 'http:' || target.protocol === 'https:') {
            link.href = target.href;
          }
        } catch {
          // Invalid page identifiers remain visible without a clickable URL.
        }

        // Only the server-sanitized comment body is HTML; metadata stays literal.
        item.innerHTML = comment.comment;
        item.prepend(link, document.createTextNode('：'));
        list.append(item);
      }

      root.replaceChildren(list);

      return {
        comments,
        destroy: (): void => {
          controller.abort();
          root.innerHTML = '';
        },
      };
    }

    return {
      comments,
      destroy: (): void => {
        controller.abort();
      },
    };
  });
};
