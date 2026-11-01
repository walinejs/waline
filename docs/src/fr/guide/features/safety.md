---
title: Sécurité
icon: safe
order: -10
---

La sécurité du système de commentaires Waline est notre priorité absolue. Nous présentons ici la sécurité de Waline.

<!-- more -->

## Sécurité des commentaires

### Protection contre les attaques XSS

Waline utilise [DOMPurify](https://github.com/cure53/DOMPurify) pour filtrer chaque commentaire saisi côté serveur, afin de prévenir les attaques XSS potentielles. Cela signifie que vous ne pouvez pas utiliser `<iframe>` ni aucune forme de script.

### Prévention du pistage des liens

Tous les liens reçoivent automatiquement `rel="noreferrer noopener"` et s'ouvrent dans une nouvelle fenêtre avec `target="_blank"`.

### Prévention de l'insertion de contenu malveillant

- Pour empêcher les utilisateurs de créer des formulaires soumettables dans la zone de commentaires afin de piéger d'autres visiteurs, vous ne pouvez pas utiliser `<form>` ni `<input>`

- Pour empêcher les utilisateurs de modifier le style des pages du site, ou leur propre style de commentaire, afin d'y insérer des publicités indésirables, la balise `<style>` et l'attribut `style` des éléments ne sont pas disponibles.

- Pour empêcher les utilisateurs d'abuser de la lecture automatique des médias, vous ne pouvez pas utiliser l'attribut `autoplay`.

### Prévention de l'usurpation

Waline prend en charge un système de comptes : vous pouvez donc imposer aux utilisateurs de s'inscrire et de se connecter avec un compte. Les visiteurs ne peuvent ainsi pas se faire passer pour d'autres personnes dans leurs commentaires.

Pour activer cette fonctionnalité, vous devez imposer la connexion côté client et côté serveur. Voir [`login`](../../reference/client/props.md#login) et [`LOGIN`](../../reference/server/env.md#general) pour plus de détails.

## Sécurité du site

### Limitation de fréquence

Pour éviter l'envoi massif de commentaires, Waline limite les commentaires par IP. Par défaut, une même IP ne peut envoyer qu'un seul commentaire par minute. Vous pouvez modifier cette limite dans [Référence serveur → Variables d'environnement](../../reference/server/env.md#securite).

### Prévention du flood

Waline analyse les commentaires existants lors de la saisie : s'il détecte un commentaire trop similaire à un commentaire existant, il rejette le commentaire concerné. Cela permet de limiter le flood dans une certaine mesure.

### Modération des commentaires

Lorsque votre site subit une attaque malveillante, pendant une période sensible ou lorsque vous êtes occupé, vous pouvez activer la modération des commentaires. Pour plus de détails, voir [Référence serveur → Variables d'environnement](../../reference/server/env.md#securite) .

Lorsque la modération des commentaires est activée, tous les nouveaux commentaires sont masqués par défaut. Vous pouvez consulter et modérer les commentaires dans le panneau d'administration de Waline ou dans la zone de commentaires de la page concernée. Seuls les commentaires que vous avez approuvés sont affichés.

## Sécurité des données

Waline disposant d'un côté serveur, personne ne peut altérer les données des commentaires ni les pages vues.

Par ailleurs, vous pouvez définir les variables `DISABLE_USERAGENT` et `DISABLE_REGION` côté serveur pour empêcher quiconque de consulter l'UA et la localisation géographique des commentaires des utilisateurs.
