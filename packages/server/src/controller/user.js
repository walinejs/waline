const qs = require('querystring');
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
    const { page, pageSize } = this.get();

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
    const hasMailServie = SMTP_HOST || SMTP_SERVICE;

    const token = Array.from({ length: 4 }, () =>
      Math.round(Math.random() * 9)
    ).join('');
    const normalType = hasMailServie
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
      const notify = this.service('notify');
      const apiUrl =
        this.ctx.serverURL +
        '/verification?' +
        qs.stringify({ token, email: data.email });

      await notify.transporter.sendMail({
        from:
          SENDER_EMAIL && SENDER_NAME
            ? `"${SENDER_NAME}" <${SENDER_EMAIL}>`
            : SMTP_USER,
        to: data.email,
        subject: this.locale('[{{name}}] Registration Confirm Mail', {
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
          'Registeration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.',
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
};
