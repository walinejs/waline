import { useUserInfo } from './composables';
import { decodePath, errorHandler, fetchCommentCount } from './utils';
import type { WalineAbort } from './typings';

export interface WalineCommentCountOptions {
  /**
   * Waline 服务端地址
   *
   * Waline server url
   */
  serverURL: string;

  /**
   * 评论数 CSS 选择器
   *
   * Commment count CSS selector
   *
   * @default '.waline-comment-count'
   */
  selector?: string;

  /**
   * 需要获取的默认路径
   *
   * Path to be fetched by default
   *
   * @default window.location.pathname
   */
  path?: string;
}

export const commentCount = ({
  serverURL,
  path = window.location.pathname,
  selector = '.waline-comment-count',
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
WalineCommentCountOptions): WalineAbort => {
  const controller = new AbortController();

  // comment count
  const elements = document.querySelectorAll<HTMLElement>(selector);

  const userInfo = useUserInfo();

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
