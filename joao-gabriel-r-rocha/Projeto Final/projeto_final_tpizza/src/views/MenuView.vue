<template>
  <div>
    <h1>Menu</h1>

    <AlertaComponent
      v-if="alerta"
      :tipo="alerta.tipo"
      :mensagem="alerta.mensagem"
      @fechar="alerta = null"
    />

    <div id="scroll-horizontal">
      <div id="card-content" v-for="pizza in listaMenuPizzas" :key="pizza.id">
        <div id="card-linha">
          <div class="foto-pizza">
            <img :src="pizza.foto" alt="foto da pizza" />
            <div class="card-coluna">
              <p id="nome-content">{{ pizza.nome }}</p>
              <p id="preco-content">R$ {{ pizza.valor }},00</p>
              <p id="descricao-content">{{ pizza.descricao }}</p>
              <button @click="selecionarPizza(pizza)">Selecionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "MenuView",
  components: {
    AlertaComponent,
  },
  data() {
    return {
      listaMenuPizzas: [],
      alerta: null,
    };
  },
  methods: {
    async consultarMenu() {
      try {
        const response = await fetch(`${this.$apiUrl}/menu`);
        if (!response.ok) throw new Error("Falha ao carregar o menu");
        const dados = await response.json();
        this.listaMenuPizzas = dados.pizzas;
      } catch (erro) {
        console.error(erro);
        this.alerta = {
          tipo: "erro",
          mensagem: "Não foi possível carregar o menu. Tente novamente.",
        };
      }
    },
    selecionarPizza(pizzaSelecionada) {
      const param = JSON.stringify(pizzaSelecionada);
      const pizzaJson = encodeURIComponent(param);
      this.$router.push({ path: "/config", query: { pizza: pizzaJson } });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>
<style scoped>
#card-content {
  display: inline-block;
  width: 280px;
  min-height: 500px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px #444;
  position: relative;
  overflow: hidden;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 700px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -15px grey;
}

.foto-pizza img {
  width: 100%;
  object-fit: cover;
  max-height: 200px;
  border-radius: 10px 0 0;
}

#nome-content {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px;
}

#preco-content {
  font-size: 35px;
  text-align: center;
  font-weight: bold;
  color: #1e8449;
  margin: 16px;
}

#descricao-content {
  font-size: 16px;
  text-align: left;
  color: gray;
  margin: 16px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}

.card-coluna button {
  margin-top: auto;
  padding: 10px;
  background-color: #c0392b;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  width: 80%;
  margin: 20px;
  cursor: pointer;
  transition: 0.5s;
}

.card-coluna button:hover {
  background-color: transparent;
  color: #c0392b;
  border-radius: 8px;
  border: solid 1px #c0392b;
}
</style>
