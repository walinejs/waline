---
title: 클라이언트 파일
icon: file
---

`@waline/client`는 여러 버전의 파일을 제공합니다

<!-- more -->

## CDN 파일 목록

- `dist/waline.js`: 전체 버전, ESM 형식

  `@waline/client`를 가져올 때 권장되는 버전입니다, Gzip 크기 53 KB

- `dist/waline.umd.js`: 전체 버전, UMD 형식

- `dist/slim.js`: 의존성 번들 없는 전체 버전, ES Module 형식

  Node.js에서 `@waline/client`를 가져올 때 기본 파일입니다, Gzip 크기 19.39 KB

- `dist/waline.css`: Waline CSS 스타일

- `dist/waline-meta.css`: Waline Meta 아이콘 CSS

- `dist/component.js`: Waline의 Vue 컴포넌트, ES Module 형식, 의존성 번들 없음

  Vue 프로젝트에서 Waline 댓글을 컴포넌트 모드로 사용하기 위한 파일입니다, Gzip 크기 18.28 KB

- `dist/comment.js`: Waline의 댓글 수 모듈, ESM 형식, Gzip 크기 < 1KB

  페이지 댓글 수만 필요할 때 CDN 가져오기에 사용됩니다

- `dist/pageview.js`: Waline의 페이지뷰 모듈, ESM 형식, Gzip 크기 < 1KB

  페이지 조회수만 필요할 때 CDN 가져오기에 사용됩니다

## 모듈 내보내기

`@waline/client`는 표준 ESM 모듈이며, Node.js 버전 >= 18이 필요합니다:

- `@waline/client`: 의존성 번들 없는 Waline 메인 엔트리

- `@waline/client/waline.css`: Waline 스타일 파일

- `@waline/client/waline-meta.css`: Waline 메타 아이콘 스타일 파일

- `@waline/client/comment`: Waline 댓글 수 모듈

- `@waline/client/pageview`: Waline 페이지뷰 수 모듈

- `@waline/client/full`: 모든 의존성이 번들된 Waline 메인 엔트리
