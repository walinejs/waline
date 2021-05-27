# Hexo NexT Waline

![Theme Version](https://img.shields.io/badge/NexT-v7.3.0+-blue?style=flat-square)
![npm](https://img.shields.io/npm/v/@waline/hexo-next?style=flat-square)

Waline comment system for NexT. Waline is a simple, safe comment system inspired by Valine.

## Install

```bash
npm install @waline/hexo-next
```

## Configure

Set the value `enable` to `true`, add `serverURL`, and edit other configurations in `waline` section in the config file as following. You can config those in both **hexo** or **theme** `_config.yml`:

```yml next/_config.yml
# Waline
# For more information: https://waline.js.org, https://github.com/walinejs/waline
waline:
  enable: false
  serverURL: https://waline.vercel.app # Waline server address url
  placeholder: Just go go # Comment box placeholder
  avatar: mm # Gravatar style
  meta: [nick, mail, link] # Custom comment header
  pageSize: 10 # Pagination size
  lang: # Language, available values: en, zh-cn
  # Warning: Do not enable both `waline.visitor` and `leancloud_visitors`.
  visitor: false # Article reading statistic
  comment_count: true # If false, comment count will only be displayed in post page, not in home page
  requiredFields: [] # Set required fields: [nick] | [nick, mail]
  libUrl: # Set custom library cdn url
```
