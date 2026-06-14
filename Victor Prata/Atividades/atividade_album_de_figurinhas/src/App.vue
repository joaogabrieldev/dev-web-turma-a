<template>
  <div id="app">

    <nav class="navbar">
      <div class="navbar-logo">
        Copa do Mundo
      </div>
      <div class="navbar-links">
        <router-link to="/">Home</router-link>
        <router-link to="/album">Álbum de Figurinhas</router-link>
      </div>
    </nav>

    <router-view />

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Reset básico */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background-color: #f0f4f8;
}

/* ===== NAVBAR ===== */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0a1e3a;
  padding: 15px 30px;
  box-shadow: 0 2px 6px rgba(7, 59, 100, 0.3);
}

.navbar-logo {
  font-size: 22px;
  font-weight: bold;
  color: #bfdbfe;
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-links a {
  color: #bfdbfe;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.navbar-links a:hover {
  background-color: rgba(191, 219, 254, 0.15);
}

.navbar-links a.router-link-exact-active {
  background-color: #1a56db;
  color: #ffffff;
}
</style>