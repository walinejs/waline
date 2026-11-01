---
title: Собственная система пользователей
icon: users
order: -1
---

Хотя Waline предоставляет сервис комментариев с хранением пользователей, эта система пользователей — собственная система Waline. У многих сторонних сайтов есть свои системы пользователей, поэтому некоторые пользователи хотят интегрировать свою систему в Waline.

Для этого можно использовать [собственный сервис базы данных](./database.md); по сути задача сводится к отображению (маппингу) нижележащей таблицы.

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

Такая конфигурация изолирует чтение таблицы пользователей Waline. Далее нужно сопоставить поля входных и выходных параметров: входные параметры отображают поля Waline на поля таблицы в сторонней системе, а выходные — поля сторонней системы обратно на поля Waline.

Тем, кто хорошо знаком с TypeScript, пригодятся определения типов ниже.

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

Описанного выше достаточно только для корректных запросов к базе данных, но из-за различных способов шифрования пароля шифрование внутри Waline не может совпадать с шифрованием, используемым на стороннем сайте. В этом случае нужно настроить собственные методы шифрования и проверки пароля.

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

Благодаря этим двум возможностям расширения Waline может использовать систему пользователей стороннего сайта.
