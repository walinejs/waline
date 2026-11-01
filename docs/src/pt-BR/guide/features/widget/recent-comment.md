---
title: Widget de comentários recentes
icon: recent
---

O Waline permite exibir comentários recentes por widget, o que facilita mostrar os comentários mais recentes na barra lateral do blog.

<!-- more -->

## Opções do componente

O widget de comentários recentes se chama `RecentComments` e tem três opções:

- `el` (opcional): o elemento onde o widget será montado
- `serverURL`: link do servidor
- `count` a quantidade de comentários recentes a obter

O formato de dados retornado pelo componente é `Promise<{ comment: WalineComment[], destroy: () => void }>`.

- propriedade `comment`: um array com os comentários mais recentes, exatamente na quantidade de `count`
- método `destroy`: uma função que destrói o widget

## Uso básico

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

Isso será renderizado em `#waline-recent` usando o estilo padrão.

:::

## Uso avançado

Se você não gostar do formato de saída padrão, pode chamar o componente omitindo a opção `el` para obter os dados e renderizá-los você mesmo.

Exemplo:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    serverURL: 'http://waline.vercel.app',
    count: 10,
  }).then(({ comments }) => {
    document.getElementById('waline-recent').innerHTML = comments.map(
      (comment) => `${comment.nick}: ${comment.comment}`,
    );
  });
</script>
```
