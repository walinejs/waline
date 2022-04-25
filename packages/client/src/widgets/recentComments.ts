import { useUserInfo } from '../composables';
import { fetchRecentComment, getRoot } from '../utils';

import type { WalineComment } from '../typings';

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
   * fetch number of latest comments
   */
  count: number;

  /**
   * 需要挂载的元素
   *
   * Element to be mounted
   */
  el?: string | HTMLElement;
}

export interface WalineRecentCommentsResult {
  /**
   * 评论数据
   *
   * Comment Data
   */
  comments: WalineComment[];

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
}: WalineRecentCommentsOptions): Promise<WalineRecentCommentsResult> => {
  const userInfo = useUserInfo();
  const root = getRoot(el);
  const controller = new AbortController();

  return fetchRecentComment({
    serverURL,
    count,
    signal: controller.signal,
    token: userInfo.value?.token,
  }).then((comments) => {
    if (root && comments.length) {
      root.innerHTML = `<ul class="wl-recent-list">${comments
        .map(
          (comment) =>
            `<li class="wl-recent-item"><a href="${comment.url}">${comment.nick}</a>：${comment.comment}</li>`
        )
        .join('')}</ul>`;

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
      destroy: (): void => controller.abort(),
    };
  });
};
