const Base = require('./base.js');

module.exports = class CommentLogic extends Base {
  checkAdmin() {
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.ctx.throw(401);
    }

    if (userInfo.type !== 'administrator') {
      return this.ctx.throw(403);
    }
  }

  getAction() {
    const { type, path } = this.get();
    const isAllowedGet = type !== 'list' || path;

    if (!isAllowedGet) {
      this.checkAdmin();
    }

    switch (type) {
      case 'recent': {
        this.rules = {
          count: {
            int: { max: 50 },
            default: 10,
          },
        };
        break;
      }

      case 'count': {
        this.rules = {
          url: {
            array: true,
          },
        };
        break;
      }

      case 'list': {
        const { userInfo } = this.ctx.state;

        if (userInfo.type !== 'administrator') {
          return this.fail();
        }

        this.rules = {
          page: {
            int: true,
            default: 1,
          },
          pageSize: {
            int: { max: 100 },
            default: 10,
          },
        };
        break;
      }

      default: {
        this.rules = {
          path: {
            string: true,
            required: true,
          },
          page: {
            int: true,
            default: 1,
          },
          pageSize: {
            int: { max: 100 },
            default: 10,
          },
          sortBy: {
            in: ['insertedAt_desc', 'insertedAt_asc', 'like_desc'],
            default: 'insertedAt_desc',
          },
        };
        break;
      }
    }
  }

  async postAction() {
    const { LOGIN } = process.env;
    const { userInfo } = this.ctx.state;

    this.rules = {
      url: {
        string: true,
        required: true,
      },
      comment: {
        string: true,
        required: true,
      },
    };

    if (!think.isEmpty(userInfo)) {
      return;
    }

    if (LOGIN === 'force') {
      return this.ctx.throw(401);
    }

    return this.useCaptchaCheck();
  }

  async putAction() {
    const { userInfo } = this.ctx.state;
    const data = this.post();

    // 1. like action
    if (think.isBoolean(data.like) && Object.keys(data).toString() === 'like') {
      return;
    }

    if (think.isEmpty(userInfo)) {
      return this.ctx.throw(401);
    }

    // 2. administrator
    if (userInfo.type === 'administrator') {
      return;
    }

    // 3. comment author modify comment content
    const modelInstance = this.getModel('Comment');
    const commentData = await modelInstance.select({
      user_id: userInfo.objectId,
      objectId: this.id,
    });

    if (!think.isEmpty(commentData)) {
      return;
    }

    return this.ctx.throw(403);
  }

  async deleteAction() {
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.ctx.throw(401);
    }

    if (userInfo.type === 'administrator') {
      return;
    }

    const modelInstance = this.getModel('Comment');
    const commentData = await modelInstance.select({
      user_id: userInfo.objectId,
      objectId: this.id,
    });

    if (!think.isEmpty(commentData)) {
      return;
    }

    return this.ctx.throw(403);
  }
};
