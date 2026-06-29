<template>
  <nav id="nav-bar">
    <router-link to="/" id="logo-container">
      <span class="brand-title">Âmbar Café</span>
    </router-link>

    <div id="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/menu">Menu</router-link>
      <router-link to="/pedidos">Pedidos</router-link>
    </div>

    <div id="nav-actions">
      <router-link to="/menu" class="btn-nav-action">
        Fazer Pedido
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBarComponent"
}
</script>

<style scoped>
#nav-bar {
  background-color: #eae3da;
  padding: 0 40px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(43, 27, 18, 0.08);
  /* Navbar fixa no topo */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 16px rgba(43, 27, 18, 0.06);
}

#logo-container {
  text-decoration: none;
}

.brand-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  color: #2b1b12;
  letter-spacing: -0.5px;
}

#nav-links {
  display: flex;
  gap: 35px;
}

#nav-links a {
  font-family: 'Plus Jakarta Sans', sans-serif;
  text-decoration: none;
  color: #5c4d43;
  font-weight: 500;
  font-size: 15px;
  transition: color 0.2s ease;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
}

#nav-links a:hover {
  color: #2b1b12;
}

#nav-links a.router-link-exact-active {
  color: #2b1b12;
  font-weight: 600;
  border-bottom-color: #2b1b12;
}

.btn-nav-action {
  font-family: 'Plus Jakarta Sans', sans-serif;
  display: inline-block;
  background-color: #2b1b12;
  color: #f7f3ee !important;
  text-decoration: none;
  padding: 11px 26px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.4px;
  box-shadow: 0 4px 12px rgba(43, 27, 18, 0.15);
  transition: all 0.2s ease;
}

.btn-nav-action:hover {
  background-color: #4a3427;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(43, 27, 18, 0.25);
}

@media (max-width: 768px) {
  #nav-bar {
    padding: 0 20px;
    flex-wrap: wrap;
    height: auto;
    padding: 16px 20px;
  }
  #nav-links {
    gap: 20px;
  }
  .btn-nav-action {
    padding: 9px 18px;
    font-size: 13px;
  }
}
</style>