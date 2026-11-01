---
title: Système d'utilisateurs personnalisé
icon: users
order: -1
---

Bien que Waline fournisse un service de commentaires basé sur le stockage du système d'utilisateurs, ce système d'utilisateurs est propre à Waline. De nombreux sites tiers disposent de leur propre système d'utilisateurs ; certains utilisateurs souhaitent donc intégrer leur système d'utilisateurs dans Waline.

Nous pouvons utiliser le [service de base de données personnalisé](./database.md) pour réaliser cette fonctionnalité ; l'essentiel est de faire le mapping de la table sous-jacente.

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

Grâce à la configuration ci-dessus, nous avons isolé la lecture de la table des utilisateurs de Waline. Ensuite, nous devons effectuer le mapping des champs pour les paramètres d'entrée et de sortie. Les paramètres d'entrée ramènent les champs vers les champs de table du système tiers, et les paramètres de sortie ramènent les champs de table du système tiers vers les champs de Waline.

Si vous êtes plus familier avec TypeScript, vous pouvez vous référer à la définition de type ci-dessous.

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

Ce qui précède ne garantit que l'absence de problème pour les requêtes sur la base de données, mais en raison des différentes méthodes de chiffrement du mot de passe, la méthode de chiffrement interne de Waline ne peut pas être cohérente avec celle utilisée par le site tiers. Dans ce cas, vous devez personnaliser la méthode de chiffrement et de vérification du mot de passe.

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

Grâce aux deux capacités d'extension ci-dessus, nous pouvons permettre à Waline d'utiliser le système d'utilisateurs du site tiers.
