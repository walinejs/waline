// leancloud 数据结构转 cloudbase
export const lc2tcb = (json) =>
  json.results
    .map((comment) => {
      if (comment.hasOwnProperty('objectId')) {
        comment._id = comment.objectId;
        delete comment.objectId;
      } else if (typeof comment._id !== 'string' && comment._id.$oid) {
        comment._id = comment._id.$oid;
      }

      if (typeof comment.insertedAt === 'object' && comment.insertedAt.iso) {
        comment.insertedAt = { $date: comment.insertedAt.iso };
      }

      delete comment.ACL;

      return JSON.stringify(comment);
    })
    .join('\r\n');
