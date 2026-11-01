---
title: Importar o Waline via CDN
icon: import
order: 1
---

Este livro de receitas trata da importação do Waline via CDN.

<!-- more -->

Para usuários da China Continental, recomendamos usar o [unpkg](https://unpkg.com/@waline/client). Para usuários de outros países, recomendamos usar o jsDelivr.

Para tornar o Waline compatível com SSR, separamos os estilos do Waline na versão V2. Isso significa que você precisa importar o arquivo CSS do Waline e também importar o arquivo de script do Waline e chamá-lo.

## Comentários

Normalmente, você pode querer que o Waline renderize uma lista de comentários; nesse caso, importe o Waline da seguinte forma:

```html
<!-- style file -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## Visualizações e comentários

Às vezes, você pode querer exibir o número de visualizações e de comentários do artigo na página inicial ou na lista de artigos, sem precisar carregar o componente de comentários. Nesse caso, você pode importar um arquivo de script Gzip < 1KB das seguintes formas:

Visualizações:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

Contagem de comentários:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## Mais

::: info Especificar a versão

Você deve ter notado que, nos casos acima, declaramos explicitamente a versão `@v2` após `@aline/client`. Caso contrário, seu site pode não funcionar corretamente.

:::
