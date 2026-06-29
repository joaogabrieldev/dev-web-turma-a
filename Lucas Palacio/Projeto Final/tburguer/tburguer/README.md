# ☕ Cafeteria — Sistema de Pedidos Web
# Nome do site é starbucks  

> Projeto desenvolvido como atividade acadêmica no CEUB, baseado no sistema T-Burguer e adaptado para o segmento de **cafeteria**. Todo o código do projeto encontra-se na pasta **`Tburguer/`** deste repositório.

---

## 🔗 Links Rápidos

| Recurso | URL |
|---|---|
| 🌐 **Aplicação em Produção** | [https://dev-web-turma-a-vh9z.vercel.app](https://dev-web-turma-a-vh9z.vercel.app) |
| 🗄️ **API (JSON Server)** | [https://api-tburguer-im0t.onrender.com](https://api-tburguer-im0t.onrender.com) |
| 📁 **Repositório GitHub** | [https://github.com/LucasPalacio/dev-web-turma-a](https://github.com/LucasPalacio/dev-web-turma-a) |

---

## 📌 Visão Geral

O sistema foi migrado do modelo original de hamburgueria (**T-Burguer**) para uma **cafeteria**, com substituição completa da identidade visual, nomenclatura, campos de formulário e regras de negócio.

### Principais alterações realizadas

**Identidade Visual e Nomenclatura**

O nome, logotipo e paleta de cores foram trocados para refletir o universo de cafeteria. Termos como "Ponto da Carne" foram substituídos por opções pertinentes ao novo segmento — tamanho do copo, escolha de bebida base (espresso, cappuccino, latte etc.) e adicionais (leite vegetal, calda, cobertura).

**Campos e Formulários**

Os campos de pedido foram reestruturados para o contexto de cafeteria:

```vue
<!-- Antes (hamburgueria) -->
<select v-model="pedido.pontosCarne">
  <option>Mal passado</option>
  <option>Bem passado</option>
</select>

<!-- Depois (cafeteria) -->
<!-- Café escolhido pelo menu -->
<select v-model="pedido.cafe">
  <option v-for="cafe in menu.cafes" :value="cafe">{{ cafe.nome }}</option>
  <!-- Espresso R$7 | Cappuccino R$12 | Latte R$13 | Mocha R$15 | Café Coado R$8 | Macchiato R$10 -->
</select>

<!-- Tamanho da bebida -->
<select v-model="pedido.tamanho">
  <option v-for="t in tamanhos" :value="t">{{ t.descricao }}</option>
  <!-- Pequeno (180ml) | Médio (300ml) | Grande (450ml) -->
</select>

<!-- Tipo de leite -->
<select v-model="pedido.tipoLeite">
  <option v-for="l in tiposLeite" :value="l">{{ l.descricao }}</option>
  <!-- Leite integral | Leite desnatado | Leite vegetal (aveia) | Sem leite -->
</select>
```

**Dados da API**

O `db.json` foi estruturado com entidades reais de cafeteria. Exemplo de um pedido registrado:

```json
{
  "pedidos": [
    {
      "id": 1,
      "nome": "Yan",
      "cafe": { "id": 1, "nome": "Espresso", "valor": 7 },
      "tamanho": { "id": 1, "descricao": "Pequeno (180ml)" },
      "tipoLeite": { "id": 4, "descricao": "Sem leite" },
      "adicionais": [
        { "id": 1, "nome": "Dose extra de espresso", "valor": 4 }
      ],
      "acompanhamentos": [
        { "id": 1, "nome": "Cookie de chocolate", "valor": 8 }
      ],
      "statusId": "2"
    }
  ]
}
```

O banco conta ainda com as coleções `menu` (cafés e especiais), `opcionais` (adicionais e acompanhamentos), `tamanhos`, `tipos_leite` e `status_pedido`, todas alimentando os selects e listagens da aplicação via JSON Server.

---

## 🔔 Solução Técnica dos Alertas Semânticos

O sistema implementa um componente `AlertaComponent.vue` reutilizável com quatro tipos semânticos: **erro**, **aviso**, **info** e **sucesso**. Ele é usado em dois componentes: `PedidoComponent.vue` (criação de pedido) e `ListaPedidoComponent.vue` (exclusão e atualização de status).

### 1. O componente `AlertaComponent.vue`

Recebe três props — `tipo`, `mensagem` e `visivel` — e renderiza condicionalmente com `v-if`. O ícone é gerado pelo método `obterIcone()` a partir de um mapeamento simples por tipo.

```vue
<!-- components/AlertaComponent.vue -->
<template>
  <div v-if="visivel" :class="['alerta', `alerta-${tipo}`]" role="alert">
    <span class="alerta-icone">{{ obterIcone() }}</span>
    <span class="alerta-mensagem">{{ mensagem }}</span>
  </div>
</template>

<script>
export default {
  name: "AlertaComponent",
  props: {
    tipo:     { type: String,  default: "info"  },
    mensagem: { type: String,  default: ""      },
    visivel:  { type: Boolean, default: false   },
  },
  methods: {
    obterIcone() {
      const icones = { erro: "✕", aviso: "⚠", info: "ℹ", sucesso: "✓" };
      return icones[this.tipo] || "ℹ";
    },
  },
};
</script>
```

### 2. Cores semânticas (CSS scoped)

Cada tipo tem fundo, cor de texto e borda-esquerda distintos. O ícone é exibido dentro de um círculo colorido de 26px.

```css
.alerta-erro    { background: #fdecea; color: #b71c1c; border-color: #c62828; }
.alerta-aviso   { background: #fff4e5; color: #9c4d00; border-color: #ef6c00; }
.alerta-info    { background: #e8f1fb; color: #0d47a1; border-color: #1565c0; }
.alerta-sucesso { background: #e9f7ef; color: #1b5e20; border-color: #2e7d32; }
```

### 3. Método `mostrarAlerta` e scroll automático

Cada componente que usa alertas declara um objeto reativo `alerta` em `data()` e um método `mostrarAlerta`. Após atualizar o estado, o método usa `$nextTick` + `scrollIntoView` para rolar a tela até o alerta, garantindo visibilidade mesmo em telas menores.

```js
// Declarado em data() de PedidoComponent e ListaPedidoComponent
alerta: { visivel: false, tipo: "info", mensagem: "" },

// Método compartilhado nos dois componentes
mostrarAlerta(tipo, mensagem) {
  this.alerta = { visivel: true, tipo, mensagem };
  this.$nextTick(() => {
    const el = this.$refs.alertaRef.$el;
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
},
```

### 4. Validação antes do envio (`PedidoComponent.vue`)

O método `validarPedido()` bloqueia o `submit` e exibe alertas de **erro** ou **aviso** para cada campo faltante, sem enviar nenhuma requisição à API.

```js
validarPedido() {
  if (!this.cafe || !this.cafe.nome) {
    this.mostrarAlerta("aviso", "Volte ao Menu e selecione um café antes de continuar.");
    return false;
  }
  if (this.nomeCliente.trim() === "") {
    this.mostrarAlerta("erro", "Informe o nome do cliente para continuar.");
    return false;
  }
  if (this.tipoLeiteSelecionado === "") {
    this.mostrarAlerta("erro", "Selecione o tipo de leite do seu café.");
    return false;
  }
  if (this.tamanhoSelecionado === "") {
    this.mostrarAlerta("erro", "Selecione o tamanho do seu café.");
    return false;
  }
  return true;
},
```

### 5. Fluxo completo: criar, excluir e atualizar status

| Ação | Resultado positivo | Resultado negativo |
|---|---|---|
| Confirmar pedido | `sucesso` → redireciona para `/pedidos` em 1,2s | `erro` — falha na API |
| Excluir pedido | `sucesso` → lista atualizada na hora (filter local) | `erro` — falha na API |
| Atualizar status | `info` — status salvo via PATCH | `erro` — falha na API |

```js
// Criar pedido (PedidoComponent.vue)
this.mostrarAlerta("sucesso", "Pedido confirmado com sucesso!");
setTimeout(() => { this.$router.push("/pedidos"); }, 1200);

// Excluir pedido (ListaPedidoComponent.vue) — atualiza a lista sem recarregar
this.listaPedidosRealizados = this.listaPedidosRealizados.filter(p => p.id !== id);
this.mostrarAlerta("sucesso", "Pedido excluído com sucesso!");

// Atualizar status (ListaPedidoComponent.vue)
this.mostrarAlerta("info", "Status do pedido atualizado.");
```

---

## 🗂️ Estrutura do Projeto

```
Tburguer/          ← Todo o código do projeto está aqui
├── src/
│   ├── components/
│   │   └── AlertaFeedback.vue
│   ├── composables/
│   │   └── useAlerta.js
│   ├── views/
│   │   ├── PedidoForm.vue
│   │   └── ListaPedidos.vue
│   ├── router/
│   │   └── index.js
│   └── App.vue
├── db.json          ← Base de dados do JSON Server
└── package.json
```

---

## 🛠️ Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/LucasPalacio/dev-web-turma-a.git
cd dev-web-turma-a/Tburguer

# 2. Instale as dependências
npm install

# 3. Inicie o JSON Server (API mock) — em um terminal separado
npm run bancojson

# 4. Inicie a aplicação Vue — em outro terminal
npm run serve
```

---

## 👨‍💻 Autor

**Lucas Palácio** — CEUB · Desenvolvimento Web · Turma A

---

*Projeto acadêmico — CEUB 2025/2026*
