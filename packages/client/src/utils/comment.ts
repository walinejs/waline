import { fetchCount } from './fetch';
import { decodePath } from './path';

export const updateCommentCount = (serverURL: string): void => {
  // comment count
  const $counts = Array.from<HTMLElement>(
    document.querySelectorAll('.waline-comment-count')
  ).filter(
    (element) => element.getAttribute('data-xid') || element.getAttribute('id')
  );

  if ($counts.length)
    void fetchCount({
      serverURL,
      paths: $counts.map((element) =>
        decodePath(
          (element.getAttribute('data-xid') ||
            element.getAttribute('id')) as string
        )
      ),
    }).then((counts) => {
      if (!Array.isArray(counts)) {
        counts = [counts];
      }

      $counts.forEach(
        (el, idx) => (el.innerText = (counts as number[])[idx].toString())
      );
    });
};
