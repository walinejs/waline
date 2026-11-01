---
title: Configuration du serveur
icon: config
---

Les options suivantes doivent être configurées dans le fichier d'entrée du serveur `index.js`.

::: warning

Si vous utilisez le modèle, notez que vous devez enregistrer vous-même ces configurations, car elles seront écrasées lorsque vous récupérerez le dernier modèle officiel.

Nous vous recommandons de créer un dépôt à partir du modèle officiel et d'y effectuer vos modifications.

:::

## Options de base

### plugins

- Type : `plugin[]`

Voir le [système de plugins](./plugin.md) pour plus de détails

### secureDomains

- Type : `string | RegExp | string[] | RegExp[]`

Configuration des domaines sécurisés. Les requêtes provenant d'un autre domaine reçoivent un code d'état 403. Les types String, RegExp et Array sont pris en charge. Ne pas définir cette configuration signifie que tous les domaines référents sont autorisés.

::: details Exemple

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- Pour faciliter le développement local, `localhost` et `127.0.0.1` sont ajoutés par défaut à la liste des noms de domaine sécurisés.
- La variable d'environnement `SECURE_DOMAINS` ne fonctionne pas lorsque cette option est définie.

:::

### forbiddenWords

- Type : `string[]`

Si un commentaire correspond à un mot interdit, il est marqué comme spam.

::: details Exemple

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Type : `string[]`

Si l'IP d'un commentaire correspond à cette liste, le code d'état 403 est renvoyé.

::: details Exemple

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Type : `string`

Personnalisation de l'objet de l'e-mail de réponse aux commentaires, équivalent à la variable d'environnement `MAIL_SUBJECT`.

### mailTemplate

- Type : `string`

Personnalisation du contenu de l'e-mail de réponse aux commentaires, équivalent à la variable d'environnement `MAIL_TEMPLATE`.

### mailSubjectAdmin

- Type : `string`

Personnalisation de l'objet de l'e-mail de notification de nouveau commentaire, équivalent à la variable d'environnement `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

- Type : `string`

Personnalisation du contenu de l'e-mail de notification de nouveau commentaire, équivalent à la variable d'environnement `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

- Type : `string`

Modèle de notification de commentaire QQ, équivalent à la variable d'environnement `QQ_TEMPLATE`.

### TGTemplate

- Type : `string`

Modèle de notification de commentaire Telegram, équivalent à la variable d'environnement `TG_TEMPLATE`.

### model

- Type : `class`

Pour plus de détails, consultez [Personnaliser le service de base de données](../../cookbook/customize/database.md).

### encryptPassword

- Type : `function`

Consultez [Personnaliser le système d'utilisateurs](../../cookbook/customize/userdb.md) pour plus de détails.

### locales

- Type : `Record<string, Record<string, string>>`

Consultez [Personnaliser les locales](../../cookbook/customize/locale.md).

## Hooks de commentaires

Outre la configuration par variables d'environnement, Waline fournit également des hooks personnalisés pour faciliter le traitement de besoins spécifiques. Ils se configurent simplement dans le fichier d'entrée du serveur `index.js`.

### preSave(comment)

Waline fournit des hooks personnalisés permettant aux utilisateurs d'adapter le comportement du serveur Waline à leurs propres besoins.

::: details Exemple

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSpam = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

:::

### postSave(comment, pComment)

Action effectuée après la publication du commentaire.

Lors de l'exécution de la méthode, les données du commentaire sont transmises comme premier paramètre, et s'il s'agit d'une réponse à un commentaire, le commentaire parent est transmis comme second paramètre.

::: details Exemple

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`,
    });
  },
});
```

:::

### preUpdate(comment)

Action effectuée avant la mise à jour du contenu d'un commentaire dans le panneau d'administration. Si la méthode renvoie du contenu, l'interface renvoie directement la réponse sans mettre à jour les données du commentaire.

::: details Exemple

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

:::

### postUpdate(comment)

Action effectuée après la mise à jour du contenu d'un commentaire dans le panneau d'administration. Les données du commentaire sont transmises lors de l'exécution de la méthode.

::: details Exemple

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

:::

### preDelete(commentId)

Action effectuée avant la suppression d'un commentaire. Lors de l'exécution de la méthode, l'identifiant du commentaire concerné est transmis. Si la méthode renvoie du contenu, l'interface renvoie directement la réponse sans mettre à jour les données du commentaire.

::: details Exemple

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

:::

### postDelete(commentId)

Action effectuée après la suppression d'un commentaire ; l'identifiant du commentaire est transmis comme unique paramètre.

::: details Exemple

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```

:::
