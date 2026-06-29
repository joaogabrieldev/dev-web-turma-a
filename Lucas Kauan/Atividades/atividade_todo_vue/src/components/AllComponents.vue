<template>
  <div class="todo-wrapper">
    <div class="painel-entrada">
      <input 
        type="text" 
        id="inputTarefa" 
        placeholder="O que precisa ser feito?" 
        v-model="novaTarefa" 
        @keyup.enter="cadastrarTarefa"
      >
      <button id="btnInserir" @click="cadastrarTarefa">Inserir</button>
    </div>

    <ul>
      <li 
        v-for="(tarefa, indice) in listaDeTarefas" 
        :key="indice" 
        :class="{ 'tarefa-feita': tarefa.finalizado }"
        @click="alternarStatus(tarefa)"
      >
        {{ tarefa.descricao }}
        
        <button class="btn-excluir" @click.stop="deletarTarefa(indice)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AllComponents',
  data() {
    return {
      
      novaTarefa: '',
      listaDeTarefas: [] 
    };
  },
  methods: {
    
    cadastrarTarefa() {
      if (this.novaTarefa.trim() === '') return;

      this.listaDeTarefas.push({
        descricao: this.novaTarefa.trim(),
        finalizado: false
      });

      this.novaTarefa = '';
    },
    deletarTarefa(indice) {
      this.listaDeTarefas.splice(indice, 1);
    },
    alternarStatus(tarefa) {
      tarefa.finalizado = !tarefa.finalizado;
    }
  }
}
</script>

<style scoped>

.todo-wrapper {
  width: 100%;
}

.painel-entrada {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

#inputTarefa {
  flex: 1;
  padding: 12px;
  border: 2px solid #4facfe;
  border-radius: 8px;
  background-color: #1e1e2f;
  color: white;
  outline: none;
  font-size: 16px;
}

#inputTarefa::placeholder {
  color: #888;
}

#btnInserir {
  padding: 12px 20px;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background 0.3s;
}

#btnInserir:hover {
  background-color: #00f2fe;
  color: #1e1e2f;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #3b3b58;
  margin-bottom: 12px;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 18px;
}

li:hover {
  transform: scale(1.02);
  background-color: #454566;
}

.btn-excluir {
  background-color: #ff4d4d;
  color: white;
  border-radius: 6px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: 0.3s;
}

.btn-excluir:hover {
  background-color: #ff1a1a;
}

li.tarefa-feita {
  text-decoration: line-through;
  color: #7a7a9d;
  background-color: #252538;
}
</style>