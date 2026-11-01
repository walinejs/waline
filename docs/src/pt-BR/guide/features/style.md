---
title: Personalizar estilos
icon: style
order: -2
---

`@waline/client` fornece algumas variáveis CSS. Com elas, você pode configurar facilmente o estilo do Waline:

Além disso, `@waline/client` também tem suporte integrado ao modo escuro.

<!-- more -->

## Suporte ao modo escuro

Você pode usar a opção `dark` para ativar o suporte ao modo escuro do Waline.

Normalmente os sites habilitam o modo escuro de duas formas:

- Usar o seletor `@media` para alternar automaticamente conforme o estado do modo de cor do dispositivo via `prefers-color-scheme`
- Aplicar dinamicamente outro estilo de cor do modo escuro modificando os atributos e as classes do elemento raiz do DOM (`html` ou `body`).

Se você ativar o Waline em um site do primeiro tipo, basta definir `dark` como `'auto'`.

Para sites do segundo tipo, você precisa definir dark como o seletor CSS que faz o modo escuro valer. Aqui estão alguns exemplos:

::: tip Exemplos

- **vuepress-theme-hop v2**: ele ativa o modo escuro definindo `data-theme="dark"` na própria tag `<html>`. Então você precisa definir `'html[data-theme="dark"]'` como opção `dark`.

- **hexo-theme-fluid**: ele ativa o modo escuro definindo `data-user-color-scheme="dark"` na própria tag `<html>`. Então você precisa definir `'html[data-user-color-scheme="dark"]'` como opção `dark`.

:::

## Ícones de metadados

Se você quiser adicionar ícones aos metadados dos comentários dos usuários, pode importar `waline-meta.css` para usá-los.

Para usuários de CDN, você pode importar pelo seguinte link:

```html
<!-- Meta icon (optional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

Para usuários de NPM, você pode importar via:

```js
import '@waline/client/meta';
```

## Suporte a RTL

`@waline/client` suporta layout RTL; basta adicionar `dir="rtl"` na tag `<html>`.

## Personalizar estilos

### Variáveis CSS

Você pode encontrar os valores padrão das variáveis CSS usadas pelo Waline no modo normal e no modo escuro em [Referência do cliente → Variáveis CSS](../../reference/client/style.md).

Se forem diferentes do estilo do seu site, você mesmo pode sobrescrever a variável CSS correspondente.

## Sombra da caixa

Se você usa um tema que emprega sombras (`box-shadow`) em vez de bordas, pode alterar a aparência do Waline modificando `--waline-border` e `--waline-box-shadow`, por exemplo:

```css
:root {
  --waline-border: none;
  --waline-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --waline-box-shadow: 0 12px 40px #0f0e0d;
  }
}
```

### Mais

Se as variáveis CSS acima não atenderem às suas necessidades de personalização dos estilos do Waline, você pode escrever seu próprio arquivo CSS.
