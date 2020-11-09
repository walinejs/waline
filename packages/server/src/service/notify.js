const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');

module.exports = class extends think.Service {
  constructor(...args) {
    super(...args);

    const {SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_SERVICE} = process.env;
    if(!SMTP_HOST && !SMTP_SERVICE) {
      return;
    }

    const config = {auth: {user: SMTP_USER, pass: SMTP_PASS}};
    if(SMTP_SERVICE) {
      config.service = SMTP_SERVICE;
    } else {
      config.host = SMTP_HOST;
      config.port = parseInt(SMTP_PORT);
      config.secure = SMTP_SECURE !== 'false';
    }
    
    this.transporter = nodemailer.createTransport(config);
    this.transporter.verify(function(error, success) {
      if (error) {
        console.log('SMTP mail config eror:', error);
      }
      if (success) {
        console.log("SMTP mail config normal!");
      }
    });
  }

  async sleep(second) {
    return new Promise(resolve => setTimeout(resolve, second * 1000));
  }
  
  async mail({to, title, content}, self, parent) {
    const {SITE_NAME, SITE_URL} = process.env;
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

    return new Promise((resolve, reject) => {
      this.transporter.sendMail({
        to,
        subject: title,
        html: content
      }, (error, info) => {
        if(error) {
          return reject(error);
        }
        resolve(info);
      });
    })
    
  }
  
  async run(comment, parent) {
    const {AUTHOR_EMAIL, BLOGGER_EMAIL} = process.env;
    const AUTHOR = AUTHOR_EMAIL || BLOGGER_EMAIL;
    
    const mailList = [];
    if(
      comment.mail.toLowerCase() !== AUTHOR.toLowerCase() ||
      (parent && parent.mail.toLowerCase() !== AUTHOR.toLowerCase())
    ) {
      mailList.push({
        to: AUTHOR,
        title: '{{site.name}} 上有新评论了',
        content: `
        <div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;">
          <h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">
            您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的文章有了新的评论
          </h2>
          <p><strong>{{self.nick}}</strong>回复说：</p>
          <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
            {{self.comment}}
          </div>
          <p>您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a></p>
          <br/>
        </div>`
      });
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
            <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">{{parent.comment}}</div>
            <p><strong>{{self.nick}}</strong>回复说：</p>
            <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">{{self.comment}}</div>
            <p>您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a>，欢迎再次光临<a style="text-decoration:none; color:#12addb" href="{{site.url}}" target="_blank">{{site.name}}</a>。</p>
            <br/>
          </div>
        </div>`
      })
    }

    for(let i = 0; i < mailList.length; i++) {
      try {
        const {response} = await this.mail(mailList[i], comment, parent);
        console.log('Notification mail send success: %s', response);
      } catch(e) {
        console.log('Mail send fail:', e);
      }
      
      await this.sleep(10);
    }
  }
}