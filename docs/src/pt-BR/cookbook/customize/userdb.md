---
title: Sistema de usuários personalizado
icon: users
order: -1
---

Embora o Waline forneça um serviço de comentários baseado no armazenamento de um sistema de usuários, esse sistema é o próprio sistema do Waline. Muitos sites de terceiros têm seus próprios sistemas de usuários, e alguns usuários com necessidades específicas querem integrar o sistema deles ao Waline.

Podemos usar o [serviço de banco de dados personalizado](./database.md) para implementar essa funcionalidade; a essência é fazer o mapeamento da tabela subjacente.

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

Com a configuração acima, isolamos a leitura da tabela de usuários do Waline. Em seguida, precisamos fazer o mapeamento de campos dos parâmetros de entrada e de saída. Os parâmetros de entrada mapeiam os campos de volta para os campos da tabela no sistema de terceiros, e os parâmetros de saída mapeiam os campos da tabela do sistema de terceiros de volta para os campos do Waline.

Se você tiver mais familiaridade com TypeScript, consulte a definição de tipos abaixo.

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

O acima garante apenas que não haja problemas na consulta ao banco de dados, mas, devido aos diferentes métodos de criptografia de senha, o método de criptografia interno do Waline não pode ser o mesmo usado no site de terceiros. Nesse caso, você precisa personalizar o método de criptografia e verificação da senha.

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

Com base nessas duas capacidades de expansão, podemos fazer com que o Waline use o sistema de usuários do site de terceiros.
