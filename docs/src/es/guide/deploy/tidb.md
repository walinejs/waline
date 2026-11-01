---
title: Crear una base de datos en TiDB
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb) es una base de datos NewSQL de código abierto. [TiDB Cloud](https://tidbcloud.com/) es la versión oficial en línea, que ofrece 5GB de almacenamiento gratuito para que todo el mundo lo use. A continuación se explica cómo crear una base de datos de Waline en TiDB Cloud.

## Crear la base de datos

1. Después de iniciar sesión en [TiDB Cloud](https://tidbcloud.com), se creará automáticamente una instancia de TiDB; haz clic directamente en <kbd>cluster0</kbd> para entrar en la instancia

   ![Enter instance](../../../assets/tidb-1.png)

2. Selecciona <kbd>SQL Editor</kbd> en la lista de la izquierda, separa por `;` el contenido de [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) y ejecuta cada sentencia en la interfaz. Para cada sentencia, haz clic en el botón azul <kbd>Run</kbd> de la esquina superior derecha o usa el atajo <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd>
   ![Step1](../../../assets/tidb-2.png)
   ![Step2](../../../assets/tidb-3.png)
   ![Step3](../../../assets/tidb-4.png)
   ![Step4](../../../assets/tidb-5.png)
   ![Step5](../../../assets/tidb-6.png)

¡Hasta aquí ya has creado la base de datos de Waline!

## Obtener la configuración de conexión

Haz clic en el botón <kbd>Overview</kbd> de la izquierda para ir a la página principal y selecciona <kbd>Connect</kbd> en la esquina superior derecha para obtener la información de conexión.

Establece «Connect with» en `General`. Además, haz clic en <kbd>Reset password</kbd> en la línea siguiente para generar una nueva contraseña.

De esta forma, ya tienes la configuración relacionada con la conexión.

![Connection](../../../assets/tidb-7.png)

## Despliegue en Vercel

Crea una cuenta de Vercel, añade un proyecto y despliega el servicio Waline. Después, abre <kbd>Settings</kbd> del proyecto y ve a `Environment Variables`. Haz clic en <kbd>Add Environment Variable</kbd> y añade las siguientes variables: `TIDB_HOST`, `TIDB_PORT`, `TIDB_DB`, `TIDB_USER` y `TIDB_PASSWORD`. Una vez añadidas, vuelve a desplegar el proyecto.

![Configure TiDB connection](../../../assets/tidb-8.png)
