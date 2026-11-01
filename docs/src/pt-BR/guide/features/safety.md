---
title: Segurança
icon: safe
order: -10
---

A segurança do sistema de comentários Waline é nossa prioridade máxima. Aqui vamos abordar a segurança do Waline.

<!-- more -->

## Segurança dos comentários

### Proteção contra ataques XSS

O Waline usa [DOMPurify](https://github.com/cure53/DOMPurify) para filtrar cada comentário enviado no lado do servidor, prevenindo potenciais ataques XSS. Isso significa que você não poderá usar `<iframe>` nem qualquer forma de script.

### Impedir rastreamento de links

Todos os links serão definidos automaticamente com `rel="noreferrer noopener"` e abertos em uma nova janela com `target="_blank"`.

### Impedir a inserção de conteúdo malicioso

- Para impedir que os usuários criem formulários editáveis na área de comentários e induzam outros visitantes a enviar informações, você não pode usar `<form>` nem `<input>`

- Para impedir que os usuários usem estilos para alterar as páginas do site ou modificar o estilo dos próprios comentários e inserir anúncios de spam, a tag `<style>` e o atributo `style` nos elementos não estão disponíveis.

- Para impedir o abuso da reprodução automática de mídia, você não pode usar o atributo `autoplay`.

### Impedir falsificação

O Waline tem um sistema de contas, então você pode obrigar os usuários a se cadastrar e entrar com uma conta. Assim, os visitantes não conseguem falsificar os comentários de outras pessoas.

Para ativar esse recurso, você precisa exigir login obrigatório no cliente e no servidor; veja [`login`](../../reference/client/props.md#login) e [`LOGIN`](../../reference/server/env.md#basico) para detalhes.

## Segurança do site

### Limite de frequência

Para evitar excesso de comentários, o Waline limita o IP que comenta. Por padrão, o mesmo IP pode enviar apenas um comentário por minuto. Você pode alterar esse limite em [Referência do servidor → Variáveis de ambiente](../../reference/server/env.md#seguranca).

### Impedir flood

O Waline verifica os comentários existentes ao enviar um comentário e, se detectar um comentário com similaridade muito alta, rejeitará o comentário correspondente. Isso ajuda a evitar flood até certo ponto.

### Moderação de comentários

Quando seu site está sob ataque malicioso, em períodos sensíveis ou quando você está ocupado, você pode ativar o recurso de moderação de comentários. Para detalhes, veja [Referência do servidor → Variáveis de ambiente](../../reference/server/env.md#seguranca).

Quando a moderação de comentários está ativada, todos os novos comentários ficam ocultos por padrão. Você pode ver e revisar os comentários no painel administrativo do Waline ou na caixa de comentários da página correspondente. Apenas os comentários aprovados por você serão exibidos.

## Segurança dos dados

Como o Waline tem um servidor, ninguém pode adulterar os dados dos comentários ou as visualizações.

Além disso, você pode definir as variáveis `DISABLE_USERAGENT` e `DISABLE_REGION` no servidor para impedir que outras pessoas vejam a UA e a localização geográfica dos comentários dos usuários.
