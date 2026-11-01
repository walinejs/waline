---
title: Implantação no Zeabur
icon: zeabur
---

O [Zeabur](https://zeabur.com) é uma plataforma que ajuda desenvolvedores a implantar seus próprios serviços com um clique. No geral, é semelhante ao Railway, mas tem mais funcionalidades, não exige a vinculação de um cartão de crédito e o limite gratuito é maior.

<!-- more -->

## Implantar com um clique

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/1IBY26?utm_source=waline)

## Implantar do zero

Clique no botão [Fork](https://github.com/walinejs/zeabur-starter/fork) para criar um modelo inicial do Zeabur.

![zeabur1](../../../assets/zeabur-1.png)

<https://dash.zeabur.com> Entre no console do Zeabur. Se não houver projeto, você precisa primeiro definir um nome para o novo projeto.

![zeabur2](../../../assets/zeabur-2.png)

Depois de entrar, clique em <kbd>Add New Service</kbd> para criar um serviço, selecione <kbd>Deploy Other Service</kbd> - <kbd>Deploy MongoDB</kbd> para criar primeiro um serviço de banco de dados.

Dê um nome ao nosso serviço de banco de dados MongoDB, clique no botão <kbd>Deploy</kbd> e nosso serviço de banco de dados está implantado.

![zeabur2](../../../assets/zeabur-3.png) ![zeabur4](../../../assets/zeabur-4.png)

Em seguida, continuamos clicando em <kbd>Add New Service</kbd> para criar o serviço Waline; desta vez, escolhemos <kbd>Deploy Your Source Code</kbd>. Na lista de projetos do GitHub a seguir, encontre o projeto que fizemos fork no início e clique no botão <kbd>Import</kbd> correspondente.

Dê um nome ao nosso serviço Waline, clique no botão <kbd>Deploy</kbd> e nosso serviço Waline está implantado.

![zeabur6](../../../assets/zeabur-6.png) ![zeabur7](../../../assets/zeabur-7.png)

Não feche com pressa o painel do serviço Waline. Depois que o serviço for implantado, precisamos adicionar um domínio de acesso a ele. Clique no botão <kbd>Generate Domain</kbd> na aba <kbd>Domains</kbd>, informe o prefixo de domínio desejado e clique no botão <kbd>Save</kbd> para adicioná-lo como domínio de acesso do nosso serviço.

![zeabur8](../../../assets/zeabur-8.png) ![zeabur9](../../../assets/zeabur-9.png)

Tudo está pronto, e o próximo passo é testemunhar o milagre. Abra o domínio de acesso que acabamos de configurar, teste a publicação de comentários e tudo estará funcionando~ Em seguida, configure esse domínio no cliente e você poderá comentar à vontade!

![zeabur2](../../../assets/zeabur-10.png)

## Como atualizar

Acesse o repositório no GitHub e altere o número da versão de `@waline/vercel` no arquivo package.json para a versão mais recente.

## Como modificar as variáveis de ambiente

Você pode entrar na página de gerenciamento de variáveis de ambiente pela aba <kbd>Variables</kbd>; após a modificação, o projeto será reimplantado automaticamente.

![zeabur11](../../../assets/zeabur-11.png)
