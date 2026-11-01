---
title: Migração a partir do Valine
icon: valine
---

1. Implante o backend conforme [Implantação na Vercel](../guide/get-started/README.md#implantar-o-servidor) na seção _Começar_.

2. Modifique os scripts do frontend conforme [HTML](../guide/get-started/README.md#importar-em-html) na seção _Começar_.

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

   ::: tip Configuração

   O Waline V2 removeu o suporte ao Valine e passou a usar uma configuração melhor. A seguir está um resumo da migração de algumas opções:

   - `placeholder`: use `locale.placeholder`
   - `highlight`: use `highlighter`
   - `avatarForce`, `avatar`: use a variável de ambiente `AVATAR_PROXY` do servidor
   - `recordIP`: o IP do usuário não é mais exibido, e o servidor disponibiliza a variável de ambiente `DISABLE_USERAGENT`
   - `requiredFields`: renomeado para `requiredMeta`
   - `langMode`: renomeado para `locale`
   - `emojiCDN`, `emojiMap`: use as opções mais poderosas de `emoji`

   Para a configuração do Waline, consulte [Configuração do cliente](../reference/client/api.md). Você também pode ver o [Guia de migração para o Waline Client V2](./v2.md) para conhecer as opções incompatíveis com o Valine.

   :::

3. Migre os dados

No painel do LeanCloud, selecione <kbd>Importar/Exportar</kbd> > <kbd>Limitar a determinadas classes</kbd> > <kbd>Comment</kbd> > <kbd>Exportar</kbd>, e então você receberá uma notificação por e-mail.

Cole o conteúdo do arquivo exportado na área de texto abaixo e clique no botão de conversão para obter o arquivo a ser importado.

<MigrationTool />

::: tip

Depois de obter o arquivo exportado pela ferramenta acima, você pode importá-lo no console do serviço de armazenamento correspondente.

:::

## Destaques do Waline

Comparado ao Valine, o Waline tem os seguintes destaques:

### Mais recursos

1. O Markdown suporta mais sintaxes, incluindo sobrescrito e subscrito, emoji, tabelas, tachado, fórmulas matemáticas, tags HTML, notas de rodapé, etc.
1. Recurso de upload de imagens, que permite personalizar o serviço provedor de imagens ou incorporar imagens diretamente.
1. O novo sistema de rótulos adiciona rótulos de nível aos usuários de acordo com a frequência de interação e permite rótulos personalizados para usuários registrados.
1. Presets de emoji e suporte a abas, permitindo vários conjuntos de emoji e que qualquer pessoa publique e use presets de emoji.
1. Um novo sistema de reações que permite aos visitantes expressarem sua opinião sobre o artigo.
1. Curtidas em comentários, para demonstrar apoio ao comentário de que você gostou.
1. Visualizações de página, mais precisas e à prova de adulteração.
1. Busca de emoji. Serviço personalizável, permitindo que os usuários pesquisem e insiram emoticons livremente.
1. Suporte para que usuários registrados editem e excluam os próprios comentários publicados.

### Mais seguro

1. Zero vazamento de privacidade: não expõe caixas de correio, endereços IP e outras informações sensíveis dos usuários, e permite ocultar no servidor a localização geográfica, o navegador e o sistema operacional do usuário
1. Sistema anti-spam completo.
   - Todos os comentários podem ser autenticados por serviços anti-spam e suportam lógica de validação adicional.
   - Você pode definir o limite de velocidade de comentários para um único IP ou um único usuário, e o Waline identifica automaticamente comentários duplicados.
1. Recurso de revisão de comentários: em períodos sensíveis ou quando o site estiver sob ataque, você pode ativar a revisão de comentários, revisar e aprovar manualmente a exibição dos comentários e evitar que comentários maliciosos causem o fechamento do site.
1. Suporte a contas de usuário. Além do cadastro de conta, o Waline também suporta contas de redes sociais, sincronizando rapidamente avatares e apelidos com o rótulo autorizado para evitar falsidade de identidade.

### Mais conveniente

1. Diversos métodos (QQ, WeChat, DingTalk, e-mail), etc. para notificar o blogueiro sobre os comentários
1. Poderoso serviço de gerenciamento: você pode ver todos os usuários e comentários, realizar operações relacionadas e definir rótulos personalizados e administradores para os usuários
1. Gerenciamento no frontend: os administradores podem revisar, editar ou excluir comentários diretamente pelo componente de comentários do Waline.

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
