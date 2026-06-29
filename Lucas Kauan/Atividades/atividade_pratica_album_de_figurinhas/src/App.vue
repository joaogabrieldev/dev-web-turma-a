<template>
  <div id="main-layout">
    <nav class="menu-navegacao">
      <router-link to="/" class="link-nav">Início</router-link>
    </nav>

    <div class="container-view">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background-color: #1a1a2e;
  font-family: Arial, sans-serif;
  color: white;
}
#main-layout {
  min-height: 100vh;
}
.menu-navegacao {
  background-color: #0f172a;
  padding: 20px;
  text-align: center;
  border-bottom: 2px solid #4facfe;
}
.link-nav {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}
.link-nav:hover { color: #4facfe; }
.container-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
}
</style>