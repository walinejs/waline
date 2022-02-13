// disqus 数据结构转 leancloud
export const disqus2lc = (input) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(input, 'application/xml');
  const posts = Array.from(dom.querySelectorAll('post')).filter((postEl) => {
    const isDeleted = postEl
      .querySelector('isDeleted')
      .textContent.toLowerCase();
    return isDeleted === 'false';
  });
  const threads = Array.from(dom.querySelectorAll('disqus > thread'));

  const articleMap = {};

  threads.forEach((threadEl) => {
    const url = threadEl.querySelector('link').textContent;
    const anchor = new URL(url);
    const threadId = threadEl.getAttribute('dsq:id');
    articleMap[threadId] = anchor.pathname;
  });

  const idMap = {};

  posts.forEach((postEl) => {
    const objectId = postEl.getAttribute('dsq:id');
    if (!postEl.querySelector('parent')) {
      return;
    }

    const pid = postEl.querySelector('parent').getAttribute('dsq:id');
    idMap[objectId] = pid;
  });

  const rootIdMap = {};

  posts
    .filter((postEl) => postEl.querySelector('parent'))
    .forEach((postEl) => {
      const objectId = postEl.getAttribute('dsq:id');
      let rid = postEl.querySelector('parent').getAttribute('dsq:id');
      while (idMap[rid]) {
        rid = idMap[rid];
      }
      rootIdMap[objectId] = rid;
    });

  const data = posts.map((postEl) => {
    const objectId = postEl.getAttribute('dsq:id');
    const comment = postEl.querySelector('message').textContent;
    const insertedAt = new Date(
      postEl.querySelector('createdAt').textContent
    ).toISOString();
    const nick = postEl.querySelector('author name').textContent;
    const threadId = postEl.querySelector('thread').getAttribute('dsq:id');
    const url = articleMap[threadId];
    const parent = postEl.querySelector('parent');
    const pid = parent ? parent.getAttribute('dsq:id') : null;
    const rid = parent ? rootIdMap[objectId] : null;
    const isSpam =
      postEl.querySelector('isSpam').textContent.toLowerCase() !== 'false';

    return {
      objectId,
      QQAvatar: '',
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
