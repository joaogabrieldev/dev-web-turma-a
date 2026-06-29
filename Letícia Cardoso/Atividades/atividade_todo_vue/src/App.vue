<script setup lang="ts">
import { ref } from 'vue'
const novaTarefa = ref('')
const tarefas = ref([
  { texto: 'Revisar Desenvolvimento Web', concluida: false },
  { texto: 'Fazer a atividade do To-Do', concluida: false }
])
const adicionarTarefa = () => {
  if (novaTarefa.value.trim() !== '') {
    tarefas.value.push({
      texto: novaTarefa.value,
      concluida: false
    })
    novaTarefa.value = '' // Limpa o campo após adicionar
  }
}
const removerTarefa = (index: number) => {
  tarefas.value.splice(index, 1)
}
</script>

<template>
  <div class="container">
    <h1>Minha Lista de Tarefas</h1>
<div class="input-group">
      <input 
        v-model="novaTarefa" 
        @keyup.enter="adicionarTarefa"
        placeholder="Digite uma nova tarefa..."
      >
      <button @click="adicionarTarefa">Adicionar</button>
    </div>
  <ul>
      <li v-for="(tarefa, index) in tarefas" :key="index" :class="{ feita: tarefa.concluida }">
        <span @click="tarefa.concluida = !tarefa.concluida">
          {{ tarefa.texto }}
        </span>
        <button @click="removerTarefa(index)">❌</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container { font-family: sans-serif; max-width: 400px; margin: 0 auto; }
.input-group { display: flex; gap: 10px; margin-bottom: 20px; }
ul { list-style: none; padding: 0; }
li { 
  display: flex; 
  justify-content: space-between; 
  padding: 10px; 
  border-bottom: 1px solid #eee; 
  cursor: pointer;
}
.feita { text-decoration: line-through; color: gray; }
button { cursor: pointer; }
</style>
