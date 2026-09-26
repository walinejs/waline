---
title: 서버 설정
icon: config
---

다음 옵션은 서버 진입 파일 `index.js`에서 설정해야 합니다.

::: warning

템플릿을 사용하는 경우, 최신 공식 템플릿을 가져올 때 덮어쓰기되므로 이러한 설정을 직접 저장해야 합니다.

공식 템플릿에서 저장소를 생성하고 거기에서 변경하는 것을 권장합니다.

:::

## 기본 옵션

### plugins

- 타입: `plugin[]`

자세한 내용은 [플러그인 시스템](./plugin.md)을 참조하세요.

### secureDomains

- 타입: `string | RegExp | string[] | RegExp[]`

보안 도메인 설정. 다른 도메인의 요청은 403 상태 코드를 받습니다. String, Regexp, Array 타입을 지원합니다. 이 설정을 비워두면 모든 도메인 리퍼러가 허용됩니다.

::: details 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- 로컬 개발을 용이하게 하기 위해 `localhost`와 `127.0.0.1`이 기본적으로 보안 도메인 목록에 추가됩니다.
- 이 옵션이 설정되면 환경 변수 `SECURE_DOMAINS`는 작동하지 않습니다.

:::

### forbiddenWords

- 타입: `string[]`

댓글이 금지 단어와 일치하면 스팸으로 표시됩니다.

::: details 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- 타입: `string[]`

댓글 IP가 이 목록과 일치하면 403 상태 코드가 반환됩니다.

::: details 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- 타입: `string`

댓글 답글 이메일의 제목을 사용자 정의합니다. 환경 변수 `MAIL_SUBJECT`와 동일합니다.

### mailTemplate

- 타입: `string`

댓글 답글 이메일의 내용을 사용자 정의합니다. 환경 변수 `MAIL_TEMPLATE`와 동일합니다.

### mailSubjectAdmin

- 타입: `string`

새 댓글 알림 이메일의 제목을 사용자 정의합니다. 환경 변수 `MAIL_SUBJECT_ADMIN`과 동일합니다.

### mailTemplateAdmin

- 타입: `string`

새 댓글 알림 이메일의 내용을 사용자 정의합니다. 환경 변수 `MAIL_TEMPLATE_ADMIN`과 동일합니다.

### QQTemplate

- 타입: `string`

QQ 댓글 알림 템플릿으로, 환경 변수 `QQ_TEMPLATE`와 동일합니다.

### TGTemplate

- 타입: `string`

Telegram 댓글 알림 템플릿으로, 환경 변수 `TG_TEMPLATE`와 동일합니다.

### model

- 타입: `class`

자세한 내용은 [데이터베이스 서비스 사용자 정의](../../cookbook/customize/database.md)를 참조하세요.

### encryptPassword

- 타입: `function`

자세한 내용은 [사용자 시스템 사용자 정의](../../cookbook/customize/userdb.md)를 참조하세요.

### locales

- 타입: `Record<string, Record<string, string>>`

[사용자 정의 로케일](../../cookbook/customize/locale.md)을 참조하세요.

## 댓글 훅

환경 변수 설정 외에도 Waline은 사용자 정의 요구 사항을 쉽게 처리할 수 있도록 일부 사용자 정의 훅을 제공합니다. 서버 진입 파일 `index.js`에서 설정하면 됩니다.

### preSave(comment)

Waline은 사용자가 자신의 필요에 따라 Waline 서버 동작을 사용자 정의할 수 있도록 일부 사용자 정의 훅을 제공합니다.

::: details 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSpam = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

:::

### postSave(comment, pComment)

댓글이 게시된 후 수행되는 동작입니다.

메서드가 실행될 때 댓글 데이터가 첫 번째 매개변수로 전달되며, 댓글에 대한 답글인 경우 부모 댓글이 두 번째 매개변수로 전달됩니다.

::: details 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`,
    });
  },
});
```

:::

### preUpdate(comment)

대시보드에서 댓글 내용이 업데이트되기 전의 동작입니다. 메서드가 내용을 반환하면 댓글 데이터를 업데이트하지 않고 인터페이스가 바로 반환됩니다.

::: details 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

:::

### afterUpdate(comment)

대시보드에서 댓글 내용이 업데이트된 후의 동작입니다. 메서드가 실행될 때 댓글 데이터가 전달됩니다.

::: details 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

:::

### preDelete(commentId)

댓글이 삭제되기 전의 동작입니다. 메서드가 실행될 때 작업할 댓글 ID가 전달됩니다. 메서드가 내용을 반환하면 댓글 데이터를 업데이트하지 않고 인터페이스가 바로 반환됩니다.

::: details 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

:::

### afterDelete(commentId)

댓글이 삭제된 후의 동작으로, 댓글 ID가 유일한 매개변수로 전달됩니다.

::: details 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```

:::
