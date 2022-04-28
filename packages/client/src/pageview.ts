import {
  errorHandler,
  fetchPageviews,
  getQuery,
  updatePageviews,
} from './utils';

import type { WalineAbort } from './typings';

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
}

const renderVisitorCount = (
  counts: number[],
  countElements: HTMLElement[]
): void => {
  countElements.forEach((element, index) => {
    element.innerText = counts[index].toString();
  });
};

export const pageviewCount = ({
  serverURL,
  path = window.location.pathname,
  selector = '.waline-pageview-count',
  update = true,
}: WalinePageviewCountOptions): WalineAbort => {
  const controller = new AbortController();

  const elements = Array.from(
    // pageview selectors
    document.querySelectorAll<HTMLElement>(selector)
  );

  const filter = (element: HTMLElement): boolean => {
    const query = getQuery(element);

    return query !== null && path !== query;
  };

  const fetch = (elements: HTMLElement[]): Promise<void> =>
    fetchPageviews({
      serverURL,
      paths: elements.map((element) => getQuery(element) || path),
      signal: controller.signal,
    })
      .then((counts) => renderVisitorCount(counts, elements))
      .catch(errorHandler);

  // we should update pageviews
  if (update) {
    const normalElements = elements.filter((element) => !filter(element));
    const elementsNeedstoBeFetched = elements.filter(filter);

    void updatePageviews({ serverURL, path }).then((count) =>
      renderVisitorCount(
        new Array<number>(normalElements.length).fill(count),
        normalElements
      )
    );

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
