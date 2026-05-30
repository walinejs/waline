---
title: Sistem Pengguna Kustom
icon: users
order: -1
---

Meskipun Waline menyediakan layanan komentar berbasis penyimpanan sistem pengguna, sistem pengguna ini adalah milik Waline sendiri. Banyak situs web pihak ketiga memiliki sistem pengguna mereka sendiri, sehingga beberapa pengguna ingin mengintegrasikan sistem pengguna mereka sendiri ke dalam Waline.

Kita dapat menggunakan [layanan database kustom](./database.md) untuk mewujudkan fungsi ini, intinya adalah melakukan pemetaan tabel dasar.

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

Melalui konfigurasi di atas, kita telah mengisolasi pembacaan tabel pengguna Waline. Selanjutnya, kita perlu melakukan pemetaan field untuk parameter input dan output. Parameter input memetakan field kembali ke field tabel dalam sistem pihak ketiga, dan parameter output memetakan field tabel dalam sistem pihak ketiga kembali ke field Waline.

Jika Anda lebih familiar dengan TypeScript, Anda dapat merujuk ke definisi tipe di bawah ini.

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

Di atas hanya dapat memastikan tidak ada masalah dengan kueri database, tetapi terbatas oleh metode enkripsi password yang berbeda, metode enkripsi di dalam Waline tidak dapat konsisten dengan metode enkripsi yang digunakan di situs web pihak ketiga. Untuk situasi ini, Anda perlu mengkustomisasi metode enkripsi dan verifikasi password.

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

Berdasarkan dua kemampuan perluasan di atas, kita dapat mewujudkan bahwa Waline dapat menggunakan sistem pengguna situs web pihak ketiga.
