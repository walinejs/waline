---
title: Suporte a formatos de comentário
icon: format
order: 1
---

Você pode adicionar diferentes conteúdos aos comentários, incluindo sintaxe Markdown estendida e tags HTML.

<!-- more -->

## Suporte a formatos

Suportamos o CommonMark completo (sintaxe padrão do Markdown), além das seguintes extensões:

- Tabelas no estilo GFM
- Riscado no estilo GFM
- Subscrito e sobrescrito
- Emoji
- Destaque de blocos de código
- Fórmula $\TeX$

::: info GFM

Github Flavored Markdown

:::

Além disso, você pode incorporar livremente qualquer conteúdo HTML sem acionar o [mecanismo de proteção](./safety.md#seguranca-dos-comentarios).

## Suporte limitado à pré-visualização

Para controlar o tamanho do cliente, colocamos apenas um pequeno parser de Markdown no cliente oficial `@waline/client`, o que faz com que muitas sintaxes não sejam exibidas corretamente no painel de pré-visualização (elas são **renderizadas corretamente na área de comentários**).

Isso inclui as seguintes restrições:

- A sintaxe padrão de emoji (por exemplo :tada:`:tada:`) não é renderizada corretamente

- Subscrito e sobrescrito (por exemplo: `H~2~O`, `x^2^`) não podem ser renderizados corretamente

- A sintaxe $\TeX$, ou seja, fórmulas matemáticas (por exemplo: `$a = 1$`), não é renderizada por padrão.

  Ao usar o cliente oficial, você pode personalizar a renderização de $\TeX$ na pré-visualização definindo a opção `texRenderer`; veja [Livro de receitas → Usar um renderizador $\TeX$ personalizado](../../cookbook/customize/tex-renderer.md).

- Com o highlighter padrão, os blocos de código são destacados com cores aleatórias e delimitadores específicos.

  Ao usar o cliente oficial, você pode personalizar o destaque de código na pré-visualização definindo a opção `highlighter`; veja [Livro de receitas → Destaque de código personalizado](../../cookbook/customize/highlighter.md).

## Mais

::: tip Princípio

1. Considerando o tamanho do pacote, o cliente usa `marked` para renderizar e um highlighter de menos de 1 KB para destacar por padrão, e não inclui um renderizador $\TeX$, o que gera as limitações acima.

1. Quando um usuário envia um comentário, o cliente incorpora as imagens de emoji personalizadas e envia o comentário original ao servidor.

1. O servidor recebe o texto original, usa `markdown-it` para renderizar o markdown corretamente com os plug-ins relevantes, usa `prismjs` para destacar os blocos de código conforme a linguagem e realiza a renderização de $\TeX$ de acordo com as configurações do usuário, e por fim faz o tratamento anti-XSS.

1. Após o processamento, o servidor armazena o conteúdo renderizado correto e o retorna ao cliente quando necessário, garantindo a exibição normal da área de comentários.

:::
