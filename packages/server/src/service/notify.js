const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');
const request = require('request-promise-native');
module.exports = class extends think.Service {
  constructor(...args) {
    super(...args);

    const {SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_SERVICE} = process.env;
    if(SMTP_HOST || SMTP_SERVICE) {
      const config = {
        auth: {user: SMTP_USER, pass: SMTP_PASS}
      };
      if(SMTP_SERVICE) {
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
    return new Promise(resolve => setTimeout(resolve, second * 1000));
  }
  
  async mail({to, title, content}, self, parent) {
    if(!this.transporter) {
      return;
    }

    const {SITE_NAME, SITE_URL, SMTP_USER} = process.env;
    const data = {
      self, 
      parent, 
      site: {
        name: SITE_NAME, 
        url: SITE_URL,
        postUrl: SITE_URL + self.url + '#' + self.objectId
      }
    };
    title = nunjucks.renderString(title, data);
    content = nunjucks.renderString(content, data);

    return this.transporter.sendMail({
      from: SMTP_USER,
      to, 
      subject: title, 
      html: content
    });
  }

  async wechat({title, content}, self, parent) {
    const {SC_KEY, SITE_NAME, SITE_URL} = process.env;
    if(!SC_KEY) {
      return false;
    }

    const data = {
      self, 
      parent, 
      site: {
        name: SITE_NAME, 
        url: SITE_URL,
        postUrl: SITE_URL + self.url + '#' + self.objectId
      }
    };
    title = nunjucks.renderString(title, data);
    content = nunjucks.renderString(content, data);
  
    return request({
      uri: `https://sc.ftqq.com/${SC_KEY}.send`,
      method: 'POST',
      form: {
        text: title,
        desp: content
      },
      json: true
    });
  }
  
  async telegram(self, parent) {
    const contentTG = `
💬 *[{{site.name}}]({{site.url}}) 上有新评论啦*

*{{self.nick}}* 回复说：

{{self.rawComment}}

您可以点击[查看回复的完整內容]({{site.postUrl}})`;

    const {TG_BOT_TOKEN, TG_CHAT_ID, SITE_NAME, SITE_URL} = process.env;
    if(!TG_BOT_TOKEN || !TG_CHAT_ID) {
      return false;
    }

    const data = {
      self, 
      parent, 
      site: {
        name: SITE_NAME, 
        url: SITE_URL,
        postUrl: SITE_URL + self.url + '#' + self.objectId
      }
    };
    contentTG = nunjucks.renderString(contentTG, data);

    return request({
      uri: `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      form: {
        text: contentTG,
        chat_id: TG_CHAT_ID,
        parse_mode: 'MarkdownV2'
      },
      json: true
    });
  }
  
  async run(comment, parent) {
    const {AUTHOR_EMAIL, BLOGGER_EMAIL} = process.env;
    const AUTHOR = AUTHOR_EMAIL || BLOGGER_EMAIL;
    
    const mailList = [];
    const isAuthorComment = AUTHOR ? comment.mail.toLowerCase() === AUTHOR.toLowerCase() : false;
    const isReplyAuthor = AUTHOR ? parent && parent.mail.toLowerCase() === AUTHOR.toLowerCase() : false;

    const title = '{{site.name}} 上有新评论了';
    const content = `
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

    
    let wechatNotify = false;
    if(!isAuthorComment) {
      wechatNotify = await this.wechat({title, content}, comment, parent);
    }

    let telegramNotify = false;
    if(!isAuthorComment) {
      telegramNotify = await this.telegram(comment, parent);
    }

    if(!isAuthorComment && !isReplyAuthor && (think.isEmpty(wechatNotify) || think.isEmpty(telegramNotify)) ) {
      mailList.push({to: AUTHOR, title, content});
    }

    if(parent) {
      mailList.push({
        to: parent.mail,
        title: process.env.MAIL_SUBJECT || '{{parent.nick}}，『{{site.name}}』上的评论收到了回复',
        content: process.env.MAIL_TEMPLATE || `
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
        </div>`
      })
    }

    for(let i = 0; i < mailList.length; i++) {
      try {
        const response = await this.mail(mailList[i], comment, parent);
        console.log('Notification mail send success: %s', response);
      } catch(e) {
        console.log('Mail send fail:', e);
      }
    }
  }
}
