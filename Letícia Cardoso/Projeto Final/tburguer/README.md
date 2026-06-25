# ☕ *Âmbar Café — Sistema de Personalização e Pedidos*

*Este repositório contém o ecossistema completo do projeto **Âmbar Café**, um sistema web moderno desenvolvido em Vue 3 integrado a uma API REST mockada, voltado para a customização refinada de cafés especiais, bebidas e lanches artesanais.*

---

## 📌 *Visão Geral do Segmento de Negócio & Alterações*

*Originalmente concebido como um sistema básico de hamburgueria (`tburguer`), o projeto foi completamente reestruturado e pivotado para o segmento de **Cafeterias de Especialidade (Gourmet)**, adotando o nome de marca **Âmbar Café**.*

*A transformação abrangeu tanto o refinamento da identidade visual (paleta de cores em tons terrosos, cremes, tipografia clássica e transições suaves) quanto mudanças profundas na estrutura lógica e de dados do sistema, permitindo que o cliente gerencie opções complexas de bebidas e acompanhamentos.*

### ✨ *Principais Alterações Lógicas e Estruturais:*
1. **Diferenciação Dinâmica por Categoria:** O formulário identifica se o item selecionado pertence à categoria `"bebidas"` ou a outras (como lanches/combos). Com isso, inputs obrigatórios específicos de barismo (como o tipo de leite) aparecem condicionalmente.
2. **Cálculo em Tempo Real de Adicionais (Recomposição de Preço):** Implementação de uma propriedade computada (`valorTotal`) que intercepta o preço base da string do produto, calcula os custos incrementais de leites especiais e adiciona os múltiplos acompanhamentos (como *Chantilly extra*, *Shot duplo*) dinamicamente antes do envio.

#### 📁 Trecho do Código Implementado (`ConfiguracaoPedidoView.vue`):
```javascript
// Lógica de cálculo dinâmico reativo baseada em seleções múltiplas e condicionais
valorTotal() {
  let total = 0;
  if (this.produto.valor) {
    total = parseFloat(this.produto.valor.replace(",", "."));
  }

  // Acréscimo condicional para leites especiais na categoria de bebidas
  if (this.produto.categoria === "bebidas" && this.leiteSelecionado) {
    const leiteObj = this.opcoesLeite.find(o => o.value === this.leiteSelecionado);
    if (leiteObj && leiteObj.value === "aveia") total += 4.00;
    if (leiteObj && leiteObj.value === "amêndoas") total += 5.00;
  }

  // Varredura de múltiplos checkboxes ativos
  this.extrasAtivos.forEach(id => {
    const extraObj = this.extrasDisponiveis.find(e => e.id === id);
    if (extraObj && extraObj.preco) {
      total += parseFloat(extraObj.preco.replace(",", "."));
    }
  });

  return total.toFixed(2).replace(".", ",");
}
```
---
### 🛡️ *Solução Técnica dos Alertas Semânticos*
*A arquitetura de alertas foi projetada de forma modular e altamente reativa no **Vue 3**, utilizando um componente dedicado chamado <AlertaComponent /> acoplado ao estado local da view por propriedades (props).*

*A validação de consistência dos dados ocorre antes de qualquer comunicação assíncrona (requisição HTTP). O sistema avalia o preenchimento de campos obrigatórios e injeta no estado do alerta mensagens personalizadas e tipagens semânticas distintas (erro, sucesso, aviso, info), aplicando estilos visuais automáticos de acordo com a severidade do evento.*

### *Fluxo Lógico de Execução:*
*Falta de preenchimento: Ativa o alerta do tipo erro e bloqueia o gatilho de envio.*

###  *Persistência Concluída:* 
*Dispara um alerta de sucesso, limpando o formulário e disparando um temporizador (setTimeout) para redirecionamento.*

### *Falha de Rede (Catch):*
*Captura a quebra e exibe um alerta de aviso informando a impossibilidade de contato com o JSON Server.*
## 🔗 Estrutura de Arquivos da Aplicação

A arquitetura do projeto segue o padrão modular do ecossistema Vue, separando os componentes reutilizáveis das visões estruturais de página:

```text
🔗 Estrutura do Projeto
└── src/
    ├── components/
    │   ├── AlertaComponent.vue         # Alertas semânticos reutilizáveis (sucesso, erro, aviso)
    │   ├── BannerComponent.vue         # Banner principal da home page com identidade visual
    │   ├── NavBarComponent.vue         # Barra de navegação responsiva com a marca Âmbar Café
    │   └── ListagemPedidosComponent.vue # Componente para renderizar a tabela/cards de pedidos ativos
    ├── views/
    │   ├── HomeView.vue                # Página introdutória da cafeteria gourmet
    │   ├── MenuView.vue                # Cardápio completo de cafés, lanches e doces
    │   ├── ConfiguracaoPedidoView.vue  # Tela de customização, opcionais e cálculo dinâmico do total
    │   └── PedidosView.vue             # Tela de acompanhamento e monitoramento de pedidos em tempo real
    ├── router/
    │   └── index.js                    # Configuração de rotas de navegação do Vue Router
```

## 🔗*Links e Ecossistema do Projeto*
*Para garantir total transparência no processo de avaliação, abaixo estão listados os endereços ativos de produção e código-fonte:*

### 🌐 Link de Produção (Front-end na Vercel): https://ambar-cafe.vercel.app/

### ⚡ Link da API (Back-end no Render): https://api-ambarcafe.onrender.com

*(A API monitora e persiste o banco de dados dinamicamente na rota /pedidos)*

### 📂 Links dos Repositórios (GitHub): * Código-Fonte do Front-end (AmbarCafe)

🔗 *Código-Fonte do API (api-AmbarCafe): https://github.com/LettiCardoso/api-AmbarCafe* 

🔗 *Código-Fonte do FrontEnd no GitHub: https://github.com/LettiCardoso/AmbarCafe*

*Developed by Letícia Cardoso, for Academic Purposes • Vue 3 & Node.js Rest API.*