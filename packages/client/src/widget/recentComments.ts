import { fetchRecentComment } from '../utils';
import type { Comment } from '../typings';

export interface RecentCommentsOptions {
  serverURL: string;
  count: number;
  el?: string | HTMLElement;
}

export interface RecentCommentsResult {
  comments: Comment[];
  destroy: () => void;
}

export const RecentComments = ({
  el,
  serverURL,
  count,
}: RecentCommentsOptions): Promise<RecentCommentsResult> => {
  const root =
    el instanceof HTMLElement ? el : el ? document.querySelector(el) : null;
  const controller = new AbortController();

  return fetchRecentComment({
    serverURL,
    count,
    signal: controller.signal,
  }).then((comments) => {
    if (root && comments.length) {
      root.innerHTML = `<ul class="waline-widget-list">${comments
        .map(
          (comment) =>
            `<li class="waline-widget-item"><a href="${comment.url}">${comment.nick}</a>：${comment.comment}</li>`
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
