const Module = require('node:module');

const originalLoad = Module._load;

Module._load = function (request, parent, isMain) {
  if (request.includes('mathjax-newcm-font')) {
    console.log('[MathJax module load]', {
      request,
      parent: parent?.filename,
      stack: new Error().stack,
    });
  }

  return originalLoad.call(this, request, parent, isMain);
};

// const originalResolveFilename = Module._resolveFilename;

// Module._resolveFilename = function (request, parent, isMain, options) {
//   if (request === '@mathjax/mathjax-newcm-font') {
//     request = '@mathjax/mathjax-newcm-font/js/svg.js';
//   }

//   return originalResolveFilename.call(this, request, parent, isMain, options);
// };

const fs = require('node:fs');
const path = require('node:path');

const createApplication = require('../../..');

const storePath =
  process.env.WALINE_TEST_COMMENT_STORE || path.join('/tmp', 'waline-vercel-comments.json');

const readComments = () => {
  try {
    return JSON.parse(fs.readFileSync(storePath, 'utf8'));
  } catch {
    return [];
  }
};

const writeComments = (comments) => {
  fs.writeFileSync(storePath, JSON.stringify(comments), 'utf8');
};

const matchValue = (actual, expected) => {
  if (Array.isArray(expected)) {
    const [operator, value] = expected;

    if (operator === 'NOT IN') return !value.includes(actual);
    if (operator === 'IN') return value.includes(actual);
    if (operator === '>') return new Date(actual).getTime() > new Date(value).getTime();
  }

  return actual === expected;
};

const matchesWhere = (comment, where = {}) =>
  Object.entries(where).every(([key, value]) => {
    if (key === '_complex') return true;
    if (value === undefined) return comment[key] === undefined;

    return matchValue(comment[key], value);
  });

const createCommentModel = () => ({
  add: async (comment) => {
    const comments = readComments();
    const savedComment = {
      ...comment,
      objectId: `vercel-comment-${comments.length + 1}`,
      insertedAt: new Date(comment.insertedAt).toISOString(),
    };

    comments.push(savedComment);
    writeComments(comments);

    return savedComment;
  },
  select: async (where = {}) => readComments().filter((comment) => matchesWhere(comment, where)),
  count: async (where = {}) =>
    readComments().filter((comment) => matchesWhere(comment, where)).length,
});

module.exports = createApplication({
  customModel: (modelName) => {
    if (modelName === 'Comment') return createCommentModel();

    if (modelName === 'Users') {
      return {
        select: async () => [],
        add: async () => ({}),
        update: async () => null,
        delete: async () => null,
        count: async () => 0,
      };
    }
  },
});
