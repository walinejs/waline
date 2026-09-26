/* oxlint-disable import/no-commonjs, import/unambiguous, unicorn/prefer-module */

const getArticleCounters = async ({ path, type = ['time'], deprecated = false }, { counters }) => {
  if (!Array.isArray(path) || path.length === 0) {
    return 0;
  }

  const records = await counters.select({ url: ['IN', path] });
  if (records.length === 0) {
    const empty = path.map(() =>
      type.length === 1 && deprecated ? 0 : Object.fromEntries(type.map((field) => [field, 0])),
    );

    return path.length === 1 && deprecated ? empty[0] : empty;
  }

  const recordsByUrl = new Map(records.map((record) => [record.url, record]));
  const result = path.map((url) => {
    const values = Object.fromEntries(
      type.map((field) => [field, recordsByUrl.get(url)?.[field] || 0]),
    );

    return type.length === 1 && deprecated ? values[type[0]] : values;
  });

  return path.length === 1 && deprecated ? result[0] : result;
};

const updateArticleCounter = async (
  { path, type = 'time', action = 'inc', deprecated = false },
  { counters, clock = Date },
) => {
  const records = await counters.select({ url: path });
  if (records.length === 0) {
    if (action === 'desc') {
      return deprecated ? 0 : [0];
    }

    await counters.add({ url: path, [type]: 1 }, { access: { read: true, write: true } });
    return deprecated ? 1 : [{ [type]: 1 }];
  }

  const updated = await counters.update(
    (counter) => ({
      [type]: action === 'desc' ? (counter[type] || 1) - 1 : (counter[type] || 0) + 1,
      updatedAt: new Date(clock.now()),
    }),
    { objectId: ['IN', records.map(({ objectId }) => objectId)] },
  );

  return deprecated ? updated[0][type] : [{ [type]: updated[0][type] }];
};

module.exports = { getArticleCounters, updateArticleCounter };
