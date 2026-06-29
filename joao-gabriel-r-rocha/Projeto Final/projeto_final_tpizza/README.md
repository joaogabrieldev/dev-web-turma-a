<div align="center">

# 🍕 La Forneria

### A autêntica pizza italiana, direto do forno a lenha

Front-end de uma pizzaria construído em **Vue 3 (Options API)**, evoluído a partir da base _T-Burguer_.
Montagem de pedidos, validação de campos obrigatórios, feedback visual semântico e gestão de pedidos em tempo real.

![Vue](https://img.shields.io/badge/Vue.js-3.x-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vue Router](https://img.shields.io/badge/Vue_Router-4.x-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)
![json-server](https://img.shields.io/badge/json--server-API_Mock-FF6C37?style=for-the-badge&logo=json&logoColor=white)

</div>

---

## 🔗 Links

| Recurso | URL |
| --- | --- |
| 🌐 **Produção (Vercel)** | _`a configurar após o deploy`_ |
| 🛢️ **API pública (Render)** | _`a configurar após o deploy`_ — ex.: `https://banco-json-la-forneria.onrender.com` |
| 💻 **Repositório do front** | _`a configurar`_ |
| 🗄️ **Repositório da API (`banco-json`)** | _`a configurar`_ |

> ⚠️ O plano gratuito do Render **hiberna** após inatividade. O **primeiro request** depois de um período ocioso pode demorar alguns segundos (_cold start_) — comportamento esperado e aceitável para fins acadêmicos.

---

## 🍅 Visão Geral

Este projeto **evolui** a hamburgueria _T-Burguer_ para a pizzaria **La Forneria**, mantendo fidelidade total à stack original: **Vue 3 com Options API**, `vue-router`, `fetch` nativo, CSS `scoped` e **zero dependências novas**. Os ícones de feedback são **emojis** (`❌ ⚠️ ℹ️ ✅`), sem bibliotecas de ícones.

### Mudanças de domínio (mapa de renomeação)

A virada de segmento foi feita renomeando coleções/campos de forma **consistente** entre o `db.json`, os `fetch` e as variáveis do código:

| T-Burguer | La Forneria |
| --- | --- |
| `tipos_pontos` | `tamanhos` (Broto, Média, Grande, Família) |
| `menu.burgues` | `menu.pizzas` (6 sabores) |
| `opcionais.complemento` | `opcionais.adicionais` (Bordas / Adicionais) |
| `pedido.ponto` | `pedido.tamanho` |
| `pedido.burguer` | `pedido.pizza` |
| `pedido.complemento` | `pedido.adicionais` |

No código, isso refletiu em renomeações como `getTipoPontos() → getTamanhos()`, `pontoCarneSelecionado → tamanhoSelecionado`, `listaComplementos → listaAdicionais` e `hamburguerSelecionado → pizzaSelecionada`.

### Mudanças visuais

Nova identidade com **paleta tomate / manjericão / creme** e logo em texto + emoji:

```html
<!-- NavBarComponent.vue -->
<router-link to="/" id="logo-url">
  <span id="logo">🍕 La Forneria</span>
</router-link>
```

```css
#nav {
  background-color: #2c2c2c;        /* escuro  */
  border-bottom: #c0392b 4px solid; /* tomate  */
}
#nav a { color: #c0392b; }          /* tomate  */
#nav a:hover { color: #fff8f0; }    /* creme   */
```

| Token | Cor |
| --- | --- |
| 🍅 Tomate | `#C0392B` |
| 🌿 Manjericão | `#1E8449` |
| 🥛 Creme | `#FFF8F0` |
| ⬛ Escuro | `#2C2C2C` |

### Jornada do usuário

```
Menu de pizzas → seleciona pizza → /config (nome, tamanho, bordas/adicionais, bebidas)
   → valida obrigatórios → POST → alerta verde ✅ → redireciona para /pedidos (2s)
   → lista já atualizada → altera status (alerta azul ℹ️) / remove pedido (some na hora + alerta verde ✅)
```

---

## 🚨 Solução Técnica dos Alertas

O coração da camada de UX é o componente reutilizável **`AlertaComponent.vue`**, usado tanto no `PedidoComponent` quanto no `ListaPedidoComponent` (e no `MenuView`) apenas variando as **props**.

### 1. Componente único, dirigido por `props` + `computed`

O tipo do alerta (`erro | aviso | info | sucesso`) é mapeado dinamicamente para **ícone + classe CSS** por uma `computed`. Acessibilidade básica: nunca dependemos só da cor — sempre **cor + ícone + texto**.

```js
// AlertaComponent.vue
props: {
  tipo:     { type: String, default: "info" },
  mensagem: { type: String, default: "" },
  duracao:  { type: Number, default: 4000 },
},
computed: {
  config() {
    const mapa = {
      erro:    { icone: "❌", classeCss: "alerta-erro" },    // vermelho
      aviso:   { icone: "⚠️", classeCss: "alerta-aviso" },   // laranja
      info:    { icone: "ℹ️", classeCss: "alerta-info" },    // azul
      sucesso: { icone: "✅", classeCss: "alerta-sucesso" }, // verde
    };
    return mapa[this.tipo] || mapa.info;
  },
},
mounted() {
  // auto-dismiss: avisa o pai para esconder o alerta após `duracao`
  setTimeout(() => this.$emit("fechar"), this.duracao);
},
```

```html
<div class="alerta" :class="config.classeCss">
  <span class="alerta-icone">{{ config.icone }}</span>
  <span class="alerta-mensagem">{{ mensagem }}</span>
</div>
```

### 2. Exibição dinâmica no pai (`v-if` + `:key` + `@fechar`)

Cada tela guarda um objeto `alerta` no `data`. Um método `mostrarAlerta(tipo, mensagem)` troca o conteúdo **e incrementa um `alertaKey`**. O `:key` força a **remontagem** do componente a cada novo alerta, garantindo que o `setTimeout` de auto-dismiss reinicie — mesmo quando a mesma mensagem é exibida duas vezes seguidas.

```html
<AlertaComponent
  v-if="alerta"
  :key="alertaKey"
  :tipo="alerta.tipo"
  :mensagem="alerta.mensagem"
  @fechar="alerta = null"
/>
```

```js
mostrarAlerta(tipo, mensagem) {
  this.alertaKey++;
  this.alerta = { tipo, mensagem };
}
```

### 3. Validação efetiva antes do POST

A confirmação só envia a requisição quando os obrigatórios estão preenchidos. Nome **só com espaços** é tratado com `.trim()`, e o duplo clique é bloqueado por uma flag `enviando`.

```js
async criarPedido(e) {
  e.preventDefault();

  if (this.pizzaAusente) {                 // ⚠️ sem pizza selecionada
    this.mostrarAlerta("aviso", "Selecione uma pizza no menu antes de montar o pedido.");
    return;
  }
  if (!this.nomeCliente.trim() || !this.tamanhoSelecionado) {  // ❌ obrigatórios
    this.mostrarAlerta("erro", "Preencha os campos obrigatórios: Nome e Tamanho.");
    return;                                 // não envia, não navega
  }

  if (this.enviando) return;                // anti duplo clique
  this.enviando = true;

  try {
    const req = await fetch(`${this.$apiUrl}/pedidos`, { method: "POST", /* ... */ });
    if (!req.ok) throw new Error();
    this.mostrarAlerta("sucesso", "Pedido realizado com sucesso! 🍕");  // ✅
    setTimeout(() => this.$router.push("/pedidos"), 2000);              // redireciona
  } catch {
    this.enviando = false;
    this.mostrarAlerta("erro", "Não foi possível enviar o pedido. Verifique sua conexão.");
  }
}
```

### 4. Re-render imediato na exclusão (sem itens fantasma)

Ao remover um pedido, a linha some **na hora** via `filter`, sem refresh — e só então o alerta verde aparece. Se o `DELETE` falhar, a linha permanece e mostramos erro.

```js
async deletarPedido(id) {
  try {
    const response = await fetch(`${this.$apiUrl}/pedidos/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error();
    this.listaPedidosRealizados = this.listaPedidosRealizados.filter((p) => p.id !== id);
    this.mostrarAlerta("sucesso", "Pedido removido com sucesso.");      // ✅
  } catch {
    this.mostrarAlerta("erro", "Não foi possível remover o pedido. Tente novamente."); // ❌
  }
}
```

---

## 🧱 Estrutura

```
projeto_final_tpizza/
├── db/
│   └── db.json                 # seed da API (tamanhos, pizzas, adicionais, bebidas, pedidos, status)
├── public/
│   └── index.html              # <title>La Forneria 🍕</title>
├── src/
│   ├── components/
│   │   ├── AlertaComponent.vue       # 🚨 alerta semântico reutilizável (NOVO)
│   │   ├── BannerComponent.vue       # banner de pizzaria
│   │   ├── NavBarComponent.vue       # logo 🍕 La Forneria + paleta nova
│   │   ├── PedidoComponent.vue       # form: nome, tamanho, adicionais, bebidas + validação
│   │   └── ListaPedidoComponent.vue  # tabela de pedidos, status e exclusão
│   ├── views/
│   │   ├── MenuView.vue
│   │   ├── ConfiguracaoPedidoVIew.vue
│   │   └── PedidosView.vue
│   ├── router/index.js
│   ├── App.vue
│   └── main.js                 # injeta this.$apiUrl a partir de VUE_APP_API_BASE_URL
├── vercel.json                 # rewrite SPA (refresh em /pedidos não dá 404)
└── package.json
```

---

## 🚀 Como rodar localmente

Pré-requisito: **Node.js** instalado.

```bash
# 1. Instalar dependências
npm install

