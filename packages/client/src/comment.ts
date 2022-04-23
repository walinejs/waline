import { useUserInfo } from './composables';
import { decodePath, errorHandler, fetchCommentCount } from './utils';

export interface CommentCountOptions {
  serverURL: string;
  selector?: string;
  path?: string;
}

export const commentCount = ({
  serverURL,
  path = window.location.pathname,
  selector = '.waline-comment-count',
}: CommentCountOptions): ((reason?: unknown) => void) => {
  const controller = new AbortController();

  // comment count
  const elements = document.querySelectorAll<HTMLElement>(selector);

  const { userInfo } = useUserInfo();

  if (elements.length)
    void fetchCommentCount({
      serverURL,
      paths: Array.from(elements).map((element) =>
        decodePath(element.dataset.path || element.getAttribute('id') || path)
      ),
      signal: controller.signal,
      token: userInfo.value?.token,
    })
      .then((counts) => {
        elements.forEach((element, index) => {
          element.innerText = counts[index].toString();
        });
      })
      .catch(errorHandler);

  return controller.abort.bind(controller);
};
