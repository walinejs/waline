/**
 * commento 数据结构转 leancloud
 */

export const commento2lc = (input) => {
  const data = JSON.parse(input);

  const { comments } = data;
  const commenters = {};
  const hexMaps = {};
  const rootHexMaps = {};

  if (Array.isArray(data.commenters)) {
    data.commenters.forEach((commenter) => {
      commenters[commenter.commenterHex] = {
        nick: commenter.name,
        mail: commenter.email,
        link: commenter.link !== 'undefined' ? commenter.link : undefined,
      };
    });
  }

  comments
    .filter((comment) => comment.parentHex && comment.parentHex !== 'root')
    .forEach((comment) => {
      hexMaps[comment.commentHex] = comment.parentHex;
    });

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
      .filter(({ deleted }) => !deleted)
      .map(
        ({
          commentHex,
          commenterHex,
          parentHex,
          creationDate,
          html,
          markdown,
          url,
          state,
        }) => {
          const commenter = commenters[commenterHex] || {
            nick: 'Anonymous',
            mail: '',
            link: '',
          };

          return Object.assign(
            {
              objectId: commentHex,
              QQAvatar: '',
              comment: html || markdown,
              insertedAt: {
                __type: 'Date',
                iso: creationDate,
              },
              createdAt: creationDate,
              updatedAt: creationDate,
              ip: '',
              ua: '',
              url: url,
              pid: parentHex !== 'root' ? parentHex : '',
              rid: rootHexMaps[commentHex] ? rootHexMaps[commentHex] : '',
              status: state === 'approved' ? 'approved' : 'waiting',
            },
            commenter
          );
        }
      ),
  };
};
