---
title: Despliegue en Railway
icon: railway
---

[Railway](https://railway.app/) es una plataforma Serverless gratuita con la que puedes desplegar Waline fácilmente.

<!-- more -->

## Cómo desplegar

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

Haz clic en este botón y te redirigirá a la plataforma railway.app para desplegar rápidamente. Después de iniciar sesión, puedes escribir el nombre de tu nuevo repositorio de GitHub o dejar el predeterminado; luego haz clic en el botón <kbd>Deploy</kbd> de la parte inferior para desplegar. Ten en cuenta que la sección de variables de entorno no debe modificarse.

![railway1](../../../assets/railway-1.jpg)

Al cabo de un momento te redirigirá al panel de control. Haz clic en <kbd>PostgreSQL</kbd> - <kbd>Query</kbd>, pega el contenido del archivo [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) en el área de texto y haz clic en el botón <kbd>Run Query</kbd> de la parte inferior para inicializar la base de datos.

![railway2](../../../assets/railway-2.jpg)

Por último, puedes hacer clic en <kbd>Deployments</kbd> - <kbd>Domains</kbd> para obtener la URL del servidor. Copia la URL del sitio y escríbela en la configuración `serverURL` del cliente. ¡Y ya puedes disfrutar de Waline!

![railway3](../../../assets/railway-3.jpg)

## Cómo actualizar

Ve al repositorio de GitHub correspondiente y cambia el número de versión de `@waline/vercel` en el archivo package.json a la última.

## Cómo modificar las variables de entorno

Haz clic en la pestaña <kbd>Variables</kbd> para ir a la página de gestión de variables de entorno. El despliegue se hará automáticamente cuando cambies una variable.

![railway4](../../../assets/railway-4.jpg)
