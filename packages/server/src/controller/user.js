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

  async postAction() {
    const data = this.post();
    const resp = await this.modelInstance.select({
      email: data.email,
    });

    if (
      !think.isEmpty(resp) &&
      ['administrator', 'guest'].includes(resp[0].type)
    ) {
      return this.fail('USER_EXIST');
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

    if (!hasMailServie) {
      return this.success();
    }

    const notify = this.service('notify');
    const apiUrl =
      this.ctx.protocol +
      '://' +
      this.ctx.host +
      '/verification?' +
      qs.stringify({ token, email: data.email });

    await notify.transporter.sendMail({
      from:
        SENDER_EMAIL && SENDER_NAME
          ? `"${SENDER_NAME}" <${SENDER_EMAIL}>`
          : SMTP_USER,
      to: data.email,
      subject: `【${SITE_NAME || 'Waline'}】注册确认邮件`,
      html: `请点击 ${apiUrl} 确认注册，链接有效时间为 1 个小时。如果不是你在注册，请忽略这封邮件。`,
    });

    return this.success({ verify: true });
  }

  async putAction() {
    const { display_name, url, password, github } = this.post();
    const { objectId } = this.ctx.state.userInfo;

    const updateData = {};

    if (display_name) {
      updateData.display_name = display_name;
    }

    if (url) {
      updateData.url = url;
    }

    if (password) {
      updateData.password = new PasswordHash().hashPassword(password);
    }

    if (think.isString(github)) {
      updateData.github = github;
    }

    if (think.isEmpty(updateData)) {
      return this.success();
    }

    await this.modelInstance.update(updateData, { objectId });

    return this.success();
  }
};
