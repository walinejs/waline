---
title: Archivos del cliente
icon: file
---

`@waline/client` ofrece varias versiones de archivos

<!-- more -->

## Lista de archivos CDN

- `dist/waline.js`: versión completa, formato ESM

  Este archivo es la versión recomendada para importar `@waline/client`, con 100 KB de tamaño Gzip

- `dist/waline.umd.js`: versión completa, formato UMD

- `dist/slim.js`: versión completa sin dependencias empaquetadas, formato ES Module

  Este archivo es el que se importa por defecto con Node.js al usar `@waline/client`, con 27 KB de tamaño Gzip

- `dist/waline.css`: estilos CSS de Waline

- `dist/waline-meta.css`: CSS de los iconos meta de Waline

- `dist/component.js`: componente Vue de Waline, formato ES Module, sin dependencias empaquetadas

  Este archivo sirve para usar los comentarios de Waline en modo componente dentro de un proyecto Vue, con 25 KB de tamaño Gzip

- `dist/comment.js`: módulo de recuento de comentarios de Waline, formato ESM, < 1KB de tamaño Gzip

  Este archivo se usa para importar desde CDN cuando solo necesitas el número de comentarios de la página

- `dist/pageview.js`: módulo de visitas a la página de Waline, formato ESM, < 1KB de tamaño Gzip

  Este archivo se usa para importar desde CDN cuando solo necesitas las visitas a la página

## Exportaciones del módulo

`@waline/client` es un módulo ESM estándar y requiere Node.js versión >= 22:

- `@waline/client`: entrada principal de Waline sin dependencias empaquetadas

- `@waline/client/waline.css`: archivo de estilos de Waline

- `@waline/client/waline-meta.css`: archivo de estilos de los iconos meta de Waline

- `@waline/client/comment`: módulo de recuento de comentarios de Waline

- `@waline/client/pageview`: módulo de recuento de visitas a la página de Waline

- `@waline/client/full`: entrada principal de Waline con todas las dependencias empaquetadas
