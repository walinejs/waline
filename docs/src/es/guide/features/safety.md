---
title: Seguridad
icon: safe
order: -10
---

La seguridad del sistema de comentarios de Waline es nuestra máxima prioridad. Aquí repasamos la seguridad de Waline.

<!-- more -->

## Seguridad de los comentarios

### Protección contra ataques XSS

Waline utiliza [DOMPurify](https://github.com/cure53/DOMPurify) para filtrar cada comentario en el servidor y evitar posibles ataques XSS. Esto significa que no podrás usar `<iframe>` ni ningún tipo de script.

### Evitar el rastreo de enlaces

Todos los enlaces se establecen automáticamente con `rel="noreferrer noopener"` y se abren en una ventana nueva con `target="_blank"`.

### Evitar la implantación de contenido malicioso

- Para evitar que los usuarios creen formularios enviables en el área de comentarios y engañen a otros visitantes para que envíen información, no puedes usar `<form>` ni `<input>`

- Para evitar que los usuarios usen estilos para modificar las páginas del sitio o sus propios comentarios y colocar anuncios de spam, no están disponibles la etiqueta `<style>` ni el atributo `style` de los elementos.

- Para evitar que los usuarios abusen de la reproducción automática de contenido multimedia, no puedes usar el atributo `autoplay`.

### Evitar la suplantación

Waline admite un sistema de cuentas, por lo que puedes obligar a los usuarios a registrarse e iniciar sesión con una cuenta. Así los visitantes no podrán falsificar los comentarios de otras personas.

Para activar esta función, debes exigir el inicio de sesión tanto en el cliente como en el servidor; consulta [`login`](../../reference/client/props.md#login) y [`LOGIN`](../../reference/server/env.md#basico) para más detalles.

## Seguridad del sitio

### Límite de frecuencia

Para evitar abusos, Waline limitará la IP desde la que se comenta. De forma predeterminada, una misma IP solo puede enviar un comentario por minuto. Puedes cambiar este límite en [Referencia del servidor → Variables de entorno](../../reference/server/env.md#seguridad).

### Evitar el flooding

Waline detectará los comentarios existentes al escribir uno nuevo y, si detecta un comentario con una similitud demasiado alta, rechazará el comentario correspondiente. Así se puede evitar el flooding hasta cierto punto.

### Revisión de comentarios

Cuando tu sitio sufra un ataque malicioso, en periodos sensibles o cuando estés ocupado, puedes activar la función de revisión de comentarios. Para más detalles, consulta [Referencia del servidor → Variables de entorno](../../reference/server/env.md#seguridad) .

Cuando la revisión de comentarios está activada, todos los comentarios nuevos se ocultan de forma predeterminada. Puedes ver y revisar los comentarios en el panel de administración de Waline o en el cuadro de comentarios de la página correspondiente. Solo se mostrarán los comentarios que apruebes.

## Seguridad de los datos

Como Waline tiene servidor, nadie puede alterar los datos de los comentarios ni las visitas a la página.

Además, puedes establecer las variables `DISABLE_USERAGENT` y `DISABLE_REGION` en el servidor para impedir que otros vean el UA y la ubicación geográfica de los comentarios de los usuarios.
