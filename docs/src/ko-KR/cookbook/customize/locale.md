---
title: 로케일 사용자 정의
icon: i18n
---

이 가이드는 Waline의 다국어 설정과 표시 텍스트를 사용자 정의하는 방법을 안내합니다.

<!-- more -->

## 클라이언트 언어 및 텍스트 사용자 정의

`@waline/client`는 `locale` 옵션을 제공하며, 이를 통해 다국어 및 표시 텍스트를 사용자 정의할 수 있습니다.

기본적으로 내장된 다국어 리터럴을 사용하며, 지원되지 않는 언어의 경우 `en-US`(미국 영어)로 대체됩니다.

`locale` 옵션에 완성된 다국어 구성을 전달하여 언어 지원을 추가하거나, 일부를 설정하여 기존 UI 텍스트를 재정의할 수 있습니다.

### locale 옵션

- 레벨 관련:
  - `level${number}`: 레벨 번호의 라벨

  ::: tip

  예를 들어, 6개 레벨의 라벨을 다음과 같이 사용자 정의할 수 있습니다:

  ```ts
  Waline.init({
    locale: {
      level0: '炼体',
      level1: '炼气',
      level2: '筑基',
      level3: '金丹',
      level4: '元婴',
      level5: '化神',
    },
  });
  ```

  :::

- 리액션 관련:
  - `reactionTitle`: 리액션 제목
  - `reaction0`: 리액션 1 텍스트
  - `reaction1`: 리액션 2 텍스트
  - `reaction2`: 리액션 3 텍스트
  - `reaction3`: 리액션 4 텍스트
  - `reaction4`: 리액션 5 텍스트
  - `reaction5`: 리액션 6 텍스트
  - `reaction6`: 리액션 7 텍스트
  - `reaction7`: 리액션 8 텍스트
  - `reaction8`: 리액션 9 텍스트

- UI 관련:
  - `nick`: 닉네임
  - `mail`: 이메일
  - `link`: 링크
  - `placeholder`: 댓글 입력란 기본 텍스트
  - `sofa`: 댓글 영역이 비어있을 때 표시되는 텍스트
  - `submit`: 제출 버튼 텍스트
  - `comment`: 댓글 버튼 텍스트
  - `refresh`: 새로고침 버튼 텍스트
  - `more`: 더 보기 버튼 텍스트
  - `uploading`: 업로드 중 표시 텍스트
  - `login`: 로그인 버튼 텍스트
  - `admin`: 관리자 라벨
  - `sticky`: 고정 텍스트
  - `word`: 단어
  - `anonymous`: 익명 사용자 기본 이름
  - `optional`: 선택 사항을 나타내는 텍스트
  - `gifSearchPlaceholder`: 이모지 검색 플레이스홀더 텍스트
  - `oldest`: 가장 오래된 댓글
  - `latest`: 최신 댓글
  - `hottest`: 인기 댓글

  ::: info

  위 텍스트는 페이지에 표시됩니다.

  :::

- 프롬프트 정보 관련:
  - `nickError`: 닉네임이 조건을 충족하지 않을 때의 오류 메시지
  - `mailError`: 이메일이 조건을 충족하지 않을 때의 오류 메시지
  - `wordHint`: 댓글 글자 수에 대한 오류 프롬프트로, `$0` `$1` `$2`는 각각 허용 글자 수의 하한, 상한, 현재 글자 수로 자동 대체됩니다.

- 댓글 시간 관련:
  - `seconds`: 초 전
  - `minutes`: 분 전
  - `hours`: 시간 전
  - `days`: 일 전
  - `now`: 방금 전

- 관리 관련:
  - `approved`: 댓글을 승인으로 표시하는 버튼
  - `waiting`: 댓글을 검토 대기로 표시하는 버튼
  - `spam`: 댓글을 스팸으로 표시하는 버튼
  - `unsticky`: 댓글 고정을 해제하는 버튼

- 접근성 관련:
  - `like`: 좋아요 버튼의 라벨 텍스트
  - `cancelLike`: 좋아요 취소 버튼의 라벨 텍스트
  - `reply`: 답글 버튼의 라벨 텍스트
  - `cancelReply`: 답글 취소 버튼의 라벨 텍스트
  - `preview`: 미리보기 버튼 라벨 텍스트
  - `emoji`: 이모지 버튼의 라벨 텍스트
  - `gif`: GIF 버튼의 라벨 텍스트
  - `uploadImage`: 이미지 업로드 버튼의 라벨 텍스트
  - `profile`: 프로필 페이지 링크 제목
  - `logout`: 로그아웃 버튼의 라벨 텍스트

  ::: info

  이 텍스트들은 접근성 용도로만 사용되며 페이지에 표시되지 않습니다.

  :::

### 예시

```js
// en default
const locale = {
  nick: 'NickName',
  nickError: 'NickName cannot be less than 3 bytes.',
  mail: 'E-Mail',
  mailError: 'Please confirm your email address.',
  link: 'Website',
  optional: 'Optional',
  placeholder: 'Comment here...',
  sofa: 'No comment yet.',
  submit: 'Submit',
  like: 'Like',
  cancelLike: 'Cancel like',
  reply: 'Reply',
  cancelReply: 'Cancel reply',
  comment: 'Comments',
  refresh: 'Refresh',
  more: 'Load More...',
  preview: 'Preview',
  emoji: 'Emoji',
  uploadImage: 'Upload Image',
  seconds: 'seconds ago',
  minutes: 'minutes ago',
  hours: 'hours ago',
  days: 'days ago',
  now: 'just now',
  uploading: 'Uploading',
  login: 'Login',
  logout: 'logout',
  admin: 'Admin',
  sticky: 'Sticky',
  word: 'Words',
  wordHint: 'Please input comments between $0 and $1 words!\n Current word number: $2',
  anonymous: 'Anonymous',
  level0: 'Dwarves',
  level1: 'Hobbits',
  level2: 'Ents',
  level3: 'Wizards',
  level4: 'Elves',
  level5: 'Maiar',
  gif: 'GIF',
  gifSearchPlaceholder: 'Search GIF',
  profile: 'Profile',
  approved: 'Approved',
  waiting: 'Waiting',
  spam: 'Spam',
  unsticky: 'Unsticky',
  oldest: 'Oldest',
  latest: 'Latest',
  hottest: 'Hottest',
  reactionTitle: 'What do you think?',
};

Waline.init({
  el: '#waline',
  path: location.pathname,
  serverURL: 'YOUR_SERVER_URL',
  // ...
  locale,
});
```

## 서버 응답 텍스트 사용자 정의

`@waline/vercel`은 응답 텍스트를 사용자 정의할 수 있는 `locales` 옵션을 제공합니다.

기본적으로 내장된 다국어 텍스트를 사용하며, 지원되지 않는 언어의 경우 `en-US` 언어 텍스트로 대체됩니다.

`locales` 옵션에 완성된 다국어 구성을 전달하여 언어 지원을 추가하거나, 일부를 설정하여 기존 텍스트를 재정의할 수 있습니다.
::: tip

모든 사용자 정의 텍스트는 최종적으로 nunjucks 템플릿 엔진을 사용하여 렌더링되며, 비교적 복잡한 논리 표현식을 작성할 수 있습니다. 예를 들어:

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### locale 옵션

- 프롬프트 정보 관련:
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- 가입/로그인 메일 알림 관련:
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- 댓글 메일 알림 관련:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### 예시

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  locales: {
    'en-US': {
      USER_EXIST: 'Warning! User exist!',
    },
  },
});
```
