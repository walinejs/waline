---
title: Objetivo del diseño
icon: goal
order: 2
---

[Valine](https://valine.js.org) es un sistema de comentarios de estilo refinado, operación sencilla y despliegue eficiente. La primera vez que lo conocí, me atrajeron su estilo refinado y sus características serverless. No necesita un servicio de backend: el frontend interactúa directamente con el servicio de almacenamiento de LeanCloud, ¡lo cual es realmente genial! Pero a medida que lo fui entendiendo mejor, descubrí sus problemas.

## Los problemas de Valine

### No es de código abierto

El autor solo subió los archivos compilados al repositorio de GitHub a partir de la versión `1.4.0`, y el código fuente dejó de actualizarse. Puede que el autor se haya desilusionado del código abierto. Para usuarios como yo, que quieren añadir o modificar cosas del proyecto, este problema resulta algo incómodo.

### XSS

Desde versiones muy tempranas, los usuarios han reportado problemas de XSS en Valine, y la comunidad también ha usado diversos métodos para corregirlos, incluida la adición de códigos de verificación, el filtrado XSS en el frontend y otras técnicas. Sin embargo, el autor comprendió después que toda la verificación en el frontend solo puede detener a las personas honestas, así que eliminó restricciones como el código de verificación.

Ahora, cuando el frontend publica un comentario, Markdown se convierte en HTML y luego se ejecuta una función de filtrado XSS en el frontend antes de enviarlo a LeanCloud. Después de obtener los datos de LeanCloud, se insertan directamente en el DOM. Obviamente, el proceso tiene problemas. Mientras el HTML se envíe directamente y se muestre directamente después de obtenerlo, el XSS no se puede erradicar de raíz.

::: note Solución fundamental

Para los ataques XSS almacenados, podemos usar el escape de código HTML para resolverlos de forma permanente. Igual que en el viejo BBCode, solo el contenido de Markdown se envía a la base de datos. El frontend lee el contenido y codifica todo el HTML antes de mostrarlo tras la conversión de Markdown.

```js
function encodeForHTML(str) {
  return ('' + str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

Como Valine es un sistema serverless, los atacantes pueden llegar directamente a la etapa de almacenamiento. Todas las precauciones anteriores al almacenamiento de datos son inútiles y solo se pueden aplicar durante el proceso de visualización. Como todo el HTML no se puede analizar después de escaparlo, podemos asegurar que el HTML convertido no tenga ninguna oportunidad de ser insertado.

Como Valine ya no es de código abierto, no se pueden abrir pull requests.

:::

Como el método anterior limitaría por completo a los usuarios al ámbito de Markdown, Waline añade `DOMPurify` en el lado del cliente desde la versión `0.15.0` para prevenir el XSS. Además de la esterilización XSS habitual:

- `<form>` e `<input>` están deshabilitados
- la inyección de estilos está deshabilitada
- la reproducción automática de los medios está deshabilitada
- todos los enlaces externos se procesan y se abren en una ventana nueva con rel de `noopener noreferrer`.

### Fuga de privacidad

Además del acceso directo al almacenamiento, el atacante también puede leer cualquier dato directamente. Si un campo de la base de datos tiene permiso de lectura para todos, el contenido de ese campo es completamente transparente para el atacante.

En los datos de los comentarios, los dos campos IP y correo contienen datos sensibles del usuario. El Sr. Deng escribió un artículo específicamente para criticar el problema [Please stop using the Valine.js comment system immediately unless it fixes the user privacy leak](https://ttys3.net/post/hugo/please-stop-using-valine-js-comment-system-until-it-fixed-the-privacy-leaking-problem/). Incluso cuando la comunidad [JueJin](https://juejin.cn) usaba LeanCloud en sus primeros años, se expuso el problema de seguridad de [revelar el número de teléfono móvil de los usuarios](https://m.weibo.cn/detail/4568007327622344?cid=4568044392682999).

Para eludir este problema, el autor de Valine añadió la configuración `recordIP` para establecer si se permite registrar la IP del usuario. Como no hay servidor, solo se puede resolver dejando de almacenar el valor.

Esta opción sigue teniendo un problema: que se registre la IP depende de la configuración del propietario del sitio, mientras que los usuarios que comentan no tienen derecho a gestionar su propia privacidad.

La filtración de la dirección de correo electrónico es otro gran problema de privacidad. Es totalmente factible calcular y reportar el md5 del correo del usuario en el frontend para obtener el avatar de Gravatar. Pero si se necesita enviar una notificación por correo cuando alguien responde a un comentario, es inevitable almacenar el valor original del correo del usuario. En teoría, este problema se podría resolver con cifrado RSA. La clave privada se puede guardar en la variable de entorno de LeanCloud. El cliente reporta tanto el md5 del correo como el correo cifrado con la clave pública. Cuando LeanCloud quiere enviar notificaciones por correo, lee la clave privada del entorno en la función en la nube y descifra para obtener el correo del usuario. Sin embargo, considerando el tamaño y el rendimiento de la biblioteca de cifrado RSA en el frontend, no es práctico. Añadir una capa de servidor para filtrar la información sensible a través del servidor es sin duda una mejor práctica.

### Manipulación de las estadísticas de lectura

Valine 1.2.0 añade la función de estadísticas de lectura de artículos: el usuario visita la página y se registra el número de visitas según la URL en la tabla counter del backend. Como los datos deben actualizarse cada vez que se accede a la página, los permisos deben ser de escritura para poder realizar las actualizaciones posteriores de los campos. Esto crea un problema: en realidad, los datos se pueden actualizar a cualquier valor. Si te interesa, puedes abrir el sitio oficial <https://valine.js.org/visitor.html>, entrar en la consola e introducir el siguiente código para probarlo. Recuerda devolver el número a su valor original después de probarlo~

```js
const counter = new AV.Query('Counter');
const resp = await counter.equalTo('url', '/visitor.html').find();
resp[0].set('time', -100000).save();
location.reload();
```

Por suerte, el valor del campo `time` es de tipo Number, así que no se pueden insertar otros valores. Si el campo `time` fuera de tipo string, podría ser una vulnerabilidad XSS. Una posible solución a este problema es no usar el método de almacenamiento acumulativo. En su lugar, se almacena un registro de acceso de solo lectura por cada visita y se usa el método `count()` para las estadísticas al leer. De esta forma, todos los datos son de solo lectura, lo que resuelve el problema de la manipulación. Esta solución también tiene un problema: cuando la cantidad de datos es relativamente grande, generará cierta presión en las consultas.

Si se basa en conservar los datos originales, solo se puede añadir una capa de servidor para aislar los permisos de modificación.

## El nacimiento de Waline

Por las razones anteriores nació Waline. El objetivo original de Waline era solo añadir un backend a Valine, pero como Valine no es de código abierto, solo se pudo implementar con el frontend. Por supuesto, mucho código y lógica del frontend toman como referencia a Valine para ser coherentes con la configuración de Valine. Incluso el nombre del proyecto lo derivé de Valine, para que todos puedan entender que este proyecto es un derivado de Valine.

Además de resolver los problemas de seguridad mencionados, la adición del lado del servidor permite implementar muchas funciones que antes estaban limitadas por la ausencia de servidor, incluidas las notificaciones por correo, el filtrado de comentarios spam, etc.
