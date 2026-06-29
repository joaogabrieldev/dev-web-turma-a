<template>
  <div id="app">

    <!-- Barra de navegação simples -->
    <nav class="navbar">
      <div class="navbar-logo">
        ⚽ FutebolApp
      </div>
      <div class="navbar-links">
        <router-link to="/">🏠 Menu</router-link>
        <router-link to="/figurinhas">🃏 Figurinhas</router-link>
        
      </div>
    </nav>

    <!-- Aqui o Vue Router renderiza a página correta -->
    <router-view />

  </div>
</template>
 

<script>
import FigurinhasComponent from './components/FigurinhasComponent.vue';

export default {
  name: 'App',
  FigurinhasComponent,
 
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
  background-color: #f0f4f0;
}

/* ===== NAVBAR ===== */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a6b2e;
  padding: 15px 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.navbar-logo {
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.navbar-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Link ativo (página atual) fica destacado */
.navbar-links a.router-link-exact-active {
  background-color: white;
  color: #1a6b2e;
}
</style>
