# 引入客户端

Waline 提供默认 (自带样式) 和不带样式两种版本的客户端文件。你可以通过多种方式引入 Waline。

<!-- more -->

## 通过 CDN

推荐使用 [jsdelivr](https://cdn.jsdelivr.net/npm/@waline/client/)。

### 获取最新版本

- 默认:

  ```html
  <!-- 使用短链接获取最新的默认文件 -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client"></script>

  <!-- 省略版本号以自动应用最新版本 -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js"></script>

  <!-- 或者手动指定最新版本 -->
  <script src="//cdn.jsdelivr.net/@waline/clien@latest/dist/Waline.min.js"></script>
  ```

- 不带样式:

  ```html
  <!-- 省略版本号以自动应用最新版本 -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client/dist/Waline.noStyle.js"></script>

  <!-- 或者手动指定最新版本 -->
  <script src="//cdn.jsdelivr.net/@waline/clien@latest/dist/Waline.noStyle.js"></script>
  ```

### 获取指定版本

- 默认:

  ```html
  <!-- 你需要自行修改替换 `1.0.0` 为你想要的版本号 -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client@1.0.0/dist/Waline.min.js"></script>
  ```

- 不带样式:

  ```html
  <!-- 你需要自行修改替换 `1.0.0` 为你想要的版本号 -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client@1.0.0/dist/Waline.noStyle.js"></script>
  ```

## 通过 NPM

Waline 客户端已通过 `@waline/client` 发布到 [npm](https://www.npmjs.com/package/@waline/client)，你可以通过以下命令安装:

<CodeGroup>
<CodeGroupItem title="yarn">

```bash
yarn add -D @waline/client
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D @waline/client
```

</CodeGroupItem>
</CodeGroup>

之后请在你的源文件中引入并使用:

- 默认:

  ```js:line-numbers
  // 使用 import
  import Waline from '@waline/client';
  // 或者使用 require
  const Waline = require('@waline/client');

  Waline({
    el: '#waline',
    // ...
  });
  ```

- 不带样式:

  ```js:line-numbers
  // 使用 import
  import Waline from '@waline/client/dist/Waline.noStyle';
  // 或者使用 require
  const Waline = require('@waline/client/dist/Waline.noStyle');

  Waline({
    el: '#waline',
    // ...
  });
  ```
