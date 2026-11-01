---
title: Crie seus próprios presets de emoji
icon: emoji
---

Este livro de receitas mostra como criar e usar seus próprios presets de emoji.

<!-- more -->

## Crie seus próprios presets

Primeiro, você precisa preparar algumas imagens de emoji. Depois, siga os passos para criar o seu preset.

### Nomeie o emoji e faça o envio

Para simplificar, o Waline usa diretamente o nome do arquivo da imagem do emoji como chave do emoji. Isso significa que, se você importar dois presets diferentes e ambos tiverem uma imagem `laugh.png`, os dois emotes corresponderão ao mesmo emoji `:laugh:`.

Por isso, a boa prática é que cada criador de preset de emoji adicione um prefixo relacionado ao nome do preset a todos os nomes dos arquivos de emoji.

Depois de nomeá-los adequadamente, você precisa enviá-los para o seu servidor.

### Escreva as informações do preset

Suponhamos que você tenha colocado algumas imagens de emoji em `

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

Nesse momento, você também precisa criar um arquivo `info.json` nessa pasta para que o Waline saiba quais emojis o preset contém.

Primeiro, vamos definir um nome para o preset de emoji, como `My Emoji`; como você definiu o prefixo `my_` para as imagens e os arquivos estão no formato `png`, você precisa adicioná-los em `info.json`.

Seu `info.json` pode ser:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

Em seguida, liste todos os nomes de emoji em `items` na ordem que você quiser; lembre-se de omitir o prefixo e o sufixo definidos em `prefix` e `type`.

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

Depois disso, escolha um emoji representativo como o ícone exibido na aba:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

Com isso, você terminou de escrever o `info.json`; envie-o para a mesma pasta.

Agora você criou com sucesso o preset `my-emoji` com `https://example.com/my-emoji/'`.

## Use um espelho do GitHub com tags

Normalmente, pode ser um pouco trabalhoso ter um domínio próprio e enviar imagens para ele, além de o link poder expirar com o tempo. Por isso, uma abordagem avançada é usar um repositório do GitHub e a função de tags do git para espelhar um repositório do GitHub que forneça um preset de emoji.

De forma semelhante aos passos acima, você precisa criar um novo repositório no GitHub, nomear os emojis como acima, criar o `info.json` com os mesmos passos e enviá-los para o repositório.

Em seguida, crie uma tag para o repositório; recomendamos usar o formato `vx.x.x`, como `v1.0.0`.

Depois de adicionar as tags, você pode usar o link de CDN com a versão no [cdn.jsdelivr.net](https://www.jsdelivr.com/) como seu preset, no formato `https://cdn.jsdelivr.net/gh/user/repo@version/file`.

Suponhamos que você tenha criado o repositório `example/emoji`, enviado as imagens de emoji e o `info.json` diretamente e criado a tag `v1.0.0`; então você pode usar `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` como seu preset.

::: tip

É necessário especificar uma tag no link para evitar que o link da imagem referenciada por comentários antigos seja invalidado por alterações no seu preset.

O preset oficial de emojis é obtido criando o repositório [walinejs/emojis](https://github.com/walinejs/emojis) e usando o link de CDN. Atualmente usamos a versão `v1.1.0`.

:::

::: warning

Como o cdn.jsdelivr.net é poluído na China, você pode substituir `cdn.jsdelivr.net` por `gcore.jsdelivr.net`

:::

## Usando objetos de configuração

Semelhante ao item anterior, supomos que você tenha a seguinte estrutura de arquivos:

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

Além de criar e enviar um `info.json` e usar um link como preset, você também pode usar diretamente os objetos a seguir como preset:

```js
{
  name: "My Emoji",
  folder: "https://example.com/my-emoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

Aqui, adicionamos a propriedade `folder` para informar ao Waline onde as imagens estão armazenadas.
