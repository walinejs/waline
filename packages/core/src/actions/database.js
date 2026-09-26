/* oxlint-disable import/no-commonjs, import/unambiguous, unicorn/prefer-module */

const TABLES = new Set(['Comment', 'Counter', 'Users']);

const getRepository = (repositories, table) => {
  if (!TABLES.has(table)) {
    throw new TypeError(`Unsupported table: ${table}`);
  }

  return repositories[table];
};

const exportDatabase = async ({ Comment, Counter, Users }) => {
  const entries = await Promise.all(
    Object.entries({ Comment, Counter, Users }).map(async ([name, repository]) => [
      name,
      await repository.select({}),
    ]),
  );
  const data = Object.fromEntries(entries);

  return { type: 'waline', version: 1, time: Date.now(), tables: [...TABLES], data };
};

const importDatabaseItem = async ({ table, item, storage }, repositories, { formatDate } = {}) => {
  const data = { ...item };
  const repository = getRepository(repositories, table);

  if (storage === 'leancloud' || storage === 'mysql') {
    for (const field of ['insertedAt', 'createdAt', 'updatedAt']) {
      if (data[field]) data[field] = new Date(data[field]);
    }
  }
  if (storage === 'mysql' && formatDate) {
    for (const field of ['insertedAt', 'createdAt', 'updatedAt']) {
      if (data[field]) data[field] = formatDate(data[field]);
    }
  }

  delete data.objectId;
  return repository.add(data);
};

const updateDatabaseItem = async ({ table, objectId, data }, repositories) => {
  const nextData = { ...data };
  delete nextData.objectId;
  delete nextData.createdAt;
  delete nextData.updatedAt;
  await getRepository(repositories, table).update(nextData, { objectId });
};

const clearDatabaseTable = async ({ table }, repositories) =>
  getRepository(repositories, table).delete({});

module.exports = { clearDatabaseTable, exportDatabase, importDatabaseItem, updateDatabaseItem };
