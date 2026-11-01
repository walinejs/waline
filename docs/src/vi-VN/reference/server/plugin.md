---
title: Hệ thống plugin
icon: api
---

Người dùng có thể mở rộng chức năng thông qua Hook do Waline cung cấp để hiện thực các tính năng tùy chỉnh. Nhưng nếu người dùng muốn chia sẻ các phương thức Hook tùy chỉnh, họ chỉ có thể dùng cách sao chép. Để giải quyết vấn đề này, hệ thống plugin của Waline ra đời.

## Cài đặt plugin

Thuộc tính `plugins` đã được thêm vào cấu hình khởi tạo của Waline, hỗ trợ cấu hình nhiều plugin.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

Để cài đặt trực tiếp plugin của người khác, bạn cũng có thể đặt trực tiếp các hook của plugin trong `plugins`:

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [
    {
      hooks: {
        async postSave() {
          // do what ever you want after comment saved
        },
      },
      middlewares: [
        async (ctx, next) => {
          await next();
        },
      ],
    },
  ],
});
```

## Tạo plugin

### Tạo dựa trên Hook

Việc xây dựng một plugin rất đơn giản. Một plugin được cấu thành từ một tập hợp [hook](./config.md#hook-binh-luan).

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

Cần lưu ý rằng nếu người dùng cài đặt nhiều plugin Hook, việc thực thi cùng một hàm hook sẽ diễn ra theo thứ tự cài đặt của các plugin. Nếu phương thức pre-hook trả về sớm, các thao tác tiếp theo sẽ không được thực hiện.

### Tạo dựa trên middleware

Nếu Hook không đáp ứng được nhu cầu của bạn, bạn có thể dùng chế độ middleware mạnh mẽ hơn để phát triển tùy chỉnh. Tầng nền của Waline sử dụng framework Node.js [Koa](https://koajs.com), và chúng tôi công khai toàn bộ cấu hình middleware của Koa, có thể đáp ứng nhiều nhu cầu tùy chỉnh của các nhà phát triển nâng cao.

Nếu bạn chưa biết middleware của Koa là gì, hãy tìm hiểu trước. Điều cần lưu ý khi dùng chế độ middleware để viết plugin là hàm callback phải gọi `await next()`, nếu không các thao tác tiếp theo sẽ không được thực thi.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Tất nhiên, bạn có thể đặt logic của plugin kiểu Hook và plugin kiểu middleware cùng nhau, Waline đều hỗ trợ.

### Danh sách plugin

Hoan nghênh bạn đóng góp plugin~

- [@waline-plugins/hello-world](https://github.com/walinejs/plugins/tree/master/packages/hello-world)
- [@waline-plugins/privacy](https://github.com/walinejs/plugins/tree/master/packages/privacy)
- [@waline-plugins/tencent-tms](https://github.com/walinejs/plugins/tree/master/packages/tencent-tms)
- [@waline-plugins/link-interceptor](https://github.com/walinejs/plugins/tree/master/packages/link-interceptor)
- [waline-plugin-llm-reviewer](https://github.com/zhullyb/waline-plugin-llm-reviewer)
- [waline-notification-bark](https://github.com/wnwd/waline-notification-bark)
- [waline-notification-telegram-bot](https://github.com/wnwd/waline-notification-telegram-bot)
- [waline-notification-wecom-group-bot](https://github.com/wnwd/waline-notification-wecom-group-bot)
- [waline-notification-lark-group-bot](https://github.com/wnwd/waline-notification-lark-group-bot)
- [waline-notification-slack-app](https://github.com/wnwd/waline-notification-slack-app)
- [waline-openai-moderation](https://github.com/chenxv399/waline-openai-moderation)
