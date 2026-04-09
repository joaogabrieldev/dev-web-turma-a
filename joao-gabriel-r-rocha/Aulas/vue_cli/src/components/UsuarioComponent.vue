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
      nome: "João Gabriel",
      email: "joao.gabriel@sempreceub.com",
      isBrasaCampeao: false,
      urlImg:
        "https://salaonline.ceub.br/pluginfile.php/44/user/icon/ceub/f2?rev=193038",
    };
  },
  mounted() {
    setTimeout(() => {
      this.isBrasaCampeao = true;
      this.urlImg =
        "https://salaonline.ceub.br/pluginfile.php/1159/user/icon/ceub/f2?rev=2125068";
    }, 4 * 1000);
    setTimeout(() => {
      this.isBrasaCampeao = false;
      this.urlImg =
        "https://salaonline.ceub.br/pluginfile.php/44/user/icon/ceub/f2?rev=193038";
    }, 8 * 1000);
  },
};
</script>

<style></style>
