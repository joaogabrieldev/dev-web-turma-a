<template>
  <div id="album">
    <header>
      <h1>⚽ Álbum de Figurinhas</h1>
      <p>Selecione uma seleção para ver os jogadores</p>
      <select v-model="paisSelecionado" @change="carregarFigurinhas">
        <option value="">🌍 Selecione um país</option>
        <option v-for="pais in listaPaises" :key="pais.name" :value="pais.name">
          {{ pais.name }}
        </option>
      </select>
    </header>

    <div v-if="carregando" class="loading">Carregando jogadores...</div>

    <div id="grid-jogadores" v-if="listaJogadores.length > 0">
      <PlayerCard
        v-for="jogador in listaJogadores"
        :key="jogador.id"
        :jogador="jogador"
      />
    </div>
  </div>
</template>

<script>
import PlayerCard from '../components/PlayerCard.vue'

const TOKEN = 'd874b37d33bd55e4d9494e7bbd4d4033'

export default {
  name: 'AlbumView',
  components: { PlayerCard },
  data() {
    return {
      listaPaises: [],
      paisSelecionado: '',
      listaJogadores: [],
      carregando: false
    }
  },
  async mounted() {
    await this.carregarPaises()
  },
  methods: {
    async carregarPaises() {
      try {
        const response = await fetch('/api/teams/countries', {
          method: 'GET',
          headers: { 'x-apisports-key': TOKEN }
        })
        const dados = await response.json()
        this.listaPaises = dados.response
      } catch (erro) {
        console.error('Erro ao carregar países:', erro)
      }
    },

    async carregarFigurinhas() {
      if (!this.paisSelecionado) return
      this.carregando = true
      this.listaJogadores = []
      try {
        const resTime = await fetch(`/api/teams?name=${this.paisSelecionado}`, {
          method: 'GET',
          headers: { 'x-apisports-key': TOKEN }
        })
        const dadosTime = await resTime.json()
        const teamId = dadosTime.response[0].team.id

        const resElenco = await fetch(`/api/players/squads?team=${teamId}`, {
          method: 'GET',
          headers: { 'x-apisports-key': TOKEN }
        })
        const dadosElenco = await resElenco.json()
        this.listaJogadores = dadosElenco.response[0].players
      } catch (erro) {
        console.error('Erro ao carregar figurinhas:', erro)
      } finally {
        this.carregando = false
      }
    }
  }
}
</script>

<style scoped>
#album {
  min-height: 100vh;
  padding: 0 0 48px;
  font-family: 'Segoe UI', sans-serif;
  background: #0d1117;
  color: #e6edf3;
}

header {
  background: linear-gradient(135deg, #1a7a3c, #0d4f26);
  padding: 40px 24px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

header h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 6px;
  letter-spacing: 1px;
}

header p {
  color: #a8d5b5;
  margin-bottom: 20px;
  font-size: 1rem;
}

select {
  padding: 12px 20px;
  font-size: 15px;
  border-radius: 30px;
  border: 2px solid #2ea84a;
  background: #0d1117;
  color: #e6edf3;
  cursor: pointer;
  min-width: 260px;
  outline: none;
  transition: border 0.2s;
}

select:hover {
  border-color: #4caf70;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #4caf70;
  font-size: 1.2rem;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

#grid-jogadores {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0 24px;
}
</style>

