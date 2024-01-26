/**
 * disqus 数据结构转 leancloud
 */

export const disqus2lc = (input: string) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(input, 'application/xml');
  const posts = Array.from(dom.querySelectorAll<HTMLElement>('post')).filter(
    (postEl) => {
      const isDeletedEl = postEl.querySelector('isDeleted');
      if (
        isDeletedEl &&
        isDeletedEl.textContent?.toLocaleLowerCase() === 'true'
      ) {
        return false;
      }

      return true;
    },
  );
  const threads = Array.from(dom.querySelectorAll('disqus > thread'));

  const articleMap: Record<string, string> = {};

  threads.forEach((threadEl) => {
    const urlEl = threadEl.querySelector('link');
    const threadId = threadEl.getAttribute('dsq:id')!;

    articleMap[threadId] = '';
    if (urlEl && urlEl.textContent) {
      const anchor = new URL(urlEl.textContent);
      articleMap[threadId] = anchor.pathname;
    }
  });

  const idMap: Record<string, string> = {};

  posts.forEach((postEl) => {
    const objectId = postEl.getAttribute('dsq:id')!;

    const parent = postEl.querySelector('parent');

    if (parent) {
      const pid = parent.getAttribute('dsq:id');

      if (!pid) {
        return;
      }

      idMap[objectId] = pid;
    }
  });

  const rootIdMap: Record<string, string> = {};

  posts
    .filter((postEl) => postEl.querySelector('parent'))
    .forEach((postEl) => {
      const objectId = postEl.getAttribute('dsq:id')!;

      let rid = postEl.querySelector('parent')?.getAttribute('dsq:id')!;

      while (idMap[rid]) rid = idMap[rid];

      rootIdMap[objectId] = rid;
    });

  const data = posts.map((postEl) => {
    const objectId = postEl.getAttribute('dsq:id')!;
    const comment = postEl.querySelector('message')?.textContent;
    const insertedAt = new Date(
      postEl.querySelector('createdAt')?.textContent!,
    ).toISOString();
    const nick = postEl.querySelector('author name')?.textContent;
    const threadId = postEl.querySelector('thread')?.getAttribute('dsq:id')!;
    const url = articleMap[threadId];
    const parent = postEl.querySelector('parent');
    const pid = parent ? parent.getAttribute('dsq:id') : null;
    const rid = parent ? rootIdMap[objectId] : null;
    const isSpam =
      postEl.querySelector('isSpam')?.textContent?.toLowerCase() !== 'false';

    return {
      objectId,
      comment,
      insertedAt: {
        __type: 'Date',
        iso: insertedAt,
      },
      createdAt: insertedAt,
      updatedAt: insertedAt,
      ip: '',
      link: '',
      mail: '',
      nick,
      ua: '',
      url,
      pid,
      rid,
      status: isSpam ? 'spam' : 'approved',
    };
  });

  return {
    results: data,
  };
};
