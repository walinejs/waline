import { fetchCommentCount } from './api/index.js';
import { type WalineAbort } from './typings/index.js';
import { decodePath, errorHandler, getServerURL } from './utils/index.js';

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
   * Comment count CSS selector
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

  /**
   * 错误提示消息所使用的语言
   *
   * Language of error message
   *
   * @default navigator.language
   */
  lang?: string;
}

export const commentCount = ({
  serverURL,
  path = window.location.pathname,
  selector = '.waline-comment-count',
  lang = navigator.language,
}: WalineCommentCountOptions): WalineAbort => {
  const controller = new AbortController();

  // comment count
  const elements = document.querySelectorAll<HTMLElement>(selector);

  if (elements.length)
    void fetchCommentCount({
      serverURL: getServerURL(serverURL),
      paths: Array.from(elements).map((element) =>
        decodePath(element.dataset.path || element.getAttribute('id') || path)
      ),
      lang,
      signal: controller.signal,
    })
      .then((counts) => {
        elements.forEach((element, index) => {
          element.innerText = counts[index].toString();
        });
      })
      .catch(errorHandler);

  return controller.abort.bind(controller);
};
