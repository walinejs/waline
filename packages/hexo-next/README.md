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
# Waline Config File
# For more information:
# - https://waline.js.org
# - https://waline.js.org/reference/component.html
waline:
  # New! Whether enable this plugin
  enable: false

  # Waline server address url, you should set this to your own link
  serverURL: https://waline.vercel.app

  # Custom locales
  locale:
    placeholder: Welcome to comment # Comment box placeholder

  # Custom emoji
  emoji:
    - https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo
    # - https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/alus
    # - https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili
    # - https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/qq
    # - https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/tieba
    # - https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/tw-emoji

  # If false, comment count will only be displayed in post page, not in home page
  commentCount: true

  # Pageviews count, Note: You should not enable both `waline.pageview` and `leancloud_visitors`.
  pageview: false

  # Comment infomation, valid meta are nick, mail and link
  # meta:
  #   - nick
  #   - mail
  #   - link

  # Set required meta field, e.g.: [nick] | [nick, mail]
  # requiredMeta:
  #   - nick

  # Language, available values: en-US, zh-CN, zh-TW, pt-BR, ru-RU, jp-JP
  # lang: zh-CN

  # Word limit, no limit when setting to 0
  # wordLimit: 0

  # Whether enable login, can choose from 'enable', 'disable' and 'force'
  # login: enable

  # comment per page
  # pageSize: 10
```
