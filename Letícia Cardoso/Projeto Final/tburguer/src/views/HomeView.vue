<template>
  <div class="home-container">
    <section class="hero-section">
      <BannerComponent />
    </section>

    <section class="features-section">
      <div class="feature-card">
        <div class="feature-icon-wrapper">✨</div>
        <h3>Grãos Selecionados</h3>
        <p>Microlotes de café 100% arábica com torra artesanal e rastreabilidade exclusiva.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon-wrapper">🥐</div>
        <h3>Confeitaria Própria</h3>
        <p>Doces finos, croissants folhados e salgados assados diariamente por especialistas.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon-wrapper">🌿</div>
        <h3>Ambiente Acolhedor</h3>
        <p>O espaço ideal com Wi-Fi ultra rápido para uma pausa relaxante ou reuniões produtivas.</p>
      </div>
    </section>

    <section class="highlights-section">
      <div class="section-header">
        <span class="section-tag">OS MAIS PEDIDOS</span>
        <h2 class="section-title">Destaques da Semana</h2>
        <p class="section-subtitle">As joias do nosso cardápio que você precisa experimentar hoje</p>
      </div>

      <div class="highlights-grid">
        <div class="product-card" v-for="item in destaques" :key="item.id">
          <div v-if="item.badge" class="product-badge">{{ item.badge }}</div>
          <div class="product-image-container">
            <!-- Imagens via Unsplash — sem dependência de arquivos locais -->
            <img :src="item.foto" :alt="item.nome" />
          </div>
          <div class="product-info">
            <h4 class="product-name">{{ item.nome }}</h4>
            <p class="product-description">{{ item.descricao }}</p>
            <div class="product-footer">
              <span class="product-price">R$ {{ item.valor }}</span>
              <!-- Rota corrigida para /configuracao (minúsculo) passando o produto como query -->
              <router-link
                :to="{ path: '/configuracao', query: { produto: JSON.stringify(item) } }"
                class="btn-add-product"
                title="Personalizar e pedir"
              >+</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BannerComponent from "@/components/BannerComponent.vue";

export default {
  name: "HomeView",
  components: {
    BannerComponent
  },
  data() {
    return {
      // Dados estáticos de destaque com imagens Unsplash — sem risco de Module not found
      destaques: [
        {
          id: 1,
          nome: "Cappuccino Trufado",
          valor: "16,90",
          badge: "Best Seller",
          descricao: "Expresso blend da casa, leite cremoso vaporizado e uma camada generosa de ganache de chocolate belga.",
          foto: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop",
          categoria: "bebidas"
        },
        {
          id: 2,
          nome: "Iced Caramel Latte",
          valor: "18,50",
          badge: null,
          descricao: "Café extraído a frio batido com leite gelado, cubos de gelo de café e calda artesanal de caramelo salgado.",
          foto: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop",
          categoria: "bebidas"
        },
        {
          id: 3,
          nome: "Croissant de Amêndoas",
          valor: "21,00",
          badge: "Fresco",
          descricao: "Massa folhada francesa crocante por fora, recheada com creme de frangipane e lascas de amêndoas tostadas.",
          foto: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
          categoria: "lanches"
        }
      ]
    };
  }
};
</script>

<style scoped>
.home-container {
  width: 100%;
  padding-bottom: 80px;
  background-color: #fcfbfa;
}

.hero-section {
  margin-top: 20px;
  margin-bottom: 60px;
}

/* === CARDS DE DIFERENCIAIS === */
.features-section {
  max-width: 1140px;
  margin: 0 auto 80px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.feature-card {
  background-color: #ffffff;
  padding: 35px 28px;
  border-radius: 24px;
  text-align: left;
  border: 1px solid rgba(43, 27, 18, 0.05);
  box-shadow: 0 10px 30px rgba(43, 27, 18, 0.02);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(43, 27, 18, 0.06);
}

.feature-icon-wrapper {
  background-color: #f5efe6;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 21px;
  color: #2b1b12;
  margin: 0 0 12px 0;
  font-weight: 700;
}

.feature-card p {
  font-size: 14.5px;
  color: #615045;
  line-height: 1.65;
  margin: 0;
}

/* === DESTAQUES === */
.highlights-section {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: left;
  margin-bottom: 45px;
}

.section-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #8c6d53;
  display: block;
  margin-bottom: 8px;
}

.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 36px;
  color: #2b1b12;
  margin: 0 0 10px 0;
}

.section-subtitle {
  font-size: 16px;
  color: #7a6a5e;
  margin: 0;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.product-card {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(43, 27, 18, 0.05);
  box-shadow: 0 10px 30px rgba(43, 27, 18, 0.02);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 26px 50px rgba(43, 27, 18, 0.08);
}

.product-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #2b1b12;
  color: #fcfbfa;
  font-size: 11px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 30px;
  z-index: 2;
  letter-spacing: 0.5px;
}

.product-image-container {
  height: 240px;
  width: 100%;
  overflow: hidden;
  background-color: #f5efe6;
}

.product-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image-container img {
  transform: scale(1.06);
}

.product-info {
  padding: 25px;
  display: flex;
  flex-direction: column;
  text-align: left;
  flex: 1;
}

.product-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 20px;
  color: #2b1b12;
  margin: 0 0 10px 0;
  font-weight: 700;
}

.product-description {
  font-size: 13.5px;
  color: #7a6a5e;
  line-height: 1.55;
  margin: 0 0 20px 0;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 20px;
  font-weight: 800;
  color: #2b1b12;
}

.btn-add-product {
  background-color: #2b1b12;
  color: #ffffff;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-weight: 400;
  line-height: 1;
}

.btn-add-product:hover {
  background-color: #4a3425;
  transform: scale(1.1);
}

@media (max-width: 992px) {
  .highlights-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .features-section,
  .highlights-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>