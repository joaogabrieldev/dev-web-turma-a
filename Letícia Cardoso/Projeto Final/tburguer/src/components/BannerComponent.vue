<template>
  <div class="banner-wrapper">
    <div class="hero-cover">
      <div class="hero-content-overlay">
        <div class="hero-badge">ARTESANAL &amp; FRESCO</div>
        <h1 class="hero-title">Brewed Fresh,<br />Served Warm</h1>
        <p class="hero-subtitle">
          Sinta o aroma marcante dos grãos selecionados e a
          cremosidade perfeita em cada xícara.
        </p>
        <!-- Rota corrigida: /menu (minúsculo) -->
        <router-link to="/menu" class="btn-hero-menu">
          Conheça o Menu
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent"
};
</script>

<style scoped>
.banner-wrapper {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-cover {
  width: 100%;
  min-height: 420px;
  background-image:
    linear-gradient(rgba(43, 27, 18, 0.58), rgba(43, 27, 18, 0.68)),
    url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1400&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  border-radius: 32px;
  display: flex;
  align-items: center;
  padding: 60px;
  box-shadow: 0 20px 50px rgba(43, 27, 18, 0.18);
}

.hero-content-overlay {
  text-align: left;
  max-width: 560px;
}

.hero-badge {
  background-color: rgba(255, 255, 255, 0.15);
  color: #f5efe6;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 20px;
  border: 1px solid rgba(255,255,255,0.2);
}

.hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  color: #ffffff;
  font-size: 52px;
  line-height: 1.15;
  margin: 0 0 18px 0;
  font-weight: 700;
}

.hero-subtitle {
  color: #e3dcd5;
  font-size: 16px;
  line-height: 1.7;
  margin: 0 0 36px 0;
}

.btn-hero-menu {
  background-color: #ffffff;
  color: #2b1b12;
  padding: 15px 34px;
  border-radius: 30px;
  font-weight: 700;
  text-decoration: none;
  font-size: 15px;
  display: inline-block;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}

.btn-hero-menu:hover {
  background-color: #f5efe6;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .hero-cover {
    padding: 36px 28px;
    min-height: 320px;
  }
  .hero-content-overlay {
    text-align: center;
    margin: 0 auto;
  }
  .hero-title {
    font-size: 34px;
  }
}
</style>