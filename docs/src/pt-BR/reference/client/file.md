---
title: Arquivos do Cliente
icon: file
---

`@waline/client` fornece várias versões de arquivos

<!-- more -->

## Lista de arquivos do CDN

- `dist/waline.js`: versão completa, formato ESM

  Este arquivo é a versão recomendada para importar `@waline/client`, com 100 KB de tamanho Gzip

- `dist/waline.umd.js`: versão completa, formato UMD

- `dist/slim.js`: versão completa sem os pacotes de dependências, formato ES Module

  Este arquivo é o padrão para importar `@waline/client` com Node.js, com 27 KB de tamanho Gzip

- `dist/waline.css`: estilos CSS do Waline

- `dist/waline-meta.css`: CSS dos ícones Meta do Waline

- `dist/component.js`: componente Vue do Waline, formato ES Module, sem empacotar dependências

  Este arquivo serve para usar os comentários do Waline no modo componente em um projeto Vue, com 25 KB de tamanho Gzip

- `dist/comment.js`: módulo de contagem de comentários do Waline, formato ESM, com menos de 1 KB de tamanho Gzip

  Este arquivo é usado na importação via CDN quando só é necessária a quantidade de comentários da página

- `dist/pageview.js`: módulo de visualizações de página do Waline, formato ESM, com menos de 1 KB de tamanho Gzip

  Este arquivo é usado na importação via CDN quando só são necessárias as visualizações de página

## Exportações do módulo

`@waline/client` é um módulo ESM padrão e exige Node.js versão >= 22:

- `@waline/client`: entrada principal do Waline sem dependências empacotadas

- `@waline/client/waline.css`: arquivo de estilo do Waline

- `@waline/client/waline-meta.css`: arquivo de estilo dos ícones meta do Waline

- `@waline/client/comment`: módulo de contagem de comentários do Waline

- `@waline/client/pageview`: módulo de contagem de visualizações de página do Waline

- `@waline/client/full`: entrada principal do Waline com todas as dependências empacotadas
