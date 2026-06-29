<template>
  <article class="card">
    <div class="card__foto-wrap">
      <!-- :src dinâmico (v-bind); cai no placeholder quando a foto vem ausente. -->
      <img class="card__foto" :src="jogador.photo || placeholder" :alt="jogador.name" />
    </div>
    <div class="card__info">
      <h3 class="card__nome">{{ jogador.name }}</h3>
      <span class="card__posicao">{{ jogador.position || 'Posição não informada' }}</span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'CardJogador',
  props: {
    jogador: {
      type: Object,
      default: () => ({ name: 'Jogador', position: '', photo: '' })
    }
  },
  data() {
    return {
      // Placeholder embutido (SVG em data URI) para não depender de recursos externos.
      placeholder:
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="#1e293b"/><circle cx="60" cy="46" r="22" fill="#475569"/><rect x="28" y="74" width="64" height="34" rx="17" fill="#475569"/></svg>'
        )
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(160deg, #ffffff 0%, #eef2f7 100%);
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.35);
}

.card__foto-wrap {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #ffd60a;
  background-color: #1e293b;
}

.card__foto {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.75rem;
  text-align: center;
}

.card__nome {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
}

.card__posicao {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e9e6a;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
</style>
