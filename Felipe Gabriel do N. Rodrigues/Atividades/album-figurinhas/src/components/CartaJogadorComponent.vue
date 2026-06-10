<template>
  <div class="player-card" :class="`pos-${positionClass}`">

    <!-- Efeito de brilho ao passar o mouse -->
    <div class="card-shine"></div>

    <!-- Topo do card: número e posição -->
    <div class="card-top">
      <span class="card-number">#{{ index + 1 }}</span>
      <span class="card-position">{{ player.position }}</span>
    </div>

    <!-- Foto do jogador -->
    <div class="card-photo-wrapper">
      <img
        :src="player.photo"
        :alt="player.name"
        class="card-photo"
        @error="ImgErro"
      />
    </div>

    <!-- Nome e idade -->
    <div class="card-info">
      <p class="card-name">{{ player.name }}</p>
      <p class="card-age" v-if="player.age">{{ player.age }} anos</p>
    </div>

    <!-- Rodapé com nome do país -->
    <div class="card-footer">
      <span class="card-country">{{ country }}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CartaJogadorComponent',

  // Props são dados que o componente pai envia para cá
  props: {
    player:  { type: Object, required: true }, // dados do jogador
    pais: { type: String, default: '' },   // nome do país
    index:   { type: Number, default: 0 }     // posição na lista (para o número da figurinha)
  },

  computed: {
    // Define a classe CSS com base na posição do jogador
    // Isso muda a cor do card automaticamente
    positionClass() {
      const pos = (this.player.position || '').toLowerCase()
      if (pos.includes('goalkeeper')) return 'gk'  // verde
      if (pos.includes('defender'))   return 'df'  // azul
      if (pos.includes('midfielder')) return 'mf'  // laranja
      if (pos.includes('attacker'))   return 'fw'  // vermelho
      return 'other'                               // cinza
    }
  },

  methods: {
    // Se a foto não carregar, mostra uma imagem padrão
    ImgErro(e) {
      e.target.src = 'https://wsrv.nl/?url=https://media.api-sports.io/football/players/default.png'
    }
  }
}
</script>

<style scoped>
/* Card principal */
.player-card {
  position: relative;
  width: 160px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;
}

/* Animação de subir ao passar o mouse */
.player-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

/* Efeito de brilho passando pelo card */
.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%);
  transition: left 0.5s ease;
  pointer-events: none;
  z-index: 2;
}
.player-card:hover .card-shine { left: 160%; }

/* Cores diferentes por posição */
.pos-gk    { --card-bg: linear-gradient(160deg, #1a3a1a, #2d6a2d); --card-border: #4caf50; }
.pos-df    { --card-bg: linear-gradient(160deg, #1a2a4a, #1e3a7a); --card-border: #4a90d9; }
.pos-mf    { --card-bg: linear-gradient(160deg, #3a2a1a, #7a4a1e); --card-border: #d99a4a; }
.pos-fw    { --card-bg: linear-gradient(160deg, #3a1a1a, #7a1e1e); --card-border: #d94a4a; }
.pos-other { --card-bg: linear-gradient(160deg, #2a2a2a, #444);    --card-border: #888;    }

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px 4px;
  position: relative;
  z-index: 1;
}

.card-number {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Courier New', monospace;
}

.card-position {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--card-border);
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 6px;
}

.card-photo-wrapper {
  display: flex;
  justify-content: center;
  padding: 8px 0 4px;
  position: relative;
  z-index: 1;
}

.card-photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--card-border);
  background: rgba(0, 0, 0, 0.3);
}

.card-info {
  text-align: center;
  padding: 6px 10px 4px;
  position: relative;
  z-index: 1;
}

.card-name {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.3;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  word-break: break-word;
}

.card-age {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  margin: 2px 0 0;
}

.card-footer {
  text-align: center;
  padding: 6px 10px 10px;
  position: relative;
  z-index: 1;
}

.card-country {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.4);
}
</style>