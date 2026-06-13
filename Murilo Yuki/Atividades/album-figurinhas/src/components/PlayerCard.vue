<template>
  <div class="card">
    <div class="foto">
      <img
        v-if="fotoCarregou !== false"
        :src="jogador.photo"
        :alt="jogador.name"
        referrerpolicy="no-referrer"
        @load="fotoCarregou = true"
        @error="fotoCarregou = false"
      />
      <span class="inicial" v-if="fotoCarregou === false">
        {{ jogador.name.charAt(0) }}
      </span>
    </div>
    <div class="info">
      <h3>{{ jogador.name }}</h3>
      <span class="posicao">{{ jogador.position }}</span>
      <span class="idade">{{ jogador.age }} anos</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: {
    jogador: { type: Object, required: true }
  },
  data() {
    return { fotoCarregou: null }
  }
}
</script>

<style scoped>
.card {
  background: linear-gradient(160deg, #161b22, #1c2733);
  border-radius: 16px;
  padding: 20px 16px;
  text-align: center;
  border: 1px solid #2a3a2a;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(46, 168, 74, 0.25);
  border-color: #2ea84a;
}

.foto {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #2ea84a;
  margin: 0 auto 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d1117;
}

.foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.inicial {
  font-size: 28px;
  color: #2ea84a;
  font-weight: bold;
}

.info h3 {
  font-size: 13px;
  font-weight: 700;
  color: #e6edf3;
  margin-bottom: 6px;
}

.posicao {
  display: block;
  font-size: 11px;
  color: #2ea84a;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.idade {
  font-size: 11px;
  color: #8b949e;
}
</style>