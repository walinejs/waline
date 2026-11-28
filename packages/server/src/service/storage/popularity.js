const POPULARITY = '__waline_popularity';
const REPLIES = '__waline_replies';

const isPopularityOrder = (order = []) => order.some(({ field }) => field === 'popularity');

// Compute on read so moderation, deletion, imports and existing data need no
// extra writes or migration. Only public replies from the same page contribute.
const sqlPopularity = (tableName, quote) => {
  const table = quote(tableName);
  const replies = quote(REPLIES);
  const column = (table, field) => `${table}.${quote(field)}`;

  return `(COALESCE(${column(table, 'like')}, 0) + (SELECT COALESCE(SUM(1 + COALESCE(${column(replies, 'like')}, 0)), 0) FROM ${table} AS ${replies} WHERE ${column(replies, 'rid')} = ${column(table, 'id')} AND ${column(replies, 'url')} = ${column(table, 'url')} AND ${column(replies, 'status')} NOT IN ('waiting', 'spam')))`;
};

const withPopularity = (roots, comments) => {
  const scores = new Map();
  const key = (url, id) => JSON.stringify([url, String(id)]);

  for (const reply of comments) {
    if (reply.rid == null || reply.rid === '' || ['waiting', 'spam'].includes(reply.status)) {
      continue;
    }
    const id = key(reply.url, reply.rid);
    scores.set(id, (scores.get(id) ?? 0) + 1 + (Number(reply.like) || 0));
  }

  return roots.map((root) => ({
    ...root,
    [POPULARITY]:
      (Number(root.like) || 0) + (scores.get(key(root.url, root.objectId ?? root.id)) ?? 0),
  }));
};

const withoutPopularity = ({ [POPULARITY]: _score, [REPLIES]: _replies, ...row }) => row;

module.exports = {
  POPULARITY,
  REPLIES,
  isPopularityOrder,
  sqlPopularity,
  withPopularity,
  withoutPopularity,
};
