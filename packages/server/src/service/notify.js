const crypto = require('node:crypto');

const FormData = require('form-data');
const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');

module.exports = class NotifyService extends think.Service {
  constructor(controller) {
    super(controller);

    this.controller = controller;
    const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_SERVICE } = process.env;

    if (SMTP_HOST || SMTP_SERVICE) {
      const config = {
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      };

      if (SMTP_SERVICE) {
        config.service = SMTP_SERVICE;
      } else {
        config.host = SMTP_HOST;
        config.port = Number.parseInt(SMTP_PORT, 10);
        config.secure = SMTP_SECURE && SMTP_SECURE !== 'false';
      }
      this.transporter = nodemailer.createTransport(config);
    }
  }

  async sleep(second) {
    return new Promise((resolve) => {
      setTimeout(resolve, second * 1000);
    });
  }

  async mail({ to, title, content }, self, parent) {
    if (!this.transporter) {
      return;
    }

    const { SITE_NAME, SITE_URL, SMTP_USER, SENDER_EMAIL, SENDER_NAME } = process.env;
    const data = {
      self,
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: `${SITE_URL}${self.url}#${self.objectId}`,
      },
    };

    title = this.controller.locale(title, data);
    content = this.controller.locale(content, data);

    return this.transporter.sendMail({
      from: SENDER_EMAIL && SENDER_NAME ? `"${SENDER_NAME}" <${SENDER_EMAIL}>` : SMTP_USER,
      to,
      subject: title,
      html: content,
    });
  }

  async wechat({ title, content }, self, parent) {
    const { SC_KEY, SITE_NAME, SITE_URL } = process.env;

    if (!SC_KEY) {
      return false;
    }

    const data = {
      self,
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: `${SITE_URL}${self.url}#${self.objectId}`,
      },
    };

    const contentWechat =
      think.config('SCTemplate') ||
      `{{site.name|safe}} 有新评论啦
【评论者昵称】：{{self.nick}}
【评论者邮箱】：{{self.mail}} 
【内容】：{{self.comment}}
【地址】：{{site.postUrl}}`;

    title = this.controller.locale(title, data);
    content = this.controller.locale(contentWechat, data);

    const form = new FormData();

    form.append('text', title);
    form.append('desp', content);

    return fetch(`https://sctapi.ftqq.com/${SC_KEY}.send`, {
      method: 'POST',
      headers: form.getHeaders(),
      body: form,
    }).then((resp) => resp.json());
  }

  async qywxAmWechat({ title, content }, self, parent) {
    const { QYWX_AM, QYWX_PROXY, QYWX_PROXY_PORT, SITE_NAME, SITE_URL } = process.env;

    if (!QYWX_AM) {
      return false;
    }

    const QYWX_AM_AY = QYWX_AM.split(',');
    const comment = self.comment
      .replaceAll(/<a href="(.*?)">(.*?)<\/a>/g, '\n[$2] $1\n')
      .replaceAll(/<[^>]+>/g, '');
    const postName = self.url;

    const data = {
      self: {
        ...self,
        comment,
      },
      postName,
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: `${SITE_URL}${self.url}#${self.objectId}`,
      },
    };

    const contentWechat =
      think.config('WXTemplate') ||
      `💬 {{site.name|safe}}的文章《{{postName}}》有新评论啦 
【评论者昵称】：{{self.nick}}
【评论者邮箱】：{{self.mail}} 
【内容】：{{self.comment}} 
<a href='{{site.postUrl}}'>查看详情</a>`;

    title = this.controller.locale(title, data);
    const desp = this.controller.locale(contentWechat, data);

    content = desp.replaceAll('\n', '<br/>');

    const querystring = new URLSearchParams();

    querystring.set('corpid', `${QYWX_AM_AY[0]}`);
    querystring.set('corpsecret', `${QYWX_AM_AY[1]}`);

    let baseUrl = 'https://qyapi.weixin.qq.com';

    if (QYWX_PROXY) {
      baseUrl = `http://${QYWX_PROXY}${QYWX_PROXY_PORT ? `:${QYWX_PROXY_PORT}` : ''}`;
    }

    const { access_token } = await fetch(`${baseUrl}/cgi-bin/gettoken?${querystring.toString()}`, {
      headers: {
        'content-type': 'application/json',
      },
    }).then((resp) => resp.json());

    return fetch(`${baseUrl}/cgi-bin/message/send?access_token=${access_token}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        touser: `${QYWX_AM_AY[2]}`,
        agentid: `${QYWX_AM_AY[3]}`,
        msgtype: 'mpnews',
        mpnews: {
          articles: [
            {
              title,
              thumb_media_id: `${QYWX_AM_AY[4]}`,
              author: `Waline Comment`,
              content_source_url: `${data.site.postUrl}`,
              content: `${content}`,
              digest: `${desp}`,
            },
          ],
        },
      }),
    }).then((resp) => resp.json());
  }

  async qq(self, parent) {
    const { QMSG_KEY, QQ_ID, SITE_NAME, SITE_URL, QMSG_HOST } = process.env;

    if (!QMSG_KEY) {
      return false;
    }

    const comment = self.comment
      .replaceAll(/<a href="(.*?)">(.*?)<\/a>/g, '')
      .replaceAll(/<[^>]+>/g, '');

    const data = {
      self: {
        ...self,
        comment,
      },
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: `${SITE_URL}${self.url}#${self.objectId}`,
      },
    };

    const contentQQ =
      think.config('QQTemplate') ||
      `💬 {{site.name|safe}} 有新评论啦
{{self.nick}} 评论道：
{{self.comment}}
仅供预览评论，请前往上述页面查看完整內容。`;

    const qmsgHost = QMSG_HOST ? QMSG_HOST.replace(/\/$/, '') : 'https://qmsg.zendee.cn';

    const postBodyData = {
      qq: QQ_ID,
      msg: this.controller.locale(contentQQ, data),
    };
    const postBody = Object.keys(postBodyData)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(postBodyData[key]))
      .join('&');

    return fetch(`${qmsgHost}/send/${QMSG_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postBody,
    }).then((resp) =>
      resp.json().then((json) => {
        think.logger.debug(`qq notify response: ${JSON.stringify(json)}`);

        return json;
      }),
    );
  }

  async telegram(self, parent) {
    const { TG_BOT_TOKEN, TG_CHAT_ID, SITE_NAME, SITE_URL } = process.env;

    if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
      return false;
    }

    let commentLink = '';
    const href = self.comment.match(/<a href="(.*?)">(.*?)<\/a>/g);

    if (href != null) {
      for (let i = 0; i < href.length; i++) {
        href[i] =
          `[Link: ${href[i].replaceAll(/<a href="(.*?)">(.*?)<\/a>/g, '$2')}](${href[i].replaceAll(/<a href="(.*?)">(.*?)<\/a>/g, '$1')})  `;
        commentLink += href[i];
      }
    }
    if (commentLink !== '') {
      commentLink = `\n${commentLink}\n`;
    }
    const comment = self.comment
      .replaceAll(/<a href="(.*?)">(.*?)<\/a>/g, '[Link:$2]')
      .replaceAll(/<[^>]+>/g, '');

    const contentTG =
      think.config('TGTemplate') ||
      `💬 *[{{site.name}}]({{site.url}}) 有新评论啦*

*{{self.nick}}* 回复说：

\`\`\`
{{self.comment-}}
\`\`\`
{{-self.commentLink}}
*邮箱：*\`{{self.mail}}\`
*审核：*{{self.status}}

仅供评论预览，点击[查看完整內容]({{site.postUrl}})`;

    const data = {
      self: {
        ...self,
        comment,
        commentLink,
      },
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: `${SITE_URL}${self.url}#${self.objectId}`,
      },
    };

    const resp = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: this.controller.locale(contentTG, data),
        parse_mode: 'MarkdownV2',
      }),
    }).then((resp) => resp.json());

    if (!resp.ok) {
      console.log(`Telegram Notification Failed:${JSON.stringify(resp)}`);
    }
  }

  async pushplus({ title, content }, self, parent) {
    const {
      PUSH_PLUS_KEY,
      PUSH_PLUS_TOPIC: topic,
      PUSH_PLUS_TEMPLATE: template,
      PUSH_PLUS_CHANNEL: channel,
      PUSH_PLUS_WEBHOOK: webhook,
      PUSH_PLUS_CALLBACKURL: callbackUrl,
      SITE_NAME,
      SITE_URL,
    } = process.env;

    if (!PUSH_PLUS_KEY) {
      return false;
    }

    const data = {
      self,
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: `${SITE_URL}${self.url}#${self.objectId}`,
      },
    };

    title = this.controller.locale(title, data);
    content = this.controller.locale(content, data);

    const form = new FormData();

    if (topic) form.append('topic', topic);
    if (template) form.append('template', template);
    if (channel) form.append('channel', channel);
    if (webhook) form.append('webhook', webhook);
    if (callbackUrl) form.append('callbackUrl', callbackUrl);
    if (title) form.append('title', title);
    if (content) form.append('content', content);

    return fetch(`http://www.pushplus.plus/send/${PUSH_PLUS_KEY}`, {
      method: 'POST',
      headers: form.getHeaders(),
      body: form,
    }).then((resp) => resp.json());
  }

  async discord({ title, content }, self, parent) {
    const { DISCORD_WEBHOOK, SITE_NAME, SITE_URL } = process.env;

    if (!DISCORD_WEBHOOK) {
      return false;
    }

    const data = {
      self,
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: `${SITE_URL}${self.url}#${self.objectId}`,
      },
    };

    title = this.controller.locale(title, data);
    content = this.controller.locale(
      think.config('DiscordTemplate') ||
        `💬 {{site.name|safe}} 有新评论啦 
    【评论者昵称】：{{self.nick}}
    【评论者邮箱】：{{self.mail}} 
    【内容】：{{self.comment}} 
    【地址】：{{site.postUrl}}`,
      data,
    );

    const form = new FormData();

    form.append('content', `${title}\n${content}`);

    return fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: form.getHeaders(),
      body: form,
    }).then((resp) => resp.statusText);
    // Expected return value: No Content
    // Since Discord doesn't return any response body on success, we just return the status text.
  }

  async lark({ title, content }, self, parent) {
    const { LARK_WEBHOOK, LARK_SECRET, SITE_NAME, SITE_URL } = process.env;

    if (!LARK_WEBHOOK) {
      return false;
    }

    self.comment = self.comment.replaceAll(/(<([^>]+)>)/gi, '');

    const data = {
      self,
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: `${SITE_URL}${self.url}#${self.objectId}`,
      },
    };

    content = nunjucks.renderString(
      think.config('LarkTemplate') ||
        `【网站名称】：{{site.name|safe}} \n【评论者昵称】：{{self.nick}}\n【评论者邮箱】：{{self.mail}}\n【内容】：{{self.comment}}【地址】：{{site.postUrl}}`,
      data,
    );

    const post = {
      en_us: {
        title: this.controller.locale(title, data),
        content: [
          [
            {
              tag: 'text',
              text: content,
            },
          ],
        ],
      },
    };

    let signData = {};
    const msg = {
      msg_type: 'post',
      content: {
        post,
      },
    };

    const sign = (timestamp, secret) => {
      const signStr = `${timestamp}\n${secret}`;

      return crypto.createHmac('sha256', signStr).update('').digest('base64');
    };

    if (LARK_SECRET) {
      const timestamp = Number.parseInt(Date.now() / 1000, 10);

      signData = { timestamp: timestamp, sign: sign(timestamp, LARK_SECRET) };
    }

    const resp = await fetch(LARK_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...signData,
        ...msg,
      }),
    }).then((resp) => resp.json());

    if (resp.status !== 200) {
      console.log(`Lark Notification Failed:${JSON.stringify(resp)}`);
    }

    console.log(`FeiShu Notification Success:${JSON.stringify(resp)}`);
  }

  async run(comment, parent, disableAuthorNotify = false) {
    const { AUTHOR_EMAIL, DISABLE_AUTHOR_NOTIFY } = process.env;
    const { mailSubject, mailTemplate, mailSubjectAdmin, mailTemplateAdmin } = think.config();
    const AUTHOR = AUTHOR_EMAIL;

    const mailList = [];
    const isAuthorComment = AUTHOR
      ? (comment.mail || '').toLowerCase() === AUTHOR.toLowerCase()
      : false;
    const isReplyAuthor = AUTHOR
      ? parent && (parent.mail || '').toLowerCase() === AUTHOR.toLowerCase()
      : false;
    const isCommentSelf =
      parent && (parent.mail || '').toLowerCase() === (comment.mail || '').toLowerCase();

    const title = mailSubjectAdmin || 'MAIL_SUBJECT_ADMIN';
    const content = mailTemplateAdmin || 'MAIL_TEMPLATE_ADMIN';

    if (!DISABLE_AUTHOR_NOTIFY && !isAuthorComment && !disableAuthorNotify) {
      const wechat = await this.wechat({ title, content }, comment, parent);
      const qywxAmWechat = await this.qywxAmWechat({ title, content }, comment, parent);
      const qq = await this.qq(comment, parent);
      const telegram = await this.telegram(comment, parent);
      const pushplus = await this.pushplus({ title, content }, comment, parent);
      const discord = await this.discord({ title, content }, comment, parent);
      const lark = await this.lark({ title, content }, comment, parent);

      if (
        [wechat, qq, telegram, qywxAmWechat, pushplus, discord, lark].every((item) =>
          think.isEmpty(item),
        )
      ) {
        mailList.push({ to: AUTHOR, title, content });
      }
    }

    const disallowList = this.controller.ctx.state.oauthServices.map(({ name }) => `mail.${name}`);
    const fakeMail = new RegExp(`@(${disallowList.join('|')})$`, 'i');

    if (
      parent &&
      !fakeMail.test(parent.mail) &&
      !isCommentSelf &&
      !isReplyAuthor &&
      comment.status !== 'waiting'
    ) {
      mailList.push({
        to: parent.mail,
        title: mailSubject || 'MAIL_SUBJECT',
        content: mailTemplate || 'MAIL_TEMPLATE',
      });
    }

    for (const mail of mailList) {
      try {
        const response = await this.mail(mail, comment, parent);

        console.log('Notification mail send success: %s', response);
      } catch (err) {
        console.log('Mail send fail:', err);
      }
    }
  }
};
