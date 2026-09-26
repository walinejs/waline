---
title: 반응형 Waline 인스턴스
icon: spa
order: -1
---

공식 클라이언트 `@waline/client`는 Vue3를 기반으로 하며, 반응형 컴포넌트와 인스턴스를 제공하고, SPA(**S**ingle **P**age **A**pplication) 지원을 제공합니다.

<!-- more -->

## Vue 컴포넌트

Vue 프로젝트를 구축하고 있다면, `@waline/client/components`에서 명명된 내보내기 `Waline`을 가져와 Waline 컴포넌트를 얻고 사용할 수 있습니다.

모든 컴포넌트 속성은 반응형이므로, 속성을 변경하면 댓글 상자가 자동으로 업데이트됩니다.

## 기타 프로젝트

다른 SPA에서는 Waline이 초기화될 때 Waline 함수가 반환하는 `WalineInstance`를 저장해야 합니다.

`WalineInstance`에서 인스턴스 속성 `el`과 두 가지 메서드 `update()` 및 `destroy()`를 찾을 수 있습니다.

### update

언제든지 `update()`를 호출하여 Waline을 업데이트할 수 있습니다(예: 사용자가 새 경로를 방문할 때). `update` 메서드는 선택적 매개변수 `options`를 받으며, `el`을 제외한 다른 Waline 초기 옵션은 새로운 값을 전달하여 업데이트할 수 있습니다.

예시:

```js
// in `/` route
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* User: after some time, route has changed to `/a.html` */

waline.update(); // Now waline will start clear the comment and show a loading state.
// After some time, the counter and comments will be all updated

waline.update({
  lang: 'en',
  login: 'disable',
}); // waline will now display in English, and disable user login
```

#### 작동 원리

`update`를 호출하면 현재 옵션과 이전 옵션이 **얕은 복사**로 병합되며, Waline 인스턴스는 새로운 옵션으로 새로고침됩니다(그리고 새 옵션을 저장합니다).

이 메서드의 기본 동작은 아직 설정되지 않은 옵션에 대해 항상 **기본값을 재생성**하고, 이미 설정된 옵션에 대해서는 **이전 값을 사용**하는 것입니다.

특별히 주의해야 할 두 가지 옵션이 있습니다: `path`와 `locale`.

::: warning Path 주의사항

V2에서 `path` 매개변수는 `update()` 시 **항상 재설정**됩니다.

이는 `path`를 지정하지 않는 한, 모든 업데이트에서 `path`가 `window.location.pathname`으로 재설정된다는 의미입니다.

:::

::: warning locale 주의사항

얕은 복사로 인해, 이전 `locale` 옵션은 `update`에 전달된 새로운 `locale` 옵션으로 완전히 덮어씌워집니다.

우리의 의도는: 사용자가 locale을 업데이트할 때 보통 표시 언어를 전환하고 싶어하므로, 이를 플러그인의 예상 동작으로 설정했습니다. 이는 또한 `update({ locale: {} })`를 사용하여 이전의 사용자 정의 locale 설정을 지울 수 있다는 것을 의미합니다.

`locale`의 하나 이상의 특정 필드만 업데이트해야 하는 경우, 전체 업데이트된 `locale`을 전달해야 합니다.

:::

한편, `update()` 옵션은 비동기 네트워크 요청에 대해 최적화되었으며, 다음을 포함합니다:

- 경로가 실제로 변경될 때만 댓글 영역을 새로고침하고 다시 요청합니다
- 새로운 `update()` 호출은 이전 `update()`에서 더 이상 필요하지 않은 요청을 자동으로 종료합니다.

### el

`el` 속성은 현재 Waline 인스턴스가 마운트된 HTMLElement입니다.

`el: null`로 Waline을 초기화한 경우(댓글 및 페이지뷰 통계만 사용), 이 속성은 `null`이 됩니다.

### destroy

`serverURL`을 전달하는 것을 잊거나, Waline이 페이지에서 `el` 옵션을 통해 마운트 위치를 찾을 수 없는 경우, Waline은 오류 원인을 나타내는 Error를 throw합니다.

### 초기화 실패

`serverURL`을 설정하는 것을 잊거나, Waline이 페이지에서 `el` 옵션을 통해 마운트 위치를 찾을 수 없는 경우, Waline은 `WalineErrorInstance`를 반환합니다.

`WalineErrorInstance`에는 초기화 실패 원인을 나타내는 `errMsg` 속성만 있습니다.

### 주의사항

::: warning 인스턴스 파괴를 잊지 마세요

Waline이 리소스를 적절히 해제할 수 있도록, Waline이 마운트된 요소를 제거하기 전에 수동으로 `WalineInstance.destroy()`를 호출하세요.

그렇지 않으면 일부 리스너가 제대로 제거되지 않을 수 있습니다.

:::
