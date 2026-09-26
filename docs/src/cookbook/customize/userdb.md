---
title: 自定义用户系统
icon: users
order: -1
---

Waline 虽然提供了基于用户系统存储的评论服务，但这套用户系统是 Waline 自己的。而很多第三方网站都有自己的用户系统，于是有一些小众用户有集成自己的用户系统到 Waline 中的诉求。

我们可以利用 [自定义数据库服务](./database.md) 来实现这个功能，本质是做了底层表的映射。

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

通过如上配置，我们就将 Waline 用户表的读取独立了出来。接下来我们要针对入参和出参做好字段映射，入参将字段映射回第三方系统中的表字段，出参则将第三方系统中的表字段再映射回 Waline 的字段即可。

如果你比较熟悉 TypeScript，可以参考下面的类型定义。

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

以上仅能保证数据库的查询没有问题，但受限于密码的加密方式不同，Waline 内部的加密方式并不能和第三方网站中使用的加密方式一致。针对这种情况，你需要自定义密码加密和验证的方法。

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

基于以上两个扩展能力，我们就能实现 Waline 使用第三方网站自己的用户系统了。
