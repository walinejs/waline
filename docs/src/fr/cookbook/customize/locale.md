---
title: Personnaliser la locale
icon: i18n
---

Ce guide pratique vous explique comment personnaliser le multilingue et les textes affichés de Waline.

<!-- more -->

## Personnaliser la langue et les textes du client

`@waline/client` fournit l'option `locale`, grâce à laquelle vous pouvez personnaliser plusieurs langues et les textes affichés.

Par défaut, il utilise les textes multilingues intégrés et revient à `en-US` (anglais américain) si la langue n'est pas prise en charge.

Vous pouvez transmettre une configuration multilingue complète à l'option `locale` pour ajouter la prise en charge d'une langue, ou définir certains de ces textes pour remplacer les textes d'interface existants.

### Options de locale

- Liées aux niveaux :
  - `level${number}` : libellé du numéro de niveau

  ::: tip

  Par exemple, vous pouvez personnaliser les libellés de 6 niveaux comme ceci :

  ```ts
  Waline.init({
    locale: {
      level0: '炼体',
      level1: '炼气',
      level2: '筑基',
      level3: '金丹',
      level4: '元婴',
      level5: '化神',
    },
  });
  ```

  :::

- Liées aux réactions :
  - `reactionTitle` : titre de la réaction
  - `reaction0` : texte de la réaction 1
  - `reaction1` : texte de la réaction 2
  - `reaction2` : texte de la réaction 3
  - `reaction3` : texte de la réaction 4
  - `reaction4` : texte de la réaction 5
  - `reaction5` : texte de la réaction 6
  - `reaction6` : texte de la réaction 7
  - `reaction7` : texte de la réaction 8
  - `reaction8` : texte de la réaction 9

- Liées à l'interface :
  - `nick` : pseudo
  - `mail` : e-mail
  - `link` : lien
  - `placeholder` : texte par défaut de la zone de commentaire
  - `sofa` : texte affiché lorsque la zone de commentaires est vide
  - `submit` : texte du bouton d'envoi
  - `comment` : texte du bouton de commentaire
  - `refresh` : texte du bouton d'actualisation
  - `more` : texte du bouton de chargement supplémentaire
  - `uploading` : texte affiché pendant le téléversement
  - `login` : texte du bouton de connexion
  - `admin` : libellé de l'administrateur
  - `sticky` : texte de l'épinglage
  - `word` : mot
  - `anonymous` : nom par défaut de l'utilisateur anonyme
  - `optional` : texte indiquant qu'une option est facultative
  - `gifSearchPlaceholder` : texte indicatif de recherche d'emoji
  - `oldest` : commentaire le plus ancien
  - `latest` : commentaire le plus récent
  - `hottest` : commentaire le plus populaire

  ::: info

  Les textes ci-dessus sont affichés dans la page.

  :::

- Liées aux messages d'avertissement :
  - `nickError` : message d'erreur indiquant que le pseudo ne respecte pas les conditions
  - `mailError` : message d'erreur indiquant que l'adresse e-mail ne respecte pas les conditions
  - `wordHint` : message d'erreur sur le nombre de mots du commentaire, où `$0`, `$1` et `$2` sont automatiquement remplacés par la limite inférieure autorisée, la limite supérieure autorisée et le nombre de mots actuel.

- Liées à la date du commentaire :
  - `seconds` : il y a quelques secondes
  - `minutes` : il y a quelques minutes
  - `hours` : il y a quelques heures
  - `days` : il y a quelques jours
  - `now` : à l'instant

- Liées à la gestion :
  - `approved` : bouton qui marque le commentaire comme approuvé
  - `waiting` : bouton qui marque le commentaire comme en attente de modération
  - `spam` : bouton qui marque les commentaires comme indésirables
  - `unsticky` : bouton qui retire l'épinglage du commentaire

- Liées à l'accessibilité :
  - `like` : libellé du bouton « j'aime »
  - `cancelLike` : libellé du bouton d'annulation du « j'aime »
  - `reply` : libellé du bouton de réponse
  - `cancelReply` : libellé du bouton d'annulation de la réponse
  - `preview` : libellé du bouton d'aperçu
  - `emoji` : libellé du bouton emoji
  - `gif` : libellé du bouton GIF
  - `uploadImage` : libellé du bouton de téléversement d'image
  - `profile` : titre du lien vers la page de profil
  - `logout` : libellé du bouton de déconnexion

  ::: info

  Ces textes servent uniquement à l'accessibilité et ne sont pas affichés sur la page.

  :::

### Exemple

```js
// en default
const locale = {
  nick: 'NickName',
  nickError: 'NickName cannot be less than 3 bytes.',
  mail: 'E-Mail',
  mailError: 'Please confirm your email address.',
  link: 'Website',
  optional: 'Optional',
  placeholder: 'Comment here...',
  sofa: 'No comment yet.',
  submit: 'Submit',
  like: 'Like',
  cancelLike: 'Cancel like',
  reply: 'Reply',
  cancelReply: 'Cancel reply',
  comment: 'Comments',
  refresh: 'Refresh',
  more: 'Load More...',
  preview: 'Preview',
  emoji: 'Emoji',
  uploadImage: 'Upload Image',
  seconds: 'seconds ago',
  minutes: 'minutes ago',
  hours: 'hours ago',
  days: 'days ago',
  now: 'just now',
  uploading: 'Uploading',
  login: 'Login',
  logout: 'logout',
  admin: 'Admin',
  sticky: 'Sticky',
  word: 'Words',
  wordHint: 'Please input comments between $0 and $1 words!\n Current word number: $2',
  anonymous: 'Anonymous',
  level0: 'Dwarves',
  level1: 'Hobbits',
  level2: 'Ents',
  level3: 'Wizards',
  level4: 'Elves',
  level5: 'Maiar',
  gif: 'GIF',
  gifSearchPlaceholder: 'Search GIF',
  profile: 'Profile',
  approved: 'Approved',
  waiting: 'Waiting',
  spam: 'Spam',
  unsticky: 'Unsticky',
  oldest: 'Oldest',
  latest: 'Latest',
  hottest: 'Hottest',
  reactionTitle: 'What do you think?',
};

Waline.init({
  el: '#waline',
  path: location.pathname,
  serverURL: 'YOUR_SERVER_URL',
  // ...
  locale,
});
```

## Personnaliser les textes de réponse du serveur

`@waline/vercel` fournit une option `locales` qui vous permet de personnaliser les textes de réponse.

Par défaut, il utilise les textes multilingues intégrés et revient aux textes en `en-US` si la langue n'est pas prise en charge.

Vous pouvez transmettre une configuration multilingue complète à l'option `locales` pour ajouter la prise en charge d'une langue, ou en définir certains pour remplacer les textes existants.

::: tip

Tous les textes personnalisés sont finalement rendus par le moteur de modèle nunjucks, qui permet d'écrire des expressions logiques relativement complexes. Par exemple :

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### Options de locale

- Liées aux messages d'avertissement :
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- Liées aux notifications par e-mail d'inscription et de connexion :
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- Liées aux notifications par e-mail de commentaire :
  - `MAIL_SUBJECT` : `Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE` : `<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN` : `New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN` : `<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  locales: {
    'en-US': {
      USER_EXIST: 'Warning! User exist!',
    },
  },
});
```
