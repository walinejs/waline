---
title: Contador de visualizações
icon: counter
order: 7
---

O Waline oferece contagem de visualizações de página.

<!-- more -->

## Usar junto com os comentários

Se você usa o serviço de comentários do Waline, pode ativar as estatísticas de visualizações definindo a opção `pageview` como `true` durante a inicialização:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

O Waline encontrará automaticamente na página os elementos com o valor de `class` igual a `waline-pageview-count` e usará o `data-path` deles como condição de consulta, preenchendo-os com o valor obtido:

Se você precisar de um seletor diferente, pode definir a opção `pageview` com esse seletor.

```html
<!-- data-path will be the query condition -->
Pageviews: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></span>
```

Toda vez que você chamar `WalineInstance.update()`, o Waline pesquisará novamente o conteúdo da página e atualizará as visualizações automaticamente.

::: tip Exemplos

```html
The current page has been viewed
<span class="waline-pageview-count" data-path="/pt-BR/guide/client/count.html" />
times.
```

A página atual foi visualizada
<span class="waline-pageview-count" data-path="/pt-BR/guide/client/count.html" /> vezes.

:::

## Usar sozinho

Se você só precisa da funcionalidade de estatísticas de visualizações, pode importar o módulo de visualizações oferecido pelo Waline, cujo tamanho gzip é < 1KB.

```html
<ul>
  <li>
    Current page views:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Page Views:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, whether to increase the number of visits when fetching, the default is `true`
    // update: true,
  });
</script>
```

- Visualizações da página atual: <span class="waline-pageview-count" />

- Visualizações da página inicial: <span class="waline-pageview-count" data-path="/" />

::: info Cancelamento

Como a busca das visualizações é uma operação de rede assíncrona, em certas circunstâncias você pode precisar cancelar uma atualização de visualizações em andamento.

`pageviewCount` retorna uma função que pode ser chamada para cancelar a atualização:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // After 500ms, if the network request has not been completed, cancel this operation
  setTimeout(() => abort(), 500);
</script>
```

:::
