---
title: 사용자 정의 사용자 시스템
icon: users
order: -1
---

Waline은 사용자 시스템 저장소 기반의 댓글 서비스를 제공하지만, 이 사용자 시스템은 Waline 자체의 것입니다. 많은 서드파티 웹사이트는 자체 사용자 시스템을 가지고 있으므로, 일부 사용자는 자신의 사용자 시스템을 Waline에 통합하고 싶어합니다.

[사용자 정의 데이터베이스 서비스](./database.md)를 사용하여 이 기능을 구현할 수 있으며, 본질적으로 하위 테이블의 매핑을 수행하는 것입니다.

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

위의 구성을 통해 Waline 사용자 테이블의 읽기를 분리했습니다. 다음으로, 입력 및 출력 매개변수에 대한 필드 매핑을 수행해야 합니다. 입력 매개변수는 필드를 서드파티 시스템의 테이블 필드로 다시 매핑하고, 출력 매개변수는 서드파티 시스템의 테이블 필드를 Waline 필드로 다시 매핑합니다.

TypeScript에 더 익숙하다면, 아래의 타입 정의를 참조할 수 있습니다.

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

위의 방법으로 데이터베이스 쿼리에 문제가 없는지 확인할 수 있지만, 비밀번호의 암호화 방식이 다르기 때문에 Waline 내부의 암호화 방식이 서드파티 웹사이트에서 사용하는 암호화 방식과 일치하지 않을 수 있습니다. 이러한 상황에서는 비밀번호 암호화 및 검증 방법을 사용자 정의해야 합니다.

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

위의 두 가지 확장 기능을 기반으로, Waline이 서드파티 웹사이트의 사용자 시스템을 사용할 수 있도록 구현할 수 있습니다.
