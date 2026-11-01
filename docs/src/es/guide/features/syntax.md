---
title: Soporte de formato en los comentarios
icon: format
order: 1
---

Puedes añadir diferentes contenidos a los comentarios, incluyendo sintaxis extendida de Markdown y etiquetas HTML.

<!-- more -->

## Formatos admitidos

Admitimos todo CommonMark (la sintaxis estándar de Markdown), junto con las siguientes extensiones:

- Tablas al estilo GFM
- Tachado al estilo GFM
- Subíndices y superíndices
- Emojis
- Resaltado de bloques de código
- Fórmulas $\TeX$

::: info GFM

GitHub Flavored Markdown

:::

Además, puedes insertar libremente cualquier contenido HTML sin activar el [mecanismo de protección](./safety.md#seguridad-de-los-comentarios).

## Soporte limitado de la vista previa

Para controlar el tamaño del cliente, en el cliente oficial `@waline/client` solo incluimos un pequeño analizador de Markdown, lo que hace que muchas sintaxis no se muestren correctamente en el panel de vista previa (aunque **se renderizan correctamente en el área de comentarios**).

Esto incluye las siguientes limitaciones:

- La sintaxis estándar de emojis (p. ej., :tada:`:tada:`) no se renderiza correctamente

- Los subíndices y superíndices (p. ej., `H~2~O`, `x^2^`) no se pueden renderizar correctamente

- La sintaxis $\TeX$, es decir, las fórmulas matemáticas (p. ej., `$a = 1$`), no se puede renderizar de forma predeterminada.

  Cuando usas el cliente oficial, puedes personalizar el renderizado de $\TeX$ en la vista previa estableciendo la opción `texRenderer`; consulta [Recetario → Usar un renderizador $\TeX$ personalizado](../../cookbook/customize/tex-renderer.md).

- Con el resaltador predeterminado, los bloques de código se resaltan con colores aleatorios y delimitadores específicos.

  Cuando usas el cliente oficial, puedes personalizar el resaltado de código de la vista previa estableciendo la opción `highlighter`; consulta [Recetario → Resaltado de código personalizado](../../cookbook/customize/highlighter.md).

## Más

::: tip Cómo funciona

1. Por el tamaño del paquete, el cliente usa `marked` para renderizar y, de forma predeterminada, un resaltador de menos de 1 KB para el resaltado, y no incluye un renderizador de $\TeX$, lo que provoca las limitaciones anteriores.

1. Cuando un usuario envía un comentario, el cliente inserta la imagen personalizada del emoji y envía el comentario original al servidor.

1. El servidor recibe el texto original, usa `markdown-it` para renderizar Markdown correctamente con los plugins correspondientes, usa `prismjs` para resaltar los bloques de código según el lenguaje, realiza el renderizado de $\TeX$ según la configuración del usuario y, por último, aplica el procesamiento XSS .

1. Una vez terminado el procesamiento, el servidor almacena el contenido renderizado correcto y lo devuelve al cliente cuando es necesario, para garantizar la visualización normal del área de comentarios.

:::
