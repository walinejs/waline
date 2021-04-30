// commento 数据结构转 leancloud
export const commento2lc = (input) => {
  input = JSON.parse(input);
  const comments = input.comments;
  const commenters = {};

  if (Array.isArray(input.commenters)) {
    input.commenters.forEach((commenter) => {
      commenters[commenter.commenterHex] = {
        nick: commenter.name,
        mail: commenter.email,
        link: commenter.link !== 'undefined' ? commenter.link : undefined,
      };
    });
  }

  const hexMaps = {};

  comments
    .filter((comment) => comment.parentHex && comment.parentHex !== 'root')
    .forEach((comment) => {
      hexMaps[comment.commentHex] = comment.parentHex;
    });

  const rootHexMaps = {};

  comments
    .filter((comment) => comment.parentHex && comment.parentHex !== 'root')
    .forEach((comment) => {
      let rid = comment.parentHex;
      while (hexMaps[rid]) {
        rid = hexMaps[rid];
      }
      rootHexMaps[comment.commentHex] = rid;
    });

  return {
    results: comments
      .filter((comment) => !comment.deleted)
      .map((comment) => {
        const commenter = commenters[comment.commenterHex]
          ? commenters[comment.commenterHex]
          : {
              nick: 'Anonymous',
              mail: '',
              link: '',
            };

        return Object.assign(
          {
            objectId: comment.commentHex,
            QQAvatar: '',
            comment: comment.html || comment.markdown,
            insertedAt: {
              __type: 'Date',
              iso: comment.creationDate,
            },
            createdAt: comment.creationDate,
            updatedAt: comment.creationDate,
            ip: '',
            ua: '',
            url: comment.url,
            pid: comment.parentHex !== 'root' ? comment.parentHex : '',
            rid: rootHexMaps[comment.commentHex]
              ? rootHexMaps[comment.commentHex]
              : '',
            status: comment.state === 'approved' ? 'approved' : 'waiting',
          },
          commenter
        );
      }),
  };
};
