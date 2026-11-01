---
title: Personalizar idioma e textos
icon: i18n
---

Este livro de receitas mostra como personalizar o idioma e os textos exibidos pelo Waline.

<!-- more -->

## Personalizar o idioma e os textos do cliente

O `@waline/client` fornece a opção `locale`, por meio da qual você pode personalizar vários idiomas e textos exibidos.

Por padrão, ele usa os textos multilíngues embutidos e recorre a `en-US` (inglês dos Estados Unidos) se o idioma não for suportado.

Você pode passar uma configuração multilíngue completa para a opção `locale` para adicionar suporte a um idioma, ou definir apenas algumas entradas para substituir os textos existentes da interface.

### Opções de locale

- Relacionadas a níveis:
  - `level${number}`: rótulo do nível número

  ::: tip

  Por exemplo, você pode personalizar os rótulos de 6 níveis assim:

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

- Relacionadas a reações:
  - `reactionTitle`: título da seção de reações
  - `reaction0`: texto da reação 1
  - `reaction1`: texto da reação 2
  - `reaction2`: texto da reação 3
  - `reaction3`: texto da reação 4
  - `reaction4`: texto da reação 5
  - `reaction5`: texto da reação 6
  - `reaction6`: texto da reação 7
  - `reaction7`: texto da reação 8
  - `reaction8`: texto da reação 9

- Relacionadas à interface:
  - `nick`: apelido
  - `mail`: e-mail
  - `link`: link
  - `placeholder`: texto padrão da caixa de comentários
  - `sofa`: texto exibido quando a área de comentários está vazia
  - `submit`: texto do botão de envio
  - `comment`: texto do botão de comentar
  - `refresh`: texto do botão de atualizar
  - `more`: texto do botão de carregar mais
  - `uploading`: texto exibido durante o envio
  - `login`: texto do botão de entrar
  - `admin`: rótulo do administrador
  - `sticky`: texto de comentário fixado
  - `word`: palavra
  - `anonymous`: nome padrão do usuário anônimo
  - `optional`: texto que indica que o campo é opcional
  - `gifSearchPlaceholder`: texto de placeholder da busca de emojis
  - `oldest`: comentário mais antigo
  - `latest`: comentário mais recente
  - `hottest`: comentário mais popular

  ::: info

  Os textos acima são exibidos na página.

  :::

- Relacionadas a mensagens de aviso:
  - `nickError`: mensagem de erro quando o apelido não atende aos requisitos
  - `mailError`: mensagem de erro quando o e-mail não atende aos requisitos
  - `wordHint`: mensagem de erro sobre o número de palavras do comentário, em que `$0`, `$1` e `$2` são substituídos automaticamente pelo limite mínimo de palavras permitido, pelo limite máximo de palavras permitido e pelo número atual de palavras.

- Relacionadas ao tempo dos comentários:
  - `seconds`: segundos atrás
  - `minutes`: minutos atrás
  - `hours`: horas atrás
  - `days`: dias atrás
  - `now`: agora mesmo

- Relacionadas ao gerenciamento:
  - `approved`: botão que marca o comentário como aprovado
  - `waiting`: botão que marca o comentário como aguardando revisão
  - `spam`: botão que marca o comentário como spam
  - `unsticky`: botão que desafixa o comentário

- Relacionadas à acessibilidade:
  - `like`: texto do rótulo do botão de curtir
  - `cancelLike`: texto do rótulo do botão de desfazer curtida
  - `reply`: texto do rótulo do botão de responder
  - `cancelReply`: texto do rótulo do botão de cancelar resposta
  - `preview`: texto do rótulo do botão de pré-visualização
  - `emoji`: texto do rótulo do botão de emojis
  - `gif`: texto do rótulo do botão de GIF
  - `uploadImage`: texto do rótulo do botão de enviar imagem
  - `profile`: título do link da página de perfil
  - `logout`: texto do rótulo do botão de sair

  ::: info

  Esses textos servem apenas para acessibilidade e não são exibidos na página.

  :::

### Exemplo

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

## Personalizar os textos de resposta do servidor

O `@waline/vercel` fornece a opção `locales`, que permite personalizar os textos de resposta.

Por padrão, ele usa os textos multilíngues embutidos e recorre aos textos de `en-US` se o idioma não for suportado.

Você pode passar uma configuração multilíngue completa para a opção `locales` para adicionar suporte a um idioma, ou definir algumas entradas para substituir os textos existentes.

::: tip

Todos os textos personalizados são renderizados pelo mecanismo de templates nunjucks, que permite escrever algumas expressões lógicas relativamente complexas. Por exemplo:

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### Opções de locales

- Relacionadas a mensagens de aviso:
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- Relacionadas a notificações de e-mail de cadastro/entrada:
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- Relacionadas a notificações de e-mail de comentários:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### Exemplo

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
