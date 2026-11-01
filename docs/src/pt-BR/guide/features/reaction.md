---
title: Reações ao artigo
icon: reaction
order: 4
---

O Waline permite que os usuários expressem reações ao conteúdo do artigo.

<!-- more -->

## Começando

Para ativar as reações rapidamente, você pode definir a opção `reaction` como `true` para exibir uma lista padrão de reações:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

O Waline exibirá a lista padrão de reações acima da caixa de comentários.

## Personalizar reações

Se você precisar personalizar esses emoticons de reação, pode passar um array contendo os links das imagens dos emoticons de reação, representando as reações que você quer que o usuário escolha:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: [
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_heart_eyes.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_joy.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_consider.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
  ],
});
```

Além disso, você pode personalizar o título das reações com `reactionTitle` em `locale`, e também o nome de cada expressão de reação com `reaction0` a `reaction8`; veja [Configurações de idioma](./i18n.md).

## Precauções

::: tip Limite de quantidade

O Waline suporta até 9 reações, e você pode adicionar menos de 9 reações sem problemas.

:::

::: warning Regras de contagem

A contagem das reações é baseada na posição.

Se você precisar reordenar e ajustar as reações, consulte [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) para mais detalhes.

:::
