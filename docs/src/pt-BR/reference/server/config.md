---
title: Configuração do Servidor
icon: config
---

As opções a seguir precisam ser configuradas no arquivo de entrada do servidor `index.js`.

::: warning

Se você estiver usando um template, observe que precisa salvar essas configurações por conta própria, pois elas serão substituídas quando você atualizar para o template oficial mais recente.

Recomendamos criar um repositório a partir do template oficial e fazer suas alterações nele.

:::

## Opções Básicas

### plugins

- Tipo: `plugin[]`

Consulte [Sistema de Plugins](./plugin.md) para mais detalhes

### secureDomains

- Tipo: `string | RegExp | string[] | RegExp[]`

Configuração de domínios seguros. Requisições de outros domínios receberão o código de status 403. Suporta os tipos String, Regexp e Array. Deixar esta configuração vazia significa que todos os referrers de domínio são permitidos.

::: details Exemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- Para facilitar o desenvolvimento local, `localhost` e `127.0.0.1` serão adicionados à lista de domínios seguros por padrão.
- A variável de ambiente `SECURE_DOMAINS` não funcionará quando esta opção estiver definida.

:::

### forbiddenWords

- Tipo: `string[]`

Se um comentário corresponder a uma palavra proibida, ele será marcado como spam.

::: details Exemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Tipo: `string[]`

Se o IP de um comentário corresponder a esta lista, o código de status 403 será retornado.

::: details Exemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Tipo: `string`

Personaliza o título do e-mail de resposta ao comentário, o que equivale à variável de ambiente `MAIL_SUBJECT`.

### mailTemplate

- Tipo: `string`

Personaliza o conteúdo do e-mail de resposta ao comentário, o que equivale à variável de ambiente `MAIL_TEMPLATE`.

### mailSubjectAdmin

- Tipo: `string`

Personaliza o título do e-mail de notificação de novo comentário, o que equivale à variável de ambiente `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

- Tipo: `string`

Personaliza o conteúdo do e-mail de notificação de novo comentário, o que equivale à variável de ambiente `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

- Tipo: `string`

O modelo de notificação de comentário por QQ, o que equivale à variável de ambiente `QQ_TEMPLATE`.

### TGTemplate

- Tipo: `string`

O modelo de notificação de comentário por Telegram, o que equivale à variável de ambiente `TG_TEMPLATE`.

### model

- Tipo: `class`

Para detalhes, consulte [Personalizar Serviço de Banco de Dados](../../cookbook/customize/database.md)

### encryptPassword

- Tipo: `function`

Consulte [Personalizar Sistema de Usuários](../../cookbook/customize/userdb.md) para detalhes

### locales

- Tipo: `Record<string, Record<string, string>>`

Consulte [Locale Personalizado](../../cookbook/customize/locale.md)

## Hooks de Comentário

Além da configuração por variáveis de ambiente, o Waline também oferece alguns hooks personalizados para facilitar o processamento de requisitos personalizados. Eles só precisam ser configurados no arquivo de entrada do servidor `index.js`.

### preSave(comment)

O Waline fornece alguns hooks personalizados para que os usuários personalizem o comportamento do servidor Waline de acordo com suas próprias necessidades.

::: details Exemplo

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

A ação executada após o comentário ser publicado.

Quando o método é executado, os dados do comentário são passados como primeiro parâmetro e, se for uma resposta a um comentário, o comentário pai é passado como segundo parâmetro.

::: details Exemplo

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

Ação antes de o conteúdo de um comentário ser atualizado no painel administrativo. Se o método retornar conteúdo, a interface retornará diretamente sem atualizar os dados do comentário.

::: details Exemplo

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

Ação após o conteúdo de um comentário ser atualizado no painel administrativo. Os dados do comentário são passados quando o método é executado.

::: details Exemplo

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

Ação antes de um comentário ser excluído. Quando o método é executado, o ID do comentário a ser operado é passado. Se o método retornar conteúdo, a interface retornará diretamente sem atualizar os dados do comentário.

::: details Exemplo

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

Ação após um comentário ser excluído; o ID do comentário é passado como único parâmetro.

::: details Exemplo

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
