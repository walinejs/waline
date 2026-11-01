---
title: Widget de ranking e mural de usuários
icon: rank
---

O Waline permite exibir o ranking de usuários ou o mural de usuários por widget, o que facilita mostrar as informações de quem comenta na barra lateral do blog.

<!-- more -->

## Opções do componente

O widget de ranking/mural de usuários se chama `UserList` e tem seis opções:

- `el` (opcional): o elemento onde o widget será montado
- `serverURL`: link do servidor
- `count` a quantidade de usuários a obter
- `mode`: `list` significa ranking de usuários e `wall` significa mural de usuários
- `lang`: suporte a i18n; veja [i18n](../i18n.md) para mais detalhes
- `locale`: personaliza o idioma; veja [i18n](../i18n.md) para mais detalhes

O formato de dados retornado pelo componente é `Promise<{ users: WalineUser[], destroy: () => void }>`.

- propriedade `users`: um array com a lista de usuários, exatamente na quantidade de `count`
- método `destroy`: uma função que destrói o widget

## Uso básico

### Ranking de usuários

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

### Mural de usuários

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## Uso avançado

Se você não gostar do formato de saída padrão, pode chamar o componente omitindo a opção `el` para obter os dados e renderizá-los você mesmo.

Exemplo:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(({ users }) => {
    document.getElementById('waline-users').innerHTML = users.map(
      (user) => `<a href="${user.link}">${user.nick}</a>`,
    );
  });
</script>
```
