<template>
  <div>
    <h1>Pedidos</h1>
    <lista-pedido-component-vue />
  </div>
</template>
<script>
import ListaPedidoComponentVue from "@/components/ListaPedidoComponent.vue";

export default {
  name: "PedidosView",
  components: {
    ListaPedidoComponentVue,
  },
};
</script>
<style scoped>
h1 {
  color: #6d4c41;
  font-family: Georgia, serif;
  font-size: 32px;
  border-left: 5px solid #2e7d32;
  padding-left: 16px;
  margin: 24px 0 16px 20px;
  text-align: left;
}
</style>
