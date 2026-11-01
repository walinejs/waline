---
title: Perguntas frequentes
icon: faq
order: 4
---

O Waline tem uma posição muito clara desde o seu nascimento:

::: info Um sistema de comentários simples com backend.

:::

Todas as versões lançadas depois disso são modificações feitas em torno dessa posição.

## Qual é a relação com o Valine?

::: info Waline = Valine com backend

:::

Tendo como referência a versão open source do Valine, a lista de comentários no frontend foi reescrita com React. O estilo e a estrutura, assim como algumas ferramentas e métodos internos, vêm todos do Valine.

## Ainda preciso implantar o Valine-Admin no LeanCloud?

Não. O Waline é uma implantação três em um de armazenamento de dados, servidor e cliente. A interface do servidor já equivale ao mecanismo de nuvem do LeanCloud do Valine. O servidor já inclui o gerenciamento de comentários e as notificações por e-mail fornecidos pelo antigo mecanismo de nuvem. Ele não precisa do mecanismo de nuvem adicional do LeanCloud, portanto não é afetado pela estratégia de suspensão (sleep) do mecanismo de nuvem do LeanCloud.

## Como faço para atualizar?

O Waline é composto principalmente por duas partes: o frontend e o servidor.

### Frontend

O frontend insere as listas de comentários e as caixas de comentário por meio da inclusão de scripts JS na página web. Na maioria dos cenários, o link usa o endereço da versão mais recente do CDN online, e a versão mais recente é aplicada automaticamente, sem que o usuário precise atualizar manualmente.

::: note É preciso atualizar manualmente nas seguintes situações

1. O número da versão é especificado de forma forçada no endereço do CDN. Nessa situação, você precisa alterar manualmente o número da versão para a mais recente.
1. Você usa o NPM para importar e empacotar o módulo no código. Nessa situação, você precisa alterar o número da versão na dependência para garantir que a versão mais recente da dependência seja obtida durante a instalação.

:::

### Servidor

O servidor é o serviço de backend correspondente ao `serverURL` configurado no script do frontend, e sua atualização varia um pouco conforme os diferentes ambientes de implantação. As atualizações do servidor são mais frequentes.

#### Vercel

Acesse o repositório correspondente no GitHub e altere o número da versão do `@waline/vercel` no arquivo package.json para a mais recente.

![vercel](./assets/vercel-update.png)

#### CloudBase

Entre na página de edição de código e clique em <kbd>Salvar e reinstalar dependências</kbd>. Se ainda não funcionar, entre em <kbd>Meu aplicativo</kbd> e selecione <kbd>Implantar</kbd> para reimplantar.

::: caution

A reimplantação limpa os arquivos anteriores. Se houver alguma configuração no arquivo anterior, ela precisa ser copiada primeiro.

:::

![cloudBase](./assets/cloudbase-update.jpg)

#### Docker

Execute `docker pull lizheming/waline` diretamente para baixar a imagem mais recente.

## Por que o envio de comentários é lento?

Por algumas razões técnicas, a detecção de spam e a notificação de comentários são operações seriais no envio de um comentário. A detecção de spam usa o serviço fornecido pelo Akismet no exterior, que pode ser lento para acessar. Os usuários podem desativar a função de detecção de spam por meio da variável de ambiente `AKISMET_KEY=false`. Além do serviço de detecção de spam, a notificação por e-mail da notificação de comentários também pode causar timeout. Você pode desativar a notificação de comentários para testar se o problema é causado por esse recurso.
