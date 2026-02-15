---
title: 플러그인 시스템
icon: api
---

사용자는 Waline이 제공하는 Hook을 통해 사용자 정의 훅 함수를 확장하여 사용자 정의 기능을 실현할 수 있습니다. 하지만 사용자가 사용자 정의 Hook 메서드를 공유하고 싶다면, 복사 방법만 사용할 수 있습니다. 이 문제를 해결하기 위해 Waline 플러그인 시스템이 탄생했습니다.

## 플러그인 설치

Waline의 초기화 설정에 새로운 `plugins` 속성이 추가되었으며, 여러 플러그인을 구성할 수 있습니다.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

다른 플러그인을 직접 설치하거나, 플러그인 훈칠 기능을 직접 `plugins`에 배치할 수도 있습니다:

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

## 플러그인 생성

### Hook 기반으로 만들기

플러그인을 만드는 것은 코운단 일입니다. 플러그인은 [훈칢](./config.md#hooks)의 콜난심으로 구성됩니다.

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

사용자가 여러 Hook 플러그인을 설치하면, 동일한 훈칢 함수의 실행은 플러그인이 설치된 순서대로 실행되멋니다. pre-훈칢 메서드가 조기 반환되면 후속 작업이 수행되지 않습니다.

### Create based on middleware

### 미들웨어 기반으로 만들기

Hook으로 충분하지 않다면, 더 강력한 미들웨어 모드를 사용하여 커스터마이징 개발할 수 있습니다. Waline의 하단에는 Node.js 프레임워크 [Koa](https://koajs.com)가 사용되고 있으며, Koa의 미들웨어 구성을 노출하고 있어 고급 개발자의 다양한 커스터마이징 요구를 만족할 수 있습니다.

Koa 미들웨어가 무엇인지 모른다면, 먼저 검색해 보세요. 미들웨어 모드를 사용하여 플러그인을 만들 때 주의할 점은 콜속 메서드가 반드시 `await next()` 실행을 짧짐다는 것입니다. 그렇지 않으면 후속 작업이 실행되지 않습니다.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Hook 타입 플러그인과 미들웨어 타입 플러그인을 함균 배치할 수 있으며, Waline이 이를 지원합니다.

### 플러그인 목록

플러그인 제출을 환영합니다~

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
