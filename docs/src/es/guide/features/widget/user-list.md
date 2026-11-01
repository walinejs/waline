---
title: Widget de clasificación de usuarios / muro de usuarios
icon: rank
---

Waline admite mostrar una clasificación de usuarios o un muro de usuarios mediante un widget, lo que resulta cómodo para mostrar la información de quienes comentan en la barra lateral del blog.

<!-- more -->

## Opciones del componente

El widget de clasificación de usuarios / muro de usuarios se llama `UserList` y tiene seis opciones:

- `el` (opcional): el elemento donde se va a montar
- `serverURL`: enlace del servidor
- `count` el número de usuarios que se deben obtener
- `mode`: `list` significa clasificación de usuarios y `wall` significa muro de usuarios
- `lang`: soporte de i18n; consulta [i18n](../i18n.md) para más información
- `locale`: personaliza el idioma; consulta [i18n](../i18n.md) para más información

El formato de datos que devuelve el componente debe ser `Promise<{ users: WalineUser[], destroy: () => void }>`.

- propiedad `users`: un array con la lista de usuarios, con exactamente `count` elementos
- método `destroy`: una función que destruye el widget

## Uso básico

### Clasificación de usuarios

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

### Muro de usuarios

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

## Uso avanzado

Si no te convence el formato de salida predeterminado, puedes llamar al componente omitiendo la opción `el` para obtener los datos y renderizarlos tú mismo.

Ejemplo:

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
