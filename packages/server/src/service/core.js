const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const parser = require('ua-parser-js');

const { createWalineCore } = require('@waline/core');
const { getMarkdownParser } = require('./markdown/index.js');

module.exports = class extends think.Service {
  create(controller) {
    const markdown = getMarkdownParser(controller.config('markdown'));
    const model = (name) => controller.getModel(name);
    const hasMailService = process.env.SMTP_HOST || process.env.SMTP_SERVICE;
    const verificationCode = Array.from({ length: 4 }, () => Math.round(Math.random() * 9)).join(
      '',
    );
    const hookNames = ['preSave', 'postSave', 'preUpdate', 'postUpdate', 'preDelete', 'postDelete'];
    const hooks = controller.hook
      ? Object.fromEntries(
          hookNames.map((name) => [
            name,
            async (payload, extra) => controller.hook(name, payload, extra),
          ]),
        )
      : {};

    return createWalineCore({
      models: {
        Comment: model('Comment'),
        Counter: model('Counter'),
        Users: model('Users'),
        get: model,
      },
      config: {
        ...controller.config(),
        forceLogin: process.env.LOGIN === 'force',
        ipQps: Number(process.env.IPQPS || 60),
        likeIncMax: Number(controller.config('LIKE_INC_MAX') || 1),
        normalUserType: hasMailService
          ? `verify:${verificationCode}:${Date.now() + 60 * 60 * 1000}`
          : 'guest',
      },
      hooks,
      logger: think.logger,
      services: {
        token: {
          sign: (subject) => jwt.sign(subject, controller.config('jwtKey')),
          verify: (token) => jwt.verify(token, controller.config('jwtKey')),
        },
        password: {
          hash: async (value) => controller.hashPassword(value),
          verify: async (value, hash) => controller.checkPassword(value, hash),
        },
        twoFactor: {
          create: async (email) => {
            const secret = speakeasy.generateSecret({
              length: 20,
              name: `waline_${email || 'user'}`,
            });

            return { secret: secret.base32, otpauth_url: secret.otpauth_url };
          },
          verify: async (secret, code) =>
            speakeasy.totp.verify({ secret, encoding: 'base32', token: code, window: 2 }),
        },
        markdown: { render: async (value) => (await markdown)(value) },
        avatar: {
          stringify: (value) =>
            think.service('avatar').stringify({
              ...value,
              mail: value.mail ?? value.email,
              nick: value.nick ?? value.display_name,
              link: value.link ?? value.url,
            }),
        },
        region: { lookup: (ip, depth) => think.ip2region(ip, { depth }) },
        userAgent: { parse: (value) => parser(value) },
        captcha: {
          verify: async (input, ctx) => {
            const secret = process.env.TURNSTILE_SECRET || process.env.RECAPTCHA_V3_SECRET;

            if (!secret) return true;

            const isTurnstile = Boolean(process.env.TURNSTILE_SECRET);
            const token = isTurnstile ? input?.turnstile : input?.recaptchaV3;

            if (!token) return false;

            const query = new URLSearchParams({ secret, response: token, remoteip: ctx.ip || '' });
            const api = isTurnstile
              ? 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
              : 'https://recaptcha.net/recaptcha/api/siteverify';
            const response = await fetch(
              isTurnstile ? api : `${api}?${query}`,
              isTurnstile
                ? {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: query,
                  }
                : undefined,
            ).then((resp) => resp.json());

            return response.success === true;
          },
        },
        oauth: {
          authorize: (input) =>
            fetch(
              think.buildUrl(`${controller.config('oauthUrl')}/${input.type}`, {
                code: input.code,
                state: input.state,
              }),
              {
                method: 'GET',
                headers: { 'user-agent': '@waline' },
              },
            ).then((resp) => resp.json()),
        },
        spam: {
          check: (value) =>
            controller
              .service('akismet', controller.ctx.serverURL)
              .check(value)
              .catch((err) => {
                think.logger.debug(err);
                return false;
              }),
        },
        notification: {
          send: (value, parent, approved) =>
            controller.service('notify', controller).run(value, parent, approved),
          passwordReset: async (account, profileUrl) => {
            const { SENDER_EMAIL, SENDER_NAME, SMTP_USER, SITE_NAME } = process.env;
            const notify = controller.service('notify', controller);

            await notify.transporter.sendMail({
              from: SENDER_EMAIL && SENDER_NAME ? `"${SENDER_NAME}" <${SENDER_EMAIL}>` : SMTP_USER,
              to: account.email,
              subject: controller.locale('[{{name | safe}}] Reset Password', {
                name: SITE_NAME || 'Waline',
              }),
              html: controller.locale(
                'Please click <a href="{{url}}">{{url}}</a> to login and change your password as soon as possible!',
                { url: profileUrl },
              ),
            });
          },
          verification: async (account, serverUrl) => {
            const { SENDER_EMAIL, SENDER_NAME, SMTP_USER, SITE_NAME } = process.env;
            const [, code] = account.type.split(':');
            const url = think.buildUrl(`${serverUrl}/verification`, {
              token: code,
              email: account.email,
            });
            const notify = controller.service('notify', controller);

            await notify.transporter.sendMail({
              from: SENDER_EMAIL && SENDER_NAME ? `"${SENDER_NAME}" <${SENDER_EMAIL}>` : SMTP_USER,
              to: account.email,
              subject: controller.locale('[{{name | safe}}] Registration Confirm Mail', {
                name: SITE_NAME || 'Waline',
              }),
              html: controller.locale(
                'Please click <a href="{{url}}">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.',
                { url },
              ),
            });
          },
        },
        webhook: { emit: (type, data) => controller.ctx.webhook(type, data) },
      },
    });
  }
};
