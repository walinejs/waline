import request from '../../utils/request.js';

const RELATIONSHIPS = [
  ['pid', 'Comment'],
  ['rid', 'Comment'],
  ['user_id', 'Users'],
];

const getMappedId = (map, id) => (id && map && Object.hasOwn(map, id) ? map[id] : undefined);

export const restoreCommentRelationships = async (comments, idMaps, onProgress) => {
  const updates = [];

  for (const comment of comments) {
    const objectId = getMappedId(idMaps.Comment, comment.objectId);
    if (!objectId) continue;

    const body = {};
    for (const [field, table] of RELATIONSHIPS) {
      const mappedId = getMappedId(idMaps[table], comment[field]);
      // The initial insert omitted these fields, even if an ID did not change.
      if (mappedId) body[field] = mappedId;
    }

    if (Object.keys(body).length > 0) updates.push({ objectId, body });
  }

  let completed = 0;
  for (const { objectId, body } of updates) {
    // oxlint-disable-next-line no-await-in-loop
    await request({ url: `db?table=Comment&objectId=${objectId}`, method: 'PUT', body });
    completed += 1;
    onProgress(completed, updates.length);
  }
};
