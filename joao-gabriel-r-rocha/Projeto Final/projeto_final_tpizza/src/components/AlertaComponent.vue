<template>
  <div class="alerta" :class="config.classeCss">
    <span class="alerta-icone">{{ config.icone }}</span>
    <span class="alerta-mensagem">{{ mensagem }}</span>
  </div>
</template>
<script>
export default {
  name: "AlertaComponent",
  props: {
    tipo: {
      type: String,
      default: "info",
    },
    mensagem: {
      type: String,
      default: "",
    },
    duracao: {
      type: Number,
      default: 4000,
    },
  },
  computed: {
    config() {
      const mapa = {
        erro: { icone: "❌", classeCss: "alerta-erro" },
        aviso: { icone: "⚠️", classeCss: "alerta-aviso" },
        info: { icone: "ℹ️", classeCss: "alerta-info" },
        sucesso: { icone: "✅", classeCss: "alerta-sucesso" },
      };
      return mapa[this.tipo] || mapa.info;
    },
  },
  mounted() {
    setTimeout(() => this.$emit("fechar"), this.duracao);
  },
};
</script>
<style scoped>
.alerta {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 480px;
  margin: 16px auto;
  padding: 14px 18px;
  border-radius: 10px;
  border-left: 6px solid;
  font-weight: bold;
  text-align: left;
}

.alerta-icone {
  font-size: 20px;
}

/* erro = vermelho */
.alerta-erro {
  background-color: #fdecea;
  border-color: #c0392b;
  color: #922b21;
}

/* aviso = laranja */
.alerta-aviso {
  background-color: #fef5e7;
  border-color: #e67e22;
  color: #af601a;
}

/* info = azul */
.alerta-info {
  background-color: #eaf2fb;
  border-color: #2980b9;
  color: #1f618d;
}

/* sucesso = verde */
.alerta-sucesso {
  background-color: #eafaf1;
  border-color: #1e8449;
  color: #196f3d;
}
</style>
