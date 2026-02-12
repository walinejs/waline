/**
 * twikoo 数据结构转 leancloud
 */
export const tk2lc = (input: string) => {
  let arr: any[];
  try {
    arr = JSON.parse(input);
  } catch {
    // compat old twikoo output json format
    arr = input
      .trim()
      .split(/[\r\n]+/)
      .filter((v) => v)
      .map((text) => JSON.parse(text));
  }

  const data = arr.map(
    ({ _id, comment, created, updated, ip, link, mail, nick, ua, url, pid, rid, isSpam }) => ({
      objectId: typeof _id === 'string' ? _id : _id.$oid,
      comment: comment,
      insertedAt: {
        __type: 'Date',
        iso: new Date(created?.$numberLong ? Number(created.$numberLong) : created).toISOString(),
      },
      createdAt: new Date(
        created?.$numberLong ? Number(created.$numberLong) : created,
      ).toISOString(),
      updatedAt: new Date(
        updated?.$numberLong ? Number(updated.$numberLong) : updated,
      ).toISOString(),
      ip,
      link,
      mail,
      nick,
      ua,
      url,
      pid,
      rid,
      status: isSpam ? 'spam' : 'approved',
    }),
  );

  return {
    results: data,
  };
};
