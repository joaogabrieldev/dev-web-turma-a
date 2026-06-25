<template>
  <transition name="alerta-slide">
    <div v-if="visivel && mensagem" :class="['alerta-global', tipo]" role="alert">
      <span class="alerta-icone">{{ icone }}</span>
      <p class="alerta-texto">{{ mensagem }}</p>
      <button class="alerta-fechar" @click="fechar" aria-label="Fechar">×</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AlertaComponent",
  props: {
    mensagem: {
      type: String,
      default: ""
    },
    tipo: {
      type: String,
      default: "info",
      validator: (v) => ["erro", "aviso", "info", "sucesso"].includes(v)
    },
    duracao: {
      type: Number,
      default: 4000
    }
  },
  emits: ["fechar"],
  data() {
    return {
      visivel: false,
      timer: null
    };
  },
  computed: {
    icone() {
      const icones = { erro: "❌", aviso: "⚠️", info: "ℹ️", sucesso: "✅" };
      return icones[this.tipo] || "🔔";
    }
  },
  watch: {
    // Sempre que mensagem mudar, reexibe com o timer reiniciado
    mensagem(novaMsg) {
      if (novaMsg) {
        this.mostrar();
      }
    }
  },
  methods: {
    mostrar() {
      clearTimeout(this.timer);
      this.visivel = true;
      if (this.duracao > 0) {
        this.timer = setTimeout(() => { this.fechar(); }, this.duracao);
      }
    },
    fechar() {
      this.visivel = false;
      clearTimeout(this.timer);
      this.$emit("fechar");
    }
  },
  mounted() {
    if (this.mensagem) this.mostrar();
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  }
};
</script>

<style scoped>
.alerta-global {
  position: fixed;
  top: 88px;  /* Abaixo da navbar fixa (72px + 16px de gap) */
  right: 24px;
  z-index: 9000;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 14px;
  color: #ffffff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  min-width: 300px;
  max-width: 440px;
  border-left: 4px solid rgba(255, 255, 255, 0.35);
}

/* Paleta semântica */
.alerta-global.erro    { background-color: #c0392b; } /* Vermelho — erro */
.alerta-global.aviso   { background-color: #d35400; color: #fff; } /* Laranja — aviso */
.alerta-global.info    { background-color: #2471a3; } /* Azul — informação */
.alerta-global.sucesso { background-color: #1e8449; } /* Verde — sucesso */

.alerta-icone {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.alerta-texto {
  flex: 1;
  margin: 0;
}

.alerta-fechar {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 20px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.15s;
  margin-top: -1px;
}

.alerta-fechar:hover {
  color: #ffffff;
}

/* Animação de entrada/saída */
.alerta-slide-enter-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.alerta-slide-leave-active { transition: all 0.25s ease-in; }
.alerta-slide-enter-from  { transform: translateX(60px); opacity: 0; }
.alerta-slide-leave-to    { transform: translateX(60px); opacity: 0; }
</style>