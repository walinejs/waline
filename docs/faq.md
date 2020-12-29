# FAQ

Waline 诞生之初就已经作了很明确的定位：

> 一款`带后端`的`极简风`评论系统。

而后发布的所有版本都是围绕这个定位上来做的修改。

## 和 Valine 是什么关系？

```
Waline = With backend Valine
```

评论列表前端使用 React 参考着 Valine 的已开源版本进行了重写，样式和结构还有内部的一些工具方法都来自 Valine。

## 是否需要再在 LeanCloud 上部署 Valine-Admin？

不需要。Waline 是数据存储，服务端接口以及客户端三位一体的部署，其中服务端接口就已经相当于之前 Valine 的 LeanCloud 云引擎。服务端这块已经包含了之前云引擎提供的评论管理和邮件通知等相关的功能，不依赖额外的 LeanCloud 云引擎，也不会收到 LeanCloud 云引擎的休眠策略的限制。

## 最后

以后`Waline`可能会有所变化，但不管如何变，不会改变`有后端`这个初衷。
