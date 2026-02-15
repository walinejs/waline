---
title: Alibaba Cloud Compute Nest에 배포하기
icon: aliyun
---

[Compute Nest](https://computenest.console.aliyun.com/)는 Alibaba Cloud가 서비스 제공자와 고객에게 서비스를 관리할 수 있도록 제공하는 PaaS(Platform as a Service) 솔루션입니다.

서비스 제공자는 Compute Nest에 프라이빗 서비스를 게시할 수 있으며, 고객은 이러한 서비스를 쉽게 배포할 수 있습니다. 서비스 제공자는 또한 완전 관리형 서비스를 게시하여 고객 리소스에 대한 호스팅 운영 및 유지보수를 구현할 수 있습니다.

Compute Nest는 서비스 수명 주기 관리의 각 단계에 대응하는 서비스 기능을 제공합니다. 서비스 제공자는 요구 사항에 따라 다양한 기능 모듈을 사용하여 각 단계를 관리할 수 있습니다. 이를 통해 서비스 제공자는 운영 효율성을 높이고, 운영 비용을 절감하며, 고객에게 간편한 서비스를 제공할 수 있습니다.

<!-- more -->

## 배포 방법

1. 배포 전 확인사항: Waline 커뮤니티 에디션 서비스 인스턴스를 배포하려면 일부 Alibaba Cloud 리소스에 접근하고 생성해야 합니다. 따라서 계정에 다음 리소스에 대한 권한이 포함되어 있어야 합니다. 참고: 이 권한은 계정이 RAM 계정인 경우에만 필요합니다.

   | 권한 정책 이름                  | 비고                                                  |
   | ------------------------------- | ----------------------------------------------------- |
   | AliyunECSFullAccess             | ECS 관리 권한                                         |
   | AliyunVPCFullAccess             | VPC 관리 권한                                         |
   | AliyunROSFullAccess             | Resource Orchestration Service (ROS) 관리 권한        |
   | AliyunComputeNestUserFullAccess | Compute Nest 서비스 (ComputeNest) 사용자 측 관리 권한 |

1. Alibaba Compute Nest에서 Waline 서비스에 접속합니다. [배포 링크](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Waline%20Community%20Edition), 안내에 따라 배포 매개변수를 입력합니다.
1. 필요에 따라 결제 유형, ECS(클라우드 서버) 인스턴스 사양, 시스템 디스크 유형 및 인스턴스 비밀번호를 선택합니다.
   ![computenest](../../../assets/aliyun-computenest-en-1.png)
1. ECS 인스턴스가 배포될 가용 영역을 선택하고, ECS 인스턴스가 위치할 VPC(프라이빗 네트워크)와 스위치 ID를 선택합니다. 계정에 사용 가능한 VPC와 스위치가 없는 경우, Compute Nest 콘솔에서 "Create VPC"와 "Create vSwitch"를 클릭하여 관련 Alibaba Cloud 제품 콘솔로 바로 이동하여 생성할 수 있습니다. Next: Confirm Order를 클릭합니다.
   ![computenest](../../../assets/aliyun-computenest-en-2.png)
1. 배포 매개변수를 확인하고 예상 가격을 검토한 후 Create Now를 클릭합니다.
1. 왼쪽의 "Service Instance" 탭을 클릭하여 서비스 인스턴스 목록 페이지에 진입하여 서비스 인스턴스 배포 진행 상황을 확인합니다.
   ![computenest](../../../assets/aliyun-computenest-en-3.png)
1. 인스턴스 ID를 클릭하여 상세 페이지에 진입하고, "Experience Ip Address"를 클릭하여 Waline 서비스를 체험합니다.
   ![computenest](../../../assets/aliyun-computenest-en-4.png)
