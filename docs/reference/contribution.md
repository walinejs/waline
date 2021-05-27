# 开发指南

我们欢迎大家为 waline 提交 Pull Request！:tada:

如果你想为 waline 贡献出自己的一份力量，以下是一份指南。

## 准备

1. 使用 Git 克隆项目

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. 安装依赖

   ```bash
   cd waline
   npm i
   ```

   ::: warning

   你需要确保自己使用 npm@v7 版本:

   ```bash
   # 保证自己的 npm 版本是 7
   npm i -g npm@7

   ```

   :::

## 开发

- 使用 `npm run client:dev` 启动 `@waline/client` 本地开发

  ::: tip

  由于 waline 是 Client/Server 架构，在调试 client 时，你需要设置 `SERVERURL` 为调试服务器，或同时启动下面的 server 开发服务器并使用默认的 `localhost:9090`。

  :::

- 使用 `npm run server:dev` 启动 `@waline/server` 本地开发

  ::: tip

  为了使 `@waline/server` 能在本地正常运行，你需要配置必要的本地环境变量至 `example/.env`。

  在 `example/.env.example` 我们准备了示例供你参考

  :::
