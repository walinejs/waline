---
title: Implantar no Alibaba Cloud Compute Nest
icon: aliyun
---

O [Compute Nest](https://computenest.console.aliyun.com/) é uma solução de Plataforma como Serviço (PaaS) que o Alibaba Cloud oferece para provedores de serviços e seus clientes gerenciarem serviços.

Os provedores de serviços podem publicar serviços privados no Compute Nest, e seus clientes podem implantar esses serviços com facilidade. Os provedores também podem publicar serviços totalmente gerenciados, nos quais realizam operação e manutenção (O&M) hospedadas nos recursos de seus clientes.

O Compute Nest oferece recursos de serviço que atendem a cada etapa do gerenciamento do ciclo de vida dos serviços. Os provedores de serviços podem gerenciar diferentes etapas usando diferentes módulos funcionais conforme suas necessidades. Isso ajuda os provedores a melhorar a eficiência operacional, reduzir os custos operacionais e oferecer serviços simples e convenientes aos clientes.

<!-- more -->

## Como implantar

1. Confirmação antes da implantação: para implantar uma instância de serviço da Waline Community Edition, você precisa acessar e criar alguns recursos do Alibaba Cloud. Portanto, sua conta deve conter permissões para os seguintes recursos. Observação: essa permissão é necessária apenas quando sua conta é uma conta RAM.

   | Nome da política de permissão   | Observação                                                              |
   | ------------------------------- | ----------------------------------------------------------------------- |
   | AliyunECSFullAccess             | Permissões para gerenciar o ECS                                         |
   | AliyunVPCFullAccess             | Permissões para gerenciar uma VPC                                       |
   | AliyunROSFullAccess             | Permissões de gerenciamento do Resource Orchestration Service (ROS)     |
   | AliyunComputeNestUserFullAccess | Permissões do lado do usuário para o serviço Compute Nest (ComputeNest) |

1. Acesse o serviço Waline no Alibaba Compute Nest [Link de implantação](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Waline%20Community%20Edition) e preencha os parâmetros de implantação conforme solicitado
1. Selecione o tipo de pagamento, as especificações da instância ECS (ou seja, servidor em nuvem), o tipo de disco do sistema e a senha da instância conforme necessário.
   ![computenest](../../../assets/aliyun-computenest-en-1.png)
1. Selecione a zona de disponibilidade onde a instância ECS será implantada e selecione a VPC (rede privada) e o ID do vSwitch onde a instância ECS está localizada. Se não houver VPCs e vSwitches disponíveis na sua conta, você pode ir diretamente ao console do produto correspondente do Alibaba Cloud para criá-los, clicando em "Create VPC" e "Create vSwitch" no console do Compute Nest. Clique em Next: Confirm Order.
   ![computenest](../../../assets/aliyun-computenest-en-2.png)
1. Depois de confirmar os parâmetros de implantação e revisar o preço estimado, clique em Create Now.
1. Clique na aba "Service Instance" à esquerda para entrar na página de lista de instâncias de serviço e acompanhar o progresso da implantação da instância.
   ![computenest](../../../assets/aliyun-computenest-en-3.png)
1. Clique no ID da instância, entre na interface de detalhes e clique em "Experience Ip Address" para experimentar o serviço Waline.
   ![computenest](../../../assets/aliyun-computenest-en-4.png)
