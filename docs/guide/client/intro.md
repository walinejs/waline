# 客户端介绍

Waline 官方提供了 [`@waline/client`](https://www.npmjs.com/package/@waline/client) 客户端，使用 Vue + TypeScript 编写，大小仅为 53kb gzip。

## 使用

### SPA

Waline 为 SPA(**S**ingle **P**age **A**pplication, 单页应用) 带来了支持。如果你想要在使用 history.pushState 的网站中使用，你可以使用 `Waline()` 实例的 `update()` 方法刷新评论区的配置，也可已使用实例上的 `destory()` 方法销毁 Waline。详见 [SPA 支持](./).

## 第三方客户端
