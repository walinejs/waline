import { fetchRecentComment } from '../utils';
import type { Comment } from '../typings';

export interface RecentCommentsOptions {
  el: string;
  serverURL: string;
  count: number;
}

export const RecentComments = ({
  el,
  serverURL,
  count,
}: RecentCommentsOptions): Promise<Comment[]> => {
  const root = document.querySelector(el);

  return root
    ? fetchRecentComment({ serverURL, count }).then((comments) => {
        if (comments.length) {
          root.innerHTML = `
      <ul class="waline-widget-list">
      ${comments
        .map(
          (comment) =>
            `<li class="waline-widget-item"><a href="${comment.url}">${comment.nick}</a>：${comment.comment}</li>`
        )
        .join('')}
      </ul>`;
        }

        return comments;
      })
    : Promise.resolve([]);
};
