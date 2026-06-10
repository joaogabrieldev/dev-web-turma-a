<template>
  <div class="pagina-figurinhas">

    <!-- Título da página -->
    <div class="cabecalho">
      <h1>⚽ Álbum de Figurinhas</h1>
      <p>Selecione um país para ver os jogadores da seleção</p>
    </div>

    <!-- Dropdown de países -->
    <div class="selecao-pais">
      <label for="dropdown-pais">🌍 País:</label>
      <select id="dropdown-pais" v-model="paisSelecionado" @change="carregarFigurinhas">
        <option value="">-- Escolha um país --</option>
        <option v-for="pais in listaPaises" :key="pais.name" :value="pais.name">
          {{ pais.name }}
        </option>
      </select>
    </div>

    <!-- Mensagem de carregando -->
    <div v-if="carregando" class="mensagem-carregando">
      <p>⏳ Buscando jogadores...</p>
    </div>

    <!-- Mensagem de erro -->
    <div v-if="mensagemErro" class="mensagem-erro">
      <p>❌ {{ mensagemErro }}</p>
    </div>

    <!-- Mensagem quando não achou jogadores -->
    <div v-if="!carregando && paisSelecionado && jogadores.length === 0 && !mensagemErro" class="mensagem-vazia">
      <p>Nenhum jogador encontrado para este país.</p>
    </div>

    <!-- Grid de figurinhas -->
    <div v-if="jogadores.length > 0" class="grid-figurinhas">
      <div class="figurinha" v-for="jogador in jogadores" :key="jogador.id">
        <div class="figurinha-header">
          <span class="posicao">{{ jogador.position }}</span>
        </div>
        <div class="figurinha-foto">
          <img :src="jogador.photo" :alt="jogador.name" @error="usarFotoReserva" />
        </div>
        <div class="figurinha-info">
          <p class="nome-jogador">{{ jogador.name }}</p>
          <p class="numero-jogador">#{{ jogador.number || '?' }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// Coloque aqui a sua chave da API gerada no api-football.com
const TOKEN = 'd31b64836034ee4a236746de3dc2f640'

