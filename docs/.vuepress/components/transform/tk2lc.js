// twikoo 数据结构转 leancloud
export const tk2lc = (input) => {
  const data = input
    .trim()
    .split(/[\r\n]+/)
    .filter((v) => v)
    .map((text) => {
      const cmt = JSON.parse(text);
      return {
        objectId: cmt._id,
        QQAvatar: '',
        comment: cmt.comment,
        insertedAt: {
          __type: 'Date',
          iso: new Date(cmt.created).toISOString(),
        },
        createdAt: new Date(cmt.created).toISOString(),
        updatedAt: new Date(cmt.updated).toISOString(),
        ip: cmt.ip,
        link: cmt.link,
        mail: cmt.mail,
        nick: cmt.nick,
        ua: cmt.ua,
        url: cmt.url,
        pid: cmt.pid,
        rid: cmt.rid,
        status: cmt.isSpam ? 'spam' : 'approved',
      };
    });

  return {
    results: data,
  };
};
