import type { GetArticleCounterResponse } from '@waline/api';
import { getPageview, updatePageview } from '@waline/api';

import type { WalineAbort } from './typings/index.js';
import { errorHandler, getQuery, getServerURL } from './utils/index.js';

export interface WalinePageviewCountOptions {
  /**
   * Waline 服务端地址
   *
   * Waline server url
   */
  serverURL: string;

  /**
   * 浏览量 CSS 选择器
   *
   * Pageview CSS selector
   *
   * @default '.waline-pageview-count'
   */
  selector?: string;

  /**
   * 需要更新和获取的路径
   *
   * Path to be fetched and updated
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * 是否在查询时更新 path 的浏览量
   *
   * Whether update pageviews when fetching path result
   *
   * @default true
   */
  update?: boolean;

  /**
   * 错误提示消息所使用的语言
   *
   * Language of error message
   *
   * @default navigator.language
   */
  lang?: string;
}

const renderVisitorCount = (
  counts: GetArticleCounterResponse,
  countElements: HTMLElement[],
): void => {
  countElements.forEach((element, index) => {
    const count = counts[index].time;

    if (typeof count !== 'number') {
      return;
    }

    element.innerText = count.toString();
  });
};

export const pageviewCount = ({
  serverURL,
  path = window.location.pathname,
  selector = '.waline-pageview-count',
  update = true,
  lang = navigator.language,
}: WalinePageviewCountOptions): WalineAbort => {
  const controller = new AbortController();

  const elements = Array.from(
    // pageview selectors
    document.querySelectorAll<HTMLElement>(selector),
  );

  const filter = (element: HTMLElement): boolean => {
    const query = getQuery(element);

    return query !== null && path !== query;
  };

  const fetch = (elements: HTMLElement[]): Promise<void> =>
    getPageview({
      serverURL: getServerURL(serverURL),
      paths: elements.map((element) => getQuery(element) ?? path),
      lang,
      signal: controller.signal,
    })
      .then((counts) => renderVisitorCount(counts, elements))
      .catch(errorHandler);

  // we should update pageviews
  if (update) {
    const normalElements = elements.filter((element) => !filter(element));
    const elementsNeedstoBeFetched = elements.filter(filter);

    void updatePageview({
      serverURL: getServerURL(serverURL),
      path,
      lang,
    }).then((counts) => renderVisitorCount(counts, normalElements));

    // if we should fetch count of other pages
    if (elementsNeedstoBeFetched.length) {
      void fetch(elementsNeedstoBeFetched);
    }
  }
  // we should not update pageviews
  else {
    void fetch(elements);
  }

  return controller.abort.bind(controller);
};
