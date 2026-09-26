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
  const comments = Array.isArray(data) ? data : data.results;

  comments.forEach((comment) => {
    comment.insertedAt = comment.insertedAt?.iso ?? comment.insertedAt;
    comment.createdAt = comment.createdAt?.iso ?? comment.createdAt;
    comment.updatedAt = comment.updatedAt?.iso ?? comment.updatedAt;
    delete comment.ACL;
  });

  return comments;
};

const transformDisqus = (input) => {
  const dom = new DOMParser().parseFromString(input, 'application/xml');
  const posts = [...dom.querySelectorAll('post')].filter(
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

const parsePageKey = (pageKey) => {
  try {
    return new URL(pageKey).pathname;
  } catch {
    return pageKey;
  }
};

// oxlint-disable-next-line unicorn/prefer-query-selector -- CSS namespace selectors are not reliably supported
const getElements = (element, name) => element.getElementsByTagName(name);

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

      const comment = {
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
        url: parsePageKey(pageKey),
        pid: rid || undefined,
        rid: rootId || undefined,
        status: isPending === false || isPending === 'false' ? 'approved' : 'waiting',
        sticky: isPinned === true || isPinned === 'true',
        like: Number(voteUp) - Number(voteDown) || 0,
      };

      return comment;
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

      const commenter = commenterMap[commenterHex] ?? { nick: 'Anonymous', mail: '', link: '' };
      const comment = {
        objectId: commentHex,
        comment: html || markdown,
        insertedAt: creationDate,
        createdAt: creationDate,
        updatedAt: creationDate,
        ip: '',
        link: commenter.link,
        mail: commenter.mail,
        nick: commenter.nick,
        ua: '',
        url,
        pid: parentHex === 'root' ? undefined : parentHex,
        rid: rootId === 'root' ? undefined : rootId,
        status: state === 'approved' ? 'approved' : 'waiting',
      };

      return comment;
    });
};

const transformWordPress = (input) => {
  const dom = new DOMParser().parseFromString(input, 'application/xml');

  return [...getElements(dom, 'item')].flatMap((item) => {
    const url = parsePageKey(item.querySelector('link')?.textContent ?? '');
    const comments = [...getElements(item, 'wp:comment')].filter((comment) => {
      const type = getElements(comment, 'wp:comment_type')[0]?.textContent;
      const status = getElements(comment, 'wp:comment_approved')[0]?.textContent;

      return (!type || type === 'comment') && status !== 'trash' && status !== 'post-trashed';
    });
    const parentMap = Object.fromEntries(
      comments
        .map((comment) => [
          getElements(comment, 'wp:comment_id')[0]?.textContent,
          getElements(comment, 'wp:comment_parent')[0]?.textContent,
        ])
        .filter(([id, parentId]) => id && parentId && parentId !== '0'),
    );

    return comments.map((comment) => {
      const getText = (name) => getElements(comment, name)[0]?.textContent ?? '';
      const parentId = getText('wp:comment_parent');
      const dateGmt = getText('wp:comment_date_gmt');
      const date = dateGmt || getText('wp:comment_date');
      const createdAt = toISOString(`${date.replace(' ', 'T')}${dateGmt ? 'Z' : ''}`);
      const status = getText('wp:comment_approved');
      let rootId = parentId;

      while (rootId && parentMap[rootId]) rootId = parentMap[rootId];

      return {
        objectId: getText('wp:comment_id'),
        comment: getText('wp:comment_content'),
        insertedAt: createdAt,
        createdAt,
        updatedAt: createdAt,
        ip: getText('wp:comment_author_IP'),
        link: getText('wp:comment_author_url'),
        mail: getText('wp:comment_author_email'),
        nick: getText('wp:comment_author'),
        ua: '',
        url,
        pid: parentId === '0' ? undefined : parentId,
        rid: rootId === '0' ? undefined : rootId,
        status: status === '1' ? 'approved' : status === 'spam' ? 'spam' : 'waiting',
      };
    });
  });
};

export const transformImport = (source, input) => {
  let comments;

  switch (source) {
    case 'disqus': {
      comments = transformDisqus(input);
      break;
    }
    case 'twikoo': {
      comments = transformTwikoo(input);
      break;
    }
    case 'artalk': {
      comments = transformArtalk(input);
      break;
    }
    case 'commento': {
      comments = transformCommento(input);
      break;
    }
    case 'wordpress': {
      comments = transformWordPress(input);
      break;
    }
    default: {
      comments = parseValine(input);
    }
  }

  if (!Array.isArray(comments)) throw new TypeError('Invalid import data');

  return {
    type: 'waline',
    version: 1,
    tables: ['Comment'],
    data: { Comment: comments },
  };
};
