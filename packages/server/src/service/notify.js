const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');
const request = require('request-promise-native');
module.exports = class extends think.Service {
  constructor(...args) {
    super(...args);

    const {
      SMTP_USER,
      SMTP_PASS,
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_SERVICE,
    } = process.env;
    if (SMTP_HOST || SMTP_SERVICE) {
      const config = {
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      };
      if (SMTP_SERVICE) {
        config.service = SMTP_SERVICE;
      } else {
        config.host = SMTP_HOST;
        config.port = parseInt(SMTP_PORT);
        config.secure = SMTP_SECURE !== 'false';
      }
      this.transporter = nodemailer.createTransport(config);
    }
  }

  async sleep(second) {
    return new Promise((resolve) => setTimeout(resolve, second * 1000));
  }

  async mail({ to, title, content }, self, parent) {
    if (!this.transporter) {
      return;
    }

    const {
      SITE_NAME,
      SITE_URL,
      SMTP_USER,
      SENDER_EMAIL,
      SENDER_NAME,
    } = process.env;
    const data = {
      self,
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: SITE_URL + self.url + '#' + self.objectId,
      },
    };
    title = nunjucks.renderString(title, data);
    content = nunjucks.renderString(content, data);

    return this.transporter.sendMail({
      from:
        SENDER_EMAIL && SENDER_NAME
          ? `"${SENDER_NAME}" <${SENDER_EMAIL}>`
          : SMTP_USER,
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
        postUrl: SITE_URL + self.url + '#' + self.objectId,
      },
    };
    title = nunjucks.renderString(title, data);
    content = nunjucks.renderString(content, data);

    return request({
      uri: `https://sc.ftqq.com/${SC_KEY}.send`,
      method: 'POST',
      form: {
        text: title,
        desp: content,
      },
      json: true,
    });
  }

  async qq(self, parent) {
    const { QMSG_KEY, QQ_ID, SITE_NAME, SITE_URL } = process.env;
    if (!QMSG_KEY) {
      return false;
    }

    const comment = self.comment
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, '\n[$2] $1\n')
      .replace(/<[^>]+>/g, '');

    const data = {
      self: {
        ...self,
        comment,
      },
      parent,
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        postUrl: SITE_URL + self.url + '#' + self.objectId,
      },
    };

    const contentQQ =
      think.config('QQTemplate') ||
      `💬 {{site.name|safe}} 有新评论啦
{{self.nick}} 评论道：
{{self.comment}}
邮箱：{{self.mail}}
状态：{{self.status}} 
仅供评论预览，查看完整內容：
{{site.postUrl}}`;

    return request({
      uri: `https://qmsg.zendee.cn/send/${QMSG_KEY}`,
      method: 'POST',
      form: {
        msg: nunjucks.renderString(contentQQ, data),
        qq: QQ_ID,
      },
    });
  }

  async telegram(self, parent) {
    const { TG_BOT_TOKEN, TG_CHAT_ID, SITE_NAME, SITE_URL } = process.env;
    if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
      return false;
    }

    let commentLink = '';
    const href = self.comment.match(/<a href="(.*?)">(.*?)<\/a>/g);
    if (href !== null) {
      for (var i = 0; i < href.length; i++) {
        href[i] =
          '[Link: ' +
          href[i].replace(/<a href="(.*?)">(.*?)<\/a>/g, '$2') +
          '](' +
          href[i].replace(/<a href="(.*?)">(.*?)<\/a>/g, '$1') +
          ')  ';
        commentLink = commentLink + href[i];
      }
    }
    if (commentLink !== '') {
      commentLink = `\n` + commentLink + `\n`;
    }
    const comment = self.comment
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[Link:$2]')
      .replace(/<[^>]+>/g, '');

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
        postUrl: SITE_URL + self.url + '#' + self.objectId,
      },
    };

    return request({
      uri: `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      form: {
        text: nunjucks.renderString(contentTG, data),
        chat_id: TG_CHAT_ID,
        parse_mode: 'MarkdownV2',
      },
      json: true,
    });
  }

  async run(comment, parent, disableAuthorNotify = false) {
    const { AUTHOR_EMAIL, BLOGGER_EMAIL } = process.env;
    const {
      mailSubject,
      mailTemplate,
      mailSubjectAdmin,
      mailTemplateAdmin,
    } = think.config();
    const AUTHOR = AUTHOR_EMAIL || BLOGGER_EMAIL;

    const mailList = [];
    const isAuthorComment = AUTHOR
      ? comment.mail.toLowerCase() === AUTHOR.toLowerCase()
      : false;
    const isReplyAuthor = AUTHOR
      ? parent && parent.mail.toLowerCase() === AUTHOR.toLowerCase()
      : false;

    const title = mailSubjectAdmin || '{{site.name}} 上有新评论了';
    const content =
      mailTemplateAdmin ||
      `
    <div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;">
      <h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">
        您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的文章有了新的评论
      </h2>
      <p><strong>{{self.nick}}</strong>回复说：</p>
      <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
        {{self.comment | safe}}
      </div>
      <p>您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a></p>
      <br/>
    </div>`;

    if (!isAuthorComment && !disableAuthorNotify) {
      const wechat = await this.wechat({ title, content }, comment, parent);
      const qq = await this.qq(comment, parent);
      const telegram = await this.telegram(comment, parent);
      if (
        think.isEmpty(wechat) &&
        think.isEmpty(qq) &&
        think.isEmpty(telegram) &&
        !isReplyAuthor
      ) {
        mailList.push({ to: AUTHOR, title, content });
      }
    }

    const disallowList = ['github'].map((social) => 'mail.' + social);
    const fakeMail = new RegExp(`@(${disallowList.join('|')})$`, 'i');
    if (parent && !fakeMail.test(parent.mail) && comment.status !== 'waiting') {
      mailList.push({
        to: parent.mail,
        title:
          mailSubject || '{{parent.nick}}，『{{site.name}}』上的评论收到了回复',
        content:
          mailTemplate ||
          `
        <div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;">
          <h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">        
            您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的评论有了新的回复
          </h2>
          {{parent.nick}} 同学，您曾发表评论：
          <div style="padding:0 12px 0 12px;margin-top:18px">
            <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">{{parent.comment | safe}}</div>
            <p><strong>{{self.nick}}</strong>回复说：</p>
            <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">{{self.comment | safe}}</div>
            <p>您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a>，欢迎再次光临<a style="text-decoration:none; color:#12addb" href="{{site.url}}" target="_blank">{{site.name}}</a>。</p>
            <br/>
          </div>
        </div>`,
      });
    }

    for (let i = 0; i < mailList.length; i++) {
      try {
        const response = await this.mail(mailList[i], comment, parent);
        console.log('Notification mail send success: %s', response);
      } catch (e) {
        console.log('Mail send fail:', e);
      }
    }
  }
};
