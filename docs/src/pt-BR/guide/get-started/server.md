---
title: Introdução ao servidor
icon: server
order: 2
---

## Implantação

Além de implantar gratuitamente na Vercel, você pode implantar via docker ou diretamente em um ambiente auto-hospedado, bem como em outras plataformas de nuvem comuns. Para mais informações, veja:

- [Implantação autônoma](../deploy/vps.md)

- [Railway](../deploy/railway.md)

- [Alibaba Cloud Compute Nest](../deploy/aliyun-computenest.md)

## Suporte a múltiplos bancos de dados

O Waline suporta diversos bancos de dados, incluindo MySQL, PostgreSQL, SQLite e MongoDB.

Você só precisa configurar as variáveis de ambiente do banco de dados correspondente, e o Waline alternará automaticamente para o serviço de armazenamento de dados adequado.

Veja [suporte a múltiplos bancos de dados](../database.md) para mais detalhes.

## Configuração

A maior parte da configuração no lado do servidor pode ser feita por variáveis de ambiente, e você também pode configurar algumas opções avançadas no arquivo de entrada principal.

Para detalhes de configuração, veja [Referência do servidor → Variáveis de ambiente](../../reference/server/env.md) e [Referência do servidor → Configuração](../../reference/server/ config.md).

## Notificação de comentários

Oferecemos várias formas de notificar você ou os usuários que comentam quando alguém comenta ou responde. Veja [Notificação de comentários](../features/notification.md) para mais detalhes.

## Cadastro de conta de usuário e login social

O Waline suporta a criação de conta no próprio aplicativo e login social com GitHub, Twitter e Facebook.

::: tip

Fique ligado: planejamos adicionar suporte a mais aplicações sociais em versões futuras.

:::
