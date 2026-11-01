---
title: 自訂使用者系統
icon: users
order: -1
---

Waline 雖然提供了基於使用者系統儲存的留言服務，但這套使用者系統是 Waline 自己的。而許多第三方網站都有自己的使用者系統，於是有些小眾使用者有將自己的使用者系統整合到 Waline 中的訴求。

我們可以利用 [自訂資料庫服務](./database.md) 來實現這個功能，本質是做底層資料表的對應。

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

透過如上設定，我們就將 Waline 使用者資料表的讀取獨立了出來。接下來我們要針對入參與出參做好欄位對應，入參將欄位對應回第三方系統中的資料表欄位，出參則將第三方系統中的資料表欄位再對應回 Waline 的欄位即可。

如果你比較熟悉 TypeScript，可以參考下列型別定義。

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

以上僅能保證資料庫的查詢沒有問題，但受限於密碼的加密方式不同，Waline 內部的加密方式並不能和第三方網站中使用的加密方式一致。針對這種情況，你需要自訂密碼加密和驗證的方法。

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

基於以上兩個擴充能力，我們就能實現 Waline 使用第三方網站自己的使用者系統了。
