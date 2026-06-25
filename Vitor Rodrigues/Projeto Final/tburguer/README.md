📑 Projeto Final - Sistema de Pedidos Açaí Delicioso
O Açaí Delicioso é uma aplicação web interativa. O ecossistema é totalmente integrado a uma API mockada via JSON Server hospedada na nuvem, permitindo o fluxo completo desde a escolha dos ingredientes.

👁️ Visão Geral
O Novo Segmento de Negócio
Originalmente concebido como uma plataforma de hamburgueria, o projeto foi totalmente reestruturado e pivotado para o segmento de Açaí e Gelados.

Alterações Visuais e Estruturais
Identidade Visual: Reposicionamento completo de cores, tipografia e assets visuais para tons que remetem ao açaí e acompanhamentos (leite condensado, frutas e coberturas).

Abstração de Dados: Substituição do modelo rígido de hambúrgueres por um modelo flexível focado em Bases de Açaí, Acompanhamentos e Adicionais.

Componentização: Ajuste estrutural do banner principal e dos formulários de seleção dinâmica.

🛠️ Solução Técnica dos Alertas
Utilizando um sistema de Alertas Semânticos Dinâmicos. A lógica valida as ações do usuário (como o sucesso ao enviar um pedido ou falhas de conexão) e renderiza estilos reativos baseados no tipo do evento.

🔗 Links Oficiais do Ecossistema
Abaixo encontram-se todos os pontos de acesso do ambiente distribuído da aplicação:

🔗 Link de Produção (Aplicação Web): https://projeto-final-ownv.vercel.app

🔗 Link da API Mockada (JSON Server): https://projetofinal-g3is.onrender.com

🔗 Link do Repositório (Código-Fonte): https://github.com/vitorrodrigues230/ProjetoFinal

⚙️ Instalação e Execução Local
Caso deseje replicar o ambiente de desenvolvimento localmente, certifique-se de ter o Node.js instalado e siga os passos:

1. Clone o repositório público:

git clone https://github.com/vitorrodrigues230/ProjetoFinal.git

2. Navegue até o subdiretório do frontend do projeto:
   ```bash
cd Projeto_Final/tburguer
Instale as dependências necessárias do pacote:

npm install

4. Configure as variáveis de ambiente locais editando o arquivo `.env.development` com o endpoint desejado.
5. Execute o servidor de desenvolvimento:
   ```bash
npm run serve