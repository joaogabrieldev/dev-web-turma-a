<template>
  <div class="seletor">
    <label class="seletor__label" for="select-pais">Escolha uma seleção</label>
    <!-- @change dispara o encadeamento da aplicação; desabilitado evita troca durante o carregamento. -->
    <select
      id="select-pais"
      class="seletor__select"
      v-model="selecionado"
      :disabled="desabilitado"
      @change="aoMudar"
    >
      <option value="">Selecione uma seleção...</option>
      <option v-for="pais in paises" :key="pais.code || pais.name" :value="pais.name">
        {{ pais.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SeletorPais',
  props: {
    paises: {
      type: Array,
      default: () => []
    },
    desabilitado: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selecionado: ''
    }
  },
  methods: {
    aoMudar() {
      this.$emit('pais-selecionado', this.selecionado)
    }
  }
}
</script>

<style scoped>
.seletor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.seletor__label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #cbd5e1;
  letter-spacing: 0.02em;
}

.seletor__select {
  width: 100%;
  padding: 0.85rem 1rem;
  font-size: 1rem;
  color: #0f172a;
  background-color: #f8fafc;
  border: 2px solid #1e9e6a;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.seletor__select:focus {
  outline: none;
  border-color: #ffd60a;
  box-shadow: 0 0 0 3px rgba(255, 214, 10, 0.25);
}

.seletor__select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
