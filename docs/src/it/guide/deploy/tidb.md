---
title: Creare un database su TiDB
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb) è un database NewSQL open source. [TiDB Cloud](https://tidbcloud.com/) è la versione online ufficiale, che offre 5GB di archiviazione gratuita a tutti. Di seguito viene descritto come creare un database Waline su TiDB Cloud.

## Creare il database

1. Dopo aver effettuato l'accesso a [TiDB Cloud](https://tidbcloud.com), verrà creata automaticamente un'istanza TiDB: fai clic direttamente su <kbd>cluster0</kbd> per entrare nell'istanza

   ![Accedere all'istanza](../../../assets/tidb-1.png)

2. Seleziona <kbd>SQL Editor</kbd> nell'elenco a sinistra, separa in base al carattere `;` il contenuto di [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) ed esegui le istruzioni una alla volta nell'interfaccia. Per ogni istruzione fai clic sul pulsante blu <kbd>Run</kbd> in alto a destra, oppure usa la scorciatoia <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd>
   ![Passaggio 1](../../../assets/tidb-2.png)
   ![Passaggio 2](../../../assets/tidb-3.png)
   ![Passaggio 3](../../../assets/tidb-4.png)
   ![Passaggio 4](../../../assets/tidb-5.png)
   ![Passaggio 5](../../../assets/tidb-6.png)

A questo punto il database Waline è stato creato!

## Ottenere la configurazione di connessione

Fai clic sul pulsante <kbd>Overview</kbd> a sinistra per accedere alla pagina iniziale e seleziona <kbd>Connect</kbd> in alto a destra per ottenere le informazioni di connessione.

Imposta "Connect with" su `General`. Fai clic anche su <kbd>Reset password</kbd> nella riga sottostante per generare una nuova password.

In questo modo puoi ottenere la configurazione relativa alla connessione.

![Connessione](../../../assets/tidb-7.png)

## Distribuzione su Vercel

Crea un account Vercel, aggiungi un progetto e distribuisci il servizio Waline. Poi apri <kbd>Settings</kbd> del progetto e vai su `Environment Variables`. Fai clic su <kbd>Add Environment Variable</kbd> e aggiungi le seguenti variabili: `TIDB_HOST`, `TIDB_PORT`, `TIDB_DB`, `TIDB_USER` e `TIDB_PASSWORD`. Dopo aver aggiunto queste variabili, ridistribuisci il progetto.

![Configurare la connessione a TiDB](../../../assets/tidb-8.png)
