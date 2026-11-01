---
title: Implantação no Vercel
icon: vercel
order: 1
---

Publicamos o pacote `@waline/vercel` como pacote de servidor, e a implantação no Vercel também é a forma que mais recomendamos.

<!-- more -->

## Como implantar

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Clique no botão azul acima; ele redirecionará você para o Vercel para implantar com o template do Waline.

   ::: note

   Se você ainda não entrou na sua conta, recomendamos entrar com o GitHub.

   :::

1. Informe o nome do seu projeto no Vercel e clique em `Create`.

   ![Create Project](../../../assets/vercel-1.png)

1. O repositório com o nome que você informou será criado e inicializado automaticamente pelo Vercel com base no template de exemplo do Waline.

   ![new project](../../../assets/vercel-2.png)

   Após um ou dois minutos, o Vercel deve concluir a implantação. Clique no botão `Go to Dashboard` para ir ao dashboard da sua aplicação.

   ![dashboard](../../../assets/vercel-3.png)

## Criar o banco de dados

1. Clique em `Storage` na parte superior para entrar na página de serviços de armazenamento e escolha `Create Database`. Em `Marketplace Database Providers`, selecione `Neon` e clique em `Continue`.

   ![storage](../../../assets/vercel-5.png)

1. Você será solicitado a criar uma conta no Neon. Escolha `Accept and Create`. Em seguida, selecione a configuração do plano do banco de dados, incluindo região e cota. Você pode manter os padrões e clicar em `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Defina o nome do banco de dados. Você pode manter o padrão e clicar em `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Agora o banco de dados aparece em `Storage`. Clique nele e escolha `Open in Neon` para ir ao Neon. No Neon, selecione `SQL Editor` à esquerda, cole no editor o SQL de [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) e clique em `Run` para criar as tabelas.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Depois de um curto intervalo, você deve ver uma mensagem de sucesso. Volte ao Vercel, clique em `Deployments` e então em `Redeploy` na implantação mais recente para que a nova configuração do banco de dados entre em vigor.

   ![redeploy success](../../../assets/vercel-12.png)

1. O Vercel redirecionará para `Overview` e iniciará a implantação. Quando `STATUS` se tornar `Ready`, clique em `Visit` para abrir o site implantado. Essa URL é o endereço do seu servidor.

   ![visit](../../../assets/vercel-14.png)

## Atribuir um domínio

1. Clique em <kbd>Settings</kbd> - <kbd>Domains</kbd> para ir à página de configuração de domínio.

1. Informe o domínio que você deseja atribuir e clique no botão <kbd>Add</kbd>.

   ![Add domain](../../../assets/vercel-16.png)

1. Adicione um novo registro `CNAME` no servidor de domínio.

   | Tipo  | Nome    | Valor                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Depois que entrar em vigor, você pode usar seu próprio domínio para visitar o Waline. :tada:
   - Sistema de comentários: example.your-domain.com
   - Painel administrativo: example.your-domain.com/ui

   ![success](../../../assets/vercel-17.png)

## Importar via HTML

Configure o seguinte na sua página web:

1. Importe os estilos do Waline de `https://unpkg.com/@waline/client@v3/dist/waline.css`.
2. Crie uma tag `<script>` que use `init()` de `https://unpkg.com/@waline/client@v3/dist/waline.js` e passe as opções obrigatórias `el` e `serverURL`.
   - `el` é o elemento usado para renderizar o Waline. Pode ser uma string de seletor CSS ou um HTMLElement.
   - `serverURL` é o endereço do seu servidor obtido na etapa anterior.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Administração de comentários

1. Após a implantação, acesse `<serverURL>/ui/register` para se cadastrar. O primeiro usuário cadastrado se torna o administrador.
2. Depois de entrar, o administrador pode gerenciar os comentários: editar, marcar ou excluir.
3. Os usuários também podem se cadastrar pela caixa de comentários. Após entrar, eles serão redirecionados para a página de perfil.
