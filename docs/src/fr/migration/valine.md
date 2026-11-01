---
title: Migration depuis Valine
icon: valine
---

1. Déployez le backend en suivant la section [Déploiement du serveur](../guide/get-started/README.md#deploiement-du-serveur) du guide _Commencer_.

2. Modifiez les scripts frontend en suivant la section [HTML](../guide/get-started/README.md#importer-dans-le-html) du guide _Commencer_.

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
       el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

   ::: tip Configuration

   Waline V2 a supprimé la prise en charge de Valine et est passé à une configuration plus aboutie. Voici un récapitulatif de la migration de certaines options :

   - `placeholder` : utilisez `locale.placeholder`
   - `highlight` : utilisez `highlighter`
   - `avatarForce`, `avatar` : utilisez la variable d'environnement `AVATAR_PROXY` du serveur
   - `recordIP` : l'IP de l'utilisateur n'est plus affichée, et la variable d'environnement `DISABLE_USERAGENT` est fournie côté serveur
   - `requiredFields` : renommée en `requiredMeta`
   - `langMode` : renommée en `locale`
   - `emojiCDN`, `emojiMap` : utilisez les options `emoji`, plus puissantes

   Pour la configuration de Waline, veuillez consulter la [configuration du client](../reference/client/api.md). Vous pouvez également consulter le [guide de migration vers Waline Client V2](./v2.md) pour connaître les options incompatibles avec Valine.

   :::

3. Migrer les données

Dans l'interface d'administration de LeanCloud, sélectionnez <kbd>Import/Export</kbd> > <kbd>Limit to certain classes</kbd> > <kbd>Comment</kbd> > <kbd>Export</kbd> ; vous recevrez ensuite une notification par e-mail.

Collez le contenu du fichier exporté dans la zone de texte ci-dessous, puis cliquez sur le bouton de conversion pour obtenir le fichier à importer.

<MigrationTool />

::: tip

Après avoir obtenu le fichier exporté via l'outil ci-dessus, vous pouvez l'importer dans la console du service de stockage correspondant.

:::

## Les atouts de Waline

Comparé à Valine, Waline présente les atouts suivants :

### Plus de fonctionnalités

1. Markdown prend en charge davantage de syntaxes, notamment l'exposant et l'indice, les emojis, les tableaux, le texte barré, les formules mathématiques, les balises HTML, les notes de bas de page, etc.
1. La fonction de téléversement d'images, qui permet de personnaliser le service fournisseur d'images ou d'intégrer directement les images.
1. Un tout nouveau système d'étiquettes qui attribue des niveaux aux utilisateurs selon la fréquence de leurs interactions et permet aux utilisateurs inscrits de définir des étiquettes personnalisées.
1. Des préréglages d'emojis et une prise en charge des onglets, permettant plusieurs jeux d'emojis tout en laissant chacun publier et utiliser des préréglages.
1. Un tout nouveau système de réaction qui permet aux visiteurs d'exprimer leur avis sur l'article.
1. Les « j'aime » sur les commentaires, pour soutenir le commentaire que vous appréciez.
1. Les pages vues, plus précises et protégées contre la falsification.
1. La recherche d'emojis. Un service personnalisable qui permet aux utilisateurs de rechercher et d'insérer librement des émoticônes.
1. Les utilisateurs inscrits peuvent modifier et supprimer les commentaires qu'ils ont publiés.

### Plus sûr

1. Aucune fuite de vie privée : les adresses e-mail, les adresses IP et autres informations sensibles des utilisateurs ne sont pas exposées, et vous pouvez choisir de masquer la localisation géographique, le navigateur et le système d'exploitation des utilisateurs côté serveur.
1. Un système anti-spam complet.
   - Tous les commentaires peuvent être authentifiés par des services anti-spam et une logique de validation supplémentaire est prise en charge.
   - Vous pouvez définir une limite de fréquence de commentaires pour une IP ou un utilisateur donné, et Waline détecte automatiquement les commentaires en double.
1. Une fonction de modération des commentaires : en période sensible ou lorsque le site est attaqué, vous pouvez activer la modération, examiner et approuver manuellement l'affichage des commentaires, et éviter que des commentaires malveillants entraînent la fermeture du site.
1. La prise en charge des comptes utilisateurs. Outre la création d'un compte, Waline prend en charge les comptes de réseaux sociaux : l'avatar et le pseudonyme sont synchronisés rapidement avec une étiquette d'autorisation pour éviter l'usurpation d'identité.

### Plus pratique

1. Plusieurs moyens (QQ, WeChat, DingTalk, e-mail, etc.) pour notifier le blogueur des nouveaux commentaires
1. Un service d'administration puissant : vous pouvez consulter tous les utilisateurs et commentaires, effectuer les opérations correspondantes, et définir des étiquettes personnalisées et des administrateurs pour les utilisateurs
1. Une administration côté frontend : les administrateurs peuvent examiner, modifier ou supprimer directement les commentaires via le composant de commentaires Waline.

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
