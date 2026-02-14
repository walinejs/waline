---
title: Custom User System
icon: users
order: -1
---

Although Waline provides a comment service based on user system storage, this user system is Waline's own. Many third-party websites have their own user systems, so some niche users want to integrate their own user systems into Waline.

We can use [custom database service](./database.md) to realize this function, the essence is to do the mapping of the underlying table.

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

Through the above configuration, we have isolated the reading of the Waline user table. Next, we need to do field mapping for the input and output parameters. The input parameters map the fields back to the table fields in the third-party system, and the output parameters map the table fields in the third-party system back to Waline fields.

If you are more familiar with TypeScript, you can refer to the type definition below.

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

The above can only ensure that there is no problem with the query of the database, but limited by the different encryption methods of the password, the encryption method inside Waline cannot be consistent with the encryption method used in the third-party website. For this situation, you need to customize the method of password encryption and verification.

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

Based on the above two expansion capabilities, we can realize that Waline can use the user system of the third-party website.
