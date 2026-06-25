<template>
  <div>
    <div id="menu-header">
      <h1>Cardápio</h1>
    </div>

    <!-- ABAS -->
    <div id="abas">
      <button
        class="aba"
        :class="{ ativa: categoriaAtiva === 'salgadas' }"
        @click="categoriaAtiva = 'salgadas'"
      >
        Pizzas Salgadas
      </button>
      <button
        class="aba"
        :class="{ ativa: categoriaAtiva === 'doces' }"
        @click="categoriaAtiva = 'doces'"
      >
        Pizzas Doces
      </button>
    </div>

    <div id="scroll-horizontal">
      <div
        id="card-content"
        v-for="pizza in listaPizzasAtivas"
        :key="pizza.id"
      >
        <div class="foto-pizza">
          <img :src="pizza.foto" alt="foto da pizza" />
          <span v-if="pizza.categoria === 'doce'" class="badge-doce">Doce</span>
          <div class="card-coluna">
            <p class="nome-content">{{ pizza.nome }}</p>
            <p class="preco-content">R$ {{ pizza.valor }},00</p>
            <p class="descricao-content">{{ pizza.descricao }}</p>
            <div class="ingredientes-preview">
              <span
                v-for="(ing, i) in pizza.ingredientes"
                :key="i"
                class="tag-ingrediente"
              >{{ ing }}</span>
            </div>
            <button @click="selecionarPizza(pizza)">Pedir agora</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaSalgadas: [],
      listaDoces: [],
      categoriaAtiva: "salgadas",
    };
  },
  computed: {
    listaPizzasAtivas() {
      return this.categoriaAtiva === "salgadas"
        ? this.listaSalgadas
        : this.listaDoces;
    },
  },
  methods: {
    async consultarCardapio() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaSalgadas = dados.salgadas;
      this.listaDoces = dados.doces;
    },
    selecionarPizza(pizzaSelecionada) {
      const pizzaJson = encodeURIComponent(JSON.stringify(pizzaSelecionada));
      this.$router.push({ path: "/config", query: { pizza: pizzaJson } });
    },
  },
  mounted() {
    this.consultarCardapio();
  },
};
</script>

<style scoped>
#menu-header {
  padding: 0 20px;
}

h1 {
  color: #6d4c41;
  font-family: Georgia, serif;
  font-size: 32px;
  border-left: 5px solid #2e7d32;
  padding-left: 16px;
  margin: 24px 0 0 0;
  text-align: left;
}

#abas {
  display: flex;
  gap: 0;
  margin: 20px 20px 0;
  border-bottom: 2px solid #e0e0e0;
}

.aba {
  padding: 12px 28px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  background: none;
  color: #9e9e9e;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: color 0.2s, border-color 0.2s;
}

.aba.ativa {
  color: #c62828;
  border-bottom-color: #c62828;
}

.aba:hover:not(.ativa) {
  color: #6d4c41;
}

#card-content {
  display: flex;
  flex-direction: column;
  min-width: 260px;
  width: 260px;
  min-height: 520px;
  flex-shrink: 0;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background: #ffffff;
  position: relative;
  scroll-snap-align: start;
  transition: transform 0.2s, box-shadow 0.2s;
}

#card-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
}

#scroll-horizontal {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 20px 24px 28px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

#scroll-horizontal::-webkit-scrollbar {
  height: 6px;
}

#scroll-horizontal::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

#scroll-horizontal::-webkit-scrollbar-thumb {
  background: #c62828;
  border-radius: 10px;
}

.foto-pizza {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.foto-pizza img {
  width: 100%;
  object-fit: cover;
  height: 190px;
  border-radius: 14px 14px 0 0;
  display: block;
}

.badge-doce {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #c62828;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

.card-coluna {
  padding: 10px 12px 14px;
  white-space: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.nome-content {
  font-size: 19px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 8px 0 4px;
  color: #6d4c41;
  font-family: Georgia, serif;
}

.preco-content {
  font-size: 26px;
  text-align: center;
  font-weight: bold;
  color: #c62828;
  margin: 4px 0;
}

.descricao-content {
  font-size: 12px;
  text-align: left;
  color: #9e9e9e;
  margin: 6px 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: 100%;
}

.ingredientes-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  margin-bottom: 12px;
  width: 100%;
}

.tag-ingrediente {
  background: #f5f5f5;
  color: #6d4c41;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
}

.card-coluna button {
  padding: 11px;
  background-color: #c62828;
  color: #ffffff;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  width: 90%;
  cursor: pointer;
  transition: 0.25s;
  margin-top: auto;
}

.card-coluna button:hover {
  background-color: #2e7d32;
}
</style>
