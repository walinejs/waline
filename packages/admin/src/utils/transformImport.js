const toISOString = (date) => new Date(date).toISOString();

const parseJSONLines = (input) => {
  try {
    return JSON.parse(input);
  } catch {
    return input
      .trim()
      .split(/[\r\n]+/u)
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  }
};

const parseValine = (input) => {
  const data = parseJSONLines(input);

  return Array.isArray(data) ? data : data.results;
};

const transformDisqus = (input) => {
  const dom = new DOMParser().parseFromString(input, 'application/xml');
  const posts = Array.from(dom.querySelectorAll('post')).filter(
    (post) => post.querySelector('isDeleted')?.textContent?.toLowerCase() !== 'true',
  );
  const articleMap = {};

  dom.querySelectorAll('disqus > thread').forEach((thread) => {
    const threadId = thread.getAttribute('dsq:id');
    const url = thread.querySelector('link')?.textContent;

    if (!threadId) return;

    try {
      articleMap[threadId] = url ? new URL(url).pathname : '';
    } catch {
      articleMap[threadId] = url ?? '';
    }
  });

  const parentMap = {};
  posts.forEach((post) => {
    const id = post.getAttribute('dsq:id');
    const parentId = post.querySelector('parent')?.getAttribute('dsq:id');

    if (id && parentId) parentMap[id] = parentId;
  });

  return posts.map((post) => {
    const objectId = post.getAttribute('dsq:id');
    const parentId = post.querySelector('parent')?.getAttribute('dsq:id');
    let rootId = parentId;

    while (rootId && parentMap[rootId]) rootId = parentMap[rootId];

    const createdAt = toISOString(post.querySelector('createdAt')?.textContent);

    return {
      objectId,
      comment: post.querySelector('message')?.textContent ?? '',
      insertedAt: createdAt,
      createdAt,
      updatedAt: createdAt,
      ip: '',
      link: '',
      mail: '',
      nick: post.querySelector('author name')?.textContent ?? '',
      ua: '',
      url: articleMap[post.querySelector('thread')?.getAttribute('dsq:id')] ?? '',
      pid: parentId,
      rid: rootId,
      status:
        post.querySelector('isSpam')?.textContent?.toLowerCase() === 'false' ? 'approved' : 'spam',
    };
  });
};

const transformTwikoo = (input) =>
  parseJSONLines(input).map(
    ({ _id, comment, created, updated, ip, link, mail, nick, ua, url, pid, rid, isSpam }) => {
      const createdAt = toISOString(created?.$numberLong ? Number(created.$numberLong) : created);
      const updatedAt = toISOString(updated?.$numberLong ? Number(updated.$numberLong) : updated);

      return {
        objectId: typeof _id === 'string' ? _id : _id?.$oid,
        comment,
        insertedAt: createdAt,
        createdAt,
        updatedAt,
        ip,
        link,
        mail,
        nick,
        ua,
        url,
        pid,
        rid,
        status: isSpam ? 'spam' : 'approved',
      };
    },
  );

const transformArtalk = (input) => {
  const comments = JSON.parse(input);
  const parentMap = Object.fromEntries(comments.map(({ id, rid }) => [id, rid]));

  return comments.map(
    ({
      content,
      date,
      created_at: createdAtValue,
      email,
      id,
      ip,
      link,
      nick,
      page_key: pageKey,
      rid,
      ua,
      is_pinned: isPinned,
      is_pending: isPending,
      vote_down: voteDown,
      vote_up: voteUp,
    }) => {
      const createdAt = toISOString((date ?? createdAtValue).replaceAll('-', '/'));
      let rootId = rid;

      while (rootId && parentMap[rootId]) rootId = parentMap[rootId];

      return {
        objectId: id,
        comment: content,
        insertedAt: createdAt,
        createdAt,
        updatedAt: createdAt,
        ip,
        link,
        mail: email,
        nick,
        ua,
        url: pageKey,
        pid: rid,
        rid: rootId,
        status: isPending === false || isPending === 'false' ? 'approved' : 'waiting',
        sticky: isPinned === true || isPinned === 'true',
        like: Number(voteUp) - Number(voteDown) || 0,
      };
    },
  );
};

const transformCommento = (input) => {
  const { comments, commenters = [] } = JSON.parse(input);
  const commenterMap = Object.fromEntries(
    commenters.map(({ commenterHex, name, email, link }) => [
      commenterHex,
      { nick: name, mail: email, link: link === 'undefined' ? undefined : link },
    ]),
  );
  const parentMap = Object.fromEntries(
    comments
      .filter(({ parentHex }) => parentHex && parentHex !== 'root')
      .map(({ commentHex, parentHex }) => [commentHex, parentHex]),
  );

  return comments
    .filter(({ deleted }) => !deleted)
    .map(({ commentHex, commenterHex, parentHex, creationDate, html, markdown, url, state }) => {
      let rootId = parentHex;

      while (rootId && parentMap[rootId]) rootId = parentMap[rootId];

      return {
        objectId: commentHex,
        comment: html || markdown,
        insertedAt: creationDate,
        createdAt: creationDate,
        updatedAt: creationDate,
        ip: '',
        ua: '',
        url,
        pid: parentHex === 'root' ? undefined : parentHex,
        rid: rootId === 'root' ? undefined : rootId,
        status: state === 'approved' ? 'approved' : 'waiting',
        ...(commenterMap[commenterHex] ?? { nick: 'Anonymous', mail: '', link: '' }),
      };
    });
};

export const transformImport = (source, input) => {
  const comments =
    source === 'disqus'
      ? transformDisqus(input)
      : source === 'twikoo'
        ? transformTwikoo(input)
        : source === 'artalk'
          ? transformArtalk(input)
          : source === 'commento'
            ? transformCommento(input)
            : parseValine(input);

  if (!Array.isArray(comments)) throw new TypeError('Invalid import data');

  return {
    type: 'waline',
    version: 1,
    tables: ['Comment'],
    data: { Comment: comments },
  };
};
