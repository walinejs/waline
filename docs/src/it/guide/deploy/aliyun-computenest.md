---
title: Distribuisci su Alibaba Cloud Compute Nest
icon: aliyun
---

[Compute Nest](https://computenest.console.aliyun.com/) è una soluzione Platform as a Service (PaaS) che Alibaba Cloud mette a disposizione dei fornitori di servizi e dei loro clienti per gestire i servizi.

I fornitori di servizi possono pubblicare servizi privati su Compute Nest e i loro clienti possono distribuirli con facilità. I fornitori possono anche pubblicare servizi completamente gestiti, occupandosi dell'operatività e della manutenzione (O&M) ospitate delle risorse dei propri clienti.

Compute Nest offre funzionalità di servizio adatte a ogni fase della gestione del ciclo di vita dei servizi. I fornitori possono gestire le varie fasi con moduli funzionali diversi in base alle proprie esigenze. Questo li aiuta a migliorare l'efficienza operativa, ridurre i costi e offrire ai clienti servizi semplici e comodi.

<!-- more -->

## Come distribuire

1. Conferma prima della distribuzione: per distribuire un'istanza del servizio Waline Community Edition devi accedere ad alcune risorse di Alibaba Cloud e crearle. Pertanto, il tuo account deve disporre delle autorizzazioni per le seguenti risorse. Nota: questa autorizzazione è necessaria solo se il tuo account è un account RAM.

   | Nome della policy di autorizzazione | Note                                                                  |
   | ----------------------------------- | --------------------------------------------------------------------- |
   | AliyunECSFullAccess                 | Autorizzazioni per gestire ECS                                        |
   | AliyunVPCFullAccess                 | Autorizzazioni per gestire una VPC                                    |
   | AliyunROSFullAccess                 | Autorizzazioni per gestire Resource Orchestration Service (ROS)       |
   | AliyunComputeNestUserFullAccess     | Autorizzazioni lato utente per il servizio Compute Nest (ComputeNest) |

1. Accedi al servizio Waline su Alibaba Compute Nest tramite il [link di distribuzione](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Waline%20Community%20Edition)，compila i parametri di distribuzione come richiesto
1. Seleziona il tipo di pagamento, le specifiche dell'istanza ECS (ovvero il server cloud), il tipo di disco di sistema e la password dell'istanza in base alle tue esigenze.
   ![computenest](../../../assets/aliyun-computenest-en-1.png)
1. Seleziona la zona di disponibilità in cui viene distribuita l'istanza ECS e scegli la VPC (rete privata) e l'ID dello switch in cui si trova l'istanza ECS. Se nel tuo account non sono disponibili VPC e switch, puoi passare direttamente alla console del prodotto Alibaba Cloud corrispondente per crearli, facendo clic su "Create VPC" e "Create vSwitch" nella console di Compute Nest. Fai clic su Next: Confirm Order.
   ![computenest](../../../assets/aliyun-computenest-en-2.png)
1. Dopo aver confermato i parametri di distribuzione e verificato il prezzo stimato, fai clic su Create Now.
1. Fai clic sulla scheda "Service Instance" a sinistra per accedere alla pagina dell'elenco delle istanze di servizio e controllare l'avanzamento della distribuzione.
   ![computenest](../../../assets/aliyun-computenest-en-3.png)
1. Fai clic sull'ID dell'istanza, entra nella schermata dei dettagli e fai clic su "Experience Ip Address" per provare il servizio Waline.
   ![computenest](../../../assets/aliyun-computenest-en-4.png)
