<template>
  <div>
    <footer id="footer">
      <p>Bem vindo: {{ nome }} Olá Mundo do <strong>Vue.js</strong></p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: "João",
    };
  },
  name: "HomeComponent",
};
</script>

<style>
h1 {
  color: red;
}
</style>
