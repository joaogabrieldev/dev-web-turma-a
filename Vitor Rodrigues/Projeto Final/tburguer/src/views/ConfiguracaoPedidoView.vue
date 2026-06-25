<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <pedido-component-vue :baseAcai="this.baseAcaiSelecionada" />
  </div>
</template>

<script>
import PedidoComponentVue from "@/components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      // Renomeado para fazer sentido com o negócio de açaí
      baseAcaiSelecionada: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    // Mudamos o parâmetro esperado da URL de 'burguer' para 'acai'
    if (query.acai) {
      const decodeAcai = JSON.parse(decodeURIComponent(query.acai));
      this.baseAcaiSelecionada = decodeAcai;
    }
  },
};
</script>

<style scoped></style>