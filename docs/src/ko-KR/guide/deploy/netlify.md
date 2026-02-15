---
title: Netlify 배포
icon: netlify
---

[Netlify](https://netlify.com)는 잘 알려진 정적 웹사이트 배포 서비스 제공업체이며, [Edge Functions](https://www.netlify.com/blog/edge-functions-explained/)는 Netlify가 출시한 웹사이트의 엣지 노드에서 JavaScript 코드를 실행할 수 있는 서비스입니다.

<!-- more -->

## 배포 방법

[Fork](https://github.com/walinejs/netlify-starter/fork) 버튼을 클릭하여 Netlify 시작 스캐폴드를 생성합니다.

![netlify](../../../assets/netlify-1.png)

<https://app.netlify.com> Netlify 콘솔에 로그인한 후 <kbd>Add new site</kbd> - <kbd>Import an exist project</kbd>를 선택하여 사이트를 추가합니다. GitHub 인증을 선택하여 GitHub 프로젝트 목록을 읽습니다. 목록에서 방금 Fork로 생성한 저장소 이름을 검색하고, 해당 프로젝트를 클릭하여 이 저장소를 기반으로 Netlify 웹사이트를 생성합니다.

![netlify](../../../assets/netlify-2.png) ![netlify](../../../assets/netlify-3.png)

Netlify 웹사이트를 생성하기 전에 몇 가지 구성 정보를 입력해야 합니다. 환경 변수 외의 기타 정보는 기본값을 사용해도 됩니다. [다중 데이터베이스 지원](../database.md)을 참조하여 해당 스토리지 서비스 환경 변수를 추가한 후, 하단의 <kbd>Deploy site</kbd>를 클릭하여 사이트 배포를 시작합니다.

![netlify](../../../assets/netlify-4.png)

잠시 후 Netlify 웹사이트가 성공적으로 배포됩니다. 상단의 <kbd>Functions</kbd> 내비게이션 바를 클릭하여 클라우드 함수 목록으로 전환할 수 있으며, `comment`가 배포된 Waline 서비스입니다. 클릭하여 클라우드 함수의 상세 페이지로 이동합니다.

![netlify](../../../assets/netlify-5.png)

상세 페이지에서 `Endpoint`에 나열된 주소가 Waline 서비스의 배포 주소입니다. 오른쪽의 복사 버튼을 클릭하고, 새 탭에서 열어서 댓글 게시를 테스트해 보세요. 모든 것이 성공적이면~ 다음으로 클라이언트에서 이 도메인 이름을 구성하면 즐겁게 댓글을 달 수 있습니다!

![netlify](../../../assets/netlify-6.png) ![netlify](../../../assets/netlify-8.png)

## 업데이트 방법

GitHub 저장소로 이동하여 package.json 파일에서 `@waline/vercel` 버전 번호를 최신 버전으로 수정합니다.

## 환경 변수 수정 방법

상단의 `Site settings` 내비게이션 바를 클릭하고, `Environments variables` 사이드바를 선택하여 환경 변수 관리 페이지로 이동합니다. `Add a variable` 버튼을 클릭하여 환경 변수를 추가합니다.

환경 변수를 편집한 후에는 `Deploys` 페이지로 이동하여 `Trigger deploy` - `Deploy site`를 선택하여 웹사이트를 재배포해야 환경 변수가 적용됩니다.

![netlify](../../../assets/netlify-9.png) ![netlify](../../../assets/netlify-10.png)
