<template>
  <div class="selector-wrapper">
 
    <!-- Label do campo -->
    <label class="selector-label" for="country-select">
      🌍 Escolha uma Seleção
    </label>
 
    <!-- Caixa de seleção (combo box) -->
    <div class="select-container">
      <select
        id="country-select"
        v-model="selecionado"
        @change="$emit('change', selecionado)"
        :disabled="carregando || paises.length === 0"
        class="country-select"
      >
        <!-- Opção padrão enquanto carrega ou antes de selecionar -->
        <option value="" disabled>
          {{ carregando ? 'Carregando países...' : 'Selecione um país...' }}
        </option>
 
        <!-- Uma opção para cada país retornado pela API -->
        <option
          v-for="pais in paises"
          :key="pais.name"
          :value="pais.name"
        >
          {{ pais.name }}
        </option>
      </select>
 
      <!-- Seta decorativa do dropdown -->
      <span class="select-arrow">▾</span>
    </div>
 
    <!-- Mensagem de erro se não conseguir carregar os países -->
    <p v-if="error" class="selector-error">⚠️ {{ error }}</p>
 
  </div>
</template>
 
<script>
import { fetchCountries } from '@/services/ApiFutebol'
 
export default {
  name: 'SelecionarPaisComponent',
 
  // Declara o evento que este componente pode emitir para o pai
  emits: ['change'],
 
  data() {
    return {
      paises: [], // lista de países
      selecionado: '',  // país selecionado atualmente
      carregando: false,// controla se está carregando
      error: null    // guarda mensagem de erro se houver
    }
  },
 
  // mounted() roda automaticamente quando o componente aparece na tela
  // É o lugar certo para carregar dados iniciais (ciclo de vida do Vue)
  async mounted() {
    this.carregando = true
    this.error = null
 
    try {
      const data = await fetchCountries()
      // Ordena os países em ordem alfabética
      this.paises = data.sort((a, b) => a.name.localeCompare(b.name))
    } catch (e) {
      this.error = 'Não foi possível carregar os países. Verifique sua API Key.'
      console.error(e)
    } finally {
      // finally sempre executa, com erro ou sem
      this.carregando = false
    }
  }
}
</script>
 
<style scoped>
.selector-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 420px;
}
 
.selector-label {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-accent);
}
 
/* Container relativo para posicionar a seta dentro dele */
.select-container {
  position: relative;
}
 
.country-select {
  width: 100%;
  appearance: none; /* remove o estilo padrão do navegador */
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  color: var(--color-text);
  font-size: 15px;
  font-weight: 500;
  padding: 12px 44px 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}
 
.country-select:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}
 
.country-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
 
/* Seta posicionada dentro do select */
.select-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: var(--color-accent);
  pointer-events: none; /* não bloqueia cliques no select */
}
 
.selector-error {
  font-size: 13px;
  color: #f44336;
  margin: 0;
  padding: 8px 12px;
  background: rgba(244, 67, 54, 0.1);
  border-radius: 8px;
  border-left: 3px solid #f44336;
}
</style>