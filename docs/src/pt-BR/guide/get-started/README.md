---
title: Começar
icon: creative
dir:
  collapsible: false
  order: 1
---

Boas-vindas ao Waline. Em apenas alguns passos, você pode habilitar o Waline para oferecer comentários e visualizações de página no seu site.

<!-- more -->

## Implantar o servidor

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Clique no botão acima para ir à Vercel e implantar o servidor.

   ::: note

   Se você não estiver conectado, a Vercel solicitará que você se cadastre ou entre. Use sua conta do GitHub para entrar rapidamente.

   :::

1. Digite um nome de projeto da Vercel que você goste e clique em `Create` para continuar:

   ![create](../../../assets/vercel-1.png)

1. A Vercel criará e inicializará um novo repositório com base no template do Waline. O nome do repositório será o nome do projeto que você acabou de digitar.

   ![deploy](../../../assets/vercel-2.png)

   Depois de um ou dois minutos, fogos de artifício aparecerão na tela para comemorar a implantação bem-sucedida. Clique em `Go to Dashboard` para ir ao painel da aplicação.

   ![deploy](../../../assets/vercel-3.png)

## Criar um banco de dados

1. Clique em `Storage` no topo para abrir a página de configuração de armazenamento e escolha `Create Database`. Selecione `Neon` como `Marketplace Database Providers` e clique em `Continue` para prosseguir.

   ![neon](../../../assets/vercel-5.png)

1. Será solicitado que você crie uma conta no Neon. Clique em `Accept and Create` para aceitar e criar a conta. Em seguida, você escolherá o plano do banco de dados, incluindo região e cota. Você pode manter tudo como padrão e clicar em `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Depois, será solicitado que você defina o nome do banco de dados. Você também pode mantê-lo como está e clicar em `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Agora você deve ver o serviço de banco de dados que acabou de criar em `Storage`. Clique nele e selecione `Open in Neon` para ir ao Neon. Na interface do Neon, escolha `SQL Editor` na barra lateral esquerda, cole as instruções SQL de [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) no editor e clique em `Run` para criar as tabelas.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Depois de um instante, você será notificado de que a criação foi bem-sucedida. Volte à Vercel, clique em `Deployments` no topo e clique no botão `Redeploy` à direita da implantação mais recente. Esse passo garante que o serviço de banco de dados recém-configurado entre em vigor.

   ![redeploy success](../../../assets/vercel-12.png)

1. Você será redirecionado para a página `Overview` e a implantação começará. Após um momento, o `STATUS` mudará para `Ready`. Clique em `Visit` para abrir o site implantado. Essa URL é o endereço do seu servidor.

   ![visit](../../../assets/vercel-14.png)

## Vincular um domínio personalizado

1. Clique em `Settings` → `Domains` no topo para abrir a página de configuração de domínios.

1. Digite o domínio que você quer vincular e clique em `Add`.

   ![Add domain](../../../assets/vercel-16.png)

1. Adicione um novo registro `CNAME` no seu provedor de domínio:

   | Tipo  | Nome    | Valor                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Aguarde o registro DNS entrar em vigor. Depois disso, você pode acessar o Waline com seu próprio domínio 🎉
   - Sistema de comentários: example.yourdomain.com
   - Gerenciamento de comentários: example.yourdomain.com/ui

   ![success](../../../assets/vercel-17.png)

## Importar em HTML

Veja como adicionar o Waline à sua página web ou site:

1. Importe a folha de estilos `https://unpkg.com/@waline/client@v3/dist/waline.css` no `<head>`

1. Crie uma tag `<script>` e inicialize com `init()` de `https://unpkg.com/@waline/client@v3/dist/waline.js`, passando as opções `el` e `serverURL` necessárias.
   - A opção `el` é o elemento usado para a renderização do Waline. Você pode definir um seletor CSS como string ou um objeto HTMLElement.
   - `serverURL` é o link do seu servidor de implantação, que você acabou de criar na Vercel.
   - Para mais opções, acesse a [página de propriedades do componente](https://waline.js.org/pt-BR/reference/client/props.html)

   Aqui está um exemplo:

   ```html {3-7,12-18}:line-numbers
   <head>
     <!-- ... -->
     <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
   </head>
   <body>
     <!-- ... -->
     <div id="waline"></div>
     <script type="module">
       import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

       init({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
         lang: 'en',
       });
     </script>
   </body>
   ```

1. O serviço de comentários agora funcionará no seu site :tada:!

## Gerenciamento de comentários (Administração)

1. Após a implantação, acesse `<serverURL>/ui/register` para se cadastrar. A primeira pessoa a se cadastrar será definida como administrador.

1. Depois de entrar como administrador, você poderá acessar o painel de gerenciamento de comentários. Aqui você pode editar, marcar ou excluir comentários.

1. Os usuários também podem criar uma conta pela caixa de comentários e serão redirecionados para a página de perfil após entrar.

## Tutorial em vídeo

Um entusiasta usuário do Waline fez o tutorial em vídeo abaixo. Se as instruções acima não estiverem claras, você pode consultar o vídeo:

<VidStack src="https://www.youtube.com/watch?v=SzEHzsme8uY" />
