---
title: ロケールをカスタマイズする
icon: i18n
---

このクックブックでは、Waline の多言語表示とテキストをカスタマイズする方法を説明します。

<!-- more -->

## クライアントの言語とテキストをカスタマイズする

`@waline/client` は `locale` オプションを提供しており、これを通じて多言語と表示テキストをカスタマイズできます。

デフォルトでは組み込みの多言語リテラルを使用し、サポートされていない言語の場合は `en-US`（英語・米国）にフォールバックします。

完成した多言語設定を `locale` オプションに渡すことで言語サポートを追加できます。また、その一部のみを設定して既存の UI テキストを上書きすることもできます。

### ロケールオプション

- レベル関連:
  - `level${number}`: レベル番号のラベル

  ::: tip

  例えば、次のように 6 つのレベルのラベルをカスタマイズできます:

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

- リアクション関連:
  - `reactionTitle`: リアクションのタイトル
  - `reaction0`: リアクション 1 のテキスト
  - `reaction1`: リアクション 2 のテキスト
  - `reaction2`: リアクション 3 のテキスト
  - `reaction3`: リアクション 4 のテキスト
  - `reaction4`: リアクション 5 のテキスト
  - `reaction5`: リアクション 6 のテキスト
  - `reaction6`: リアクション 7 のテキスト
  - `reaction7`: リアクション 8 のテキスト
  - `reaction8`: リアクション 9 のテキスト

- UI 関連:
  - `nick`: ニックネーム
  - `mail`: メールアドレス
  - `link`: リンク
  - `placeholder`: コメントボックスのデフォルトテキスト
  - `sofa`: コメントエリアが空のときに表示されるテキスト
  - `submit`: 送信ボタンのテキスト
  - `comment`: コメントボタンのテキスト
  - `refresh`: 更新ボタンのテキスト
  - `more`: さらに読み込むボタンのテキスト
  - `uploading`: アップロード中の表示テキスト
  - `login`: ログインボタンのテキスト
  - `admin`: 管理者のラベル
  - `sticky`: 固定のテキスト
  - `word`: 文字
  - `anonymous`: 匿名ユーザーのデフォルト名
  - `optional`: 任意項目であることを示すテキスト
  - `gifSearchPlaceholder`: 絵文字検索のプレースホルダーテキスト
  - `oldest`: 古いコメント
  - `latest`: 新しいコメント
  - `hottest`: 人気のコメント

  ::: info

  上記のテキストはページに表示されます。

  :::

- プロンプト情報関連:
  - `nickError`: ニックネームが条件を満たさない場合のエラーメッセージ
  - `mailError`: メールアドレスが条件を満たさない場合のエラーメッセージ
  - `wordHint`: コメントの文字数に関するエラー表示。`$0` `$1` `$2` はそれぞれ許容される文字数の下限、上限、現在の文字数に自動的に置き換えられます。

- コメント時刻関連:
  - `seconds`: 数秒前
  - `minutes`: 数分前
  - `hours`: 数時間前
  - `days`: 数日前
  - `now`: たった今

- 管理関連:
  - `approved`: コメントを承認済みとしてマークするボタン
  - `waiting`: コメントを承認待ちとしてマークするボタン
  - `spam`: コメントをスパムとしてマークするボタン
  - `unsticky`: コメントの固定を解除するボタン

- アクセシビリティ関連:
  - `like`: いいねボタンのラベルテキスト
  - `cancelLike`: いいねを取り消すボタンのラベルテキスト
  - `reply`: 返信ボタンのラベルテキスト
  - `cancelReply`: 返信を取り消すボタンのラベルテキスト
  - `preview`: プレビューボタンのラベルテキスト
  - `emoji`: 絵文字ボタンのラベルテキスト
  - `gif`: Gif ボタンのラベルテキスト
  - `uploadImage`: 画像アップロードボタンのラベルテキスト
  - `profile`: プロフィールページのリンクタイトル
  - `logout`: ログアウトボタンのラベルテキスト

  ::: info

  これらのテキストはアクセシビリティのみを目的としており、ページには表示されません。

  :::

### 例

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

## サーバーのレスポンステキストをカスタマイズする

`@waline/vercel` は `locales` オプションを提供しており、レスポンステキストをカスタマイズできます。

デフォルトでは組み込みの多言語テキストを使用し、サポートされていない言語の場合は `en-US` のテキストにフォールバックします。

完成した多言語設定を `locales` オプションに渡すことで言語サポートを追加できます。また、その一部を設定して既存のテキストを上書きすることもできます。

::: tip

カスタマイズしたテキストはすべて最終的に nunjucks テンプレートエンジンでレンダリングされるため、比較的複雑な論理式を記述できます。例えば次のとおりです。

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### locale オプション

- プロンプト情報関連:
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- 登録/ログインのメール通知関連:
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- コメントのメール通知関連:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### 例

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
