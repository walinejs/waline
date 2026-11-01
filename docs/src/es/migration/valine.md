---
title: Migración desde Valine
icon: valine
---

1. Despliega el backend según [Despliegue del servidor](../guide/get-started/README.md#despliegue-del-servidor) en la sección _Get Started_.

2. Modifica los scripts del frontend según [HTML](../guide/get-started/README.md#importar-en-html) en la sección _Get Started_.

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
       el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

   ::: tip Configuración

   Waline V2 ha eliminado el soporte de Valine y ha pasado a una configuración mejor. A continuación tienes un resumen de la migración de algunas opciones:

   - `placeholder`: usa `locale.placeholder`
   - `highlight`: usa `highlighter`
   - `avatarForce`, `avatar`: usa la variable de entorno `AVATAR_PROXY` del servidor
   - `recordIP`: ya no muestra la IP del usuario y ofrece la variable de entorno `DISABLE_USERAGENT` en el servidor
   - `requiredFields`: se renombra a `requiredMeta`
   - `langMode`: se renombra a `locale`
   - `emojiCDN`, `emojiMap`: usa las opciones `emoji`, mucho más potentes

   Para la configuración de waline, consulta [Client Config](../reference/client/api.md). También puedes revisar la [guía de migración a Waline Client V2](./v2.md) para conocer las opciones que no son compatibles con Valine.

   :::

3. Migra los datos

En el panel de LeanCloud, selecciona <kbd>Import/Export</kbd> > <kbd>Limit to certain classes</kbd> > <kbd>Comment</kbd> > <kbd>Export</kbd>, y luego recibirás una notificación por correo electrónico.

Pega el contenido del archivo exportado en el área de texto de abajo y haz clic en el botón de conversión para obtener el archivo que se va a importar.

<MigrationTool />

::: tip

Después de obtener el archivo exportado con la herramienta anterior, puedes importarlo en la consola del servicio de almacenamiento correspondiente.

:::

## Lo más destacado de Waline

En comparación con Valine, Waline tiene los siguientes puntos destacados:

### Más funciones

1. Markdown admite más sintaxis, incluidos superíndices y subíndices, emoji, tablas, tachado, fórmulas matemáticas, etiquetas HTML, notas al pie, etc.
1. Función de subida de imágenes, que permite personalizar el servicio de imágenes o insertar imágenes directamente.
1. El nuevo sistema de etiquetas añade etiquetas de nivel a los usuarios según la frecuencia de interacción del usuario y admite etiquetas personalizadas para los usuarios registrados.
1. Preajustes de emoji y soporte de pestañas, que permiten varios conjuntos de emoji y que cualquiera publique y use preajustes de emoji.
1. Un nuevo sistema de reacciones que permite a los visitantes expresar su actitud hacia el artículo.
1. «Me gusta» en los comentarios, para mostrar apoyo al comentario que te gusta.
1. Visitas a la página, con un recuento más preciso y protección contra la manipulación.
1. Búsqueda de emoji. Servicio personalizable, que permite a los usuarios buscar e insertar emoticonos libremente.
1. Soporte para que los usuarios registrados editen y eliminen sus propios comentarios publicados.

### Más seguro

1. Cero filtraciones de privacidad: no se expondrán los correos, las direcciones IP ni otra información sensible de los usuarios, y en el servidor se puede optar por ocultar la ubicación geográfica, el navegador y el sistema operativo del usuario.
1. Sistema anti-spam completo.
   - Todos los comentarios se pueden autenticar mediante servicios anti-spam y admiten lógica de validación adicional.
   - Puedes establecer un límite de velocidad de comentarios para una sola IP o un solo usuario, y Waline identifica automáticamente los comentarios duplicados.
1. Función de revisión de comentarios: en periodos sensibles o cuando el sitio web está bajo ataque, puedes activar la revisión de comentarios, revisar y aprobar manualmente la visualización de los comentarios y evitar que los comentarios maliciosos provoquen el cierre del sitio.
1. Soporte de cuentas de usuario. Además de registrar una cuenta, Waline también admite cuentas de redes sociales, y sincroniza rápidamente avatares y apodos con la etiqueta autorizada para prevenir la suplantación de identidad.

### Más cómodo

1. Diversos métodos (QQ, WeChat, DingTalk, correo electrónico), etc. para notificar a los blogueros sobre los comentarios
1. Potente servicio de gestión: puedes ver todos los usuarios y comentarios, realizar las operaciones correspondientes y establecer etiquetas y administradores personalizados para los usuarios
1. Gestión desde el frontend: los administradores pueden revisar, editar o eliminar comentarios directamente a través del componente de comentarios de Waline.

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
