<template>
  <section class="todo-app">
    <h1>Tarefas</h1>
    <div class="input-area">
      <input
        v-model="novaTarefa"
        type="text"
        class="tarefa-input"
        placeholder="Digite uma nova tarefa"
        @keyup.enter="adicionarTarefa"
      />
      <button type="button" class="btn-adicionar" @click="adicionarTarefa">
        +
      </button>
    </div>
    <ul class="lista-tarefas">
      <li
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        :class="{ concluida: tarefa.concluida }"
        @click="alternarConcluida(tarefa)"
      >
        <span class="texto-tarefa">{{ tarefa.texto }}</span>
        <button
          type="button"
          class="fechar"
          @click.stop="removerTarefa(tarefa.id)"
        >
          x
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "TodoComponent",
  data() {
    return {
      novaTarefa: "",
      proximoId: 2,
      tarefas: [{ id: 1, texto: "Estudar", concluida: false }],
    };
  },
  methods: {
    adicionarTarefa() {
      const texto = this.novaTarefa.trim();
      if (!texto) return;
      this.tarefas.push({
        id: this.proximoId++,
        texto,
        concluida: false,
      });
      this.novaTarefa = "";
    },
    alternarConcluida(tarefa) {
      tarefa.concluida = !tarefa.concluida;
    },
    removerTarefa(id) {
      this.tarefas = this.tarefas.filter((t) => t.id !== id);
    },
  },
};
</script>

<style scoped>
.todo-app {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, sans-serif;
  background-color: #cdcdcd;
  padding: 16px;
  margin: 24px auto;
  max-width: 520px;
  border-radius: 8px;
  text-align: left;
}

h1 {
  color: rgb(2, 93, 96);
  text-align: center;
}

.input-area {
  text-align: center;
  margin-bottom: 20px;
}

.tarefa-input {
  width: 200px;
  padding: 8px;
}

.btn-adicionar {
  padding: 8px 12px;
  margin-left: 5px;
  background-color: rgb(2, 93, 96);
  color: white;
  border: 0 solid #16c416;
  border-radius: 8px;
  cursor: pointer;
}

.btn-adicionar:hover {
  background-color: rgb(58, 3, 94);
  color: white;
  transition: 0.5s;
}

.lista-tarefas {
  list-style: none;
  padding: 0;
}

.lista-tarefas li {
  background-color: white;
  padding: 10px;
  margin: 16px 16px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.lista-tarefas li.concluida .texto-tarefa {
  text-decoration: line-through;
  color: gray;
}

.texto-tarefa {
  flex: 1;
  text-align: left;
}

.fechar {
  background-color: darkred;
  color: white;
  border: none;
  border-radius: 100px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
