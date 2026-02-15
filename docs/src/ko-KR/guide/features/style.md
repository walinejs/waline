---
title: 스타일 커스터마이즈
icon: style
order: -2
---

`@waline/client`는 일부 CSS 변수를 제공합니다. 이러한 변수를 통해 Waline의 스타일을 쉽게 구성할 수 있습니다:

또한 `@waline/client`에는 다크 모드 지원이 내장되어 있습니다.

<!-- more -->

## 다크 모드 지원

`dark` 옵션을 사용하여 Waline의 다크 모드 지원을 활성화할 수 있습니다.

일반적으로 웹사이트는 두 가지 방식으로 다크 모드를 지원합니다:

- `@media` 선택자를 사용하여 `prefers-color-scheme`을 통해 기기의 색상 모드 상태에 따라 자동으로 전환
- DOM 루트 요소(`html` 또는 `body`)의 속성과 클래스를 수정하여 다른 다크 모드 색상 스타일을 동적으로 적용

첫 번째 방식의 사이트에서 Waline을 활성화하는 경우 `dark`를 `'auto'`로 설정하기만 하면 됩니다.

두 번째 유형의 사이트에서는 다크 모드를 적용하는 CSS 선택자를 dark로 설정해야 합니다. 다음은 몇 가지 예시입니다:

::: tip 예시

- **vuepress-theme-hop v2**: `<html>` 태그 자체에 `data-theme="dark"`를 설정하여 다크 모드를 활성화합니다. 따라서 `'html[data-theme="dark"]'`를 `dark` 옵션으로 설정해야 합니다.

- **hexo-theme-fluid**: `<html>` 태그 자체에 `data-user-color-scheme="dark"`를 설정하여 다크 모드를 활성화합니다. 따라서 `'html[data-user-color-scheme="dark"]'`를 `dark` 옵션으로 설정해야 합니다.

:::

## 메타 아이콘

사용자 댓글 메타 데이터에 아이콘을 추가하려면 `waline-meta.css`를 가져와서 사용할 수 있습니다.

CDN 사용자는 다음 링크를 통해 가져올 수 있습니다:

```html
<!-- Meta icon (optional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

NPM 사용자는 다음을 통해 가져올 수 있습니다:

```js
import '@waline/client/meta';
```

## RTL 지원

`@waline/client`는 RTL 레이아웃을 지원하며, `<html>` 태그에 `dir="rtl"`을 추가하기만 하면 됩니다.

## 스타일 커스터마이즈

### CSS 변수

일반 모드와 다크 모드에서 Waline이 사용하는 CSS 변수의 기본값은 [클라이언트 참조 → CSS 변수](../../reference/client/style.md)에서 확인할 수 있습니다.

사이트 스타일과 다른 경우 해당 CSS 변수를 직접 재정의할 수 있습니다.

## 박스 그림자

테두리 대신 그림자(`box-shadow`)를 사용하는 테마를 사용하는 경우 `--waline-border`와 `--waline-box-shadow`를 수정하여 Waline의 표시 효과를 변경할 수 있습니다. 예:

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

### 더 보기

위의 CSS 변수로 Waline 스타일에 대한 커스텀 요구 사항을 충족할 수 없는 경우 자체 CSS 파일을 작성할 수 있습니다.
