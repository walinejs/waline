---
title: Migrazione da Valine
icon: valine
---

1. Distribuisci il backend seguendo [Deploy su Vercel](../guide/get-started/README.md#distribuire-il-server) nella sezione _Inizia_.

2. Modifica gli script del frontend seguendo [HTML](../guide/get-started/README.md#importare-in-html) nella sezione _Inizia_.

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

   ::: tip Configurazione

   Waline V2 ha rimosso il supporto a Valine ed è passato a una configurazione migliore. Di seguito un riepilogo della migrazione di alcune opzioni:

   - `placeholder`: usa `locale.placeholder`
   - `highlight`: usa `highlighter`
   - `avatarForce`, `avatar`: usa la variabile d'ambiente `AVATAR_PROXY` del server
   - `recordIP`: non mostra più l'IP dell'utente e sul server fornisce la variabile d'ambiente `DISABLE_USERAGENT`
   - `requiredFields`: è stata rinominata in `requiredMeta`
   - `langMode`: è stata rinominata in `locale`
   - `emojiCDN`, `emojiMap`: usa le più potenti opzioni `emoji`

   Per la configurazione di Waline, consulta [Configurazione del client](../reference/client/api.md). Puoi anche leggere la [guida alla migrazione a Waline Client V2](./v2.md) per conoscere le opzioni non compatibili con Valine.

   :::

3. Migra i dati

Seleziona <kbd>Import/Export</kbd> > <kbd>Limit to certain classes</kbd> > <kbd>Comment</kbd> > <kbd>Export</kbd> nel backend di LeanCloud, poi riceverai una notifica via e-mail.

Incolla il contenuto del file esportato nella textarea qui sotto e fai clic sul pulsante di conversione per ottenere il file da importare.

<MigrationTool />

::: tip

Dopo aver ottenuto il file esportato tramite lo strumento qui sopra, puoi importarlo nella console del servizio di archiviazione corrispondente.

:::

## I punti di forza di Waline

Rispetto a Valine, Waline offre i seguenti punti di forza:

### Più funzionalità

1. Markdown supporta più sintassi, tra cui apice e pedice, emoji, tabelle, barrato, formule matematiche, tag HTML, note a piè di pagina e altro.
1. Funzionalità di caricamento delle immagini, che consente di personalizzare il servizio di hosting delle immagini o di incorporare direttamente le immagini.
1. Il nuovissimo sistema di etichette aggiunge etichette di livello agli utenti in base alla frequenza delle loro interazioni e supporta etichette personalizzate per gli utenti registrati.
1. Preset di emoji e supporto alle tab, che consentono più set di emoji e permettono a chiunque di pubblicare e usare preset di emoji.
1. Un nuovissimo sistema di reazioni che permette ai visitatori di esprimere il proprio atteggiamento verso l'articolo.
1. «Mi piace» ai commenti, per esprimere supporto al commento che ti piace.
1. Visualizzazioni, più accurate e a prova di manomissione.
1. Ricerca delle emoji. Servizio personalizzabile, che permette agli utenti di cercare e inserire liberamente emoticon.
1. Supporto agli utenti registrati per modificare ed eliminare i propri commenti pubblicati.

### Più sicuro

1. Zero fughe di privacy: non espone caselle e-mail, indirizzi IP e altre informazioni sensibili degli utenti e consente di nascondere sul server la posizione geografica, il browser e il sistema operativo dell'utente
1. Sistema anti-spam completo.
   - Tutti i commenti possono essere autenticati dai servizi anti-spam e supportano logiche di validazione aggiuntive.
   - Puoi impostare un limite di velocità dei commenti per singolo IP o singolo utente, e Waline identifica automaticamente i commenti duplicati.
1. Funzionalità di revisione dei commenti: in periodi sensibili o quando il sito è sotto attacco puoi attivare la revisione, approvare manualmente la visualizzazione dei commenti ed evitare che commenti malevoli causino la chiusura del sito.
1. Supporto agli account utente. Oltre alla registrazione di un account, Waline supporta anche gli account dei social media, sincronizzando rapidamente avatar e soprannomi con l'etichetta autorizzata per prevenire furti d'identità.

### Più comodo

1. Vari metodi (QQ, WeChat, DingTalk, e-mail) per notificare al blogger i nuovi commenti
1. Un potente servizio di gestione: puoi visualizzare tutti gli utenti e i commenti, eseguire le relative operazioni e impostare etichette personalizzate e amministratori per gli utenti
1. Gestione dal frontend: gli amministratori possono revisionare, modificare o eliminare i commenti direttamente dal componente dei commenti di Waline.

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
