---
title: Instância reativa do Waline
icon: spa
order: -1
---

O cliente oficial `@waline/client` é baseado no Vue3, fornece componentes e instâncias reativas e traz suporte a SPA (**S**ingle **P**age **A**pplication).

<!-- more -->

## Componente Vue

Se você está construindo um projeto Vue, pode obter e usar o componente Waline importando o export nomeado `Waline` de `@waline/client/components`.

Todas as propriedades do componente são reativas, o que significa que, ao alterar as propriedades, a caixa de comentários é atualizada automaticamente.

## Outros projetos

Em outras SPA, você precisa armazenar a `WalineInstance` retornada pela função Waline quando o Waline é inicializado.

Você pode encontrar uma propriedade de instância `el` e dois métodos: `update()` e `destroy()` em `WalineInstance`.

### update

Você pode chamar `update()` para atualizar o Waline a qualquer momento (por exemplo, quando o usuário visita uma nova rota). O método `update` recebe um parâmetro opcional `options`; com exceção de `el`, as demais opções iniciais do Waline podem ser atualizadas passando novos valores.

Por exemplo:

```js
// in `/` route
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* User: after some time, route has changed to `/a.html` */

waline.update(); // Now waline will start clear the comment and show a loading state.
// After some time, the counter and comments will be all updated

waline.update({
  lang: 'en',
  login: 'disable',
}); // waline will now display in English, and disable user login
```

#### Princípio de funcionamento

Ao chamar `update`, a opção atual e as opções históricas são mescladas por **cópia superficial**, e a instância do Waline é atualizada com a nova opção (e salva a nova opção).

O comportamento padrão desse método é sempre **regenerar os valores padrão** para as opções que ainda não foram definidas e **usar os valores históricos** para as opções que já foram definidas.

Há duas opções que talvez precisem de atenção especial: `path` e `locale`.

::: warning Cuidados com o path

Na V2, o parâmetro `path` é **sempre redefinido** em `update()`.

Isso significa que, em qualquer atualização, se você não especificar `path`, ele será redefinido para `window.location.pathname`.

:::

::: warning Cuidados com o locale

Devido à cópia superficial, as opções antigas de `locale` são completamente substituídas pelas novas opções de `locale` passadas em `update`.

Nosso ponto de vista é: os usuários normalmente querem trocar o idioma de exibição ao atualizar o locale, então definimos esse como o comportamento esperado do plugin. Isso também significa que você pode usar `update({ locale: {} })` para limpar a configuração de locale personalizada do histórico.

Se você realmente precisar atualizar um ou mais campos específicos de `locale`, é preciso passar o `locale` completo já atualizado.

:::

Além disso, a opção `update()` foi otimizada para requisições de rede assíncronas, incluindo:

- Atualizar a área de comentários e fazer nova requisição apenas quando o caminho realmente mudar
- A nova chamada de `update()` encerra automaticamente a requisição que não é mais necessária da `update()` anterior.

### el

A propriedade `el` é o HTMLElement no qual a instância atual do Waline está montada.

Se você inicializar o Waline com `el: null` (usando apenas comentários e estatísticas de visualizações), essa propriedade será `null`.

### destroy

Se você esquecer de passar o `serverURL` ou se o Waline não encontrar o local de montagem pela opção `el` na página, o Waline lançará um Error indicando o motivo do erro.

### Falha na inicialização

Se você esquecer de definir o `serverURL` ou se o Waline não encontrar o local de montagem pela opção `el` na página, o Waline retornará uma `WalineErrorInstance`.

Há apenas um atributo `errMsg` em `WalineErrorInstance` para indicar o motivo da falha na inicialização.

### Cuidados

::: warning Lembre-se de destruir a instância

Para que o Waline libere os recursos corretamente, chame manualmente `WalineInstance.destroy()` antes de remover o elemento em que o Waline está montado.

Caso contrário, alguns listeners de eventos podem não ser removidos corretamente.

:::
