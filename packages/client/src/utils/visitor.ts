export interface FetchVisitCountOptions {
  serverURL: string;
  paths: string[];
}

export const fetchVisitCount = ({
  serverURL,
  paths,
}: FetchVisitCountOptions): Promise<number[]> => {
  const url = `${serverURL}/article?path=${encodeURIComponent(
    paths.join(',')
  )}`;
  return fetch(url).then((resp) => resp.json() as Promise<number[]>);
};

export interface PostVisitCountOptions {
  serverURL: string;
  path: string;
}

export const postVisitCount = ({
  serverURL,
  path,
}: PostVisitCountOptions): Promise<number> => {
  const url = `${serverURL}/article`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  }).then((resp) => resp.json() as Promise<number>);
};

const renderVisitorCount = (
  counts: number[] | number,
  countElements: HTMLElement[]
): void => {
  if (!Array.isArray(counts)) {
    counts = new Array(countElements.length).fill(counts);
  }

  countElements.forEach((el, idx) => {
    let counterEl = el.querySelector(
      '.leancloud-visitors-count'
    ) as HTMLElement;

    if (!counterEl) {
      counterEl = el;
    }

    counterEl.innerText = (counts as number[])[idx].toString();
  });
};

export type UpdateVisitOptions = PostVisitCountOptions;

export const updateVisitor = ({
  serverURL,
  path,
}: UpdateVisitOptions): void => {
  const countIncrease = postVisitCount({ serverURL, path });

  const visitorElements = document.querySelectorAll(
    '.leancloud_visitors,.leancloud-visitors'
  );
  const countElements = (Array.from(visitorElements) as HTMLElement[]).filter(
    (el) => el.getAttribute('id')
  );

  const ids = countElements.map((el: Element) => {
    let id = el.getAttribute('id') || '';

    try {
      if (id) {
        id = decodeURI(id);
      }
    } catch (err) {
      // ignore error
    }

    return id;
  });

  const restIds = ids.filter((id) => id !== path);

  if (restIds.length) {
    const hasPath = restIds.length !== ids.length;

    void (hasPath ? countIncrease : Promise.resolve())
      .then(() => fetchVisitCount({ serverURL, paths: ids }))
      .then((counts) => renderVisitorCount(counts, countElements));
  } else {
    void countIncrease.then((count) =>
      renderVisitorCount(count, countElements)
    );
  }
};
