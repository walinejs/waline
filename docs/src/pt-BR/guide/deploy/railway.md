---
title: Implantação no Railway
icon: railway
---

O [Railway](https://railway.app/) é uma plataforma Serverless gratuita; podemos implantar o Waline no Railway com facilidade.

<!-- more -->

## Como implantar

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

Clique neste botão e você será redirecionado para a plataforma railway.app para fazer a implantação rápida. Após entrar, você pode informar o nome do seu novo repositório no GitHub ou simplesmente usar o padrão; em seguida, clique no botão <kbd>Deploy</kbd> na parte inferior para implantar. Observe que a parte das variáveis de ambiente não deve ser modificada.

![railway1](../../../assets/railway-1.jpg)

Após alguns instantes, você será redirecionado para a página do dashboard. Clique em <kbd>PostgreSQL</kbd> - <kbd>Query</kbd> e cole o conteúdo do arquivo [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) na área de texto; depois, clique no botão <kbd>Run Query</kbd> na parte inferior para inicializar o banco de dados.

![railway2](../../../assets/railway-2.jpg)

Por fim, você pode clicar em <kbd>Deployments</kbd> - <kbd>Domains</kbd> para obter a URL do servidor. Copie a URL do site e informe-a na configuração `serverURL` do cliente. Então você já pode aproveitar o Waline!

![railway3](../../../assets/railway-3.jpg)

## Como atualizar

Acesse o repositório correspondente no GitHub e altere o número da versão de `@waline/vercel` no arquivo package.json para a mais recente.

## Como modificar as variáveis de ambiente

Clique na aba <kbd>Variables</kbd> para ir à página de gerenciamento de variáveis de ambiente. O projeto será reimplantado automaticamente após a alteração das variáveis.

![railway4](../../../assets/railway-4.jpg)
