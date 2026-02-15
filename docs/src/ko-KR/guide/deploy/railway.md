---
title: Railway 배포
icon: railway
---

[Railway](https://railway.app/)는 무료 Serverless 플랫폼으로, Waline을 Railway 플랫폼에 쉽게 배포할 수 있습니다.

<!-- more -->

## 배포 방법

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

이 버튼을 클릭하면 빠른 배포를 위해 railway.app 플랫폼으로 이동합니다. 로그인 후 새 GitHub 저장소 이름을 입력하거나 기본값을 사용한 다음, 하단의 <kbd>Deploy</kbd> 버튼을 클릭하여 배포합니다. 환경 변수 부분은 수정하지 않아야 합니다.

![railway1](../../../assets/railway-1.jpg)

잠시 후 대시보드 페이지로 이동합니다. <kbd>PostgreSQL</kbd> - <kbd>Query</kbd>를 클릭하고 [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) 파일 내용을 텍스트 영역에 붙여넣은 다음, 하단의 <kbd>Run Query</kbd> 버튼을 클릭하여 데이터베이스를 초기화합니다.

![railway2](../../../assets/railway-2.jpg)

마지막으로 <kbd>Deployments</kbd> - <kbd>Domains</kbd>를 클릭하여 서버 URL을 얻을 수 있습니다. 사이트 URL을 복사하여 클라이언트의 `serverURL` 구성에 입력하면 Waline을 사용할 수 있습니다!

![railway3](../../../assets/railway-3.jpg)

## 업데이트 방법

해당 GitHub 저장소로 이동하여 package.json 파일에서 `@waline/vercel`의 버전 번호를 최신 버전으로 수정합니다.

## 환경 변수 수정 방법

<kbd>Variables</kbd> 탭을 클릭하여 환경 변수 관리 페이지로 이동합니다. 변수가 변경되면 자동으로 배포됩니다.

![railway4](../../../assets/railway-4.jpg)
