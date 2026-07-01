# Cantinho do Salgado - entrega final

Sistema de pedidos online para a loja de salgados **Cantinho do Salgado**, desenvolvido com **Vue 3** como evolução e customização do projeto base T-Burguer.

---

## Visão Geral

O projeto T-Burguer foi transformado em uma **loja de salgados artesanais**. O novo segmento comercial exigiu as seguintes alterações visuais e estruturais:

### Alterações Visuais
- Nova identidade: nome, logo (`logo_cantinho.png`) e banner da loja substituídos
- Paleta de cores mantida (dourado/escuro) adaptada ao novo contexto
- Ícone de lixeira atualizado para a identidade laranja da marca

### Alterações Estruturais no Código

**1. Substituição dos produtos no `db.json`**

O campo `burgues` foi renomeado para `salgados` e os 7 hambúrgueres foram substituídos por 4 salgados:

```json
"salgados": [
  { "id": 1, "nome": "Coxinha", "foto": "/img/coxinha.jpg", "valor": 8 },
  { "id": 2, "nome": "Bolinha de Queijo", "foto": "/img/bolinha_queijo.png", "valor": 6 },
  { "id": 3, "nome": "Kibe", "foto": "/img/kibe.jpg", "valor": 7 },
  { "id": 4, "nome": "Pastel de Queijo", "foto": "/img/pastel_queijo.jpg", "valor": 9 }
]
```

**2. Remoção do campo "Ponto da Carne"**

O campo `tipos_pontos` foi removido do banco de dados e o bloco de seleção foi removido do `PedidoComponent.vue`, pois não faz sentido para salgados.

**3. Complementos adaptados ao novo segmento**

```json
"complemento": [
  { "id": 1, "nome": "Molho Especial", "valor": 2 },
  { "id": 2, "nome": "Queijo Extra", "valor": 3 }
]
```

**4. Payload do pedido adaptado**

A propriedade `hamburguer` foi substituída por `salgado` no objeto enviado à API:

```javascript
const pedido = {
  nome: this.nomeCliente,
  salgado: this.salgado,
  complementos: this.complementosSelecionados,
  bebidas: this.bebidasSelecionadas,
  statusId: 1,
};
```

---

## Solução Técnica dos Alertas Semânticos

Os alertas foram implementados sem bibliotecas externas, usando apenas recursos nativos do Vue 3 (Options API).

### Estrutura de dados do alerta

Em `data()`, uma propriedade reativa `msg` armazena o estado do alerta:

```javascript
data() {
  return {
    msg: null, // { texto: String, tipo: 'sucesso' | 'erro' | 'aviso' | 'info' }
  };
},
```

### Exibição dinâmica no template

A diretiva `v-if` controla a visibilidade e `:class` aplica a classe semântica de cor:

```html
<div v-if="msg" :class="['alerta', msg.tipo]">
  <span class="alerta-icone">{{ iconeAlerta(msg.tipo) }}</span>
  {{ msg.texto }}
</div>
```

### Método de ícones

```javascript
iconeAlerta(tipo) {
  const icones = { sucesso: "✔", erro: "✖", aviso: "⚠", info: "ℹ" };
  return icones[tipo] || "";
},
```

### Classes CSS semânticas

```css
.alerta   { padding: 12px 16px; border-radius: 8px; font-weight: bold; }
.sucesso  { background-color: #28a745; color: white; } /* Verde    — Sucesso */
.erro     { background-color: #dc3545; color: white; } /* Vermelho — Erro   */
.aviso    { background-color: #fd7e14; color: white; } /* Laranja  — Aviso  */
.info     { background-color: #17a2b8; color: white; } /* Azul     — Info   */
```

### Fluxo de validação no formulário

```javascript
async createPedido() {
  if (!this.nomeCliente) {
    this.msg = { texto: "Por favor, informe seu nome!", tipo: "aviso" };
    return;
  }
  if (!this.salgado) {
    this.msg = { texto: "Nenhum salgado selecionado!", tipo: "erro" };
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/pedidos", { ... });
    if (response.ok) {
      this.msg = { texto: "Pedido realizado com sucesso!", tipo: "sucesso" };
      setTimeout(() => { this.$router.push("/pedidos"); }, 2000);
    }
  } catch (e) {
    this.msg = { texto: "Erro de conexão com o servidor!", tipo: "erro" };
  }
},
```

---

## Links

| | URL |
|---|---|
| **Link de Produção** | `(preencher após deploy no GitHub Pages)` |
| **Link da API (JSON Server)** | `(preencher após deploy no Render/Railway)` |
| **Repositório do Código** | `(preencher após criar repositório no GitHub)` |

---

## Como executar localmente

**Terminal 1 — Backend:**
```bash
npm run backend
```

**Terminal 2 — Frontend:**
```bash
npm run serve
```

Acesse: `http://localhost:8080`

---

## Tecnologias utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| Vue 3 | 3.2.13 | Framework frontend |
| Vue Router 4 | 4.0.3 | Navegação entre páginas |
| JSON Server | 0.17.4 | API mockada (backend) |
