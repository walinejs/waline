---
title: 클라이언트 소개
icon: client
order: 1
---

Waline은 공식적으로 [`@waline/client`](https://www.npmjs.com/package/@waline/client)를 제공하며, Vue + TypeScript로 작성되었고 gzip 크기는 53kb에 불과합니다.

## 가져오기

CDN 또는 npm을 사용하여 Waline 클라이언트를 가져올 수 있으며, 다양한 시나리오에 맞는 여러 버전의 파일을 제공합니다.

이 과정에서 문제가 발생하면 다음을 참조하세요:

- [쿡북 → CDN 가져오기](../../cookbook/import/cdn.md)
- [쿡북 → 프로젝트 가져오기](../../cookbook/import/project.md)

## Waline 사용하기

Waline을 사용하는 가장 쉬운 방법은 [빠른 시작에서 설명한 방법](./README.md#importing-in-html-client)을 사용하는 것입니다: Waline에서 `init` 함수를 가져오고 `init(yourOptions)`를 통해 Waline 인스턴스를 초기화합니다.

`init` 옵션 중에서 `el`과 `serverURL`은 필수입니다. 전자는 Waline이 마운트될 요소 또는 요소 선택자이고, 후자는 서버 주소입니다. `@waline/client`의 모든 초기화 매개변수는 [클라이언트 참조 → API](../../reference/client/api.md)를 참조하세요.

## 댓글 수

`@waline/client`는 댓글 통계를 위한 하위 패키지도 제공합니다. 이를 사용하여 블로그 게시물 목록이나 댓글이 포함되지 않은 다른 페이지에 댓글 수를 표시할 수 있습니다. 자세한 내용은 [기능 → 댓글 수](../features/comment.md)를 참조하세요.

## 페이지 조회수

Waline은 페이지 조회 통계를 지원합니다. 댓글 서비스는 필요하지 않지만 페이지 조회 기능을 사용하고 싶다면, Waline은 Gzip 크기가 1KB 미만인 페이지 조회 통계 플러그인을 제공합니다.

`@waline/client`의 페이지 조회수에 대한 자세한 정보는 [기능 → 페이지 조회수](../features/pageview.md)를 참조하세요.

## 댓글 형식 지원

`@waline/client`는 다양한 댓글 구문과 풍부한 서식을 지원합니다. 표준 Markdown 및 GFM 구문 확장을 지원하는 것 외에도, 댓글 작성자는 HTML 태그를 삽입하거나 수학 공식을 사용하는 등 다양한 기능을 사용할 수 있습니다. 다른 구문에 대해서는 [기능 → 지원 구문](../features/syntax.md)을 참조하세요.

`@waline/client`는 댓글 입력란에서 댓글 입력의 실시간 미리보기도 지원합니다. 다만, 크기 문제로 일부 기능은 기본적으로 제외되어 있습니다. 이러한 기능을 복원하려면 다음을 참조하세요:

- [쿡북 → 미리보기 코드 하이라이터 사용자 정의](../../cookbook/customize/highlighter.md)
- [쿡북 → 미리보기 $\TeX$ 렌더러 사용자 정의](../../cookbook/customize/tex-renderer.md)

## 글 반응

댓글이 너무 번거로우신가요? Waline은 방문자가 좋아요, 싫어요, 의문, 지루함, 놀라움 등 글에 대한 반응을 빠르게 표현할 수 있도록 합니다. 이 기능을 수동으로 활성화하려면 [기능 → 글 반응](../features/reaction.md)을 참조하세요.

## 댓글 기능

Waline은 로그인, 아바타, [다국어 지원](../features/i18n.md) 및 실시간 미리보기를 포함한 다양한 기본 기능을 지원합니다.

Waline을 사용하면 사용자에게 상호작용 레벨 라벨과 사용자 정의 라벨을 설정할 수 있습니다. 자세한 내용은 [사용자 라벨](../features/label.md)을 참조하세요.

## 이모지 탭

`@waline/client`는 여러 이모지 탭을 지원하며, 프리셋을 통해 이모지 탭을 쉽게 도입할 수 있습니다. 공식 프리셋 외에도 자신만의 프리셋을 쉽게 만들 수 있습니다.

`@waline/client` 이모지 탭에 대한 자세한 정보는 다음을 참조하세요:

- [기능 → 이모지 탭](../features/emoji.md)
- [쿡북 → 이모지 사용자 정의](../../cookbook/customize/emoji.md)

## 이미지 삽입

`@waline/client`는 내장 이미지 업로드를 지원합니다. 기본적으로 이미지는 base64로 변환됩니다. 물론, 자체 이미지 호스팅 서비스를 사용할 수도 있습니다.

`@waline/client`의 이미지 업로드 설정에 대한 자세한 정보는 [쿡북 → 이미지 업로드 사용자 정의](../../cookbook/customize/upload-image.md)를 참조하세요.

## 이모티콘 검색

`@waline/client`는 [giphy](https://giphy.com)를 통한 밈 및 이모티콘 검색 기능을 제공하며, 검색 서비스를 사용자 정의할 수 있습니다. 다음을 참조하세요:

- [기능 → 이모티콘 검색](../features/search.md)
- [쿡북 → 이모티콘 검색 사용자 정의](../../cookbook/customize/search.md)

## 다국어 지원

`@waline/client`는 여러 언어에 대한 내장 지원을 제공하며, 이를 기반으로 언어 지원을 추가하거나 UI 텍스트를 수정할 수 있습니다. 다음을 참조하세요:

- [기능 → 언어 설정](../features/i18n.md)
- [쿡북 → 언어 사용자 정의](../../cookbook/customize/locale.md)

## 접근성 지원

Waline은 모든 접근성 표준을 완벽하게 지원합니다:

- 모든 아이콘과 컨트롤에는 해당하는 접근성 라벨이 있습니다.
- 키보드 또는 머리 장착형 포인팅 장치를 사용하여 Waline의 모든 컨트롤과 상호작용할 수 있습니다.

이것은 전 세계의 시각 장애인과 운동 장애인을 지원하기 위한 우리의 방법입니다! :heart:

## 사용자 정의 스타일

Waline은 내장 다크 모드를 지원합니다. 사용자가 Waline의 스타일을 쉽게 조정할 수 있도록 많은 설정 가능한 CSS 변수를 제공합니다.

자세한 내용은 [사용자 정의 스타일](../features/style.md)을 참조하세요.

## 고급 개발

### 싱글 페이지 애플리케이션 지원

Waline은 SPA(**S**ingle **P**age **A**pplication)를 지원합니다.

history API 기반의 웹사이트나 애플리케이션에서 Waline을 사용하려면, 초기화된 인스턴스의 `update()` 메서드를 사용하여 댓글 영역의 설정을 새로고침하거나, 인스턴스의 `destroy()` 메서드를 사용하여 Waline을 파괴할 수 있습니다. `@waline/client`의 반응성에 대해 더 알아보려면 [쿡북 → 반응성](../../cookbook/reactivity.md)을 참조하세요.

### 에코시스템

Hexo, VuePress와 같은 도구의 플러그인이나 서드파티 클라이언트를 통해 Waline을 쉽게 사용할 수 있습니다.

Waline을 지원하는 서드파티 클라이언트, 테마 및 플러그인에 대해서는 [더 알아보기 → 에코시스템](../../advanced/ecosystem.md)을 참조하세요.
