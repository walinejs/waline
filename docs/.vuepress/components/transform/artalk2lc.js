import marked from 'marked';

const parseKey = (key) => {
  const anchor = document.createElement('a');
  anchor.href = key;
  return anchor.pathname || key;
};

// artalk 数据结构转 leancloud
export const artalk2lc = (input) => {
  input = JSON.parse(input);

  const idMap = {};

  for (let i = 0; i < input.length; i++) {
    idMap[input[i].id] = input[i].rid;
  }
  const rootIdMap = {};

  for (let i = 0; i < input.length; i++) {
    if (!input[i].rid) {
      continue;
    }

    let rid = input[i].rid;
    while (idMap[rid]) {
      rid = idMap[rid];
    }
    rootIdMap[input[i].id] = rid;
  }

  return {
    results: input.map(
      ({ content, date, email, id, ip, link, nick, page_key, rid, ua }) => {
        const time = new Date(date.replace(/-/g, '/')).toISOString();
        const url = parseKey(page_key);
        return {
          objectId: id,
          QQAvatar: '',
          comment: marked(content),
          insertedAt: {
            __type: 'Date',
            iso: time,
          },
          mail: email,
          createdAt: time,
          updatedAt: time,
          ip: ip,
          link: link,
          nick: nick,
          ua: ua,
          url: url,
          pid: rid ? rid : null,
          rid: rootIdMap[id] || null,
          status: 'approved',
        };
      }
    ),
  };
};
