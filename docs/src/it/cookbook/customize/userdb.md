---
title: Personalizza il sistema utenti
icon: users
order: -1
---

Sebbene Waline offra un servizio di commenti basato sull'archiviazione di un sistema utenti, questo sistema è quello interno di Waline. Molti siti di terze parti hanno un proprio sistema utenti, quindi alcuni utenti vorrebbero integrare il proprio sistema utenti in Waline.

Possiamo usare il [servizio database personalizzato](./database.md) per ottenere questo risultato: in sostanza si tratta di mappare la tabella sottostante.

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

Con la configurazione qui sopra abbiamo isolato la lettura della tabella utenti di Waline. Ora dobbiamo mappare i campi dei parametri in ingresso e in uscita: i parametri in ingresso mappano i campi sui campi della tabella del sistema di terze parti, mentre i parametri in uscita mappano i campi della tabella di terze parti sui campi di Waline.

Se hai più familiarità con TypeScript, puoi fare riferimento alle definizioni di tipo qui sotto.

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

Quanto sopra garantisce solo il corretto funzionamento delle query sul database; però, a causa dei diversi metodi di cifratura delle password, il metodo di cifratura interno di Waline non può coincidere con quello usato dal sito di terze parti. In questo caso devi personalizzare i metodi di cifratura e verifica della password.

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

Grazie a queste due possibilità di estensione, Waline può usare il sistema utenti del sito di terze parti.
