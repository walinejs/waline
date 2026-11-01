---
title: Contador de comentários
icon: counter
order: 8
---

O Waline permite exibir o número de comentários separadamente, em áreas fora da lista de comentários.

<!-- more -->

## Atualização automática

Você pode ativar a contagem de comentários na função `init` definindo a opção `comment` como `true`.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // enable comment counting
  });
</script>
```

O Waline tentará preencher ou atualizar a contagem de comentários sempre que você chamar a função `init` ou atualizar o caminho.

O Waline encontra na página os elementos com a classe `waline-comment-count` e usa o atributo `data-path` deles como condição de consulta, preenchendo-os com o valor obtido:

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

Se você precisar de um seletor diferente, pode definir a opção `comment` com esse seletor.

Toda vez que você chamar `WalineInstance.update()`, o Waline pesquisará o conteúdo da página e atualizará a contagem de comentários automaticamente.

::: tip Exemplos

```html
The current page has <span class="waline-comment-count" /> comments, the home page has
<span data-path="/pt-BR/" class="waline-comment-count" /> comments.
```

A página atual tem <span class="waline-comment-count" /> comentários, e a página inicial tem
<span data-path="/pt-BR/" class="waline-comment-count" /> comentários.

:::

## Atualização manual

Além da atualização automática pela função `init`, você pode atualizar manualmente a contagem de comentários da página atual com a API `commentCount`:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info Cancelamento

Como a busca da contagem de comentários é uma operação de rede assíncrona, em algumas circunstâncias você pode precisar cancelar uma atualização de contagem em andamento.

`commentCount` retorna uma função que pode ser chamada para cancelar a atualização:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## Importar apenas o contador

Às vezes você pode querer exibir a contagem de comentários de algumas páginas na lista de artigos ou na página inicial, mas sem carregar o Waline inteiro. Nesse caso, você pode usar o módulo `comment`, que tem menos de 1 KB gzip:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

<script setup>
import { walineOptions } from '@source/.vuepress/client.ts'
import { commentCount } from '@waline/client/comment'
import { onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const { serverURL } = walineOptions
const route = useRoute()

onMounted(()=>{
  commentCount({
    serverURL: serverURL,
    path: route.path,
  })
})
</script>
