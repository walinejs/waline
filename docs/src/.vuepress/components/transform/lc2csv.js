import CSV from './csv.js';

/**
 * leancloud 数据结构转 csv
 */
export const lc2csv = (input) => {
  const field = [
    'id',
    'nick',
    'updatedAt',
    'mail',
    'ua',
    'ip',
    'status',
    'insertedAt',
    'createdAt',
    'comment',
    'pid',
    'rid',
    'link',
    'url',
    'user_id',
  ];

  const keyMaps = {};

  const getId = (row) => {
    if (row.hasOwnProperty('objectId')) {
      return row.objectId;
    }

    if (typeof row._id !== 'string' && row._id.$oid) {
      return row._id.$oid;
    }
  };

  let index = 1;

  input.results.forEach((row) => {
    const id = getId(row);
    if (id) {
      keyMaps[id] = index;
    }
    index += 1;
  });

  const records = [];

  input.results.forEach((row) => {
    const id = getId(row);
    if (id) {
      row.id = keyMaps[id].toString();
    }
    row.pid = keyMaps[row.pid];
    row.rid = keyMaps[row.rid];
    row.status = row.status || 'approved';

    const record = {};
    for (let i = 0; i < field.length; i++) {
      const key = field[i];
      switch (key) {
        case 'insertedAt':
          record[key] = row[key].iso.replace('T', ' ').replace(/.\d{3}Z$/i, '');
          break;
        case 'createdAt':
        case 'updatedAt':
          record[key] = row[key].replace('T', ' ').replace(/.\d{3}Z$/i, '');
          break;
        case 'rid':
        case 'pid':
          record[key] = row[key] || null;
          break;
        default:
          record[key] = row[key] || '';
          break;
      }
    }
    records.push(record);
  });

  const ret = CSV.serialize({
    fields: field.map((name) => ({ id: name, label: name })),
    records,
  });

  return ret;
};
