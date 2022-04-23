import { fetchRecentComment, getRoot, getUserInfo } from '../utils';

import type { WalineComment } from '../typings';

export interface RecentCommentsOptions {
  serverURL: string;
  count: number;
  el?: string | HTMLElement;
}

export interface RecentCommentsResult {
  comments: WalineComment[];
  destroy: () => void;
}

export const RecentComments = ({
  el,
  serverURL,
  count,
}: RecentCommentsOptions): Promise<RecentCommentsResult> => {
  const root = getRoot(el);
  const controller = new AbortController();

  return fetchRecentComment({
    serverURL,
    count,
    signal: controller.signal,
    token: getUserInfo()?.token,
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
