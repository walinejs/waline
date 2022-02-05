import { fetchCommentCount } from './fetch';
import { decodePath } from './path';
import { useUserInfo } from '../composables';

export const updateCommentCount = (
  serverURL: string,
  signal: AbortSignal
): void => {
  // comment count
  const $counts = Array.from<HTMLElement>(
    document.querySelectorAll('.waline-comment-count')
  ).filter(
    (element) => element.getAttribute('data-xid') || element.getAttribute('id')
  );

  const { userInfo } = useUserInfo();

  if ($counts.length)
    void fetchCommentCount({
      serverURL,
      paths: $counts.map((element) =>
        decodePath(
          (element.getAttribute('data-xid') ||
            element.getAttribute('id')) as string
        )
      ),
      signal,
      token: userInfo.value?.token,
    })
      .then((counts) => {
        $counts.forEach((element, index) => {
          element.innerText = counts[index].toString();
        });
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') console.error(err.message);
      });
};
