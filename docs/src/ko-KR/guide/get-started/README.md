---
title: 시작하기
icon: creative
dir:
  collapsible: false
  order: 1
---

Waline에 오신 것을 환영합니다. 몇 가지 간단한 단계만으로 사이트에 Waline 댓글 및 페이지 조회 기능을 활성화할 수 있습니다.

<!-- more -->

## 서버 배포

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. 위 버튼을 클릭하여 Vercel로 이동하고 서버를 배포하세요.

   ::: note

   로그인하지 않은 경우, Vercel에서 가입 또는 로그인을 요청합니다. GitHub 계정을 사용하여 빠르게 로그인하세요.

   :::

1. 원하는 Vercel 프로젝트 이름을 입력하고 `Create`를 클릭하여 계속 진행하세요:

   ![create](../../../assets/vercel-1.png)

1. Vercel이 Waline 템플릿을 기반으로 새 저장소를 생성하고 초기화합니다. 저장소 이름은 방금 입력한 프로젝트 이름이 됩니다.

   ![deploy](../../../assets/vercel-2.png)

   1~2분 후, 배포 성공을 축하하는 불꽃이 화면에 나타납니다. `Go to Dashboard`를 클릭하여 애플리케이션 대시보드로 이동하세요.

   ![deploy](../../../assets/vercel-3.png)

## 데이터베이스 생성

1. 상단의 `Storage`를 클릭하여 스토리지 설정 페이지로 이동한 후, `Create Database`를 선택하세요. `Marketplace Database Providers`에서 `Neon`을 선택하고 `Continue`를 클릭하여 진행하세요.

   ![neon](../../../assets/vercel-4.png)

1. Neon 계정을 생성하라는 메시지가 표시됩니다. `Accept and Create`를 클릭하여 수락하고 생성하세요. 그런 다음 지역 및 할당량을 포함한 데이터베이스 플랜을 선택합니다. 모두 기본값으로 두고 `Continue`를 클릭하면 됩니다.

   ![neon](../../../assets/vercel-5.png)

1. 데이터베이스 이름을 정의하라는 메시지가 표시됩니다. 변경하지 않고 `Continue`를 클릭해도 됩니다.

   ![neon](../../../assets/vercel-6.png)

1. 이제 `Storage` 아래에 방금 생성한 데이터베이스 서비스가 표시됩니다. 이를 클릭하고 `Open in Neon`을 선택하여 Neon으로 이동하세요. Neon 인터페이스에서 왼쪽 사이드바의 `SQL Editor`를 선택하고, [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql)의 SQL 문을 에디터에 붙여넣은 후 `Run`을 클릭하여 테이블을 생성하세요.

   ![neon](../../../assets/vercel-7.png)

   ![neon](../../../assets/vercel-8.png)

1. 잠시 후, 생성이 성공했다는 알림을 받게 됩니다. Vercel로 돌아가서 상단의 `Deployments`를 클릭하고, 최신 배포 오른쪽의 `Redeploy` 버튼을 클릭하세요. 이 단계는 새로 설정한 데이터베이스 서비스가 적용되도록 합니다.

   ![redeploy success](../../../assets/vercel-9.png)

1. `Overview` 페이지로 리디렉션되고 배포가 시작됩니다. 잠시 후 `STATUS`가 `Ready`로 변경됩니다. `Visit`을 클릭하여 배포된 웹사이트를 열어보세요. 이 URL이 서버 주소입니다.

   ![visit](../../../assets/vercel-10.png)

## 사용자 정의 도메인 바인딩

1. 상단의 `Settings` → `Domains`를 클릭하여 도메인 설정 페이지로 이동하세요.

1. 바인딩하려는 도메인을 입력하고 `Add`를 클릭하세요.

   ![도메인 추가](../../../assets/vercel-11.png)

1. 도메인 공급업체에서 새 `CNAME` 레코드를 추가하세요:

   | 유형  | 이름    | 값                   |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. DNS 레코드가 적용될 때까지 기다리세요. 그런 다음 자신의 도메인으로 Waline에 접근할 수 있습니다 🎉
   - 댓글 시스템: example.yourdomain.com
   - 댓글 관리: example.yourdomain.com/ui

   ![success](../../../assets/vercel-12.png)

## HTML에서 가져오기

다음은 웹 페이지 또는 웹사이트에 Waline을 추가하는 방법입니다:

1. `<head>`에서 스타일시트 `https://unpkg.com/@waline/client@v3/dist/waline.css`를 가져오세요

1. `<script>` 태그를 만들고 `https://unpkg.com/@waline/client@v3/dist/waline.js`에서 `init()`를 사용하여 필수 `el` 및 `serverURL` 옵션을 전달하며 초기화하세요.
   - `el` 옵션은 Waline 렌더링에 사용되는 요소입니다. 문자열 형식의 CSS 선택자 또는 HTMLElement 객체를 설정할 수 있습니다.
   - `serverURL`은 방금 Vercel에서 생성한 배포 서버의 링크입니다.
   - 더 많은 옵션은 [컴포넌트 속성 페이지](https://waline.js.org/ko-KR/reference/client/props.html)를 참조하세요

   다음은 예시입니다:

   ```html {3-7,12-18}:line-numbers
   <head>
     <!-- ... -->
     <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
   </head>
   <body>
     <!-- ... -->
     <div id="waline"></div>
     <script type="module">
       import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

       init({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
         lang: 'en',
       });
     </script>
   </body>
   ```

1. 이제 댓글 서비스가 웹사이트에서 성공적으로 실행됩니다 :tada:!

## 댓글 관리

1. 배포가 완료된 후, `<serverURL>/ui/register`를 방문하여 등록하세요. 최초 등록자가 관리자로 설정됩니다.

1. 관리자로 로그인하면 댓글 관리 대시보드에 접근할 수 있습니다. 여기서 댓글을 편집, 표시 또는 삭제할 수 있습니다.

1. 사용자도 댓글 상자를 통해 계정을 등록할 수 있으며, 로그인 후 프로필 페이지로 리디렉션됩니다.

## 동영상 튜토리얼

열정적인 Waline 사용자가 다음 동영상 튜토리얼을 제작했습니다. 위의 설명이 명확하지 않다면 동영상을 참고하세요:

<VidStack src="https://www.youtube.com/watch?v=SzEHzsme8uY" />
