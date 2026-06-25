<template>
  <div id="app-layout">
    <NavBarComponent />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";

export default {
  name: "App",
  components: {
    NavBarComponent
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #fcfbfa;
  -webkit-font-smoothing: antialiased;
}

.main-content {
  padding-top: 110px;
  min-height: calc(100vh - 110px);
}
</style>