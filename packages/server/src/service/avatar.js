const nunjucks = require('nunjucks');
const helper = require('think-helper');
const { GRAVATAR_STR } = process.env;

const env = new nunjucks.Environment();
env.addFilter('md5', (str) => helper.md5(str));

const DEFAULT_GRAVATAR_STR = `{%- set numExp = r/^[0-9]+$/g -%}
{%- set qqMailExp = r/^[0-9]+@qq.com$/ig -%}
{%- if numExp.test(nick) -%}
  https://q1.qlogo.cn/g?b=qq&nk={{nick}}&s=100
{%- elif qqMailExp.test(mail) -%}
  https://q1.qlogo.cn/g?b=qq&nk={{mail|replace('@qq.com', '')}}&s=100
{%- else -%}
  https://seccdn.libravatar.org/avatar/{{mail|md5}}
{%- endif -%}`;
module.exports = class extends think.Service {
  async stringify(comment) {
    const fn = think.config('avatarUrl');
    if (think.isFunction(fn)) {
      const ret = await fn(comment);
      if (think.isString(ret) && ret) {
        return ret;
      }
    }

    const gravatarStr = GRAVATAR_STR || DEFAULT_GRAVATAR_STR;
    return env.renderString(gravatarStr, comment);
  }
};
