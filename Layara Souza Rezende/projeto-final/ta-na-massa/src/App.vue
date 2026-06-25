<template>
  <div>
    <NavBarComponent />
    <BannerComponent />
    <router-view />
  </div>
</template>
<script>
import NavBarComponent from "./components/NavBarComponent.vue";
import BannerComponent from "./components/BannerComponent.vue";
export default {
  name: "App",
  components: {
    NavBarComponent,
    BannerComponent,
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #f5f5f5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #6d4c41;
  background-color: #f5f5f5;
  min-height: 100vh;
}

nav a.router-link-exact-active {
  color: #c62828;
}
</style>
