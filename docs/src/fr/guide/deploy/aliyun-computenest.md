---
title: Déployer sur Alibaba Cloud Compute Nest
icon: aliyun
---

[Compute Nest](https://computenest.console.aliyun.com/) est une solution Platform as a Service (PaaS) qu'Alibaba Cloud met à la disposition des fournisseurs de services et de leurs clients pour gérer les services.

Les fournisseurs de services peuvent publier des services privés sur Compute Nest, et leurs clients peuvent déployer ces services facilement. Les fournisseurs de services peuvent également publier des services entièrement gérés, dans lesquels ils assurent l'exploitation et la maintenance hébergées des ressources de leurs clients.

Compute Nest fournit des capacités de service adaptées à chaque étape de la gestion du cycle de vie des services. Les fournisseurs de services peuvent gérer différentes étapes à l'aide de différents modules fonctionnels selon leurs besoins. Cela les aide à améliorer leur efficacité opérationnelle, à réduire leurs coûts d'exploitation et à offrir des services simples et pratiques à leurs clients.

<!-- more -->

## Comment déployer

1. Confirmation avant le déploiement : pour déployer une instance de service Waline Community Edition, vous devez
   accéder à certaines ressources Alibaba Cloud et les créer. Votre compte doit donc disposer des autorisations
   correspondant aux ressources suivantes. Remarque : cette autorisation n'est requise que si votre compte est un compte RAM.

   | Nom de la politique d'autorisation | Remarque                                                          |
   | ---------------------------------- | ----------------------------------------------------------------- |
   | AliyunECSFullAccess                | Autorisations de gestion des ECS                                  |
   | AliyunVPCFullAccess                | Autorisations de gestion d'un VPC                                 |
   | AliyunROSFullAccess                | Autorisations de gestion du Resource Orchestration Service (ROS)  |
   | AliyunComputeNestUserFullAccess    | Autorisations de gestion côté utilisateur du service Compute Nest |

1. Accédez au service Waline sur Alibaba Compute Nest via le [lien de déploiement](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Waline%20Community%20Edition), puis renseignez les paramètres de déploiement comme indiqué.
1. Sélectionnez le type de paiement, les spécifications de l'instance ECS (c'est-à-dire le serveur cloud), le type de disque système et le mot de passe de l'instance selon vos besoins.
   ![computenest](../../../assets/aliyun-computenest-en-1.png)
1. Sélectionnez la zone de disponibilité dans laquelle l'instance ECS est déployée, ainsi que le VPC (réseau privé) et l'ID du commutateur où se trouve l'instance ECS. Si aucun VPC ni commutateur n'est disponible dans votre compte, vous pouvez accéder directement à la console du produit Alibaba Cloud concerné pour les créer en cliquant sur « Create VPC » et « Create vSwitch » dans la console Compute Nest. Cliquez sur Next: Confirm Order.
   ![computenest](../../../assets/aliyun-computenest-en-2.png)
1. Après avoir confirmé les paramètres de déploiement et vérifié le prix estimé, cliquez sur Create Now.
1. Cliquez sur l'onglet « Service Instance » à gauche pour accéder à la liste des instances de service et suivre la progression du déploiement.
   ![computenest](../../../assets/aliyun-computenest-en-3.png)
1. Cliquez sur l'ID de l'instance, accédez à l'interface de détails, puis cliquez sur « Experience Ip Address » pour essayer le service Waline.
   ![computenest](../../../assets/aliyun-computenest-en-4.png)
