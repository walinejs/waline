---
title: カスタムユーザーシステム
icon: users
order: -1
---

Waline はユーザーシステムのストレージに基づいたコメントサービスを提供していますが、このユーザーシステムは Waline 独自のものです。多くのサードパーティのウェブサイトは独自のユーザーシステムを持っているため、一部のユーザーは自分のユーザーシステムを Waline に統合したいと考えています。

[カスタムデータベースサービス](./database.md) を使用してこの機能を実現できます。本質的には、基盤となるテーブルのマッピングを行うことです。

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

上記の設定により、Waline のユーザーテーブルの読み取りを分離しました。次に、入力パラメーターと出力パラメーターのフィールドマッピングを行う必要があります。入力パラメーターはフィールドをサードパーティシステムのテーブルフィールドにマッピングし、出力パラメーターはサードパーティシステムのテーブルフィールドを Waline フィールドにマッピングします。

TypeScript に詳しい場合は、以下の型定義を参考にしてください。

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

上記はデータベースのクエリに問題がないことを保証するだけですが、パスワードの暗号化方式の違いにより、Waline 内部の暗号化方式とサードパーティウェブサイトで使用されている暗号化方式を一致させることができません。この場合、パスワードの暗号化と検証方法をカスタマイズする必要があります。

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

上記の 2 つの拡張機能に基づいて、Waline がサードパーティウェブサイトのユーザーシステムを使用できるように実現できます。
