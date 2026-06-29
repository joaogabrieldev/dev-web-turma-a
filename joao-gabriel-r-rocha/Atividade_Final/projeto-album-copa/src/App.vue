<template>
  <div id="app">
    <header class="cabecalho">
      <h1 class="cabecalho__titulo">⚽ Álbum da Copa</h1>
      <p class="cabecalho__sub">Escolha uma seleção e veja as figurinhas dos jogadores</p>
    </header>

    <main class="conteudo">
      <SeletorPais
        :paises="paises"
        :desabilitado="carregando"
        @pais-selecionado="aoSelecionarPais"
      />

      <!-- Mensagem de erro amigável; não trava a página. -->
      <p v-if="erro" class="aviso aviso--erro">{{ erro }}</p>

      <!-- Indicador de carregamento enquanto a busca está em andamento. -->
      <p v-if="carregando" class="aviso aviso--carregando">Carregando figurinhas...</p>

      <!-- Estado inicial: nenhum país escolhido. -->
      <p
        v-if="!carregando && !erro && !paisSelecionado"
        class="aviso"
      >
        Selecione uma seleção para começar.
      </p>

      <!-- Seleção feita, mas sem jogadores retornados. -->
      <p
        v-else-if="!carregando && !erro && paisSelecionado && jogadores.length === 0"
        class="aviso"
      >
        Nenhuma figurinha encontrada para esta seleção.
      </p>

      <!-- Grid responsivo de cards. -->
      <section v-else-if="!carregando && jogadores.length > 0" class="album">
        <CardJogador
          v-for="(jogador, indice) in jogadores"
          :key="jogador.id || indice"
          :jogador="jogador"
        />
      </section>
    </main>
  </div>
</template>

<script>
import SeletorPais from './components/SeletorPais.vue'
import CardJogador from './components/CardJogador.vue'
import { carregarPaises, buscarIdDoTime, buscarPlantel } from './services/api'

export default {
  name: 'App',
  components: {
    SeletorPais,
    CardJogador
  },
  data() {
    return {
      paises: [],
      paisSelecionado: '',
      jogadores: [],
      carregando: false,
      erro: null
    }
  },
  // Carrega os países uma única vez ao montar (economiza requisições do plano gratuito).
  async mounted() {
    try {
      this.paises = await carregarPaises()
    } catch (e) {
      this.erro = e.message
    }
  },
  methods: {
    async aoSelecionarPais(pais) {
      // Ignora nova seleção enquanto uma busca já está em andamento (evita sobrepor respostas).
      if (this.carregando) {
        return
      }

      this.paisSelecionado = pais

      // Voltar ao estado inicial quando o usuário escolhe a opção vazia.
      if (!pais) {
        this.jogadores = []
        this.erro = null
        return
      }

      this.carregando = true
      this.erro = null
      this.jogadores = []

      try {
        const idDoTime = await buscarIdDoTime(pais)
        if (!idDoTime) {
          this.jogadores = []
          return
        }
        this.jogadores = await buscarPlantel(idDoTime)
      } catch (e) {
        this.erro = e.message
        this.jogadores = []
      } finally {
        this.carregando = false
      }
    }
  }
}
</script>

<style>
:root {
  --verde: #1e9e6a;
  --amarelo: #ffd60a;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: radial-gradient(circle at top, #0f3d2e 0%, #0b1220 60%);
  min-height: 100vh;
  color: #e2e8f0;
}

#app {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
}

.cabecalho {
  text-align: center;
  margin-bottom: 2rem;
}

.cabecalho__titulo {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin: 0 0 0.4rem;
  color: var(--amarelo);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.cabecalho__sub {
  margin: 0;
  color: #94a3b8;
  font-size: 1rem;
}

.conteudo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.aviso {
  text-align: center;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 10px;
  margin: 0;
}

.aviso--erro {
  background-color: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.5);
  color: #fca5a5;
}

.aviso--carregando {
  color: var(--amarelo);
  font-weight: 600;
}

.album {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.25rem;
}
</style>
