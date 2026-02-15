---
title: Zeabur 배포
icon: zeabur
---

[Zeabur](https://zeabur.com)는 개발자가 자신의 서비스를 원클릭으로 배포할 수 있도록 도와주는 플랫폼입니다. 전체적으로 Railway와 유사하지만, 더 많은 기능을 제공하며, 신용카드를 등록할 필요가 없고, 무료 사용 한도도 더 높습니다.

<!-- more -->

## 원클릭 배포

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/1IBY26?utm_source=waline)

## 처음부터 배포하기

[Fork](https://github.com/walinejs/zeabur-starter/fork) 버튼을 클릭하여 Zeabur 스타터 스캐폴드를 생성합니다.

![zeabur1](../../../assets/zeabur-1.png)

<https://dash.zeabur.com> Zeabur 콘솔에 로그인합니다. 프로젝트가 없는 경우, 먼저 새 프로젝트의 이름을 설정해야 합니다.

![zeabur2](../../../assets/zeabur-2.png)

진입 후 <kbd>Add New Service</kbd>를 클릭하여 서비스를 생성하고, <kbd>Deploy Other Service</kbd> - <kbd>Deploy MongoDB</kbd>를 선택하여 먼저 데이터베이스 서비스를 생성합니다.

MongoDB 데이터베이스 서비스의 이름을 지정하고, <kbd>Deploy</kbd> 버튼을 클릭하면 데이터베이스 서비스가 배포됩니다.

![zeabur2](../../../assets/zeabur-3.png) ![zeabur4](../../../assets/zeabur-4.png)

다음으로, <kbd>Add New Service</kbd>를 계속 클릭하여 Waline 서비스를 생성합니다. 이번에는 <kbd>Deploy Your Source Code</kbd>를 클릭합니다. 이어지는 GitHub 프로젝트 목록에서 처음에 포크한 프로젝트를 찾아 해당 <kbd>Import</kbd> 버튼을 클릭합니다.

Waline 서비스의 이름을 지정하고, <kbd>Deploy</kbd> 버튼을 클릭하면 Waline 서비스가 배포됩니다.

![zeabur6](../../../assets/zeabur-6.png) ![zeabur7](../../../assets/zeabur-7.png)

Waline 서비스 패널을 서둘러 닫지 마세요. 서비스가 배포된 후, 서비스에 접속 도메인을 추가해야 합니다. <kbd>Domains</kbd> 탭 아래의 <kbd>Generate Domain</kbd> 버튼을 클릭하고, 원하는 도메인 접두사를 입력한 후 <kbd>Save</kbd> 버튼을 클릭하여 서비스에 접속 도메인을 추가합니다.

![zeabur8](../../../assets/zeabur-8.png) ![zeabur9](../../../assets/zeabur-9.png)

모든 준비가 완료되었습니다. 이제 기적을 목격할 차례입니다. 방금 설정한 접속 도메인을 열고, 댓글 작성을 테스트해 보세요. 모든 것이 성공적으로 작동합니다~ 다음으로, 클라이언트에서 이 도메인을 설정하면 즐겁게 댓글을 달 수 있습니다!

![zeabur2](../../../assets/zeabur-10.png)

## 업데이트 방법

GitHub 저장소로 이동하여 package.json 파일의 `@waline/vercel` 버전 번호를 최신 버전으로 수정합니다.

## 환경 변수 수정 방법

<kbd>Variables</kbd> 탭을 통해 환경 변수 관리 페이지에 진입할 수 있으며, 수정 후 자동으로 재배포됩니다.

![zeabur11](../../../assets/zeabur-11.png)
