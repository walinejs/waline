---
title: Client-Dateien
icon: file
---

`@waline/client` bietet mehrere Dateiversionen

<!-- more -->

## CDN-Dateiliste

- `dist/waline.js`: Vollversion, ESM-Format

  Diese Datei ist die empfohlene Version zum Importieren von `@waline/client`, 53 KB Gzip-Größe

- `dist/waline.umd.js`: Vollversion, UMD-Format

- `dist/slim.js`: Vollversion ohne Dependency-Bundles, ES-Module-Format

  Diese Datei ist die Standarddatei zum Importieren von `@waline/client` mit Node.js, 19.39 KB Gzip-Größe

- `dist/waline.css`: Waline-CSS-Stile

- `dist/waline-meta.css`: Waline-Meta-Icon-CSS

- `dist/component.js`: Walines Vue-Komponente, ES-Module-Format, ohne Dependency-Bundling

  Diese Datei dient zur Verwendung von Waline-Kommentaren im Komponentenmodus in einem Vue-Projekt, 18.28 KB Gzip-Größe

- `dist/comment.js`: Walines Kommentarzähler-Modul, ESM-Format, < 1 KB Gzip-Größe

  Diese Datei wird für CDN-Import verwendet, wenn nur die Anzahl der Seitenkommentare benötigt wird

- `dist/pageview.js`: Walines Seitenaufruf-Modul, ESM-Format, < 1 KB Gzip-Größe

  Diese Datei wird für CDN-Import verwendet, wenn nur Seitenaufrufe benötigt werden

## Modul-Exporte

`@waline/client` ist ein Standard-ESM-Modul und erfordert Node.js-Version >= 18:

- `@waline/client`: Waline-Haupteinstieg ohne gebündelte Abhängigkeiten

- `@waline/client/waline.css`: Waline-Style-Datei

- `@waline/client/waline-meta.css`: Waline-Meta-Icon-Style-Datei

- `@waline/client/comment`: Waline-Kommentarzähler-Modul

- `@waline/client/pageview`: Waline-Seitenaufrufzähler-Modul

- `@waline/client/full`: Waline-Haupteinstieg mit allen gebündelten Abhängigkeiten
