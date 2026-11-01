---
title: Importar o Waline via CDN
icon: import
order: 1
---

Este livro de receitas trata da importação do Waline via CDN.

<!-- more -->

Para usuários da China Continental, recomendamos usar o [unpkg](https://unpkg.com/@waline/client). Para usuários de outros países, recomendamos usar o jsDelivr.

Desde a V3, os estilos do Waline são fornecidos como um arquivo CSS separado para manter o cliente compatível com SSR. Isso significa que você precisa importar o arquivo de estilo CSS do Waline e, em seguida, importar e chamar o arquivo de script do Waline.

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

Você deve ter notado que, nos exemplos acima, declaramos explicitamente a versão `@v3` após `@waline/client`. Isso é recomendado porque evita que seu site quebre quando uma nova versão principal do cliente Waline for lançada.

:::
