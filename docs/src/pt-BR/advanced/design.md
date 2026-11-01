---
title: Objetivo do projeto
icon: goal
order: 2
---

[Valine](https://valine.js.org) é um sistema de revisão com estilo refinado, operação simples e implantação eficiente. Quando tive contato com ele pela primeira vez, fiquei atraído pelo seu estilo refinado e pelas suas características serverless. Ele não precisa de um serviço de backend: o frontend interage diretamente com o serviço de armazenamento do LeanCloud, o que é realmente incrível! Mas, conforme fui entendendo melhor, descobri os seus problemas.

## Problemas do Valine

### Não é open source

O autor passou a enviar apenas os arquivos compilados para o repositório do GitHub a partir da versão `1.4.0`, e o código-fonte parou de ser atualizado. Talvez o autor tenha se desiludido com o open source. Para usuários como eu, que querem adicionar ou modificar funcionalidades no projeto, esse problema é um pouco incômodo.

### XSS

Desde as primeiras versões, os usuários relatam problemas de XSS no Valine, e a comunidade também usa diversos métodos para corrigi-los, incluindo a adição de códigos de verificação, filtragem de XSS no frontend e outras abordagens. No entanto, o autor percebeu depois que toda verificação no frontend só impede quem age de boa-fé, então restrições como o código de verificação foram removidas.

Hoje, quando o frontend publica um comentário, o Markdown é convertido em HTML e, em seguida, uma função de filtro de XSS é executada no frontend antes do envio ao LeanCloud. Depois de obter os dados do LeanCloud, eles são inseridos diretamente no DOM. É evidente que esse processo tem problemas. Enquanto o HTML for enviado diretamente e exibido diretamente depois de ser obtido, o XSS não pode ser erradicado de forma definitiva.

::: note Solução fundamental

Para ataques de XSS armazenado, podemos recorrer ao escape de códigos HTML para resolvê-los de forma definitiva. Assim como no antigo BBCode, apenas o conteúdo markdown é enviado ao banco de dados. O frontend lê o conteúdo e codifica todo o HTML antes de exibi-lo após a conversão de Markdown.

```js
function encodeForHTML(str) {
  return ('' + str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

Como o Valine é um sistema serverless, os atacantes conseguem chegar diretamente à etapa de armazenamento. Todas as precauções tomadas antes de armazenar os dados são inválidas, e o processamento só pode acontecer durante a exibição. Como todo o HTML não pode ser interpretado depois de escapado, garantimos que o HTML convertido não tenha chance de ser inserido.

Como o Valine não é mais open source, não é possível abrir pull requests.

:::

Como o método acima restringiria completamente os usuários ao escopo do Markdown, o Waline adicionou o `DOMPurify` no lado do cliente a partir da versão `0.15.0` para prevenir XSS. Além da sanitização regular de XSS:

- `<form>` e `<input>` são desativados
- a injeção de estilo é desativada
- a reprodução automática de mídia é desativada
- todos os links externos são processados e abertos em uma nova janela com rel `noopener noreferrer`.

### Vazamento de privacidade

Além do acesso direto ao armazenamento, o atacante também pode ler qualquer dado diretamente. Se um campo do banco de dados tiver permissão de leitura para todos, o conteúdo desse campo é totalmente transparente para o atacante.

Nos dados de comentários, os dois campos IP e e-mail contêm dados sensíveis do usuário. O Sr. Deng escreveu um artigo específico para criticar o problema [Please stop using the Valine.js comment system immediately unless it fixes the user privacy leak](https://ttys3.net/post/hugo/please-stop-using-valine-js-comment-system-until-it-fixed-the-privacy-leaking-problem/). Até mesmo a comunidade [JueJin](https://juejin.cn), que usou o LeanCloud nos primeiros anos, teve exposto o problema de segurança de [divulgação do número de celular dos usuários](https://m.weibo.cn/detail/4568007327622344?cid=4568044392682999).

Para contornar esse problema, o autor do Valine adicionou a configuração `recordIP`, que define se é permitido registrar o IP do usuário. Como não há servidor, a única solução é não armazenar o valor.

Essa opção ainda tem um problema: registrar ou não o IP depende da configuração do dono do site, enquanto quem comenta não tem o direito de gerenciar a própria privacidade.

O vazamento de endereços de e-mail é outro grande problema de privacidade. É perfeitamente viável calcular e enviar o md5 do e-mail do usuário no frontend para obter o avatar do Gravatar. Mas, se for necessário enviar uma notificação por e-mail quando um comentário recebe uma resposta, é inevitável armazenar o valor original do endereço de e-mail do usuário. Em teoria, esse problema poderia ser resolvido com criptografia RSA. A chave privada poderia ser armazenada na variável de ambiente do LeanCloud. O cliente envia tanto o md5 do e-mail quanto o e-mail criptografado com a chave pública. Quando o LeanCloud precisa enviar notificações por e-mail, ele lê a chave privada do ambiente na cloud function e então descriptografa para obter o e-mail do usuário. No entanto, considerando o tamanho e o desempenho da biblioteca de criptografia RSA no frontend, isso não é viável na prática. Adicionar uma camada de servidor para filtrar as informações sensíveis pelo lado do servidor é, sem dúvida, uma prática melhor.

### Adulteração das estatísticas de leitura

O Valine 1.2.0 adiciona a funcionalidade de estatísticas de leitura de artigos: o usuário visita a página e o número de visitas é registrado de acordo com a url na tabela counter do backend. Como os dados precisam ser atualizados a cada acesso à página, as permissões precisam ser definidas como graváveis para permitir as atualizações de campo subsequentes. Isso cria um problema: na verdade, os dados podem ser atualizados para qualquer valor. Se você tiver interesse, abra o site oficial <https://valine.js.org/visitor.html>, entre no console e digite o código a seguir para testar. Lembre-se de voltar o número ao valor original depois do teste~

```js
const counter = new AV.Query('Counter');
const resp = await counter.equalTo('url', '/visitor.html').find();
resp[0].set('time', -100000).save();
location.reload();
```

Felizmente, o valor do campo `time` é do tipo Number, então outros valores não podem ser inseridos. Se o campo `time` fosse do tipo string, poderia haver uma vulnerabilidade de XSS. Uma solução possível para esse problema é não usar o método de armazenamento acumulativo, mas armazenar um registro de acesso somente leitura para cada visita e usar o método `count()` para as estatísticas na leitura. Assim, todos os dados são somente leitura, o que resolve o problema da adulteração. Essa solução também tem um problema: quando o volume de dados é relativamente grande, ela causa certa pressão sobre a consulta.

Se a ideia for manter os dados originais, a única saída é adicionar uma camada de servidor para isolar as permissões de modificação.

## O nascimento do Waline

Com base nos motivos acima, o Waline nasceu. O objetivo original do Waline era apenas adicionar um backend ao Valine, mas, como o Valine não é open source, isso só poderia ser implementado com o frontend. É claro que muitos códigos e lógicas do frontend fazem referência ao Valine para manter a compatibilidade com a configuração do Valine. Até o nome do projeto eu derivei de Valine, para que todos entendam que este projeto é um derivado do Valine.

Além de resolver os problemas de segurança mencionados acima, a adição do lado do servidor possibilitou muitos recursos que antes eram limitados pela ausência de servidor, incluindo notificações por e-mail, filtragem de comentários de spam, etc.
