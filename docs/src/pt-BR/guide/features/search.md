---
title: Busca de emoticons
icon: search
order: 3
---

`@waline/client` permite que os usuários adicionem serviços de busca de emojis e personalizem essa funcionalidade.

Por padrão, `@waline/client` oferece um serviço de busca de memes via [Giphy](https://giphy.com/). Isso permite pesquisar imagens e adicioná-las ao comentário.

<!-- more -->

## Desativar

Se você não precisa do serviço padrão de busca de imagens, pode desativá-lo definindo a opção `search` como `false`.

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## Personalizar

Você pode personalizar o serviço de busca de imagens com a opção search.

Para cada operação, você deve retornar um array contendo as informações das imagens como resultado da busca, e cada item deve ser um objeto com as seguintes propriedades:

- `src`: o endereço do link da imagem
- `title`: título e texto alternativo da imagem (opcional)
- `preview`: miniatura da imagem a ser usada na lista de resultados (opcional)

A opção aceita três funções, cada uma delas deve retornar uma Promise, e o resultado é o array de resultados de busca acima.

- `search`: operação de busca, o termo de busca será passado como primeiro parâmetro da função
- `default`: lista de imagens exibidas por padrão (opcional)
- `more`: função executada quando a lista de imagens é rolada até o fim, na qual o termo de busca e o número atual são passados como os dois primeiros parâmetros (opcional)

Para tutoriais sobre busca personalizada, veja [Livro de receitas → Busca de emojis personalizada](../../cookbook/customize/search.md).
