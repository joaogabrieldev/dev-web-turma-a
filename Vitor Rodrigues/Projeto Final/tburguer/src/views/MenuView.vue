<template>
  <div>
    <h1>Menu</h1>
    <div id="scroll-horizontal">
      <div class="card-acai" v-for="acai in listaBasesAcai" :key="acai.id">
        <div class="foto-acai">
          <img :src="acai.foto" :alt="acai.nome" />
        </div>
        
        <div class="card-coluna">
          <p id="nome-content">{{ acai.nome }}</p>
          <p id="preco-content">R$ {{ acai.valor }},00</p>
          <p id="descricao-content" class="descricao">{{ acai.descricao }}</p>
          
          <button class="botao-selecionar" @click="selecionarAcai(acai)">
            Selecionar
          </button>
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
      listaBasesAcai: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaBasesAcai = dados.bases_acai || [];
      console.log(this.listaBasesAcai);
    },
    selecionarAcai(acaiSelecionado) {
      const param = JSON.stringify(acaiSelecionado);
      const acaiJson = encodeURIComponent(param);
      this.$router.push({ path: "/config", query: { acai: acaiJson } });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>

<style scoped>
#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 700px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -15px grey;
}

.card-acai {
  display: inline-flex;
  flex-direction: column;
  width: 280px;
  min-height: 520px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px #444;
  overflow: hidden;
  background-color: white;
  vertical-align: top;
}

.foto-acai img {
  width: 100%;
  object-fit: cover;
  max-height: 200px;
}

.card-coluna {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px;
}

#nome-content {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 12px 5px; 
  line-height: 1.2;  
  min-height: 48px;  
  display: flex;
  align-items: center;
  justify-content: center;
}
#preco-content {
  font-size: 35px;
  text-align: center;
  font-weight: bold;
  color: green;
  margin: 16px;
}

.descricao {
  font-size: 16px;
  text-align: left;
  color: gray;
  margin: 16px;
  flex-grow: 1; /* Faz a descrição preencher o espaço disponível */
  white-space: pre-line;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.botao-selecionar {
  margin-top: auto; /* Empurra o botão para a base do card */
  padding: 10px;
  background-color: rgb(53, 108, 121);
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  width: 80%;
  margin: 20px auto;
  cursor: pointer;
  transition: 0.5s;
}

.botao-selecionar:hover {
  background-color: transparent;
  color: darkslategray;
  border: solid 1px rgb(53, 108, 121);
}
</style>