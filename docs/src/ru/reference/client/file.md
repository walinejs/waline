---
title: Файлы клиента
icon: file
---

`@waline/client` предоставляет несколько версий файлов

<!-- more -->

## Список файлов CDN

- `dist/waline.js`: полная версия в формате ESM

  Это рекомендуемая версия для импорта `@waline/client`, размер 100 KB в Gzip

- `dist/waline.umd.js`: полная версия в формате UMD

- `dist/slim.js`: полная версия без встроенных зависимостей, формат ES Module

  Это файл, используемый по умолчанию при импорте `@waline/client` в Node.js, размер 27 KB в Gzip

- `dist/waline.css`: стили CSS Waline

- `dist/waline-meta.css`: CSS значков метаданных Waline

- `dist/component.js`: Vue-компонент Waline, формат ES Module, без встраивания зависимостей

  Этот файл нужен для использования комментариев Waline в режиме компонента в проекте Vue, размер 25 KB в Gzip

- `dist/comment.js`: модуль подсчёта комментариев Waline, формат ESM, размер < 1KB в Gzip

  Этот файл используется при импорте через CDN, когда нужно только количество комментариев на странице

- `dist/pageview.js`: модуль просмотров страниц Waline, формат ESM, размер < 1KB в Gzip

  Этот файл используется при импорте через CDN, когда нужны только просмотры страниц

## Экспортируемые модули

`@waline/client` — стандартный модуль ESM, требующий Node.js версии >= 22:

- `@waline/client`: основная точка входа Waline без встроенных зависимостей

- `@waline/client/waline.css`: файл стилей Waline

- `@waline/client/waline-meta.css`: файл стилей значков метаданных Waline

- `@waline/client/comment`: модуль подсчёта комментариев Waline

- `@waline/client/pageview`: модуль подсчёта просмотров страниц Waline

- `@waline/client/full`: основная точка входа Waline со всеми встроенными зависимостями
