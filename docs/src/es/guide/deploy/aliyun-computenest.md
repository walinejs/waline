---
title: Desplegar en Alibaba Cloud Compute Nest
icon: aliyun
---

[Compute Nest](https://computenest.console.aliyun.com/) es una solución Platform as a Service (PaaS) que Alibaba Cloud ofrece a los proveedores de servicios y a sus clientes para gestionar servicios.

Los proveedores de servicios pueden publicar servicios privados en Compute Nest, y sus clientes pueden desplegarlos fácilmente. También pueden publicar servicios totalmente gestionados en los que se encargan del mantenimiento y la operación (O&M) alojados de los recursos de sus clientes.

Compute Nest ofrece capacidades de servicio que cubren cada etapa de la gestión del ciclo de vida de los servicios. Los proveedores pueden gestionar las distintas etapas con diferentes módulos funcionales según sus necesidades. Esto les ayuda a mejorar la eficiencia operativa, reducir los costos de operación y ofrecer servicios sencillos y cómodos a sus clientes.

<!-- more -->

## Cómo desplegar

1. Confirmación antes del despliegue: para desplegar una instancia del servicio de la edición comunitaria de Waline, necesitas
   acceder a algunos recursos de Alibaba Cloud y crearlos. Por lo tanto, tu cuenta debe incluir permisos para los siguientes
   recursos. Nota: este permiso solo es necesario cuando tu cuenta es una cuenta RAM.

   | Nombre de la política de permisos | Observaciones                                                          |
   | --------------------------------- | ---------------------------------------------------------------------- |
   | AliyunECSFullAccess               | Permisos para gestionar ECS                                            |
   | AliyunVPCFullAccess               | Permisos para gestionar una VPC                                        |
   | AliyunROSFullAccess               | Permisos de gestión del servicio de orquestación de recursos (ROS)     |
   | AliyunComputeNestUserFullAccess   | Permisos de gestión del lado del usuario para el servicio Compute Nest |

1. Accede al servicio Waline en Alibaba Compute Nest desde el [enlace de despliegue](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Waline%20Community%20Edition), y rellena los parámetros de despliegue según se te indique
1. Selecciona el tipo de pago, las especificaciones de la instancia ECS (es decir, el servidor en la nube), el tipo de disco del sistema y la contraseña de la instancia según tus necesidades.
   ![computenest](../../../assets/aliyun-computenest-en-1.png)
1. Selecciona la zona de disponibilidad en la que se despliega la instancia ECS y elige la VPC (red privada) y el ID del conmutador donde se encuentra la instancia ECS. Si tu cuenta no tiene VPC ni conmutadores disponibles, puedes ir directamente a la consola del producto correspondiente de Alibaba Cloud para crearlos haciendo clic en «Create VPC» y «Create vSwitch» en la consola de Compute Nest. Haz clic en Siguiente: confirmar pedido.
   ![computenest](../../../assets/aliyun-computenest-en-2.png)
1. Después de confirmar los parámetros de despliegue y revisar el precio estimado, haz clic en Create Now.
1. Haz clic en la pestaña «Service Instance» de la izquierda para entrar en la página de la lista de instancias de servicio y consultar el progreso del despliegue de la instancia.
   ![computenest](../../../assets/aliyun-computenest-en-3.png)
1. Haz clic en el ID de la instancia para entrar en la interfaz de detalles y haz clic en «Experience Ip Address» para probar el servicio Waline.
   ![computenest](../../../assets/aliyun-computenest-en-4.png)
