/**
 * twikoo 数据结构转 leancloud
 */
export const tk2lc = (input) => {
  const data = input
    .trim()
    .split(/[\r\n]+/)
    .filter((v) => v)
    .map((text) => {
      const {
        _id,
        comment,
        created,
        updated,
        ip,
        link,
        mail,
        nick,
        ua,
        url,
        pid,
        rid,
        isSpam,
      } = JSON.parse(text);
      return {
        objectId: typeof _id === 'string' ? _id : _id.$oid,
        QQAvatar: '',
        comment: comment,
        insertedAt: {
          __type: 'Date',
          iso: new Date(created).toISOString(),
        },
        createdAt: new Date(created).toISOString(),
        updatedAt: new Date(updated).toISOString(),
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
    });

  return {
    results: data,
  };
};