export default {
  name: 'FigurinhasComponent',

  data() {
    return {
      listaPaises: [],       // lista de países para o dropdown
      paisSelecionado: '',   // país escolhido pelo usuário
      jogadores: [],         // jogadores da seleção
      carregando: false,     // controla o "carregando..."
      mensagemErro: null,    // guarda mensagem de erro se acontecer
    }
  },
  methods: {

    // 1ª requisição: busca todos os países disponíveis na API
    async carregarPaises() {
      try {
        const response = await fetch('https://v3.football.api-sports.io/teams/countries', {
          method: 'GET',
          headers: {
            'x-apisports-key': TOKEN
          }
        })

        const dados = await response.json()
        this.listaPaises = dados.response
        console.log('Países carregados:', this.listaPaises.length)

      } catch (erro) {
        this.mensagemErro = 'Erro ao carregar a lista de países.'
        console.error('Erro carregarPaises:', erro)
      }
    },

    // Chamado quando o usuário muda o dropdown
    async carregarFigurinhas() {
      
      if (!this.paisSelecionado) {
        this.jogadores = []
        return
      }

      // Reseta o estado antes de buscar
      this.carregando = true
      this.jogadores = []
      this.mensagemErro = null

      try {
        // 2ª requisição: busca o ID do time pelo nome do país
        const responseTime = await fetch(
          `https://v3.football.api-sports.io/teams?name=${this.paisSelecionado}`,
          {
            method: 'GET',
            headers: {
              'x-apisports-key': TOKEN
            }
          }
        )

        const dadosTime = await responseTime.json()

        // Verifica se encontrou algum time
        if (!dadosTime.response || dadosTime.response.length === 0) {
          this.mensagemErro = 'Nenhuma seleção encontrada para este país.'
          return
        }

        // Pega o ID do primeiro time retornado
        const teamId = dadosTime.response[0].team.id
        console.log('ID do time encontrado:', teamId)

        // 3ª requisição: busca o elenco de jogadores usando o ID do time
        const responseElenco = await fetch(
          `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
          {
            method: 'GET',
            headers: {
              'x-apisports-key': TOKEN
            }
          }
        )

        const dadosElenco = await responseElenco.json()

        // Verifica se veio algum jogador
        if (!dadosElenco.response || dadosElenco.response.length === 0) {
          this.mensagemErro = 'Nenhum jogador encontrado para esta seleção.'
          return
        }

        // Salva a lista de jogadores no data()
        this.jogadores = dadosElenco.response[0].players
        console.log('Jogadores carregados:', this.jogadores.length)

      } catch (erro) {
        this.mensagemErro = 'Erro ao buscar os jogadores. Verifique seu token.'
        console.error('Erro carregarFigurinhas:', erro)
      } finally {
        // finally sempre roda, com erro ou sem
        this.carregando = false
      }
    },

    // Troca a foto do jogador se a imagem não carregar
    usarFotoReserva(event) {
      event.target.src = 'https://media.api-sports.io/football/players/0.png'
    }
  },

  // mounted() é chamado quando o componente é criado na tela
  mounted() {
    this.carregarPaises()
  },

  
}
</script>

<style scoped>
/* ===== PÁGINA GERAL ===== */
.pagina-figurinhas {
  min-height: 100vh;
  background-color: #f0f4f0;
  padding: 20px;
  font-family: 'Segoe UI', Arial, sans-serif;
}

/* ===== CABEÇALHO ===== */
.cabecalho {
  background-color: #1a6b2e;
  color: white;
  text-align: center;
  padding: 30px 20px;
  border-radius: 12px;
  margin-bottom: 25px;
}

.cabecalho h1 {
  font-size: 32px;
  margin: 0 0 8px 0;
}

.cabecalho p {
  font-size: 16px;
  margin: 0;
  opacity: 0.85;
}

/* ===== DROPDOWN ===== */
.selecao-pais {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 25px;
}

.selecao-pais label {
  font-size: 18px;
  font-weight: bold;
  color: #1a6b2e;
}

.selecao-pais select {
  padding: 10px 16px;
  font-size: 16px;
  border: 2px solid #1a6b2e;
  border-radius: 8px;
  background-color: white;
  color: #333;
  cursor: pointer;
  min-width: 220px;
}

.selecao-pais select:focus {
  outline: none;
  border-color: #28a745;
  box-shadow: 0 0 6px rgba(26, 107, 46, 0.4);
}

/* ===== MENSAGENS ===== */
.mensagem-carregando,
.mensagem-erro,
.mensagem-vazia {
  text-align: center;
  font-size: 18px;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.mensagem-carregando {
  background-color: #e8f5e9;
  color: #1a6b2e;
}

.mensagem-erro {
  background-color: #fdecea;
  color: #c0392b;
}

.mensagem-vazia {
  background-color: #fff3cd;
  color: #856404;
}

/* ===== GRID DE FIGURINHAS ===== */
.grid-figurinhas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 10px 0;
}

/* ===== CARD DA FIGURINHA ===== */
.figurinha {
  background-color: white;
  border: 3px solid #1a6b2e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s;
}

.figurinha:hover {
  transform: scale(1.05);
}

/* Header verde com a posição */
.figurinha-header {
  background-color: #1a6b2e;
  padding: 6px;
  text-align: center;
}

.posicao {
  color: white;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Foto do jogador */
.figurinha-foto {
  background-color: #e8f5e9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 130px;
}

.figurinha-foto img {
  width: 100px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
}

/* Informações do jogador */
.figurinha-info {
  padding: 10px 8px;
  text-align: center;
  background-color: white;
}

.nome-jogador {
  font-size: 13px;
  font-weight: bold;
  color: #1a6b2e;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.numero-jogador {
  font-size: 12px;
  color: #888;
  margin: 0;
}
</style>