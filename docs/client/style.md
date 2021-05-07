# 自定义样式

`@waline/client` 提供了一些 CSS 变量。你可以很轻松的通过这些变量配置 waline 的样式:

```css
:root {
  /* 字体大小 */
  --waline-font-size: 16px;

  /* 常规颜色 */
  --waline-white: #fff;
  --waline-light-grey: #999;
  --waline-dark-grey: #666;

  /* 主题色 */
  --waline-theme-color: #27ae60;
  --waline-active-color: #2ecc71;

  /* 布局颜色 */
  --waline-text-color: #444;
  --waline-bgcolor: #fff;
  --waline-bgcolor-light: #f8f8f8;
  --waline-border-color: #ddd;
  --waline-disable-bgcolor: #f8f8f8;
  --waline-disable-color: #ddd;

  /* 特殊颜色 */
  --waline-bq-color: #f0f0f0;

  /* 头像 */
  --waline-avatar-size: 3.25rem;

  /* 徽章 */
  --waline-badge-color: #3498db;
  --waline-badge-font-size: 0.775em;

  /* 信息 */
  --waline-info-bgcolor: #f8f8f8;
  --waline-info-color: #999;
  --waline-info-font-size: 0.625em;

  /* * 使用边框 * */
  --waline-border: 1px solid var(--waline-border-color);
  --waline-box-shadow: none;
}
```

在使用 `dark` 选项配置暗黑模式时，waline 会默认使用以下颜色:

```css
@media (prefers-color-scheme: dark) {
  body {
    /* 常规颜色 */
    --waline-white: #000;
    --waline-light-grey: #666;
    --waline-dark-grey: #999;

    /* 布局颜色 */
    --waline-text-color: #888;
    --waline-bgcolor: #1e1e1e;
    --waline-bgcolor-light: #272727;
    --waline-border-color: #333;
    --waline-disable-bgcolor: #222;
    --waline-disable-color: #272727;

    /* 特殊颜色 */
    --waline-bq-color: #272727;

    /* 其他颜色 */
    --waline-info-bgcolor: #272727;
    --waline-info-color: #666;
  }
}
```

如果上述颜色与你的站点夜间模式颜色不同，你可以不设置 `dark` 选项并自行覆盖他们。

::: tip 阴影样式

如果你在使用一个大量运用阴影 (`box-shadow`) 的主题，你可以通过修改 `--waline-border` 和 `--waline-box-shadow` 来更改 Waline 的显示效果，如:

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

:::
