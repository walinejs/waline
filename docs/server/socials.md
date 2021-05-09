# 社交登录

最新版 Waline 增加了登录评论功能，除了普通的账号登录之外，还支持使用第三方社交账号进行直接登录。

目前官方支持以下社交账号登录。

::: warning

社交账号登录功能并非默认开启，需进行额外配置。

:::

## GitHub

开启 GitHub 账号登录功能需要配置 GitHub OAuth 密钥。点击 [Register a new OAuth application](https://github.com/settings/applications/new) 进入 GitHub OAuth 应用申请页面。

配置注意事项如下:

- Application name: 应用名称，会在用户授权时显示，推荐使用博客名称。
- Homepage URL: 应用主页地址，会在用户授权时显示，推荐使用博客地址。
- Appcation description: 应用描述，会在用户授权时显示，非必填项。
- Authorization callback URL: 应用的回调地址，登录时需要使用。填入 `<serverURL>/oauth/github` 其中 `<serverURL>` 是你的 Waline 服务端地址。

填写完成后点击 <kbd>Register application</kbd> 即可成功创建。页面中会显示 Client ID。点击 Client secrets 栏右边的 <kbd>Generate a new client secret</kbd> 按钮则可以获取到该应用的 Client secrets。

使用以上信息配置环境变量，重新部署后即可使用 GitHub 登录。

| 环境变量名称    | 备注                                      |
| --------------- | ----------------------------------------- |
| `GITHUB_ID`     | 对应 GitHub OAuth App 中的 Client ID      |
| `GITHUB_SECRET` | 对应 GitHub OAuth App 中的 Client secrets |