# 2. Subir a API mock (json-server) na porta 3000
npm run bancojson
#   Alunos do CEUB (se o atalho falhar):
#   node node_modules/json-server/lib/cli/bin.js --watch db/db.json --port 3000

# 3. Em outro terminal, subir o front (porta 8080)
npm run serve
```

O front lê a URL da API de `VUE_APP_API_BASE_URL`. Em desenvolvimento, o `.env.development` já aponta para `http://localhost:3000`. Use o `.env.exemplo` como referência.

```bash
# Build de produção
npm run build
```

---

## ☁️ Deploy

### Front-end — Vercel

O `vercel.json` na raiz garante o roteamento SPA (dar **refresh** em `/pedidos` **não** retorna 404):

```json
{ "rewrites": [ { "source": "/(.*)", "destination": "/index.html" } ] }
```

Configure a env **`VUE_APP_API_BASE_URL`** na Vercel apontando para a URL pública do Render.

### API — Render (repositório `banco-json`)

Em um repositório separado contendo o `db.json`, o `package.json` deve expor:

```json
"scripts": {
  "start": "json-server --watch db.json --host 0.0.0.0 --port $PORT"
}
```

> O Render injeta a porta em `$PORT`; o bind em `0.0.0.0` é **obrigatório**.

---

## 📦 Fora do escopo (V2)

Pizza meio a meio, cálculo de preço por tamanho, login/autenticação, carrinho com múltiplas pizzas, responsividade avançada e persistência real de banco (segue mockado com json-server).

---

<div align="center">

Feito com 🍕 e Vue 3 — **La Forneria**

</div>
