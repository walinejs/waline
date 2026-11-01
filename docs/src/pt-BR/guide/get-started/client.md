---
title: Introdução ao cliente
icon: client
order: 1
---

O Waline oferece oficialmente o [`@waline/client`](https://www.npmjs.com/package/@waline/client), escrito em Vue + TypeScript e com apenas 100kb gzip.

## Importar

Você pode usar CDN ou npm para importar o cliente do Waline, e fornecemos várias versões de arquivos para atender a diferentes cenários.

Se você tiver problemas nesse processo, veja:

- [Livro de receitas → Importar via CDN](../../cookbook/import/cdn.md)
- [Livro de receitas → Importar no projeto](../../cookbook/import/project.md)

## Usar o Waline

A forma mais simples de usar o Waline é [o método detalhado no início rápido](./README.md#importar-em-html): importe a função `init` do Waline e inicialize a instância do Waline com `init(yourOptions)`.

Entre as opções de `init`, `el` e `serverURL` são obrigatórias. A primeira é o elemento ou seletor de elemento no qual o Waline é montado, e a segunda é o endereço do servidor. Para todos os parâmetros de inicialização do `@waline/client`, veja [Referência do cliente → API](../../reference/client/api.md).

## Contagem de comentários

O `@waline/client` também oferece um subpacote para estatísticas de comentários. Você pode usá-lo para exibir a contagem de comentários na lista de artigos do blog ou em outras páginas que não têm comentários. Para mais detalhes, veja [Recursos → Contagem de comentários](../features/comment.md).

## Contagem de visualizações

O Waline oferece estatísticas de visualizações. Se você não precisa do serviço de comentários, mas quer usar a funcionalidade de visualizações, o Waline oferece um plugin de estatísticas de visualizações cujo tamanho gzip é < 1KB.

Para mais informações sobre a contagem de visualizações do `@waline/client`, veja [Recursos → Contagem de visualizações](../features/pageview.md)

## Suporte a formatos de comentário

O `@waline/client` suporta muitas sintaxes de comentário e uma formatação rica. Além de suportar Markdown padrão e extensões de sintaxe GFM, quem comenta também pode incorporar tags HTML, usar equações matemáticas e muito mais. Para outras sintaxes, veja [Recursos → Sintaxes suportadas](../features/syntax.md).

O `@waline/client` também oferece pré-visualização em tempo real do que é digitado na caixa de comentários. Dito isso, algumas funcionalidades são removidas por padrão por conta do tamanho. Se você quiser restaurá-las, veja:

- [Livro de receitas → Personalizar o highlighter da pré-visualização](../../cookbook/customize/highlighter.md)
- [Livro de receitas → Personalizar o renderizador $\TeX$ da pré-visualização](../../cookbook/customize/tex-renderer.md)

## Reação ao artigo

Achou os comentários complicados demais? O Waline permite que seus visitantes expressem rapidamente suas reações aos artigos, como curtir, não curtir, dúvida, tédio, surpresa etc. Para ativar manualmente esse recurso, veja [Recursos → Reações ao artigo](../features/reaction.md).

## Recursos de comentário

O Waline oferece vários recursos básicos, incluindo login, avatares, [vários idiomas](../features/i18n.md) e pré-visualização em tempo real.

O Waline permite definir rótulos de nível de interação e rótulos personalizados para seus usuários. Para mais detalhes, veja [Rótulos de usuário](../features/label.md).

## Aba de emojis

O `@waline/client` suporta várias abas de emojis e permite que os usuários adicionem abas de emojis facilmente por meio de predefinições. Além das oficiais, você também pode criar facilmente as suas próprias predefinições.

Para mais informações sobre as abas de emojis do `@waline/client`, veja:

- [Recursos → Aba de emojis](../features/emoji.md)
- [Livro de receitas → Personalizar emojis](../../cookbook/customize/emoji.md)

## Inserir imagem

O `@waline/client` tem suporte integrado ao envio de imagens. Por padrão, as imagens são convertidas para base64. Dito isso, você também pode usar seu próprio serviço de hospedagem de imagens.

Para mais informações sobre as configurações de envio de imagens do `@waline/client`, veja [Livro de receitas → Personalizar o envio de imagens](../../cookbook/customize/upload-image.md).

## Busca de emojis

O `@waline/client` oferece uma função de busca de memes e emojis via [giphy](https://giphy.com) e permite personalizar o serviço de busca. Veja:

- [Recursos → Busca de emojis](../features/search.md)
- [Livro de receitas → Personalizar a busca de emoticons](../../cookbook/customize/search.md)

## Suporte a vários idiomas

O `@waline/client` tem suporte integrado a vários idiomas, e você pode adicionar suporte a idiomas ou modificar os textos da interface com base nisso. Veja:

- [Recursos → Definir idioma](../features/i18n.md).
- [Livro de receitas → Personalizar idioma](../../cookbook/customize/locale.md).

## Suporte a acessibilidade

O Waline suporta integralmente todos os padrões de acessibilidade:

- Todos os ícones e controles têm seus rótulos de acessibilidade correspondentes.
- Você pode interagir com todos os controles do Waline usando teclado ou um dispositivo apontador montado na cabeça.

Esta é a nossa forma de apoiar pessoas com deficiência visual e mobilidade reduzida em todo o mundo! :heart:

## Estilos personalizáveis

O Waline já vem com suporte integrado ao modo escuro. Para facilitar o ajuste dos estilos do Waline, oferecemos muitas variáveis CSS configuráveis.

Veja [Estilos personalizados](../features/style.md) para mais detalhes.

## Desenvolvimento avançado

### Suporte a aplicações de página única

O Waline suporta SPAs (**S**ingle **P**age **A**pplications).

Se você quiser usar o Waline em um site ou aplicação baseado na history API, pode usar o método `update()` na instância inicializada para atualizar a configuração da área de comentários, ou o método `destroy()` na instância para destruir o Waline. Para saber mais sobre a reatividade do `@waline/client`, veja [Livro de receitas → Reatividade](../../cookbook/reactivity.md).

### Ecossistema

Você pode usar o Waline facilmente por meio de plugins em ferramentas como Hexo, VuePress e até clientes de terceiros.

Para clientes de terceiros, temas e plugins que suportam o Waline, veja [Saiba mais → Ecossistema](../../advanced/ecosystem.md).
