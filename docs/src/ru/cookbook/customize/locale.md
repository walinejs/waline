---
title: Настройка локали
icon: i18n
---

Это руководство рассказывает, как настроить языки и тексты интерфейса Waline.

<!-- more -->

## Настройка языка и текстов клиента

`@waline/client` предоставляет параметр `locale`, с помощью которого можно настроить несколько языков и тексты интерфейса.

По умолчанию используются встроенные мультиязычные тексты; если язык не поддерживается, применяется `en-US` (американский английский).

В параметр `locale` можно передать полную конфигурацию языков, чтобы добавить поддержку языка, или задать отдельные значения, чтобы переопределить существующие тексты интерфейса.

### Параметры локали

- Связанные с уровнями:
  - `level${number}`: подпись для уровня с указанным номером

  ::: tip

  Например, так можно задать подписи для 6 уровней:

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

- Связанные с реакциями:
  - `reactionTitle`: заголовок реакций
  - `reaction0`: текст реакции 1
  - `reaction1`: текст реакции 2
  - `reaction2`: текст реакции 3
  - `reaction3`: текст реакции 4
  - `reaction4`: текст реакции 5
  - `reaction5`: текст реакции 6
  - `reaction6`: текст реакции 7
  - `reaction7`: текст реакции 8
  - `reaction8`: текст реакции 9

- Связанные с интерфейсом:
  - `nick`: никнейм
  - `mail`: адрес электронной почты
  - `link`: ссылка
  - `placeholder`: текст по умолчанию в поле комментария
  - `sofa`: текст, отображаемый, когда комментариев ещё нет
  - `submit`: текст кнопки отправки
  - `comment`: текст кнопки комментариев
  - `refresh`: текст кнопки обновления
  - `more`: текст кнопки «Загрузить ещё»
  - `uploading`: текст, отображаемый во время загрузки
  - `login`: текст кнопки входа
  - `admin`: метка администратора
  - `sticky`: текст «Закреплено»
  - `word`: слово
  - `anonymous`: имя по умолчанию для анонимного пользователя
  - `optional`: текст, указывающий на необязательность поля
  - `gifSearchPlaceholder`: подсказка в поле поиска эмодзи
  - `oldest`: самый старый комментарий
  - `latest`: самый новый комментарий
  - `hottest`: самый популярный комментарий

  ::: info

  Перечисленные тексты отображаются на странице.

  :::

- Связанные с подсказками:
  - `nickError`: сообщение об ошибке, когда никнейм не соответствует требованиям
  - `mailError`: сообщение об ошибке, когда адрес электронной почты не соответствует требованиям
  - `wordHint`: подсказка об ограничении количества слов в комментарии; `$0`, `$1` и `$2` автоматически заменяются на минимальное допустимое количество слов, максимальное допустимое количество слов и текущее количество слов.

- Связанные со временем комментария:
  - `seconds`: секунд назад
  - `minutes`: минут назад
  - `hours`: часов назад
  - `days`: дней назад
  - `now`: только что

- Связанные с управлением:
  - `approved`: кнопка, помечающая комментарий как одобренный
  - `waiting`: кнопка, помечающая комментарий как ожидающий проверки
  - `spam`: кнопка, помечающая комментарий как спам
  - `unsticky`: кнопка, снимающая закрепление комментария

- Связанные с доступностью:
  - `like`: текст метки кнопки «Нравится»
  - `cancelLike`: текст метки кнопки отмены «Нравится»
  - `reply`: текст метки кнопки ответа
  - `cancelReply`: текст метки кнопки отмены ответа
  - `preview`: текст метки кнопки предпросмотра
  - `emoji`: текст метки кнопки эмодзи
  - `gif`: текст метки кнопки GIF
  - `uploadImage`: текст метки кнопки загрузки изображения
  - `profile`: заголовок ссылки на страницу профиля
  - `logout`: текст метки кнопки выхода

  ::: info

  Эти тексты нужны только для обеспечения доступности и не отображаются на странице.

  :::

### Пример

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

## Настройка текстов ответов сервера

`@waline/vercel` предоставляет параметр `locales`, позволяющий настроить тексты ответов.

По умолчанию используются встроенные мультиязычные тексты; если язык не поддерживается, применяются тексты для `en-US`.

В параметр `locales` можно передать полную конфигурацию языков, чтобы добавить поддержку языка, или задать часть значений, чтобы переопределить существующие тексты.

::: tip

Все пользовательские тексты в итоге обрабатываются шаблонизатором nunjucks, который поддерживает довольно сложные логические выражения. Например:

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### Параметр locale

- Связанные с подсказками:
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- Связанные с письмами о регистрации и входе:
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- Связанные с письмами о комментариях:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### Пример

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
