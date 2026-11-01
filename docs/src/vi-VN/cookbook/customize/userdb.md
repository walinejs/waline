---
title: Hệ thống người dùng tùy chỉnh
icon: users
order: -1
---

Mặc dù Waline cung cấp dịch vụ bình luận dựa trên lưu trữ của hệ thống người dùng, nhưng hệ thống người dùng này là của riêng Waline. Nhiều trang web bên thứ ba có hệ thống người dùng riêng, nên một số người dùng muốn tích hợp hệ thống người dùng của mình vào Waline.

Chúng ta có thể dùng [dịch vụ cơ sở dữ liệu tùy chỉnh](./database.md) để thực hiện chức năng này; về bản chất, đó là ánh xạ bảng ở tầng dưới.

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

Với cấu hình trên, chúng ta đã tách riêng việc đọc bảng người dùng của Waline. Tiếp theo, cần ánh xạ trường cho các tham số đầu vào và đầu ra. Tham số đầu vào ánh xạ các trường trở lại các trường bảng trong hệ thống bên thứ ba, còn tham số đầu ra ánh xạ các trường bảng của hệ thống bên thứ ba trở lại các trường của Waline.

Nếu bạn quen thuộc hơn với TypeScript, có thể tham khảo định nghĩa kiểu bên dưới.

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

Phần trên chỉ đảm bảo không có vấn đề với truy vấn cơ sở dữ liệu, nhưng do cách mã hóa mật khẩu khác nhau, cách mã hóa bên trong Waline không thể đồng nhất với cách mã hóa mà trang web bên thứ ba sử dụng. Với tình huống này, bạn cần tùy chỉnh cách mã hóa và xác minh mật khẩu.

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

Dựa trên hai khả năng mở rộng ở trên, chúng ta có thể để Waline sử dụng hệ thống người dùng của trang web bên thứ ba.
