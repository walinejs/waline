---
title: Valine에서 마이그레이션
icon: valine
---

1. _시작하기_ 섹션의 [Vercel 배포](../guide/get-started/README.md#deploy-to-vercel-server)에 따라 백엔드를 배포하세요.

2. _시작하기_ 섹션의 [HTML](../guide/get-started/README.md#importing-in-html-client)에 따라 프론트엔드 스크립트를 수정하세요.

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
       el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

::: tip 설정

Waline V2는 Valine 지원을 제거하고 더 나은 구성으로 전환했습니다. 다음은 일부 옵션의 마이그레이션 요약입니다:

- `placeholder`: `locales.placeholder`를 사용하세요
- `highlight`: `highlighter`를 사용하세요
- `avatarForce`, `avatar`: 서버의 `AVATAR_PROXY` 환경 변수를 사용하세요
- `recordIP`: 더 이상 사용자 IP를 표시하지 않으며, 서버에서 `DISABLE_USERAGENT` 환경 변수를 제공합니다
- `requiredFields`: `requiredMeta`로 이름이 변경됨
- `langMode`: `locales`로 이름이 변경됨
- `emojiCDN`, `emojiMap`: 더 강력한 `emoji` 옵션을 사용하세요

Waline 설정에 대해서는 [클라이언트 설정](../reference/client/api.md)을 참조하세요. Valine과 호환되지 않는 옵션에 대해서는 [Waline 클라이언트 V2 마이그레이션 가이드](./v2.md)도 확인할 수 있습니다.

:::

1. 데이터 마이그레이션

LeanCloud 대시보드에서 <kbd>가져오기/내보내기</kbd> > <kbd>특정 클래스로 제한</kbd> > <kbd>Comment</kbd> > <kbd>내보내기</kbd>를 선택하면 이메일 알림을 받게 됩니다.

내보내기 파일의 내용을 아래 텍스트 영역에 붙여넣고, 변환 버튼을 클릭하면 가져올 파일을 얻을 수 있습니다.

<MigrationTool />

::: tip

위의 도구를 통해 내보내기 파일을 얻은 후, 해당 스토리지 서비스 콘솔에서 가져올 수 있습니다.

:::

## Waline의 주요 특징

Valine과 비교하여, Waline은 다음과 같은 주요 특징을 가지고 있습니다:

### 더 많은 기능

1. Markdown은 위 첨자, 아래 첨자, 이모지, 표, 취소선, 수학 공식, HTML 태그, 각주 등 더 많은 구문을 지원합니다.
1. 이미지 업로드 기능으로, 사용자 정의 이미지 제공 서비스를 사용하거나 이미지를 직접 삽입할 수 있습니다.
1. 새로운 라벨 시스템은 사용자 상호작용 빈도에 따라 사용자에게 레벨 라벨을 추가하고, 등록된 사용자에게 사용자 정의 라벨을 지원합니다.
1. 이모지 프리셋 및 탭 지원으로, 여러 세트의 이모지를 허용하며, 누구나 이모지 프리셋을 게시하고 사용할 수 있습니다.
1. 방문자가 글에 대한 태도를 표현할 수 있는 새로운 리액션 시스템.
1. 댓글 좋아요, 마음에 드는 댓글에 지지를 표현할 수 있습니다.
1. 페이지뷰, 더 정확한 조회 및 변조 방지.
1. 이모지 검색. 사용자 정의 가능한 서비스로, 사용자가 이모티콘을 자유롭게 검색하고 삽입할 수 있습니다.
1. 등록된 사용자가 게시한 댓글을 편집하고 삭제할 수 있습니다.

### 더 안전함

1. 제로 개인정보 유출, 사용자 이메일, IP 주소 등 민감한 정보를 노출하지 않으며, 서버에서 사용자 지리적 위치, 브라우저 및 운영 체제를 숨기도록 선택할 수 있습니다.
1. 완전한 스팸 방지 시스템.
   - 모든 댓글은 스팸 방지 서비스를 통해 인증될 수 있으며, 추가 검증 로직을 지원합니다.
   - 단일 IP 또는 단일 사용자에 대한 댓글 속도 제한을 설정할 수 있으며, Waline이 자동으로 중복 댓글을 식별합니다.
1. 댓글 검토 기능으로, 민감한 시기나 웹사이트가 공격을 받을 때 댓글 검토를 활성화하여 수동으로 댓글을 검토하고 표시를 승인하여 악의적인 댓글로 인한 사이트 폐쇄를 방지할 수 있습니다.
1. 사용자 계정을 지원합니다. 계정 등록 외에도, Waline은 소셜 미디어 계정도 지원하며, 신원 사칭을 방지하기 위해 인증된 라벨과 함께 아바타와 닉네임을 빠르게 동기화합니다.

### 더 편리함

1. 블로거에게 댓글을 알릴 수 있는 다양한 방법(QQ, WeChat, DingTalk, 이메일) 등
1. 강력한 관리 서비스로, 모든 사용자와 댓글을 확인하고 관련 작업을 수행할 수 있으며, 사용자에게 사용자 정의 라벨과 관리자를 설정할 수 있습니다.
1. 프론트엔드 관리로, 관리자가 Waline 댓글 컴포넌트를 통해 직접 댓글을 검토, 편집 또는 삭제할 수 있습니다.

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
