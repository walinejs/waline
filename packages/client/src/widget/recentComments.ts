import { fetchRecentComment, getRoot } from '../utils';
import { useUserInfo } from '../composables';
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
  const root = getRoot(el);
  const controller = new AbortController();
  const { userInfo } = useUserInfo();

  return fetchRecentComment({
    serverURL,
    count,
    signal: controller.signal,
    token: userInfo.value?.token,
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
