# 社交登录

最新版 Waline 增加了登录评论功能，除了普通的账号登录之外，还支持使用第三方社交账号进行直接登录。目前官方支持以下一些社交账号登录。当然默认没有开启这些社交账号登录功能，我们需要做一些配置才能支持。

## GitHub

要增加 GitHub 账号登录功能，需要配置 GitHub OAuth 密钥。点击 [《Register a new OAuth application》](https://github.com/settings/applications/new) 进入 GitHub OAuth 应用申请页面。这里需要填入以下几个配置：

- Application name：应用名称，可以随意，会在用户授权时显示，推荐使用博客名称。
- Homepage URL：应用主页地址，可以随意，会在用户授权时显示，推荐使用博客地址。
- Appcation description：应用描述，可以随意，会在用户授权时显示，非必填项。
- Authorization callback URL：应用的回调地址，登录时需要使用。填入 `<serverURL>/oauth/github` 其中 `<serverURL>` 是你的 Waline 服务端地址。

填完后点击 <kbd>Register application</kbd> 就创建成功了，可以在页面中看到 Client ID。点击 Client secrets 栏右边的 <kbd>Generate a new client secret</kbd> 按钮则可以获取到该应用的 Client secrets。

按照如下环境变量配置，将刚才获取到的密钥配置进 Waline 服务端中，重新部署后即可使用 GitHub 登录了。

| 环境变量名称    | 备注                                      |
| --------------- | ----------------------------------------- |
| `GITHUB_ID`     | 对应 GitHub OAuth App 中的 Client ID      |
| `GITHUB_SECRET` | 对应 GitHub OAuth App 中的 Client secrets |
