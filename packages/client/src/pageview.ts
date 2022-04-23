import {
  errorHandler,
  fetchPageviews,
  getQuery,
  updatePageviews,
} from './utils';

const renderVisitorCount = (
  counts: number[],
  countElements: HTMLElement[]
): void => {
  countElements.forEach((element, index) => {
    element.innerText = counts[index].toString();
  });
};

export interface VisitorCountOptions {
  /**
   * Waline server url
   *
   * Waline 服务端地址
   */
  serverURL: string;

  /**
   * Path to be fetched and updated
   *
   * 需要更新和获取的路径
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * @default '.waline-pageview-count'
   */
  selector?: string;

  /**
   * Whether update pageviews when fetching path result
   *
   * 是否在查询时更新 path 的浏览量
   *
   * @default true
   */
  update?: boolean;
}

export const pageviewCount = ({
  serverURL,
  path = window.location.pathname,
  selector = '.waline-pageview-count',
  update = true,
}: VisitorCountOptions): ((reason?: unknown) => void) => {
  const controller = new AbortController();

  const elements = Array.from(
    // visitor selectors
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
