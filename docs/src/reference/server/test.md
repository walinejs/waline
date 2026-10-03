---
title: 服务端兼容性测试
icon: check-double
---

社区实现的 Waline 服务端可以使用官方的 `@waline/test` 测试兼容程度。测试包固化了发布时官方 Waline 服务端的行为，不会在运行时下载测试脚本或接口定义。

## 基础测试

只提供服务端地址即可运行只读测试：

```sh
npx @waline/test https://your-waline-server.example.com
```

基础测试不会写入数据，适合先在已有站点上检查服务是否可访问，以及公开的评论列表、评论数、最近评论、用户列表、文章计数和 RSS 等接口。

## 完整测试

完整模式还会检查登录、评论和回复的增删改、审核与点赞、文章计数、用户生命周期、数据库导入导出和 2FA 等能力：

```sh
npx @waline/test https://your-waline-server.example.com --full
```

命令会询问管理员邮箱和密码。CI 中应通过环境变量提供：

```sh
WALINE_TEST_ADMIN_EMAIL='admin@example.com' \
WALINE_TEST_ADMIN_PASSWORD='your-password' \
npx @waline/test https://your-waline-server.example.com --full
```

管理员凭据只用于本次登录，不会写入报告或保存到磁盘。

::: warning
完整模式会创建评论、计数器和临时用户。测试会为数据添加唯一标识，并在结束时尽力删除，但网络中断或不兼容的删除接口仍可能留下测试数据。请先在独立的测试实例运行，不要直接对生产站点执行完整测试。
:::

测试包永远不会调用数据库整表清空接口。

## 报告与兼容度

每项能力有三种状态：

- `passed`：目标服务端行为符合官方契约；
- `failed`：请求失败或返回结构、行为不兼容；
- `skipped`：当前模式无法安全验证，或依赖外部服务。

报告同时给出两个指标：

- **通过率** = passed / (passed + failed)，表示已经执行的测试中有多少通过；
- **覆盖率** = (passed + failed) / 全部能力，表示有多少能力被实际验证。

只有通过率和覆盖率都为 100% 时，报告才会显示“完整兼容”。例如 OAuth、邮件、验证码、反垃圾和通知需要第三方服务或人工操作，无法自动验证时会标记为 skipped；此时即使已执行测试全部通过，也只能说明“已测试功能 100% 兼容”。整表清空固定为 skipped，因此首版不会仅凭自动测试宣称覆盖全部 Waline 功能。

## CI 与 JSON 报告

失败项会使命令返回非零退出码；只有 skipped 不会导致 CI 失败。可以输出机器可读的 JSON：

```sh
npx @waline/test https://your-waline-server.example.com \
  --reporter=json \
  --output=waline-compatibility.json \
  --timeout=15000
```

支持的选项：

| 选项                  | 说明                                     |
| --------------------- | ---------------------------------------- |
| `--full`              | 使用管理员凭据运行读写测试               |
| `--reporter=terminal` | 输出彩色终端报告，默认值                 |
| `--reporter=json`     | 输出 JSON 报告                           |
| `--output=<path>`     | 将报告写入文件                           |
| `--timeout=<ms>`      | 设置每个 HTTP 请求的超时时间，默认 10000 |
| `--no-color`          | 关闭终端颜色                             |

## 常见问题

### 无法连接或请求超时

确认地址包含 `http://` 或 `https://`，并且运行测试的机器能直接访问服务端。反向代理也需要允许 `/api/*` 路径。

### 返回非 JSON 内容

Waline API 应返回 JSON。这个错误通常说明地址指向了错误的应用、反向代理返回了错误页面，或平台拦截了请求。

### 完整测试登录失败

确认环境变量中的账号是管理员，并检查目标实现是否兼容 `POST /api/token` 和 Bearer Token 鉴权。命令不会在报告中显示密码。

### 外部能力显示 skipped

OAuth、邮件、验证码、反垃圾和通知的结果依赖第三方配置，单凭 Waline 的 HTTP API 无法可靠确认消息是否真正到达，因此首版只报告覆盖缺口，不将其判定为失败。
