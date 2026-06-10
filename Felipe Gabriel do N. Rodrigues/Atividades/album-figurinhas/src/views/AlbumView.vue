<template>
  <div class="album-view">

    <!-- Header -->
    <header class="album-header">
      <div class="header-content">
        <div class="header-badge">⚽ FIFA WORLD</div>
        <h1 class="album-title">Álbum de <span class="title-accent">Figurinhas</span></h1>
        <p class="album-subtitle">Seleções Mundiais de Futebol</p>
      </div>
    </header>

    <!-- Controles -->
    <section class="album-controls">
      <SelecionarPaisComponent @change="onCountryChange" />

      <div class="cache-info" v-if="cacheStatus">
        <span :class="['cache-badge', cacheStatus.type]">
          {{ cacheStatus.icon }} {{ cacheStatus.text }}
        </span>
        <button class="btn-clear-cache" @click="onClearCache" title="Limpar cache">
          🗑️ Limpar Cache
        </button>
      </div>
    </section>

    <!-- Estado de carregamento -->
    <div class="album-loading" v-if="loading">
      <div class="loading-spinner"></div>
      <p>{{ loadingMessage }}</p>
    </div>

    <!-- Erro -->
    <div class="album-error" v-else-if="error">
      <p>⚠️ {{ error }}</p>
      <button class="btn-retry" @click="retry">Tentar novamente</button>
    </div>

    <!-- Álbum de figurinhas -->
    <template v-else-if="players.length > 0">
      <!-- Stats da seleção -->
      <div class="team-stats">
        <div class="stat-item">
          <span class="stat-value">{{ players.length }}</span>
          <span class="stat-label">Jogadores</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ countByPosition('Goalkeeper') }}</span>
          <span class="stat-label">Goleiros</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ countByPosition('Defender') }}</span>
          <span class="stat-label">Defensores</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ countByPosition('Midfielder') }}</span>
          <span class="stat-label">Meias</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ countByPosition('Attacker') }}</span>
          <span class="stat-label">Atacantes</span>
        </div>
      </div>

      <!-- Seções por posição -->
      <div
        v-for="section in positionSections"
        :key="section.key"
        class="position-section"
      >
        <div class="section-header">
          <span class="section-icon">{{ section.icon }}</span>
          <h2 class="section-title">{{ section.label }}</h2>
          <span class="section-count">{{ section.players.length }}</span>
        </div>

        <div class="cards-grid">
          <CartaJogadorComponent
            v-for="(player, i) in section.players"
            :key="player.id"
            :player="player"
            :country="selectedCountry"
            :index="i"
          />
        </div>
      </div>
    </template>

    <!-- Estado vazio (antes de selecionar) -->
    <div class="album-empty" v-else-if="!loading && !selectedCountry">
      <div class="empty-icon">🏆</div>
      <h2>Selecione uma Seleção</h2>
      <p>Escolha um país acima para ver as figurinhas dos jogadores</p>
    </div>

  </div>
</template>

<script>
import SelecionarPaisComponent from '@/components/SelecionarPaisComponent.vue'
import CartaJogadorComponent from '@/components/CartaJogadorComponent.vue'
import { fetchTeamId, fetchSquad } from '@/services/ApiFutebol'

