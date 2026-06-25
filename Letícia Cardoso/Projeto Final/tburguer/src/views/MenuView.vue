<template>
  <div class="menu-section">
    <div class="section-header">
      <span class="section-tag">CARDÁPIO</span>
      <h2>Nossas Especialidades</h2>
      <p>Escolha o seu café perfeito, preparado por baristas experientes.</p>
    </div>

    <div class="filter-container">
      <button
        :class="['filter-btn', { active: categoriaAtiva === 'todos' }]"
        @click="categoriaAtiva = 'todos'"
      >
        Todos
      </button>
      <button
        :class="['filter-btn', { active: categoriaAtiva === 'bebidas' }]"
        @click="categoriaAtiva = 'bebidas'"
      >
        Bebidas
      </button>
      <button
        :class="['filter-btn', { active: categoriaAtiva === 'lanches' }]"
        @click="categoriaAtiva = 'lanches'"
      >
        Lanches
      </button>
    </div>

    <!-- Estado de carregamento -->
    <div v-if="carregando" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Carregando cardápio...</p>
    </div>

    <!-- Estado de erro -->
    <div v-else-if="erroApi" class="error-state">
      <span class="error-icon">☕</span>
      <p>Não conseguimos conectar ao cardápio agora.</p>
      <small>Verifique se o JSON Server está rodando: <code>json-server --watch db.json</code></small>
      <button class="btn-retry" @click="consultarMenu">Tentar novamente</button>
    </div>

    <!-- Grid de produtos -->
    <div v-else-if="produtosFiltrados.length > 0" class="grid-cafes">
      <div class="cafe-card" v-for="item in produtosFiltrados" :key="item.id">
        <div class="image-container">
          <img
            :src="item.foto || imagemFallback"
            :alt="item.nome"
            @error="(e) => e.target.src = imagemFallback"
          />
        </div>
        <div class="card-body">
          <div class="card-meta">
            <h3>{{ item.nome }}</h3>
            <span class="price">R$ {{ item.valor }}</span>
          </div>
          <p class="description">
            {{ item.descricao || 'Grãos premium moídos na hora com extração balanceada.' }}
          </p>
          <!-- Rota corrigida: /configuracao (minúsculo), passa produto como query param JSON -->
          <button class="btn-add" @click="selecionarItem(item)">
            <span>Personalizar Pedido</span>
            <i class="arrow">→</i>
          </button>
        </div>
      </div>
    </div>

    <!-- Estado vazio -->
    <div v-else class="empty-state">
      <span>🍵</span>
      <p>Nenhum item encontrado nesta categoria.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaMenuCafeteria: [],
      categoriaAtiva: "todos",
      carregando: true,
      erroApi: false,
      imagemFallback:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500&auto=format&fit=crop"
    };
  },
  computed: {
    produtosFiltrados() {
      if (this.categoriaAtiva === "todos") return this.listaMenuCafeteria;
      return this.listaMenuCafeteria.filter(
        (item) => item.categoria === this.categoriaAtiva
      );
    }
  },
  methods: {
    async consultarMenu() {
      this.carregando = true;
      this.erroApi = false;
      try {
        const response = await fetch("https://api-ambarcafe.onrender.com/menu");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const dados = await response.json();
        this.listaMenuCafeteria = Array.isArray(dados) ? dados : [];
      } catch (error) {
        console.error("Erro ao buscar o menu:", error);
        this.erroApi = true;
      } finally {
        this.carregando = false;
      }
    },
    selecionarItem(item) {
      // Navega para /configuracao passando os dados do produto como query param JSON
      this.$router.push({
        path: "/configuracao",
        query: { produto: JSON.stringify(item) }
      });
    }
  },
  mounted() {
    this.consultarMenu();
  }
};
</script>

<style scoped>
.menu-section {
  padding: 40px 40px 60px;
  max-width: 1300px;
  margin: 0 auto;
}

.section-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #8c6d53;
  display: block;
  margin-bottom: 8px;
}

.section-header {
  margin-bottom: 35px;
  text-align: left;
}

.section-header h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 36px;
  margin: 0 0 8px;
  color: #2b1b12;
}

.section-header p {
  color: #615045;
  font-size: 16px;
  margin: 0;
}

.filter-container {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  background-color: transparent;
  color: #615045;
  border: 1px solid rgba(43, 27, 18, 0.2);
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.filter-btn:hover {
  background-color: rgba(43, 27, 18, 0.05);
  color: #2b1b12;
}

.filter-btn.active {
  background-color: #2b1b12;
  color: #f7f3ee;
  border-color: #2b1b12;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(43, 27, 18, 0.15);
}

/* Loading */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #7a6a5e;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e6dfd5;
  border-top-color: #2b1b12;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin { to { transform: rotate(360deg); } }

.error-state .error-icon { font-size: 40px; display: block; margin-bottom: 12px; }
.error-state code { background: #f5efe6; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
.btn-retry {
  margin-top: 20px;
  background-color: #2b1b12;
  color: #f7f3ee;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.empty-state span { font-size: 40px; display: block; margin-bottom: 12px; }

/* Grid */
.grid-cafes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.cafe-card {
  background-color: #f7f3ee;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(43, 27, 18, 0.04);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.cafe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(43, 27, 18, 0.09);
}

.image-container {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background-color: #dfd7cc;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.cafe-card:hover .image-container img {
  transform: scale(1.06);
}

.card-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.card-meta h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: #2b1b12;
  margin: 0;
}

.price {
  font-weight: 700;
  color: #523b2e;
  font-size: 17px;
  white-space: nowrap;
}

.description {
  font-size: 14px;
  color: #615045;
  line-height: 1.55;
  margin-bottom: 20px;
  text-align: left;
  flex-grow: 1;
}

.btn-add {
  background-color: #2b1b12;
  color: #f7f3ee;
  width: 100%;
  padding: 14px 18px;
  border-radius: 14px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
}

.btn-add:hover {
  background-color: #4a3427;
}

.arrow {
  font-style: normal;
  font-weight: bold;
}

@media (max-width: 768px) {
  .menu-section { padding: 30px 20px 50px; }
}
</style>