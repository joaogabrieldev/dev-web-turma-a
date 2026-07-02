# T-Pizza

## Visão Geral

O T-Pizza é um sistema web de pedidos para uma pizzaria, desenvolvido em Vue 3. O projeto foi originalmente uma hamburgueria (T-Burguer) e foi totalmente reformulado para o segmento de pizzaria, com nova identidade visual, dados e regras de comportamento.

Principais alterações visuais e estruturais realizadas:

Identidade visual: o nome do sistema foi alterado de tburguer para tpizza. A paleta de cores passou a usar fundo escuro azul noturno com destaque em vermelho, substituindo o tema dourado da hamburgueria.

Dados e formulário: o campo "Ponto da carne" foi substituído por "Tipo da massa" (fina, tradicional, grossa e com borda recheada). Os "Complementos" viraram "Adicionais" (borda recheada, catupiry extra, bacon e cheddar). Os hamburgues do menu viraram pizzas. Os status de pedido foram adaptados para o contexto de pizzaria (Preparando, No forno, Saiu para entrega, Entregue).

## Solução Técnica dos Alertas

A lógica de validação e exibição dinâmica dos alertas foi estruturada em um componente chamado AlertComponent.

O vermelho indica erros de preenchimento ou ações inválidas, o laranja indica alertas e avisos importantes, o azul indica informações contextuais e gerais e o verde indica sucesso ao cadastrar, editar ou excluir dados.

No componente PedidoComponent, a confirmação do pedido é bloqueada quando campos essenciais não são preenchidos. Se o nome do cliente estiver vazio ou o tipo da massa não for selecionado, é exibido um alerta vermelho de erro. Se nenhuma pizza tiver sido selecionada, é exibido um alerta laranja de aviso. Quando o pedido é confirmado com sucesso, é exibido um alerta verde e o formulário é limpo.

No componente ListaPedidoComponent, cada ação gera um feedback visual. A exclusão de um pedido exibe um alerta verde de sucesso, a atualização de status exibe um alerta azul de informação e qualquer falha nas requisições exibe um alerta vermelho de erro.

## Links

Link da API: https://api-tburguer-l2we.onrender.com

Link de Produção: https://tpizza-beige.vercel.app/ e https://tpizza-beige.vercel.app/

Link do Repositório: https://github.com/Zion-L/tpizza