export default {
  name: 'AlbumView',
  components: { SelecionarPaisComponent, CartaJogadorComponent },

  data() {
    return {
      players: [],
      selectedCountry: '',
      loading: false,
      loadingMessage: '',
      error: null,
      cacheStatus: null
    }
  },

  computed: {
    positionSections() {
      const sections = [
        { key: 'Goalkeeper', label: 'Goleiros', icon: '🧤' },
        { key: 'Defender',   label: 'Defensores', icon: '🛡️' },
        { key: 'Midfielder', label: 'Meias', icon: '⚙️' },
        { key: 'Attacker',   label: 'Atacantes', icon: '⚡' },
      ]
      return sections
        .map(s => ({
          ...s,
          players: this.players.filter(p => p.position === s.key)
        }))
        .filter(s => s.players.length > 0)
    }
  },

  methods: {
    async onCountryChange(country) {
      this.selectedCountry = country
      this.players = []
      this.error = null
      this.loading = true
      this.cacheStatus = null

      try {
        this.loadingMessage = `🔍 Buscando dados de ${country}...`
        const teamId = await fetchTeamId(country)

        this.loadingMessage = `🃏 Carregando figurinhas...`
        const squad = await fetchSquad(teamId)

        this.players = squad
        this.cacheStatus = { type: 'success', icon: '✅', text: 'Dados carregados com sucesso' }
      } catch (e) {
        this.error = e.message || 'Erro ao carregar dados da seleção.'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    countByPosition(pos) {
      return this.players.filter(p => p.position === pos).length
    },

    onClearCache() {
      this.cacheStatus = { type: 'warning', icon: '🗑️', text: 'Cache limpo! Próxima busca usará a API.' }
    },

    retry() {
      if (this.selectedCountry) {
        this.onCountryChange(this.selectedCountry)
      }
    }
  }
}
</script>

<style scoped>
.album-view {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 60px;
}

/* Header */
.album-header {
  background: linear-gradient(135deg, #0a1628 0%, #1a3a1a 50%, #0d2d0d 100%);
  padding: 48px 24px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid #2a5a2a;
}

.album-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(76,175,80,0.15) 0%, transparent 70%);
  pointer-events: none;
}

.header-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #4caf50;
  border: 1px solid #4caf50;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.album-title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 900;
  color: #fff;
  margin: 0 0 8px;
  letter-spacing: -1px;
  line-height: 1.1;
}

.title-accent {
  color: #4caf50;
  text-shadow: 0 0 30px rgba(76,175,80,0.5);
}

.album-subtitle {
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
}

/* Controles */
.album-controls {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
}

.cache-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.cache-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
}

.cache-badge.success { background: rgba(76,175,80,0.15); color: #4caf50; }
.cache-badge.warning { background: rgba(255,152,0,0.15); color: #ff9800; }

.btn-clear-cache {
  font-size: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.6);
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-clear-cache:hover {
  background: rgba(244,67,54,0.15);
  border-color: #f44336;
  color: #f44336;
}

/* Loading */
.album-loading {
  text-align: center;
  padding: 80px 24px;
  color: rgba(255,255,255,0.6);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(76,175,80,0.2);
  border-top-color: #4caf50;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Erro */
.album-error {
  text-align: center;
  padding: 60px 24px;
  color: #f44336;
}

.btn-retry {
  margin-top: 16px;
  background: rgba(244,67,54,0.15);
  border: 1px solid #f44336;
  color: #f44336;
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-retry:hover { background: rgba(244,67,54,0.3); }

/* Stats */
.team-stats {
  max-width: 900px;
  margin: 28px auto 0;
  padding: 0 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 12px 20px;
  min-width: 80px;
}

.stat-value {
  font-size: 22px;
  font-weight: 900;
  color: #4caf50;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
}

/* Seções por posição */
.position-section {
  max-width: 900px;
  margin: 36px auto 0;
  padding: 0 24px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.section-icon { font-size: 20px; }

.section-title {
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-text);
  margin: 0;
}

.section-count {
  font-size: 12px;
  font-weight: 700;
  background: rgba(76,175,80,0.15);
  color: #4caf50;
  border-radius: 20px;
  padding: 2px 10px;
}

.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Vazio */
.album-empty {
  text-align: center;
  padding: 100px 24px;
  color: rgba(255,255,255,0.4);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.album-empty h2 {
  font-size: 22px;
  color: rgba(255,255,255,0.6);
  margin: 0 0 8px;
}

.album-empty p {
  font-size: 14px;
  margin: 0;
}
</style>