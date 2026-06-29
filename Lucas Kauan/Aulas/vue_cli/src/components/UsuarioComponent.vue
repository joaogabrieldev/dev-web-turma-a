<template>
  <div>
    <p>Nome: {{ nome }}</p>
    <p>Email: {{ email }}</p>
    <hr />
    <h1 v-show="isBrasaCampeao">Brasil Campeão</h1>
    <img :src="urlImg" width="300" height="200" />
  </div>
</template>

<script>
export default {
  name: "UsuarioComponent",
  data() {
    return {
      nome: "Fernando Dias",
      email: "fernando@gmail.com",
      isBrasaCampeao: false,
      urlImg:
        "https://conteudo.imguol.com.br/c/splash/84/2022/12/01/fernan-martins-gerou-meme-ao-comemorar-gol-do-brasil-na-copa-do-mundo-de-2014-1669937493331_v2_3x4.jpg",
    };
  },
  mounted() {
    setTimeout(() => {
      this.isBrasaCampeao = true;
    }, 4 * 1000);

    setTimeout(() => {
      this.isBrasaCampeao = false;
      this.urlImg = "https://aventurasnahistoria.com.br/wp-content/uploads/brasil/gaucho_da_copa_1.jpg";
    }, 8 * 1000);
  },
};
</script>

<style></style>