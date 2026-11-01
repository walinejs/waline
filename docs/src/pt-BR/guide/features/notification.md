---
title: Notificação de comentários
icon: notice
order: 10
---

Quando um usuário publica um comentário no site ou responde a um comentário, o Waline oferece notificação por e-mail ou WeChat para o blogueiro e para o autor do comentário respondido.

- Oferecemos vários tipos de notificação para o blogueiro
- Enviaremos um e-mail ao visitante assim que o comentário dele receber uma resposta.

<!-- more -->

## Notificação por e-mail

A notificação por e-mail exige a configuração das seguintes variáveis de ambiente:

- `SMTP_SERVICE`: provedor de serviço de envio de e-mail SMTP

  ::: tip

  Você pode encontrar todos os provedores suportados em [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Se o seu provedor não estiver na lista, você deve configurar `SMTP_HOST` e `SMTP_PORT`.

  - `SMTP_HOST`: endereço do servidor SMTP, geralmente encontrado na página de configurações da caixa de e-mail.
  - `SMTP_PORT`: porta do servidor SMTP, geralmente encontrada na página de configurações da caixa de e-mail.

  :::

- `SMTP_USER`: conta do serviço de envio de e-mail SMTP, que é o seu endereço de e-mail.
- `SMTP_PASS`: senha do serviço de envio de e-mail SMTP, que é a senha do seu e-mail.
- `SMTP_SECURE`: conexão SMTP com SSL, `true` ou `false`.
- `SITE_NAME`: nome do seu site, que será exibido na mensagem de notificação.
- `SITE_URL`: URL do seu site, que será exibida na mensagem de notificação.

As seguintes variáveis de ambiente são opcionais:

- `SENDER_NAME`: nome personalizado do remetente na notificação
- `SENDER_EMAIL`: e-mail personalizado do remetente na notificação, obrigatório para alguns serviços SMTP.
- `MAIL_SUBJECT`: título personalizado do e-mail de resposta a comentário
- `MAIL_TEMPLATE`: conteúdo personalizado do e-mail de resposta
- `MAIL_SUBJECT_ADMIN`: título personalizado do e-mail de notificação de novo comentário
- `MAIL_TEMPLATE_ADMIN`: conteúdo personalizado do e-mail de notificação de novo comentário
- `AUTHOR_EMAIL`: e-mail do blogueiro, usado para identificar se o comentário enviado é do próprio blogueiro. Se for do blogueiro, não haverá notificação de lembrete.

## Notificação por WeChat

Usamos o [Mr. Server](http://sc.ftqq.com/3.version) para enviar notificações pelo WeChat. Você precisa definir `SC_KEY` no ambiente, com a chave obtida no Mr. Server.

- `SC_KEY`: token obtido no Mr. Server; é obrigatório para este serviço.
- `AUTHOR_EMAIL`: o e-mail do blogueiro é usado para identificar se o comentário enviado é do próprio blogueiro. Se for do blogueiro, não haverá notificação de lembrete.
- `SITE_NAME`: nome do seu site, que será exibido na mensagem de notificação.
- `SITE_URL`: URL do seu site, que será exibida na mensagem de notificação.

## Notificação por QQ

Usamos o [Mr. Qmsg](https://qmsg.zendee.cn) para enviar notificações pelo QQ. Você precisa definir `QMSG_KEY` no ambiente, com a chave obtida no Mr. Qmsg.

- `QMSG_KEY`: chave obtida no Mr. Qmsg; é obrigatória para este serviço.
- `QMSG_HOST`: host obtido no Mr. QmsgPrivate, opcional. É obrigatório para esse host. O padrão é `https://qmsg.zendee.cn`
- `QQ_ID`: o(s) ID(s) de QQ do(s) destinatário(s), exceto grupos de QQ. Se houver mais de um ID de QQ, separe os valores com vírgulas, por exemplo `1244453393,2952937634` (todos devem estar na lista de IDs de QQ do seu Mr. Qmsg).
- `AUTHOR_EMAIL`: o e-mail do blogueiro é usado para identificar se o comentário enviado é do próprio blogueiro. Se for do blogueiro, não haverá notificação de lembrete.
- `SITE_NAME`: nome do seu site, que será exibido na mensagem de notificação.
- `SITE_URL`: URL do seu site, que será exibida na mensagem de notificação.
- `QQ_TEMPLATE`: template de notificação usado pelo QQ. As variáveis e os formatos específicos podem ser encontrados no template de notificação abaixo. Se não for configurado, o template padrão será usado.

## Notificação por Telegram

Usamos um bot do Telegram para enviar notificações. Você precisa definir as seguintes variáveis de ambiente.

- `TG_BOT_TOKEN`: token do bot do Telegram para acessar a HTTP API. Crie um bot com [@BotFather](https://t.me/BotFather) para obter esse token. É obrigatório para este serviço.
- `TG_CHAT_ID`: o `chat_id` do destinatário. Pode ser um usuário, um canal ou um grupo. O [@userinfobot](https://t.me/userinfobot) exibirá esse `chat_id` quando você encaminhar uma mensagem para ele. É obrigatório para este serviço.
- `AUTHOR_EMAIL`: o e-mail do blogueiro é usado para identificar se o comentário enviado é do próprio blogueiro. Se for do blogueiro, não haverá notificação de lembrete.
- `SITE_NAME`: nome do seu site, que será exibido na mensagem de notificação.
- `SITE_URL`: URL do seu site, que será exibida na mensagem de notificação.
- `TG_TEMPLATE`: template de notificação usado pelo Telegram. As variáveis e os formatos específicos podem ser encontrados no template de notificação abaixo. Se não for configurado, o template padrão será usado.

## Notificação por PushPlus

O [pushplus](http://www.pushplus.plus/) é uma plataforma de push de mensagens que suporta diversos canais, como WeChat, WeChat Work, DingTalk, SMS ou e-mail. Você precisa definir as seguintes variáveis de ambiente. Acesse a [documentação do pushplus](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3) para obter mais detalhes sobre os formatos dos parâmetros.

- `PUSH_PLUS_KEY`: token do usuário. É obrigatório para este serviço.
- `PUSH_PLUS_TOPIC`: ID do grupo. Se estiver vazio, a mensagem é enviada para você mesmo. Não é usado se `PUSH_PLUS_CHANNEL` for igual a `webhook`.
- `PUSH_PLUS_TEMPLATE`: template de envio
- `PUSH_PLUS_CHANNEL`: canal de envio
- `PUSH_PLUS_WEBHOOK`: o webhook é obrigatório se `PUSH_PLUS_CHANNEL` for igual a `webhook` ou `cp`.
- `PUSH_PLUS_CALLBACKURL`: URL de callback após a resposta do envio.
- `AUTHOR_EMAIL`: o e-mail do blogueiro é usado para identificar se o comentário enviado é do próprio blogueiro. Se for do blogueiro, não haverá notificação de lembrete.
- `SITE_NAME`: nome do seu site, que será exibido na mensagem de notificação.
- `SITE_URL`: URL do seu site, que será exibida na mensagem de notificação.

## Notificação por Discord

Usamos o Webhook do Discord para enviar notificações. Você precisa definir as seguintes variáveis de ambiente.

- `DISCORD_WEBHOOK`: URL do Webhook do Discord, [como criar uma URL de Webhook do Discord](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)?
- `DISCORD_TEMPLATE`: template de envio
- `AUTHOR_EMAIL`: o e-mail do blogueiro é usado para identificar se o comentário enviado é do próprio blogueiro. Se for do blogueiro, não haverá notificação de lembrete.
- `SITE_NAME`: nome do seu site, que será exibido na mensagem de notificação.
- `SITE_URL`: URL do seu site, que será exibida na mensagem de notificação.

## Notificação por Lark

Usamos o Webhook do Lark para enviar notificações em grupos. As seguintes variáveis de ambiente são obrigatórias.

- `LARK_WEBHOOK`: bot de grupo do Lark, [uso de Webhooks](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US)
- `LARK_SECRET`: conforme esclarecido pela documentação do Lark, esse segredo é usado para assinar sua requisição e evitar abusos (opcional).
- `LARK_TEMPLATE`: template de mensagem
- `SITE_NAME`: nome do seu site, que será exibido nas mensagens de notificação.
- `SITE_URL`: URL do seu site, que será exibida nas mensagens de notificação.

## Template de notificação

O Waline permite configurar templates de notificação personalizados separadamente para cada plataforma, alcançando maior capacidade de personalização e compatibilidade com i18n.

### Variáveis suportadas

O template recebe parâmetros por meio dos objetos `self`, `parent` e `site`, que contêm, respectivamente, as seguintes variáveis:

- `self`: o próprio comentário

  | variável        | descrição                      |
  | --------------- | ------------------------------ |
  | nick            | Apelido do usuário que comenta |
  | mail            | E-mail do usuário que comenta  |
  | link            | Site do usuário que comenta    |
  | url             | Endereço do artigo             |
  | comment         | Conteúdo do comentário         |
  | browser         | Nome do navegador              |
  | os              | Nome do sistema operacional    |
  | avatar          | avatar                         |
  | _commentLink_\* | Links nos comentários          |

  \*: o commentLink é fornecido apenas em notificações do Telegram e será automaticamente encapsulado no formato Markdown.

- `parent`: comentário que foi respondido (comentário pai).

  | variável | descrição                      |
  | -------- | ------------------------------ |
  | nick     | Apelido do usuário que comenta |
  | mail     | E-mail do usuário que comenta  |
  | link     | Site do usuário que comenta    |
  | browser  | Nome do navegador              |
  | os       | Nome do sistema operacional    |
  | avatar   | avatar                         |
  | comment  | Conteúdo do comentário         |

- `site`: configuração do site

  | variável | descrição                       |
  | -------- | ------------------------------- |
  | name     | Nome do site                    |
  | url      | URL do site                     |
  | postUrl  | Endereço completo do comentário |

### Template padrão

O template padrão está incluído abaixo para sua referência:

- MAIL_SUBJECT:

  ```plain
  {{parent.nick | safe}}，『{{site.name | safe}}』上的评论收到了回复
  ```

- MAIL_TEMPLATE:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的评论有了新的回复
  </h2>
  {{parent.nick}} 同学，您曾发表评论：
  <div style="padding:0 12px 0 12px;margin-top:18px">
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{parent.comment | safe}}
    </div>
    <p><strong>{{self.nick}}</strong>回复说：</p>
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{self.comment | safe}}
    </div>
    <p>
      您可以点击<a
        style="text-decoration:none; color:#12addb"
        href="{{site.postUrl}}"
        target="_blank"
        >查看回复的完整內容</a
      >，欢迎再次光临<a
        style="text-decoration:none; color:#12addb"
        href="{{site.url}}"
        target="_blank"
        >{{site.name}}</a
      >。
    </p>
    <br />
  </div>
</div>
```

- MAIL_SUBJECT_ADMIN:

  ```plain
  {{site.name | safe}} 上有新评论了
  ```

- MAIL_TEMPLATE_ADMIN:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的文章有了新的评论
  </h2>
  <p><strong>{{self.nick}}</strong>回复说：</p>
  <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
    {{self.comment | safe}}
  </div>
  <p>
    您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank"
      >查看回复的完整內容</a
    >
  </p>
  <br />
</div>
```

- QQ_TEMPLATE:

  ```plain
  💬 {{site.name|safe}} 有新评论啦
  {{self.nick}} 评论道:
  {{self.comment}}
  邮箱: {{self.mail}}
  状态: {{self.status}}
  仅供评论预览，查看完整內容:
  {{site.postUrl}}
  ```

- TG_TEMPLATE:

  ````md
  💬 _[{{site.name}}]({{site.url}}) 有新评论啦_

  _{{self.nick}}_ 回复说:

  ```
  {{self.comment-}}
  ```

  {{-self.commentLink}}
  _邮箱: _\`{{self.mail}}\`
  _审核: _{{self.status}}

  仅供评论预览，点击[查看完整內容]({{site.postUrl}})
  ````

### Informações adicionais

1. O tamanho das variáveis de ambiente da Vercel é limitado a `4KB`, então, se o seu template for longo, você deve configurá-lo no arquivo de entrada principal; veja [issue#106](https://github.com/walinejs/waline/issues/106).
1. As informações específicas das variáveis podem mudar durante o desenvolvimento. As descrições aqui são apenas para referência. Consulte os exemplos de código específicos para saber o conteúdo exato.
