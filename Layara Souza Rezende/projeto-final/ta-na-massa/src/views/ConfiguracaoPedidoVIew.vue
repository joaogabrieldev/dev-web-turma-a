<template>
  <div>
    <h1>Monte seu Pedido</h1>
    <pedido-component-vue :pizza="this.pizzaSelecionada" />
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
      pizzaSelecionada: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.pizza) {
      const decodePizza = JSON.parse(decodeURIComponent(query.pizza));
      this.pizzaSelecionada = decodePizza;
    }
  },
};
</script>
<style scoped>
h1 {
  color: #6d4c41;
  font-family: Georgia, serif;
  font-size: 30px;
  border-left: 5px solid #2e7d32;
  padding-left: 16px;
  margin: 24px 0 8px 20px;
  text-align: left;
}
</style>
