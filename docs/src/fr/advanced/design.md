---
title: Objectif de conception
icon: goal
order: 2
---

[Valine](https://valine.js.org) est un système de commentaires élégant, simple à utiliser et rapide à déployer. Dès ma première utilisation, j'ai été séduit par son style soigné et son fonctionnement serverless. Il ne nécessite aucun service backend : le frontend dialogue directement avec le service de stockage LeanCloud, ce qui est vraiment astucieux ! Mais plus je l'ai étudié, plus j'en ai découvert les défauts.

## Les problèmes de Valine

### Un projet non open source

Depuis la version `1.4.0`, l'auteur ne pousse que les fichiers compilés dans le dépôt GitHub, et le code source n'est plus mis à jour. Peut-être l'auteur a-t-il été déçu par l'open source. Pour des utilisateurs comme moi qui souhaitent ajouter ou modifier des fonctionnalités, ce problème est gênant.

### XSS

Depuis les toutes premières versions, des utilisateurs signalent des problèmes XSS dans Valine, et la communauté emploie diverses méthodes pour les corriger : ajout de codes de vérification, filtrage XSS côté frontend, etc. L'auteur a toutefois fini par comprendre que toute vérification côté frontend ne peut arrêter que les gens honnêtes, et a donc supprimé les restrictions telles que les codes de vérification.

Aujourd'hui, lorsque le frontend publie un commentaire, le Markdown est converti en HTML, puis une fonction de filtrage XSS est exécutée côté frontend avant l'envoi à LeanCloud. Une fois les données récupérées depuis LeanCloud, le HTML est inséré directement dans le DOM. De toute évidence, ce processus est problématique : tant que le HTML est envoyé directement puis affiché tel quel après récupération, le XSS ne peut pas être éradiqué à la racine.

::: note Solution fondamentale

Pour les attaques XSS stockées, nous pouvons recourir à l'échappement des codes HTML pour les résoudre définitivement. Comme dans le vieux BBCode, seul le contenu Markdown est envoyé à la base de données. Le frontend lit le contenu, encode tout le HTML, puis l'affiche après conversion du Markdown.

```js
function encodeForHTML(str) {
  return ('' + str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

Valine étant un système serverless, les attaquants peuvent accéder directement à l'étape de stockage. Toutes les précautions prises avant le stockage des données sont vaines ; le traitement ne peut se faire qu'au moment de l'affichage. Comme aucun HTML ne peut être interprété après échappement, nous garantissons que le HTML converti n'a aucune chance d'être inséré.

Valine n'étant plus open source, il n'est plus possible d'ouvrir des pull requests.

:::

Comme la méthode ci-dessus enfermerait complètement les utilisateurs dans le périmètre du Markdown, Waline ajoute `DOMPurify` côté client depuis la version `0.15.0` pour prévenir le XSS. Outre la désinfection XSS classique :

- `<form>` et `<input>` sont désactivés
- l'injection de style est désactivée
- la lecture automatique des médias est désactivée
- tous les liens externes sont traités et ouverts dans une nouvelle fenêtre avec une valeur de rel égale à `noopener noreferrer`.

### Fuite de données personnelles

Outre l'accès direct au stockage, l'attaquant peut aussi lire n'importe quelle donnée directement. Si un champ de la base de données est lisible par tout le monde, son contenu est totalement transparent pour l'attaquant.

Dans les données de commentaire, les deux champs IP et e-mail contiennent des données sensibles de l'utilisateur. M. Deng a écrit un article pour dénoncer spécifiquement ce problème : [Please stop using the Valine.js comment system immediately unless it fixes the user privacy leak](https://ttys3.net/post/hugo/please-stop-using-valine-js-comment-system-until-it-fixed-the-privacy-leaking-problem/). Même lorsque la communauté [JueJin](https://juejin.cn) utilisait LeanCloud il y a quelques années, le problème de sécurité lié à la [divulgation du numéro de téléphone portable des utilisateurs](https://m.weibo.cn/detail/4568007327622344?cid=4568044392682999) avait été révélé.

Pour contourner ce problème, l'auteur de Valine a ajouté la configuration `recordIP` permettant de choisir d'enregistrer ou non l'IP de l'utilisateur. Faute de serveur, la seule solution est de ne pas stocker la valeur.

Cette option pose néanmoins un problème : l'enregistrement ou non de l'IP dépend de la configuration du propriétaire du site, alors que les personnes qui commentent n'ont aucun droit de gestion sur leur propre vie privée.

La fuite des adresses e-mail est un autre problème majeur de confidentialité. Il est tout à fait possible de calculer et d'envoyer le md5 de l'e-mail de l'utilisateur côté frontend pour obtenir son avatar Gravatar. Mais s'il faut envoyer une notification par e-mail lorsqu'un commentaire reçoit une réponse, il devient inévitable de stocker la valeur d'origine de l'adresse e-mail. Ce problème pourrait en théorie être résolu par le chiffrement RSA : la clé privée serait conservée dans une variable d'environnement de LeanCloud, le client enverrait à la fois le md5 de l'e-mail et l'e-mail chiffré par la clé publique ; lorsqu'une notification doit être envoyée, la fonction cloud lirait la clé privée dans l'environnement puis déchiffrerait l'adresse. Toutefois, compte tenu de la taille et des performances de la bibliothèque de chiffrement RSA côté frontend, cette solution n'est pas réaliste. Ajouter une couche serveur pour filtrer les informations sensibles côté serveur est certainement une meilleure pratique.

### Falsification des statistiques de lecture

Valine 1.2.0 ajoute une fonction de statistiques de lecture : l'utilisateur visite une page et le nombre de visites est enregistré selon l'URL dans la table de compteurs en arrière-plan. Les données devant être mises à jour à chaque visite, les permissions doivent autoriser l'écriture afin de permettre les mises à jour ultérieures des champs. Cela crée un problème : les données peuvent en réalité être modifiées pour n'importe quelle valeur. Si cela vous intéresse, ouvrez le site officiel <https://valine.js.org/visitor.html>, accédez à la console, saisissez le code suivant et essayez. N'oubliez pas de remettre le nombre d'origine après l'essai~

```js
const counter = new AV.Query('Counter');
const resp = await counter.equalTo('url', '/visitor.html').find();
resp[0].set('time', -100000).save();
location.reload();
```

Par chance, la valeur du champ `time` est de type Number, ce qui empêche d'y insérer d'autres valeurs. Si le champ `time` était de type chaîne, il pourrait s'agir d'une faille XSS. Une solution possible consiste à abandonner le stockage cumulatif au profit de l'enregistrement d'un accès en lecture seule pour chaque visite, puis à utiliser la méthode `count()` pour les statistiques à la lecture. Toutes les données sont ainsi en lecture seule, ce qui résout le problème de falsification. Cette solution a toutefois un inconvénient : lorsque le volume de données devient important, elle exerce une certaine pression sur les requêtes.

Si l'on souhaite conserver les données d'origine, seul l'ajout d'une couche serveur permet d'isoler les permissions de modification.

## La naissance de Waline

Pour les raisons exposées ci-dessus, Waline est né. L'objectif initial de Waline était simplement d'ajouter un backend à Valine, mais comme Valine n'est pas open source, il a fallu l'implémenter côté frontend. Bien entendu, de nombreux codes et logiques du frontend s'inspirent de Valine afin de rester compatibles avec sa configuration. Même le nom du projet en dérive, pour que chacun comprenne qu'il s'agit d'un dérivé de Valine.

Outre la résolution des problèmes de sécurité mentionnés ci-dessus, l'ajout du côté serveur a permis de mettre en œuvre de nombreuses fonctionnalités auparavant impossibles sans serveur, notamment les notifications par e-mail et le filtrage des commentaires indésirables.
