---
title: Alibaba Cloud Compute Nestでのデプロイ
icon: aliyun
---

[Compute Nest](https://computenest.console.aliyun.com/)は、Alibaba Cloudがサービスプロバイダーとその顧客向けに提供する、サービスを管理するためのPlatform as a Service（PaaS）ソリューションです。

サービスプロバイダーはCompute Nest上でプライベートサービスを公開でき、顧客はそれらのサービスを簡単にデプロイできます。また、サービスプロバイダーは、顧客のリソースに対してホスティング形式の運用保守を実施できるフルマネージドサービスを公開することもできます。

Compute Nestは、サービスのライフサイクル管理の各段階に対応するサービス機能を提供します。サービスプロバイダーは、要件に応じて異なる機能モジュールを使い分けながら各段階を管理できます。これにより、運用効率の向上、運用コストの削減、そして顧客へのシンプルで便利なサービスの提供を実現できます。

<!-- more -->

## デプロイ方法

1. デプロイ前の確認：Walineコミュニティエディションのサービスインスタンスをデプロイするには、いくつかのAlibaba Cloudリソースにアクセスして作成する必要があります。そのため、アカウントに以下のリソースに対する権限が付与されている必要があります。説明：この権限が必要なのは、アカウントがRAMアカウントの場合のみです。

   | 権限ポリシー名                  | 備考                                                              |
   | ------------------------------- | ----------------------------------------------------------------- |
   | AliyunECSFullAccess             | ECSを管理する権限                                                 |
   | AliyunVPCFullAccess             | VPCを管理する権限                                                 |
   | AliyunROSFullAccess             | Resource Orchestration Service（ROS）を管理する権限               |
   | AliyunComputeNestUserFullAccess | Compute Nestサービス（ComputeNest）のユーザー側権限を管理する権限 |

1. Alibaba Compute Nest上のWalineサービス[デプロイリンク](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Waline%20Community%20Edition)にアクセスし、画面の指示に従ってデプロイパラメータを入力します。
1. 必要に応じて、支払いタイプ、ECS（クラウドサーバー）インスタンスのスペック、システムディスクのタイプ、インスタンスのパスワードを選択します。
   ![computenest](../../../assets/aliyun-computenest-en-1.png)
1. ECSインスタンスをデプロイする可用性ゾーンを選択し、ECSインスタンスが配置されるVPC（プライベートネットワーク）とスイッチIDを選択します。アカウントに利用可能なVPCとスイッチがない場合は、Compute Nestコンソールの「Create VPC」と「Create vSwitch」をクリックすると、対応するAlibaba Cloud製品のコンソールに直接移動して作成できます。「Next: Confirm Order」をクリックします。
   ![computenest](../../../assets/aliyun-computenest-en-2.png)
1. デプロイパラメータを確認し、見積価格を確認したら、「Create Now」をクリックします。
1. 左側の「Service Instance」タブをクリックしてサービスインスタンスの一覧ページに移動し、サービスインスタンスのデプロイ状況を確認します。
   ![computenest](../../../assets/aliyun-computenest-en-3.png)
1. インスタンスIDをクリックして詳細画面に入り、「Experience Ip Address」をクリックするとWalineサービスを試すことができます。
   ![computenest](../../../assets/aliyun-computenest-en-4.png)
