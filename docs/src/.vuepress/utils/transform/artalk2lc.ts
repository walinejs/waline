import { marked } from 'marked';

const parseKey = (key: string): string => {
  const anchor = document.createElement('a');

  anchor.href = key;

  return anchor.pathname || key;
};

/**
 * artalk 数据结构转 leancloud
 */

export const artalk2lc = (input) => {
  input = JSON.parse(input);

  const idMap = {};
  const rootIdMap = {};

  for (let i = 0; i < input.length; i++) {
    idMap[input[i].id] = input[i].rid;
  }

  for (let i = 0; i < input.length; i++) {
    if (!input[i].rid) continue;

    let rid = input[i].rid;

    while (idMap[rid]) rid = idMap[rid];

    rootIdMap[input[i].id] = rid;
  }

  return {
    results: input.map(
      ({
        content,
        date,
        created_at,
        email,
        id,
        ip,
        link,
        nick,
        page_key,
        rid,
        ua,
        is_pinned,
        is_pending,
        vote_down,
        vote_up,
      }) => {
        const time =
          date || created_at
            ? new Date((date || created_at).replace(/-/g, '/')).toISOString()
            : '';
        const url = parseKey(page_key);
        return {
          objectId: id,
          comment: marked.parse(content),
          insertedAt: {
            __type: 'Date',
            iso: time,
          },
          mail: email,
          createdAt: time,
          updatedAt: time,
          ip,
          link,
          nick,
          ua,
          url,
          pid: rid || null,
          rid: rootIdMap[id] || null,
          status: is_pending !== 'false' ? 'waiting' : 'approved',
          sticky: is_pinned === 'true',
          like: vote_up && vote_down ? vote_up - vote_down : 0,
        };
      },
    ),
  };
};
