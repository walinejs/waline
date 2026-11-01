---
title: Variáveis de Ambiente do Servidor
icon: config
---

Você pode personalizar o Servidor Waline através das seguintes variáveis de ambiente.

::: warning

Você DEVE **reimplantar** após atualizar as variáveis de ambiente para que as alterações entrem em vigor.

Ao usar o Vercel, você deve defini-las em `Settings` - `Environment Variables`.

:::

<!-- more -->

## Básico

| Variáveis de Ambiente | Obrigatório | Descrição                                                                              |
| --------------------- | ----------- | -------------------------------------------------------------------------------------- |
| `SITE_NAME`           |             | nome do site                                                                           |
| `SITE_URL`            |             | URL do site                                                                            |
| `LOGIN`               |             | O usuário precisa entrar antes de comentar quando `LOGIN=force`                        |
| `SERVER_URL`          |             | a URL do Servidor Waline, útil quando o endereço gerado automaticamente está incorreto |

## Exibição

| Variáveis de Ambiente   | Padrão                                                                  | Descrição                                                                     |
| ----------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                         | se deve ocultar o user agent do usuário que comenta. O valor padrão é `false` |
| `DISABLE_REGION`        |                                                                         | se deve ocultar a região do usuário que comenta. O valor padrão é `false`     |
| `DISABLE_AUTHOR_NOTIFY` |                                                                         | se deve desativar a notificação ao autor                                      |
| `AVATAR_PROXY`          | `''`                                                                    | URL do serviço de proxy de avatar. Deixe vazio para desativá-lo               |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | string de renderização do Gravatar, baseada em template nunjucks              |
| `LEVELS`                |                                                                         | Atribui um rótulo de nível a cada usuário com base no número de comentários   |

::: tip Rótulo de Nível

De acordo com o número de comentários do usuário, um rótulo de nível é adicionado ao usuário que comenta segundo as condições de classificação. Este recurso vem desativado por padrão e pode ser habilitado definindo a variável de ambiente `LEVELS`. A configuração é uma sequência de números separados por vírgulas; por exemplo, `0,10,20,50,100,200` significa:

| Níveis | Condições          | Rótulos de nível padrão |
| ------ | ------------------ | ----------------------- |
| 0      | 0 <= count < 10    | Dwarves                 |
| 1      | 10 <= count < 20   | Hobbits                 |
| 2      | 20 <= count < 50   | Ents                    |
| 3      | 50 <= count < 100  | Wizards                 |
| 4      | 100 <= count < 200 | Elves                   |
| 5      | 200 <= count       | Maiar                   |

Além de personalizar as regras de julgamento de nível, também podemos personalizar o rótulo de nível. Configure o texto no cliente da seguinte forma:

```js
Waline.init({
  locale: {
    level0: 'Dwarves',
    level1: 'Hobbits',
    level2: 'Ents',
    level3: 'Wizards',
    level4: 'Elves',
    level5: 'Maiar',
  },
});
```

Por padrão, são fornecidos apenas 6 níveis de texto, mas isso não significa que só pode haver 6 níveis. O limite específico depende das regras de julgamento de nível que você definir. Para adicionar um novo nível, recomenda-se configurar você mesmo o texto do rótulo correspondente ao nível. Se nenhum texto de rótulo for fornecido, o texto padrão, como `Level 10`, será exibido.

:::

## Segurança

