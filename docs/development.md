# 如何开发

如果你想为 waline 提交 Pull Request，你可以参考一下方式进行本地开发。

```bash
git clone https://github.com/lizheming/waline.git
cd waline

# 保证自己的 npm 版本是 7
npm install -g npm@7

# 安装依赖
npm install

# 将 @waline/server 链接到本地开发
cd packages/server
npm link .
cd ../../example
npm link @waline/vercel

# 安装 vercel 启动服务
npm install -g vercel
vercel dev
```
