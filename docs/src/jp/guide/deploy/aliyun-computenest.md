---
title: Alibaba Cloud Compute Nest でデプロイ
icon: aliyun
---

[Compute Nest](https://computenest.console.aliyun.com/) は、Alibaba Cloud がサービスプロバイダーとその顧客向けにサービスを管理するために提供する Platform as a Service (PaaS) ソリューションです。

サービスプロバイダーは Compute Nest 上にプライベートサービスを公開でき、顧客はそれらのサービスを簡単にデプロイできます。サービスプロバイダーはフルマネージドサービスも公開でき、顧客のリソースに対してホステッド運用・保守を実施できます。

Compute Nest はサービスのライフサイクル管理の各段階に対応したサービス機能を提供します。サービスプロバイダーは要件に応じて異なる機能モジュールを使用して各段階を管理できます。これにより、サービスプロバイダーは運用効率を向上させ、運用コストを削減し、顧客にシンプルで便利なサービスを提供できます。

<!-- more -->

## デプロイ方法

1. デプロイ前の確認: Waline コミュニティエディションのサービスインスタンスをデプロイするには、一部の Alibaba Cloud リソースへのアクセスと作成が必要です。そのため、アカウントには以下のリソースに対する権限が必要です。注意: この権限は RAM アカウントの場合にのみ必要です。

   | 権限ポリシー名                  | 備考                                                                    |
   | ------------------------------- | ----------------------------------------------------------------------- |
   | AliyunECSFullAccess             | ECS を管理する権限                                                      |
   | AliyunVPCFullAccess             | VPC を管理する権限                                                      |
   | AliyunROSFullAccess             | Resource Orchestration Service (ROS) を管理する権限                     |
   | AliyunComputeNestUserFullAccess | Compute Nest サービスのユーザー側権限を管理する権限                     |

1. Alibaba Compute Nest 上の Waline サービスに [デプロイリンク](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Waline%20Community%20Edition) からアクセスし、プロンプトに従ってデプロイパラメーターを入力します。
1. 支払い方法、ECS（クラウドサーバー）インスタンス仕様、システムディスクタイプ、インスタンスパスワードを必要に応じて選択します。
   ![computenest](../../../assets/aliyun-computenest-en-1.png)
1. ECS インスタンスをデプロイするアベイラビリティゾーンを選択し、ECS インスタンスが存在する VPC（プライベートネットワーク）とスイッチ ID を選択します。アカウントに利用可能な VPC やスイッチがない場合は、Compute Nest コンソールで「Create VPC」や「Create vSwitch」をクリックして、関連する Alibaba Cloud 製品コンソールに直接ジャンプして作成できます。次へ: 注文確認 をクリックします。
   ![computenest](../../../assets/aliyun-computenest-en-2.png)
1. デプロイパラメーターを確認し、概算価格を確認したら、今すぐ作成 をクリックします。
1. 左側の「Service Instance」タブをクリックしてサービスインスタンス一覧ページに入り、サービスインスタンスのデプロイ進行状況を確認します。
   ![computenest](../../../assets/aliyun-computenest-en-3.png)
1. インスタンス ID をクリックして詳細画面に入り、「Experience Ip Address」をクリックして Waline サービスを体験します。
   ![computenest](../../../assets/aliyun-computenest-en-4.png)