| Variáveis de Ambiente | Padrão         | Descrição                                                                                                                                                                 |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IPQPS`               | `60`           | Limite de frequência de publicação de comentários por IP, em segundos. Defina como 0 para não limitar                                                                     |
| `SECURE_DOMAINS`      |                | Configuração de Domínios Seguros. Suporta vários domínios separados por vírgula                                                                                           |
| `AKISMET_KEY`         | `70542d86693e` | Chave do serviço antispam Akismet; defina `false` se quiser desativá-lo.                                                                                                  |
| `COMMENT_AUDIT`       | `false`        | Interruptor de auditoria de comentários. Quando habilitado, cada comentário precisa ser aprovado pelo administrador, por isso é recomendável informar isso no placeholder |
| `RECAPTCHA_V3_KEY`    |                | Chave do reCAPTCHA V3; deve ser definida junto com o cliente                                                                                                              |
| `RECAPTCHA_V3_SECRET` |                | Segredo do reCAPTCHA V3 para o servidor.                                                                                                                                  |
| `TURNSTILE_KEY`       |                | Chave do Turnstile; deve ser definida junto com o cliente                                                                                                                 |
| `TURNSTILE_SECRET`    |                | Segredo do Turnstile para o servidor                                                                                                                                      |

::: tip Recaptcha e Turnstile

A chave e o segredo do Turnstile podem ser solicitados em <https://www.cloudflare.com/products/turnstile/>.

A chave e o segredo do Recaptcha podem ser solicitados em <https://www.google.com/recaptcha>.

Ao definir os domínios de segurança, você precisa adicionar ao mesmo tempo o endereço do site e o endereço do servidor Waline.

:::

## Markdown

| Variáveis de Ambiente | Padrão    | Descrição                                                                      |
| --------------------- | --------- | ------------------------------------------------------------------------------ |
| `MARKDOWN_CONFIG`     | `{}`      | Configuração do MarkdownIt                                                     |
| `MARKDOWN_HIGHLIGHT`  | `true`    | Se deve habilitar o destaque                                                   |
| `MARKDOWN_EMOJI`      | `true`    | Se deve habilitar emoji                                                        |
| `MARKDOWN_SUB`        | `true`    | Se deve habilitar subscrito                                                    |
| `MARKDOWN_SUP`        | `true`    | Se deve habilitar sobrescrito                                                  |
| `MARKDOWN_TEX`        | `mathjax` | Serviço para processar matemática; `mathjax`, `katex` e `false` são suportados |
| `MARKDOWN_MATHJAX`    | `{}`      | Opções do MathJax                                                              |
| `MARKDOWN_KATEX`      | `{}`      | Opções do KaTeX                                                                |

## Serviço de E-mail

O serviço de e-mail é usado para notificação por e-mail de cadastros de usuários e de comentários. Após configurar as variáveis relacionadas ao serviço de e-mail, o cadastro de usuário passará a incluir operações relacionadas à confirmação por código de verificação de e-mail, para evitar cadastros maliciosos.

| Nome da variável de ambiente | Observações                        |
| ---------------------------- | ---------------------------------- |
| `SMTP_SERVICE`               | Provedor de serviço de e-mail SMTP |
| `SMTP_HOST`                  | Endereço do servidor SMTP          |
| `SMTP_PORT`                  | Porta do servidor SMTP             |
| `SMTP_USER`                  | Nome de usuário do SMTP            |
| `SMTP_PASS`                  | Senha do SMTP.                     |
| `SMTP_SECURE`                | Conexão SMTP com SSL               |
| `SENDER_NAME`                | Personalizar o nome do remetente   |
| `SENDER_EMAIL`               | Personalizar o e-mail do remetente |

::: tip

Os provedores de serviço suportados podem ser encontrados em [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Você pode escolher entre `SMTP_SERVICE` e (`SMTP_HOST`, `SMTP_PORT`). Se você não souber o `SMTP_SERVICE` correspondente na lista, precisa configurar `SMTP_HOST` e `SMTP_PORT`, que provavelmente podem ser encontrados nas configurações da caixa de correio.

O nome de usuário do SMTP geralmente aceita o e-mail completo do usuário, e a senha costuma ser a mesma da caixa de correio.

Observe especialmente que algumas caixas de correio usam senhas SMTP separadas.

:::

## Banco de Dados

### MongoDB

| Variável de Ambiente | Obrigatório | Padrão    | Descrição                                              |
| -------------------- | ----------- | --------- | ------------------------------------------------------ |
| `MONGO_DB`           | ✅          |           | Nome do banco de dados MongoDB                         |
| `MONGO_USER`         | ✅          |           | Nome de usuário do servidor MongoDB                    |
| `MONGO_PASSWORD`     | ✅          |           | Senha do servidor MongoDB                              |
| `MONGO_HOST`         |             | 127.0.0.1 | Endereço do servidor MongoDB, suporta formato de array |
| `MONGO_PORT`         |             | 27017     | Porta do servidor MongoDB, suporta formato de array    |
| `MONGO_REPLICASET`   |             |           | Conjunto de réplicas do MongoDB                        |
| `MONGO_AUTHSOURCE`   |             |           | Origem de autenticação do MongoDB                      |
| `MONGO_OPT_SSL`      |             | `false`   | usar conexão SSL                                       |

### MySQL

| Variável de Ambiente | Obrigatório | Padrão    | Descrição                         |
| -------------------- | ----------- | --------- | --------------------------------- |
| `MYSQL_DB`           | ✅          |           | Nome do banco de dados MySQL      |
| `MYSQL_USER`         | ✅          |           | Nome de usuário do servidor MySQL |
| `MYSQL_PASSWORD`     | ✅          |           | Senha do servidor MySQL           |
| `MYSQL_HOST`         |             | 127.0.0.1 | Endereço do servidor MySQL        |
| `MYSQL_PORT`         |             | 3306      | Porta do servidor MySQL           |
| `MYSQL_PREFIX`       |             | `wl_`     | Prefixo de tabela do MySQL        |
| `MYSQL_CHARSET`      |             | `utf8mb4` | Charset da tabela do MySQL        |
| `MYSQL_SSL`          |             | `false`   | se deve usar conexão SSL          |

### TiDB

[Criar um banco de dados no TiDB](../../../pt-BR/guide/deploy/tidb.md)

| Variável de Ambiente | Obrigatório | Padrão    | Descrição                        |
| -------------------- | ----------- | --------- | -------------------------------- |
| `TIDB_DB`            | ✅          |           | Nome do banco de dados TiDB      |
| `TIDB_USER`          | ✅          |           | Nome de usuário do servidor TiDB |
| `TIDB_PASSWORD`      | ✅          |           | Senha do servidor TiDB           |
| `TIDB_HOST`          |             | 127.0.0.1 | Endereço do servidor TiDB        |
| `TIDB_PORT`          |             | 4000      | Porta do servidor TiDB           |
| `TIDB_PREFIX`        |             | `wl_`     | Prefixo de tabela do TiDB        |
| `TIDB_CHARSET`       |             | `utf8mb4` | Charset da tabela do TiDB        |

### SQLite

| Variável de Ambiente | Obrigatório | Padrão | Descrição                                                                                  |
| -------------------- | ----------- | ------ | ------------------------------------------------------------------------------------------ |
| `SQLITE_PATH`        | ✅          |        | Caminho do arquivo de armazenamento do SQLite, sem incluir o nome do arquivo               |
| `JWT_TOKEN`          | ✅          |        | String aleatória para o gerador de token de login                                          |
| `SQLITE_DB`          |             | waline | Nome do arquivo de armazenamento do SQLite; altere se o seu nome de arquivo não for waline |
| `SQLITE_PREFIX`      |             | `wl_`  | Prefixo de tabela do SQLite                                                                |

### PostgreSQL

| Variável de Ambiente | Obrigatório | Padrão    | Descrição                                |
| -------------------- | ----------- | --------- | ---------------------------------------- |
| `PG_DB`              | ✅          |           | Nome do banco de dados PostgreSQL        |
| `PG_USER`            | ✅          |           | Nome de usuário do servidor PostgreSQL   |
| `PG_PASSWORD`        | ✅          |           | Senha do servidor PostgreSQL             |
| `PG_HOST`            |             | 127.0.0.1 | Endereço do servidor PostgreSQL          |
| `PG_PORT`            |             | 5432      | Porta do servidor PostgreSQL             |
| `PG_PREFIX`          |             | `wl_`     | Prefixo de tabela do PostgreSQL          |
| `PG_SSL`             |             | `false`   | defina como `true` para usar conexão SSL |
| `POSTGRES_DATABASE`  |             |           | alias de `PG_DB`                         |
| `POSTGRES_USER`      |             |           | alias de `PG_USER`                       |
| `POSTGRES_PASSWORD`  |             |           | alias de `PG_PASSWORD`                   |
| `POSTGRES_HOST`      |             | 127.0.0.1 | alias de `PG_HOST`                       |
| `POSTGRES_PORT`      |             | 5432      | alias de `PG_PORT`                       |
| `POSTGRES_PREFIX`    |             | `wl_`     | alias de `PG_PREFIX`                     |
| `POSTGRES_SSL`       |             | `false`   | alias de `PG_SSL`                        |

### GitHub

| Variável de Ambiente | Obrigatório | Padrão | Descrição                                                                                                                               |
| -------------------- | ----------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | ✅          |        | [Personal access tokens](https://github.com/settings/tokens)                                                                            |
| `GITHUB_REPO`        | ✅          |        | nome do repositório, como `walinejs/waline`                                                                                             |
| GITHUB_PATH          |             |        | O diretório de armazenamento dos dados; por exemplo, `data` significa que os dados são armazenados no diretório `data`, raiz por padrão |

## Avançado

| Variáveis de Ambiente           | Padrão                      | Descrição                                                                                                                          |
| ------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | URL do Serviço de Login Social OAuth. Você pode [criar sua própria autenticação](https://github.com/walinejs/auth).                |
| `WEBHOOK`                       |                             | Você pode definir uma URL de Webhook que será acionada quando houver um novo comentário.                                           |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | link do painel administrativo do Waline                                                                                            |
| `IP2REGION_DB`                  |                             | caminho personalizado da biblioteca de consulta de IP IPv4 (obsoleto, use `IP2REGION_DB_V4`)                                       |
| `IP2REGION_DB_V4`               |                             | caminho personalizado da biblioteca de consulta de IP IPv4. Usa `IP2REGION_DB` como fallback se não definido                       |
| `IP2REGION_DB_V6`               |                             | caminho personalizado da biblioteca de consulta de IP IPv6. Defina isto para habilitar a consulta de localização de endereços IPv6 |
