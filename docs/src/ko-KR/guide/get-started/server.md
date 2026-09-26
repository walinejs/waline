---
title: 서버 소개
icon: server
order: 2
---

## 배포

Vercel에 무료로 배포하는 것 외에도, Docker를 통해 또는 자체 호스팅 환경에 직접 배포할 수 있으며, 다른 일반적인 클라우드 플랫폼에도 배포할 수 있습니다. 자세한 정보는 다음을 참조하세요:

- [독립 배포](../deploy/vps.md)

- [Railway](../deploy/railway.md)

- [알리바바 클라우드 Compute Nest](../deploy/aliyun-computenest.md)

## 다중 데이터베이스 지원

Waline은 MySQL, PostgreSQL, SQLite, MongoDB를 포함한 다양한 데이터베이스를 지원합니다.

해당 데이터베이스의 환경 변수만 설정하면 Waline이 자동으로 해당 데이터 저장 서비스로 전환합니다.

자세한 내용은 [다중 데이터베이스 지원](../database.md)을 참조하세요.

## 설정

서버 측의 대부분의 설정은 환경 변수를 통해 수행할 수 있으며, 메인 엔트리 파일에서 일부 고급 옵션을 설정할 수도 있습니다.

설정에 대한 자세한 내용은 [서버 참조 → 환경 변수](../../reference/server/env.md) 및 [서버 참조 → 설정](../../reference/server/config.md)을 참조하세요.

## 댓글 알림

누군가 댓글을 달거나 답글을 달 때 사용자 또는 댓글 작성자에게 알리는 다양한 방법을 지원합니다. 자세한 내용은 [댓글 알림](../features/notification.md)을 참조하세요.

## 사용자 계정 등록 및 소셜 로그인

Waline은 앱 내 계정 생성과 GitHub, Twitter, Facebook을 사용한 소셜 로그인을 지원합니다.

::: tip

계속 주목해 주세요: 향후 릴리스에서 더 많은 소셜 애플리케이션 지원을 추가할 계획입니다.

:::
