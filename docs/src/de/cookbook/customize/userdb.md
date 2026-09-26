---
title: Benutzerdefiniertes Benutzersystem
icon: users
order: -1
---

Obwohl Waline einen Kommentardienst basierend auf Benutzersystemspeicherung bereitstellt, ist dieses Benutzersystem Walines eigenes. Viele Drittanbieter-Websites haben ihre eigenen Benutzersysteme, daher möchten einige Nischenbenutzer ihre eigenen Benutzersysteme in Waline integrieren.

Wir können den [benutzerdefinierten Datenbankdienst](./database.md) verwenden, um diese Funktion zu realisieren. Das Wesen besteht darin, die Zuordnung der zugrunde liegenden Tabelle durchzuführen.

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

Durch die obige Konfiguration haben wir das Lesen der Waline-Benutzertabelle isoliert. Als Nächstes müssen wir die Feldzuordnung für die Ein- und Ausgabeparameter durchführen. Die Eingabeparameter ordnen die Felder zurück zu den Tabellenfeldern im Drittsystem, und die Ausgabeparameter ordnen die Tabellenfelder im Drittsystem zurück zu Waline-Feldern.

Wenn Sie mit TypeScript vertrauter sind, können Sie sich auf die folgende Typdefinition beziehen.

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

Das oben Genannte kann nur sicherstellen, dass es kein Problem mit der Abfrage der Datenbank gibt, aber aufgrund der unterschiedlichen Verschlüsselungsmethoden des Passworts kann die Verschlüsselungsmethode innerhalb von Waline nicht mit der auf der Drittanbieter-Website verwendeten Verschlüsselungsmethode übereinstimmen. Für diese Situation müssen Sie die Methode der Passwortverschlüsselung und -überprüfung anpassen.

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

Basierend auf den beiden oben genannten Erweiterungsfähigkeiten können wir realisieren, dass Waline das Benutzersystem der Drittanbieter-Website verwenden kann.
