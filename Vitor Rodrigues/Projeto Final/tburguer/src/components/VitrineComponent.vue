<template>
  <div id="vitrine-container">
    <h2>Escolha sua Base de Açaí</h2>
    <p class="subtitulo">Selecione uma de nossas opções para começar a montar seu pedido</p>
    
    <div id="produtos-grid">
      <div 
        class="produto-card" 
        v-for="acai in listaAcais" 
        :key="acai.id"
      >
        <img :src="acai.foto || acai.imagem" :alt="acai.nome" class="produto-img" />
        <div class="produto-info">
          <h3>{{ acai.nome }}</h3>
          <button @click="selecionarProduto(acai)" class="btn-selecionar">
            Montar Meu Copo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VitrineComponent",
  data() {
    return {
      listaAcais: []
    };
  },
  methods: {
    async obterMenu() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaAcais = dados.bases_acai || [];
    },
    selecionarProduto(acai) {
      // 1. Transforma o objeto do açaí selecionado em String
      const param = JSON.stringify(acai);
      
      // 2. Codifica para o formato de URL seguro (evita quebra de caracteres)
      const acaiJson = encodeURIComponent(param);
      
      // 3. Redireciona direto para a rota de configuração passando o ID/dados via query string
      this.$router.push({ path: "/config", query: { acai: acaiJson } });
      
      // Mantém o emit caso você use o evento em algum outro componente pai
      this.$emit("produto-escolhido", acai);
    }
  },
  mounted() {
    this.obterMenu();
  }
};
</script>

<style scoped>
#vitrine-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  text-align: center;
}

h2 {
  font-size: 32px;
  color: #222;
  margin-bottom: 8px;
}

.subtitulo {
  color: #666;
  margin-bottom: 40px;
  font-size: 16px;
}

#produtos-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.produto-card {
  width: 280px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  background-color: #fff;
}

.produto-card:hover {
  transform: translateY(-5px);
}

.produto-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.produto-info {
  padding: 20px;
}

.produto-info h3 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #222;
}

.btn-selecionar {
  background-color: #222;
  color: darkgoldenrod;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: 0.3s;
}

.btn-selecionar:hover {
  background-color: darkgoldenrod;
  color: #222;
}
</style>