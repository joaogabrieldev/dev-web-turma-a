<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HomeComponent />
  <TodoComponent />
  <ImagemComponent />
  <EstiloComponent />
  <UsuarioComponent />
</template>

<script>
import EstiloComponent from "./components/EstiloComponent.vue";
import HomeComponent from "./components/HomeComponent.vue";
import ImagemComponent from "./components/ImagemComponent.vue";
import TodoComponent from "../../../Atividades/atividade_todo_vue/TodoComponent.vue";
import UsuarioComponent from "./components/UsuarioComponent.vue";
export default {
  name: "App",
  components: {
    HomeComponent,
    TodoComponent,
    ImagemComponent,
    EstiloComponent,
    UsuarioComponent,
  },

  mounted() {
    console.log("mounted");
  },
  created() {
    console.log("created");
  },
  updated() {
    console.log("updated");
  },
  errorCaptured() {
    console.log("errorCaptured");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
