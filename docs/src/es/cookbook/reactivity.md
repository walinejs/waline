---
title: Instancia reactiva de Waline
icon: spa
order: -1
---

El cliente oficial `@waline/client` se basa en Vue 3, ofrece componentes e instancias reactivos y aporta soporte para SPA (**S**ingle **P**age **A**pplication).

<!-- more -->

## Componente de Vue

Si estás creando un proyecto con Vue, puedes obtener y usar el componente Waline importando la exportación con nombre `Waline` desde `@waline/client/component`.

Todas las propiedades del componente son reactivas, lo que significa que, cuando las cambies, el cuadro de comentarios se actualizará automáticamente.

## Otros proyectos

En otras SPA, debes guardar la `WalineInstance` que devuelve la función de Waline al inicializarlo.

En `WalineInstance` encontrarás una propiedad de instancia `el` y dos métodos: `update()` y `destroy()`.

### update

Puedes llamar a `update()` para actualizar Waline en cualquier momento (por ejemplo, cuando el usuario visita una ruta nueva). El método `update` recibe un parámetro opcional `options`; salvo `el`, puedes actualizar el resto de opciones iniciales de Waline pasando valores nuevos.

Por ejemplo:

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

#### Cómo funciona

Al llamar a `update`, la opción actual y la opción anterior se combinan mediante una **copia superficial**, y la instancia de Waline se actualiza con la nueva opción (y la guarda).

El comportamiento predeterminado de este método es **regenerar los valores predeterminados** de las opciones que aún no se han establecido y **usar los valores anteriores** de las opciones que ya se establecieron.

Hay dos opciones a las que quizá debas prestar especial atención: `path` y `locale`.

::: warning Precauciones con la opción path

En V2, el parámetro `path` **siempre se restablece** en `update()`.

Esto significa que, en cualquier actualización, si no especificas `path`, este se restablecerá a `window.location.pathname`.

:::

::: warning Precauciones con la opción locale

Debido a la copia superficial, las opciones antiguas de `locale` se sobrescriben por completo con las nuevas opciones de `locale` que pases a `update`.

Nuestra idea es: los usuarios suelen querer cambiar el idioma de visualización al actualizar el locale, así que lo establecimos como el comportamiento esperado del plugin. Esto también significa que puedes usar `update({ locale: {} })` para borrar la configuración personalizada de locale que había antes.

Si de verdad necesitas actualizar uno o varios campos concretos de `locale`, debes pasar el `locale` completo ya actualizado.

:::

Además, la opción `update()` se ha optimizado para las solicitudes de red asíncronas, lo que incluye:

- Actualizar el área de comentarios y volver a hacer la solicitud solo cuando la ruta realmente cambie
- La nueva llamada a `update()` cancelará automáticamente la solicitud de la `update()` anterior que ya no sea necesaria.

### el

La propiedad `el` es el HTMLElement en el que está montada la instancia actual de Waline.

Si inicializas Waline con `el: null` (solo usas los comentarios y las estadísticas de visitas), esta propiedad será `null`.

### destroy

El método `destroy()` destruye la instancia de Waline. También borra todo el contenido del elemento sobre el que Waline está montado.

### Fallo de inicialización

Si olvidas establecer `serverURL` o Waline no puede encontrar el lugar de montaje en la página con la opción `el`, Waline devolverá una `WalineErrorInstance`.

`WalineErrorInstance` solo tiene un atributo, `errMsg`, que indica el motivo del fallo de inicialización.

### Precauciones

::: warning Recuerda destruir la instancia

Para que Waline libere los recursos correctamente, llama manualmente a `WalineInstance.destroy()` antes de eliminar el elemento donde está montado Waline.

De lo contrario, puede que algunos listeners no se eliminen correctamente.

:::
