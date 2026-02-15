---
title: 개발 가이드
icon: contribute
order: -1
---

Waline에 Pull Request를 보내주시는 모든 분들을 환영합니다! :tada:

Waline에 기여하고 싶으시다면, 다음 가이드를 참고해 주세요.

<!-- more -->

## 준비

1. Git을 사용하여 프로젝트를 클론합니다

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. 의존성 설치

   ::: warning

   pnpm을 설치하고 이를 사용하여 의존성을 설치합니다.

   ```bash
   npm i -g pnpm@latest
   ```

   :::

   ```bash
   cd waline
   pnpm i
   ```

## 개발

- `pnpm client:dev`를 실행하여 `@waline/client` 개발 서버를 시작합니다

  ::: tip

  Waline은 클라이언트/서버 아키텍처를 기반으로 하므로, 클라이언트를 디버그할 때 `SERVERURL`을 설정하거나, 아래의 서버 개발 서버를 동시에 시작하여 기본값인 `localhost:9090`을 사용해야 합니다.

  :::

- `pnpm server:dev`를 실행하여 `@waline/server` 개발 서버를 시작합니다

  ::: tip

  `@waline/server`를 로컬에서 실행하려면 `.env` 파일에 로컬 환경 변수를 설정해야 합니다.

  `.env.example`에 예시를 제공하고 있습니다.

  :::
