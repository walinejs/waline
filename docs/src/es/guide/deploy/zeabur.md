---
title: Despliegue en Zeabur
icon: zeabur
---

[Zeabur](https://zeabur.com) es una plataforma que ayuda a los desarrolladores a desplegar sus propios servicios con un solo clic. En general es similar a Railway, pero tiene más funciones, no requiere vincular una tarjeta de crédito y su límite gratuito es más alto.

<!-- more -->

## Despliegue con un solo clic

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/1IBY26?utm_source=waline)

## Desplegar desde cero

Haz clic en el botón [Fork](https://github.com/walinejs/zeabur-starter/fork) para crear un proyecto inicial de Zeabur.

![zeabur1](../../../assets/zeabur-1.png)

Inicia sesión en la consola de Zeabur en <https://dash.zeabur.com>. Si no hay ningún proyecto, primero debes ponerle un nombre al nuevo proyecto.

![zeabur2](../../../assets/zeabur-2.png)

Una vez dentro, haz clic en <kbd>Add New Service</kbd> para crear un servicio y selecciona <kbd>Deploy Other Service</kbd> - <kbd>Deploy MongoDB</kbd> para crear antes que nada un servicio de base de datos.

Ponle un nombre a tu servicio de base de datos MongoDB, haz clic en el botón <kbd>Deploy</kbd> y tu servicio de base de datos quedará desplegado.

![zeabur2](../../../assets/zeabur-3.png) ![zeabur4](../../../assets/zeabur-4.png)

A continuación, vuelve a hacer clic en <kbd>Add New Service</kbd> para crear el servicio Waline; esta vez elige <kbd>Deploy Your Source Code</kbd>. En la lista de proyectos de GitHub que aparece, busca el proyecto que hiciste fork al principio y haz clic en el botón <kbd>Import</kbd> correspondiente.

Ponle un nombre a tu servicio Waline, haz clic en el botón <kbd>Deploy</kbd> y tu servicio Waline quedará desplegado.

![zeabur6](../../../assets/zeabur-6.png) ![zeabur7](../../../assets/zeabur-7.png)

No tengas prisa por cerrar el panel del servicio Waline. Una vez desplegado el servicio, hay que añadirle un dominio de acceso. Haz clic en el botón <kbd>Generate Domain</kbd> de la pestaña <kbd>Domains</kbd>, escribe el prefijo de dominio que quieras y haz clic en el botón <kbd>Save</kbd> para añadir el dominio de acceso a tu servicio.

![zeabur8](../../../assets/zeabur-8.png) ![zeabur9](../../../assets/zeabur-9.png)

Todo está listo y el siguiente paso es comprobar el resultado. Abre el dominio de acceso que acabas de configurar y prueba a publicar un comentario: verás que todo funciona. A continuación, configura este dominio en el cliente y podrás comentar tranquilamente.

![zeabur2](../../../assets/zeabur-10.png)

## Cómo actualizar

Ve al repositorio de GitHub y cambia el número de versión de `@waline/vercel` en el archivo package.json a la última versión.

## Cómo modificar las variables de entorno

Puedes entrar en la página de gestión de variables de entorno desde la pestaña <kbd>Variables</kbd>; después de modificarlas, el proyecto se vuelve a desplegar automáticamente.

![zeabur11](../../../assets/zeabur-11.png)
