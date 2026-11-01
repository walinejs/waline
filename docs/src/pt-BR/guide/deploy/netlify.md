---
title: Implantação no Netlify
icon: netlify
---

O [Netlify](https://netlify.com) é um conhecido provedor de serviços de implantação de sites estáticos, e o [Edge Functions](https://www.netlify.com/blog/edge-functions-explained/) é um serviço lançado pela Netlify que permite executar código JavaScript nos nós de borda (edge) dos sites.

<!-- more -->

## Como implantar

Clique no botão [Fork](https://github.com/walinejs/netlify-starter/fork) para criar um modelo inicial do Netlify.

![netlify](../../../assets/netlify-1.png)

<https://app.netlify.com> Entre no console do Netlify, selecione <kbd>Add new site</kbd> - <kbd>Import an exist project</kbd> para adicionar o site. Selecione GitHub Certified para ler nossa lista de projetos do GitHub. Procure na lista o nome do repositório gerado pelo Fork que você acabou de fazer e clique no projeto para começar a criar nosso site Netlify a partir desse repositório.

![netlify](../../../assets/netlify-2.png) ![netlify](../../../assets/netlify-3.png)

Antes de criar um site Netlify, precisamos preencher algumas informações de configuração. Além das variáveis de ambiente, podemos manter o padrão para as demais informações. Consulte [Suporte a múltiplos bancos de dados](../database.md) para adicionar as variáveis de ambiente do serviço de armazenamento correspondente e, em seguida, clique em <kbd>Deploy site</kbd> na parte inferior para iniciar a implantação do site.

![netlify](../../../assets/netlify-4.png)

Depois de um tempo, nosso site Netlify é implantado com sucesso. Podemos clicar na barra de navegação <kbd>Functions</kbd> na parte superior para alternar para a lista de funções em nuvem, onde `comment` é o nosso serviço Waline implantado. Clique nele para entrar na página de detalhes da função em nuvem.

![netlify](../../../assets/netlify-5.png)

Na página de detalhes, o endereço listado em `Endpoint` é o endereço de implantação do nosso serviço Waline. Clique no botão de copiar à direita, abra-o em uma nova aba, teste a publicação de comentários e tudo estará funcionando~ Em seguida, configure esse domínio no cliente e você poderá comentar à vontade!

![netlify](../../../assets/netlify-6.png) ![netlify](../../../assets/netlify-8.png)

## Como atualizar

Acesse o repositório no GitHub e altere o número da versão de `@waline/vercel` no arquivo package.json para a versão mais recente.

## Como modificar as variáveis de ambiente

Clique na barra de navegação `Site settings` na parte superior, selecione a barra lateral `Environments variables` e entre na página de gerenciamento de variáveis de ambiente. Clique no botão `Add a variable` para adicionar uma variável de ambiente.

Depois de editar as variáveis de ambiente, precisamos entrar na página `Deploys`, selecionar `Trigger deploy` - `Deploy site` para reimplantar o site e fazer as variáveis de ambiente entrarem em vigor.

![netlify](../../../assets/netlify-9.png) ![netlify](../../../assets/netlify-10.png)
