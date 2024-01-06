---
title: 从 Valine 迁移
icon: valine
---

由于 Waline 在存储上完全复用了 Valine 的数据结构，所以从 Valine 迁移至 Waline 非常简单。

1. 按照 [Vercel 部署](../guide/get-started/README.md#vercel-部署-服务端) 一节部署服务端。`LEAN_ID` 和 `LEAN_KEY` 和之前使用 Valine 申请的保持一致即可。同时请不要忘记为 Waline 设置 `LEAN_MASTER_KEY`。
1. 按照 [HTML 片段](../guide/get-started/README.md#html-引入-客户端) 一节修改对应的前端脚本。

   ::: warning

   你需要替换 `new Valine` 为 `Waline.init`，并在配置中删除 Valine 的 `appId` 和 `appKey`，并添加 `serverURL`。

   :::

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
       el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

::: tip 配置

Waline V2 已经移除了 Valine 支持进而转向更好的配置方案。以下是部分选项的迁移概要:

- `placeholder`: 使用 `locales.placeholder`
- `highlight`: 使用 `highlighter`
- `avatarForce`, `avatar`: 使用服务端的 `AVATAR_PROXY` 环境变量
- `recordIP`: 不再显示用户 IP，同时在服务端提供 `DISABLE_USERAGENT` 环境变量
- `requiredFields`: 重命名为 `requiredMeta`
- `langMode`: 重命名为 `locales`
- `emojiCDN`, `emojiMap`: 使用更强大的 `emoji` 选项

Waline 具体的配置详见 [客户端配置](../reference/client/api.md)。你也可以查看 [Waline 客户端 V2 迁移指南](./v2.md) 来了解与 Valine 不兼容的选项。

:::

::: tip 使用国内版 Leancloud

如果你是 Leancloud 国内版用户的话，除了 `LEAN_ID`、 `LEAN_KEY` 和 `LEAN_MASTER_KEY` 之外，还需要设置 `LEAN_SERVER` 环境变量，值为你的应用后台绑定的接入域名。

:::

## 迁移至 Cloudbase

如果你想要将你的 Valine 数据迁移至腾讯云开发的云数据库中的话，可以使用 LeanCloud 的导出功能配合云数据库的导入功能完成。在 LeanCloud 后台选择 <kbd>导入导出</kbd> > <kbd>限定 Class</kbd> > <kbd>Comment</kbd> > <kbd>导出</kbd>，之后会收到导出成功的邮件。

将导出成功的文件内容粘贴至下方的文本框中，点击下方的转换按钮，获得待导入的文件。进入 [腾讯云开发后台 → 数据库](https://console.cloud.tencent.com/tcb/db/index) 界面，选择 `Comment` 集合。若该集合不存在，点击左上角 <kbd>新建集合</kbd> 创建。进入后点击上方的导入按钮，选择刚才获得的转换后文件稍待片刻即可完成导入。

<MigrationTool />

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>

## Waline 亮点

Waline 相对于 Valine 具有如下亮点:

### 更强大的功能

1. Markdown 支持更多语法，包括上下角标、emoji、表格、删除线、数学公式、HTML 标签、脚注等。
1. 图片上传功能，允许自由配置图床服务或直接嵌入图片。
1. 全新的标签系统，可以根据用户互动频率为用户设置等级标签，也可为登录用户添加自定义标签。
1. Emoji 预设与选项卡支持，允许多套 Emoji，同时允许任何人发布和使用 Emoji 预设。
1. 全新的反应系统，允许访客表达对文章的态度。
1. 评论点赞，对喜欢的评论表达支持。
1. 浏览量统计，更加准确的浏览量计数与防篡改。
1. 表情包搜索。可以自定义表情包服务，让用户搜索并自由插入表情包。
1. 支持登录用户编辑和删除其发布的评论。

### 更安全

1. 零隐私泄露，不会暴露用户邮箱、IP 地址以及其他敏感信息，并且可以在后台配置不显示用户地理位置、浏览器以及操作系统。
1. 完整的反垃圾和防灌水系统。
   - 所有评论都可以通过反垃圾服务进行鉴别，并且可以添加自己的额外验证逻辑。
   - 可设置单 IP 或者单用户的评论速度限制，并自动识别重复评论，防止灌水。
1. 评论审核功能，在敏感时期或者网站受到攻击时，可以一键开启评论审核，手动审查并批准评论显示，防止恶意评论导致封站。
1. 支持用户登录，除了注册账号外，还支持社交媒体账号一键授权登录，快速同步头像与昵称，防止身份冒用

### 更方便

1. 多种方式 (QQ、微信、钉钉、邮箱) 等通知博主评论动态
1. 强大的管理后台，可以查看所有用户与评论并进行相关操作，同时为用户设置自定义标签与管理员
1. 前端管理，管理员可以直接通过 Waline 评论组件审查、编辑或删除评论。
