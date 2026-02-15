---
title: TiDB에서 데이터베이스 생성하기
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb)는 오픈 소스 NewSQL 데이터베이스입니다. [TiDB Cloud](https://tidbcloud.com/)는 공식 온라인 버전으로, 모든 사용자에게 5GB의 무료 스토리지를 제공합니다. 다음은 TiDB Cloud에서 Waline 데이터베이스를 생성하는 방법을 설명합니다.

## 데이터베이스 생성

1. [TiDB Cloud](https://tidbcloud.com)에 로그인하면 TiDB 인스턴스가 자동으로 생성됩니다. <kbd>cluster0</kbd>를 직접 클릭하여 인스턴스로 진입합니다.

   ![인스턴스 진입](../../../assets/tidb-1.png)

2. 왼쪽 목록에서 <kbd>Chat2Query</kbd>를 선택하고, [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb)의 내용을 `;` 기준으로 문장별로 나누어 인터페이스에서 실행합니다. 각 문장마다 오른쪽 상단의 <kbd>Run</kbd> 파란색 버튼을 클릭하거나, <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd> 단축키를 사용하여 실행합니다.
   ![Step1](../../../assets/tidb-2.png)
   ![Step2](../../../assets/tidb-3.png)
   ![Step3](../../../assets/tidb-4.png)
   ![Step4](../../../assets/tidb-5.png)
   ![Step5](../../../assets/tidb-6.png)

여기까지 Waline 데이터베이스가 생성되었습니다!

## 연결 설정 가져오기

왼쪽의 <kbd>Overview</kbd> 버튼을 클릭하여 홈페이지로 이동하고, 오른쪽 상단의 <kbd>Connect</kbd>를 선택하여 연결 정보를 가져옵니다.

'Connect with'에서 `Node.js`를 선택합니다. 또한, 오른쪽 하단의 <kbd>Reset password</kbd>를 클릭하여 비밀번호를 생성해야 합니다.

이렇게 하면 연결 관련 설정을 얻을 수 있습니다.

![연결 정보](../../../assets/tidb-7.png)
