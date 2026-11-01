---
title: Конфигурация сервера
icon: config
---

Следующие параметры нужно задать в файле входа сервера `index.js`.

::: warning

Если вы используете шаблон, учтите: эти конфигурации придётся сохранять самостоятельно, поскольку при получении последней версии официального шаблона они будут перезаписаны.

Рекомендуем создать репозиторий на основе официального шаблона и вносить изменения в нём.

:::

## Основные параметры

### plugins

- Тип: `plugin[]`

Подробнее см. в разделе [Система плагинов](./plugin.md)

### secureDomains

- Тип: `string | RegExp | string[] | RegExp[]`

Настройка доверенных доменов. Запросы с других доменов получают код состояния 403. Поддерживаются строки, регулярные выражения и массивы. Если параметр не задан, разрешены все домены-источники.

::: details Пример

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- Для удобства локальной разработки `localhost` и `127.0.0.1` по умолчанию добавляются в список доверенных доменов.
- При заданном параметре переменная окружения `SECURE_DOMAINS` не работает.

:::

### forbiddenWords

- Тип: `string[]`

Если комментарий содержит запрещённое слово, он помечается как спам.

::: details Пример

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Тип: `string[]`

Если IP-адрес комментария есть в этом списке, возвращается код состояния 403.

::: details Пример

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Тип: `string`

Настройка темы письма-ответа на комментарий; эквивалентно переменной окружения `MAIL_SUBJECT`.

### mailTemplate

- Тип: `string`

Настройка содержимого письма-ответа на комментарий; эквивалентно переменной окружения `MAIL_TEMPLATE`.

### mailSubjectAdmin

- Тип: `string`

Настройка темы письма-уведомления о новом комментарии; эквивалентно переменной окружения `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

- Тип: `string`

Настройка содержимого письма-уведомления о новом комментарии; эквивалентно переменной окружения `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

- Тип: `string`

Шаблон уведомления о комментариях для QQ; эквивалентно переменной окружения `QQ_TEMPLATE`.

### TGTemplate

- Тип: `string`

Шаблон уведомления о комментариях для Telegram; эквивалентно переменной окружения `TG_TEMPLATE`.

### model

- тип: `class`

Подробнее см. в разделе [Настройка сервиса базы данных](../../cookbook/customize/database.md)

### encryptPassword

- тип: `function`

Подробнее см. в разделе [Настройка пользовательской системы](../../cookbook/customize/userdb.md)

### locales

- тип: `Record<string, Record<string, string>>`

См. [Настройка локали](../../cookbook/customize/locale.md)

## Хуки комментариев

Помимо настройки через переменные окружения, Waline предоставляет пользовательские хуки, упрощающие реализацию собственных задач. Их достаточно задать в файле входа сервера `index.js`.

### preSave(comment)

Waline предоставляет пользовательские хуки, позволяющие адаптировать поведение сервера Waline под собственные нужды.

::: details Пример

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

Действие, выполняемое после публикации комментария.

При вызове метода первым параметром передаются данные комментария, а если это ответ на комментарий, вторым параметром передаётся родительский комментарий.

::: details Пример

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

Действие перед обновлением содержимого комментария в панели администратора. Если метод возвращает содержимое, интерфейс сразу возвращает ответ, не обновляя данные комментария.

::: details Пример

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

### postUpdate(comment)

Действие после обновления содержимого комментария в панели администратора. При вызове метода передаются данные комментария.

::: details Пример

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

Действие перед удалением комментария. При вызове метода передаётся идентификатор комментария, с которым выполняется операция. Если метод возвращает содержимое, интерфейс сразу возвращает ответ, не обновляя данные комментария.

::: details Пример

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

### postDelete(commentId)

Действие после удаления комментария; единственным параметром передаётся идентификатор комментария.

::: details Пример

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
