<template>
  <div class="album-wrapper">
    <header class="cabecalho">
      <h1>Álbum de Figurinhas Virtual</h1>
      <p>Selecione uma nação para carregar o seu plantel oficial.</p>
    </header>

    <div class="controles">
      <select 
        v-model="paisSelecionado" 
        @change="buscarFluxoCompleto"
        class="dropdown-paises"
      >
        <option disabled value="">Escolha uma Seleção...</option>
        <option 
          v-for="(pais, index) in listaDePaises" 
          :key="index" 
          :value="pais.name"
        >
          {{ pais.name }}
        </option>
      </select>
    </div>

    <div v-if="status.carregando" class="msg">Carregando figurinhas...</div>
    <div v-if="status.erro" class="msg erro">{{ status.erro }}</div>

    <main v-if="!status.carregando && jogadores.length > 0" class="album-grid">
      <div v-for="(jogador, idx) in jogadores" :key="idx" class="figurinha-card">
        <div class="figurinha-foto">
          <img :src="`https://images.weserv.nl/?url=${jogador.photo.replace(/^https?:\/\//, '')}`" :alt="jogador.name" />
        </div>
        <div class="figurinha-dados">
          <h3 class="nome">{{ jogador.name }}</h3>
          <span class="posicao">{{ jogador.position }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AlbumCopaComponent',
  data() {
    return {
      token: 'cdee437d31df9aa4eb2fcf9da8630a9e',
      listaDePaises: [],
      paisSelecionado: '',
      jogadores: [],
      status: { carregando: false, erro: '' }
    };
  },
  mounted() {
    this.obterPaises();
  },
  methods: {
    async obterPaises() {
      try {
        const res = await fetch('https://v3.football.api-sports.io/teams/countries', {
          headers: { 'x-apisports-key': this.token }
        });
        const d = await res.json();
        this.listaDePaises = d.response;
      } catch (e) {
        this.status.erro = "Erro ao carregar países.";
      }
    },
    async buscarFluxoCompleto() {
      this.status.carregando = true;
      this.status.erro = '';
      this.jogadores = [];

      try {
       
        const resTime = await fetch(`https://v3.football.api-sports.io/teams?name=${this.paisSelecionado}`, {
          headers: { 'x-apisports-key': this.token }
        });
        const dTime = await resTime.json();
        const id = dTime.response[0].team.id;

        
        const resElenco = await fetch(`https://v3.football.api-sports.io/players/squads?team=${id}`, {
          headers: { 'x-apisports-key': this.token }
        });
        const dElenco = await resElenco.json();
        this.jogadores = dElenco.response[0].players;

      } catch (e) {
        this.status.erro = "Limite de chamadas atingido ou Seleção não encontrada.";
      } finally {
        this.status.carregando = false;
      }
    }
  }
}
</script>

<style scoped>
.album-wrapper { width: 100%; }
.cabecalho { text-align: center; margin-bottom: 30px; }
.cabecalho h1 { color: #4facfe; margin-bottom: 10px; }
.controles { display: flex; justify-content: center; margin-bottom: 40px; }
.dropdown-paises {
  width: 100%; max-width: 400px; padding: 15px;
  background-color: #16213e; color: white; border: 2px solid #4facfe; border-radius: 8px;
}
.msg { text-align: center; font-size: 1.2rem; margin: 20px 0; color: #888; }
.msg.erro { color: #ff4d4d; }

.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}
.figurinha-card {
  background: #1f2a48; border-radius: 10px; overflow: hidden;
  border: 1px solid #2a3b63; transition: 0.3s;
}
.figurinha-card:hover { transform: scale(1.05); border-color: #4facfe; }
.figurinha-foto { background: white; height: 200px; }
.figurinha-foto img { width: 100%; height: 100%; object-fit: cover; }
.figurinha-dados { padding: 10px; text-align: center; }
.nome { font-size: 1rem; color: white; }
.posicao { font-size: 0.8rem; color: #4facfe; font-weight: bold; }
</style>