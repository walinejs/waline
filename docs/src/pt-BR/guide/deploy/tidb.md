---
title: Criar um banco de dados no TiDB
icon: tidb
---

O [TiDB](https://github.com/pingcap/tidb) é um banco de dados NewSQL de código aberto. O [TiDB Cloud](https://tidbcloud.com/) é a versão online oficial e oferece 5GB de armazenamento gratuito para todos usarem. A seguir, descrevemos como criar um banco de dados Waline no TiDB Cloud.

## Criar o banco de dados

1. Depois de entrar no [TiDB Cloud](https://tidbcloud.com), uma instância TiDB será criada automaticamente; clique diretamente em <kbd>cluster0</kbd> para entrar na instância

   ![Enter instance](../../../assets/tidb-1.png)

2. Selecione <kbd>SQL Editor</kbd> na lista à esquerda e execute na interface, uma a uma, as instruções de [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) separadas por `;`. Para cada instrução, clique no botão azul <kbd>Run</kbd> no canto superior direito ou use o atalho <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd> para executar
   ![Step1](../../../assets/tidb-2.png)
   ![Step2](../../../assets/tidb-3.png)
   ![Step3](../../../assets/tidb-4.png)
   ![Step4](../../../assets/tidb-5.png)
   ![Step5](../../../assets/tidb-6.png)

Até aqui, o banco de dados do Waline foi criado!

## Obter a configuração de conexão

Clique no botão <kbd>Overview</kbd> à esquerda para entrar na página inicial e selecione <kbd>Connect</kbd> no canto superior direito para obter as informações de conexão.

Defina "Connect with" como `General`. Clique também em <kbd>Reset password</kbd> na linha seguinte para gerar uma nova senha.

Assim, você obtém a configuração relacionada à conexão.

![Connection](../../../assets/tidb-7.png)

## Implantação no Vercel

Crie uma conta no Vercel, adicione um projeto e implante o serviço Waline. Em seguida, abra <kbd>Settings</kbd> do projeto e vá para `Environment Variables`. Clique em <kbd>Add Environment Variable</kbd> e adicione as seguintes variáveis: `TIDB_HOST`, `TIDB_PORT`, `TIDB_DB`, `TIDB_USER` e `TIDB_PASSWORD`. Depois de adicionar essas variáveis, reimplante o projeto.

![Configure TiDB connection](../../../assets/tidb-8.png)
