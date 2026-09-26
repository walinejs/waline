---
title: Bereitstellung auf Alibaba Cloud Compute Nest
icon: aliyun
---

[Compute Nest](https://computenest.console.aliyun.com/) ist eine Platform-as-a-Service-Lösung (PaaS), die Alibaba Cloud für Dienstanbieter und ihre Kunden zur Verwaltung von Diensten bereitstellt.

Dienstanbieter können private Dienste auf Compute Nest veröffentlichen, und ihre Kunden können diese Dienste einfach bereitstellen. Dienstanbieter können auch vollständig verwaltete Dienste veröffentlichen, bei denen sie gehostete O&M für die Ressourcen ihrer Kunden implementieren können.

Compute Nest bietet Servicefunktionen für jede Phase des Lifecycle-Managements von Diensten. Dienstanbieter können verschiedene Phasen mithilfe verschiedener Funktionsmodule basierend auf ihren Anforderungen verwalten. Dies hilft Dienstanbietern, die Betriebseffizienz zu verbessern, Betriebskosten zu senken und einfache und bequeme Dienste für Kunden bereitzustellen.

<!-- more -->

## Wie bereitstellen

1. Bestätigung vor der Bereitstellung: Um eine Waline Community Edition-Serviceinstanz bereitzustellen, müssen Sie auf einige Alibaba Cloud-Ressourcen zugreifen und diese erstellen. Daher muss Ihr Konto Berechtigungen für die folgenden Ressourcen enthalten. Beschreibung: Diese Berechtigung ist nur erforderlich, wenn Ihr Konto ein RAM-Konto ist.

   | Berechtigungsrichtlinienname    | Bemerkung                                                                           |
   | ------------------------------- | ----------------------------------------------------------------------------------- |
   | AliyunECSFullAccess             | Berechtigungen zum Verwalten von ECS                                                |
   | AliyunVPCFullAccess             | Berechtigungen zum Verwalten eines VPC                                              |
   | AliyunROSFullAccess             | Berechtigungen zum Verwalten des Resource Orchestration Service (ROS)               |
   | AliyunComputeNestUserFullAccess | Verwalten benutzerseitiger Berechtigungen für den Compute Nest-Dienst (ComputeNest) |

1. Greifen Sie auf den Waline-Dienst unter Alibaba Compute Nest zu [Deployment Link](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Waline%20Community%20Edition), füllen Sie die Bereitstellungsparameter wie aufgefordert aus
1. Wählen Sie den Zahlungstyp, ECS- (d. h. Cloud-Server-) Instanzspezifikationen, Systemdatenträger-Typ und Instanzkennwort nach Bedarf aus.
   ![computenest](../../../assets/aliyun-computenest-en-1.png)
1. Wählen Sie die Verfügbarkeitszone aus, in der die ECS-Instanz bereitgestellt wird, und wählen Sie die VPC (privates Netzwerk) und die Switch-ID aus, in der sich die ECS-Instanz befindet. Wenn in Ihrem Konto keine verfügbaren VPCs und Switches vorhanden sind, können Sie diese direkt in der entsprechenden Alibaba Cloud-Produktkonsole erstellen, indem Sie in der Compute Nest-Konsole auf „VPC erstellen" und „vSwitch erstellen" klicken. Klicken Sie auf Weiter: Bestellung bestätigen.
   ![computenest](../../../assets/aliyun-computenest-en-2.png)
1. Nachdem Sie die Bereitstellungsparameter bestätigt und den geschätzten Preis überprüft haben, klicken Sie auf Jetzt erstellen.
1. Klicken Sie links auf die Registerkarte „Serviceinstanz", um die Listenseite der Serviceinstanz aufzurufen und den Bereitstellungsfortschritt der Serviceinstanz anzuzeigen.
   ![computenest](../../../assets/aliyun-computenest-en-3.png)
1. Klicken Sie auf die Instanz-ID, rufen Sie die Detailschnittstelle auf und klicken Sie auf „Experience Ip Address", um den Waline-Dienst zu erleben.
   ![computenest](../../../assets/aliyun-computenest-en-4.png)
