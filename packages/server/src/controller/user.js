const { PasswordHash } = require('phpass');
const BaseRest = require('./rest');

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.service(
      `storage/${this.config('storage')}`,
      'Users'
    );
  }

  async getAction() {
    const { page, pageSize, email } = this.get();
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo) || userInfo.type !== 'administrator') {
      const users = await this.getUsersListByCount();

      return this.success(users);
    }

    if (email) {
      const user = await this.modelInstance.select({ email });

      if (think.isEmpty(user)) {
        return this.success();
      }

      return this.success(user[0]);
    }

    const count = await this.modelInstance.count({});
    const users = await this.modelInstance.select(
      {},
      {
        desc: 'createdAt',
        limit: pageSize,
        offset: Math.max((page - 1) * pageSize, 0),
      }
    );

    return this.success({
      page,
      totalPages: Math.ceil(count / pageSize),
      pageSize,
      data: users,
    });
  }

  async postAction() {
    const data = this.post();
    const resp = await this.modelInstance.select({
      email: data.email,
    });

    if (
      !think.isEmpty(resp) &&
      ['administrator', 'guest'].includes(resp[0].type)
    ) {
      return this.fail(this.locale('USER_EXIST'));
    }

    const count = await this.modelInstance.count();

    const {
      SMTP_HOST,
      SMTP_SERVICE,
      SENDER_EMAIL,
      SENDER_NAME,
      SMTP_USER,
      SITE_NAME,
    } = process.env;
    const hasMailService = SMTP_HOST || SMTP_SERVICE;

    const token = Array.from({ length: 4 }, () =>
      Math.round(Math.random() * 9)
    ).join('');
    const normalType = hasMailService
      ? `verify:${token}:${Date.now() + 1 * 60 * 60 * 1000}`
      : 'guest';

    data.password = new PasswordHash().hashPassword(data.password);
    data.type = think.isEmpty(count) ? 'administrator' : normalType;

    if (think.isEmpty(resp)) {
      await this.modelInstance.add(data);
    } else {
      await this.modelInstance.update(data, { email: data.email });
    }

    if (!/^verify:/i.test(data.type)) {
      return this.success();
    }

    try {
      const notify = this.service('notify', this);
      const apiUrl =
        this.ctx.serverURL +
        '/verification?' +
        new URLSearchParams({ token, email: data.email }).toString();

      await notify.transporter.sendMail({
        from:
          SENDER_EMAIL && SENDER_NAME
            ? `"${SENDER_NAME}" <${SENDER_EMAIL}>`
            : SMTP_USER,
        to: data.email,
        subject: this.locale('[{{name | safe}}] Registration Confirm Mail', {
          name: SITE_NAME || 'Waline',
        }),
        html: this.locale(
          'Please click <a href="{{url}}">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.',
          { url: apiUrl }
        ),
      });
    } catch (e) {
      console.log(e);

      return this.fail(
        this.locale(
          'Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.',
          { isAdmin: think.isEmpty(count) }
        )
      );
    }

    return this.success({ verify: true });
  }

  async putAction() {
    const { display_name, url, avatar, password, type, label } = this.post();
    const { objectId } = this.ctx.state.userInfo;
    const twoFactorAuth = this.post('2fa');

    const updateData = {};

    if (this.id && type) {
      updateData.type = type;
    }

    if (think.isString(label)) {
      updateData.label = label;
    }

    if (display_name) {
      updateData.display_name = display_name;
    }

    if (url) {
      updateData.url = url;
    }

    if (avatar) {
      updateData.avatar = avatar;
    }

    if (password) {
      updateData.password = new PasswordHash().hashPassword(password);
    }

    if (think.isString(twoFactorAuth)) {
      updateData['2fa'] = twoFactorAuth;
    }

    const socials = ['github', 'twitter', 'facebook', 'google', 'weibo', 'qq'];

    socials.forEach((social) => {
      const nextSocial = this.post(social);

      if (think.isString(nextSocial)) {
        updateData[social] = nextSocial;
      }
    });

    if (think.isEmpty(updateData)) {
      return this.success();
    }

    await this.modelInstance.update(updateData, {
      objectId: this.id || objectId,
    });

    return this.success();
  }

  async getUsersListByCount() {
    const { pageSize } = this.get();
    const commentModel = this.service(
      `storage/${this.config('storage')}`,
      'Comment'
    );
    const counts = await commentModel.count(
      {
        status: ['NOT IN', ['waiting', 'spam']],
      },
      {
        group: ['user_id', 'mail'],
      }
    );

    counts.sort((a, b) => b.count - a.count);
    counts.length = Math.min(pageSize, counts.length);

    const userIds = counts
      .filter(({ user_id }) => user_id)
      .map(({ user_id }) => user_id);

    let usersMap = {};

    if (userIds.length) {
      const users = await this.modelInstance.select({
        objectId: ['IN', userIds],
      });

      for (let i = 0; i < users.length; i++) {
        usersMap[users[i].objectId] = users;
      }
    }

    const users = [];
    const { avatarProxy } = this.config();

    for (let i = 0; i < counts.length; i++) {
      const count = counts[i];
      const user = {
        count: count.count,
      };

      if (think.isArray(this.config('levels'))) {
        let level = 0;

        if (user.count) {
          const _level = think.findLastIndex(
            this.config('levels'),
            (l) => l <= user.count
          );

          if (_level !== -1) {
            level = _level;
          }
        }
        user.level = level;
      }

      if (count.user_id && users[count.user_id]) {
        const {
          display_name: nick,
          url: link,
          avatar: avatarUrl,
          label,
        } = users[count.user_id];
        const avatar =
          avatarProxy && !avatarUrl.includes(avatarProxy)
            ? avatarProxy + '?url=' + encodeURIComponent(avatarUrl)
            : avatarUrl;

        Object.assign(user, { nick, link, avatar, label });
        users.push(user);
        continue;
      }

      const comments = await commentModel.select(
        { mail: count.mail },
        { limit: 1 }
      );

      if (think.isEmpty(comments)) {
        continue;
      }
      const comment = comments[0];

      if (think.isEmpty(comment)) {
        continue;
      }
      const { nick, link } = comment;
      const avatarUrl = await think.service('avatar').stringify(comment);
      const avatar =
        avatarProxy && !avatarUrl.includes(avatarProxy)
          ? avatarProxy + '?url=' + encodeURIComponent(avatarUrl)
          : avatarUrl;

      Object.assign(user, { nick, link, avatar });
      users.push(user);
    }

    return users;
  }
};
