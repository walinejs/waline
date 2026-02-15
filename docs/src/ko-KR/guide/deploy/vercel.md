---
title: Vercel 배포
icon: vercel
order: 1
---

서버 패키지로 `@waline/vercel` 패키지를 배포했으며, Vercel 배포가 가장 권장하는 방법입니다.

<!-- more -->

## 배포 방법

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. 위의 파란색 버튼을 클릭하면 Waline 템플릿으로 배포하기 위해 Vercel로 이동합니다.

   ::: note

   로그인하지 않은 경우 GitHub으로 로그인하는 것을 권장합니다.

   :::

1. Vercel 프로젝트 이름을 입력한 후 `Create`를 클릭합니다.

   ![Create Project](../../../assets/vercel-1.png)

1. Vercel이 Waline 예제 템플릿을 기반으로 입력한 이름의 저장소를 자동으로 생성하고 초기화합니다.

   ![new project](../../../assets/vercel-2.png)

   1~2분 후 Vercel이 배포를 완료합니다. `Go to Dashboard` 버튼을 클릭하여 애플리케이션 대시보드로 이동합니다.

   ![dashboard](../../../assets/vercel-3.png)

## 데이터베이스 생성

1. 상단의 `Storage`를 클릭하여 스토리지 서비스 페이지로 이동한 후 `Create Database`를 선택합니다. `Marketplace Database Providers`에서 `Neon`을 선택한 후 `Continue`를 클릭합니다.

   ![storage](../../../assets/vercel-4.png)

1. Neon 계정을 생성하라는 메시지가 표시됩니다. `Accept and Create`를 선택합니다. 그런 다음 리전과 할당량을 포함한 데이터베이스 플랜 구성을 선택합니다. 기본값을 유지하고 `Continue`를 클릭해도 됩니다.

   ![neon](../../../assets/vercel-5.png)

1. 데이터베이스 이름을 정의합니다. 기본값을 유지하고 `Continue`를 클릭해도 됩니다.

   ![neon](../../../assets/vercel-6.png)

1. 이제 `Storage` 아래에 데이터베이스가 표시됩니다. 클릭한 후 `Open in Neon`을 선택하여 Neon으로 이동합니다. Neon에서 왼쪽의 `SQL Editor`를 선택하고, [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql)의 SQL을 에디터에 붙여넣은 후 `Run`을 클릭하여 테이블을 생성합니다.

   ![neon](../../../assets/vercel-7.png)

   ![neon](../../../assets/vercel-8.png)

1. 잠시 후 성공 메시지가 표시됩니다. Vercel로 돌아가서 `Deployments`를 클릭한 후, 최신 배포에서 `Redeploy`를 클릭하여 새 데이터베이스 구성을 적용합니다.

   ![redeploy success](../../../assets/vercel-9.png)

1. Vercel이 `Overview`로 이동하여 배포를 시작합니다. `STATUS`가 `Ready`가 되면, `Visit`을 클릭하여 배포된 사이트를 엽니다. 이 URL이 서버 주소입니다.

   ![visit](../../../assets/vercel-10.png)

## 도메인 연결

1. <kbd>Settings</kbd> - <kbd>Domains</kbd>를 클릭하여 도메인 설정 페이지로 이동합니다.

1. 연결할 도메인을 입력하고 <kbd>Add</kbd> 버튼을 클릭합니다.

   ![Add domain](../../../assets/vercel-11.png)

1. 도메인 서비스 서버에 새 `CNAME` 레코드를 추가합니다.

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. 적용된 후에는 자신의 도메인으로 Waline에 접속할 수 있습니다. :tada:
   - 댓글 시스템: example.your-domain.com
   - 관리자 패널: example.your-domain.com/ui

   ![success](../../../assets/vercel-12.png)

## HTML 가져오기

웹 페이지에서 다음과 같이 설정합니다:

1. `https://unpkg.com/@waline/client@v3/dist/waline.css`에서 Waline 스타일을 가져옵니다.
2. `https://unpkg.com/@waline/client@v3/dist/waline.js`에서 `init()`을 사용하는 `<script>` 태그를 생성하고, 필수 옵션 `el`과 `serverURL`을 전달합니다.
   - `el`은 Waline을 렌더링하는 데 사용되는 요소입니다. CSS 선택자 문자열 또는 HTMLElement가 될 수 있습니다.
   - `serverURL`은 이전 단계에서 얻은 서버 주소입니다.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## 댓글 관리

1. 배포 후 `<serverURL>/ui/register`에 접속하여 등록합니다. 최초 등록한 사용자가 관리자가 됩니다.
2. 로그인 후 관리자는 댓글을 편집, 표시 또는 삭제하여 관리할 수 있습니다.
3. 사용자는 댓글 입력란을 통해서도 등록할 수 있습니다. 로그인 후 프로필 페이지로 이동됩니다.
