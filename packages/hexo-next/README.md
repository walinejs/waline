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

  # Waline library CDN url, you can set this to your preferred CDN
  # libUrl: https://unpkg.com/@waline/client@v3/dist/waline.umd.js

  # Waline CSS styles CDN url, you can set this to your preferred CDN
  cssUrl: https://unpkg.com/@waline/client@v3/dist/waline.css

  # Custom locales
  # locale:
  #   placeholder: Welcome to comment # Comment box placeholder

  # If false, comment count will only be displayed in post page, not in home page
  commentCount: true

  # Pageviews count, Note: You should not enable both `waline.pageview` and `leancloud_visitors`.
  pageview: false

  # Custom emoji
  # emoji:
  #   - https://unpkg.com/@waline/emojis@1.1.0/weibo
  #   - https://unpkg.com/@waline/emojis@1.1.0/alus
  #   - https://unpkg.com/@waline/emojis@1.1.0/bilibili
  #   - https://unpkg.com/@waline/emojis@1.1.0/qq
  #   - https://unpkg.com/@waline/emojis@1.1.0/tieba
  #   - https://unpkg.com/@waline/emojis@1.1.0/tw-emoji

  # Comment information, valid meta are nick, mail and link
  # meta:
  #   - nick
  #   - mail
  #   - link

  # Set required meta field, e.g.: [nick] | [nick, mail]
  # requiredMeta:
  #   - nick

  # Language, available values: en-US, zh-CN, zh-TW, pt-BR, ru-RU, jp-JP, fr-FR, es-MX
  # lang: zh-CN

  # Word limit, no limit when setting to 0
  # wordLimit: 0

  # Whether enable login, can choose from 'enable', 'disable' and 'force'
  # login: enable

  # comment per page
  # pageSize: 10
```
