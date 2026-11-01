---
title: Sistema de usuarios personalizado
icon: users
order: -1
---

Aunque Waline ofrece un servicio de comentarios basado en el almacenamiento de su propio sistema de usuarios, ese sistema es propio de Waline. Muchos sitios web de terceros tienen su propio sistema de usuarios, así que algunos usuarios quieren integrar su sistema de usuarios en Waline.

Podemos usar el [servicio de base de datos personalizado](./database.md) para conseguir esta funcionalidad; en esencia, se trata de hacer el mapeo de la tabla subyacente.

```js
// index.js
const Application = require('@waline/vercel');
class UserModel {}

module.exports = Application({
  model(tableName) {
    if (tableName !== 'Users') {
      return;
    }

    return new UserModel();
  },
});
```

Con la configuración anterior hemos aislado la lectura de la tabla de usuarios de Waline. A continuación debemos hacer el mapeo de campos para los parámetros de entrada y de salida. Los parámetros de entrada mapean los campos de vuelta a los campos de la tabla en el sistema de terceros, y los parámetros de salida mapean los campos de la tabla del sistema de terceros de vuelta a los campos de Waline.

Si estás más familiarizado con TypeScript, puedes consultar la definición de tipos de abajo.

```typescript
type strNum = string | number;
type UserFields =
  | 'objectId'
  | 'display_name'
  | 'email'
  | 'password'
  | 'type'
  | 'label'
  | 'url'
  | 'avatar'
  | 'github'
  | 'twitter'
  | 'facebook'
  | 'google'
  | 'weibo'
  | 'qq'
  | '2fa'
  | 'createdAt'
  | 'updatedAt';
type UserData = Record<UserFields, strNum>;
type UsersWhere = Record<UserFields, strNum | ['IN', strNum[]]>;
interface UsersOptions {
  field: string[];
  desc?: UserFields;
  limit?: number;
  offset?: number;
}

interface UsersModel {
  select: (where: UsersWhere, options: UsersOptions) => UserData[];
  add: (user: Partial<UserData>) => UserData;
  update: (user: Partial<UserData>, where: UsersWhere) => UserData;
  delete: (where: UsersWhere) => void;
  count: (where: UsersWhere) => number;
}

function model(modelName): UsersModel | undefined {
  if (modelName !== 'Users') {
    return;
  }

  //...
}
```

Lo anterior solo garantiza que la consulta a la base de datos funcione, pero, debido a los distintos métodos de cifrado de contraseñas, el método de cifrado interno de Waline no puede coincidir con el que usa el sitio web de terceros. Para este caso, necesitas personalizar el método de cifrado y verificación de la contraseña.

```js
// index.js
const Application = require('@waline/vercel');
class UserModel {}

module.exports = Application({
   encryptPassword() {
     return {
       hashPassword(password) {
         return hash;
       }
       checkPassword(password, storeHash) {
         return false;
       }
     }
   }
});
```

Con estas dos capacidades de extensión, podemos hacer que Waline use el sistema de usuarios del sitio web de terceros.
