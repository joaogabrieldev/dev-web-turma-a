<template>
  <div class="main-wrapper">
    <div class="caderno">
      
      <div class="cabecalho-ecologico">
        <h2>Anotações do Dia</h2>
        
        <div class="input-grupo-limpo">
          <input 
            v-model="novaTarefa" 
            type="text" 
            placeholder="Nova anotação..."
            @keyup.enter="adicionarTarefa"
          >
          <button @click="adicionarTarefa">Salvar</button>
        </div>
      </div>

      <div class="corpo-kraft">
        <ul>
          <li v-for="(tarefa, index) in tarefas" :key="index">
            <div class="conteudo-linha">
              <input 
                type="checkbox" 
                v-model="tarefa.finalizada" 
                class="chk-ecologico"
              />
              <span :class="{ concluida: tarefa.finalizada }" class="texto-anotacao">
                {{ tarefa.texto }}
              </span>
            </div>
            
            <button @click="removerTarefa(index)" class="btn-remover-limpo" title="Apagar">
              ×
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CadernoAnotacoes",
  data() {
    return {
      novaTarefa: "",
      tarefas: [
        
        { texto: "estudar v-model", finalizada: false },
        { texto: "Fazer café", finalizada: false }
      ]
    };
  },
  methods: {
    adicionarTarefa() {
      if (this.novaTarefa.trim() !== "") {
        this.tarefas.push({
          texto: this.novaTarefa,
          finalizada: false
        });
        this.novaTarefa = "";
      }
    },
    removerTarefa(index) {
      this.tarefas.splice(index, 1);
    }
  }
};
</script>

<style scoped>
:root {
  --cor-verde-capa: #4CAF50; /* Um verde um pouco mais vivo, mas ainda natural */
  --cor-papel-kraft: #D7C6A3; /* Tom de papel marrom reciclável */
  --cor-texto-kraft: #5D4037; /* Marrom escuro para o texto */
  --cor-concluido: #999;
  --cor-linha: rgba(0,0,0,0.05); /* Linhas de escrita muito suaves */
}

.main-wrapper {
  background-color: #f0f0f0;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Fonte limpa */
}

/* 2. Estrutura do Caderno (Formato da Capa) */
.caderno {
  width: 100%;
  max-width: 450px;
  border-radius: 8px; /* Cantos arredondados suaves */
  overflow: hidden; /* Mantém tudo dentro dos cantos */
  box-shadow: 0 10px 30px rgba(0,0,0,0.15); /* Sombra para dar profundidade */
  border: 1px solid rgba(0,0,0,0.1);
}

/* 3. Cabeçalho Verde (Topo do caderno) */
.cabecalho-ecologico {
  background-color: #4CAF50; /* Cor verde inspirada */
  padding: 25px;
  border-bottom: 2px solid rgba(0,0,0,0.1);
}

.cabecalho-ecologico h2 {
  color: white;
  margin: 0 0 20px 0;
  text-align: center;
  font-weight: 300;
  letter-spacing: 1px;
}

/* Input e Botão no estilo 'integrado' */
.input-grupo-limpo {
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
}

.input-grupo-limpo input {
  flex: 1;
  border: none;
  padding: 12px 15px;
  font-size: 15px;
  color: #333;
}

.input-grupo-limpo input:focus {
  outline: none; /* Remove borda de foco padrão */
}

.input-grupo-limpo button {
  border: none;
  background-color: white;
  color: #4CAF50;
  padding: 0 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  border-left: 1px solid #eee;
}

.input-grupo-limpo button:hover {
  background-color: #f9f9f9;
}

/* 4. Corpo Kraft (Visual de papel e linhas) */
.corpo-kraft {
  background-color: #D7C6A3; /* Cor do papel Kraft */
  color: #5D4037; /* Cor do texto no papel */
  position: relative;
  /* Visual de linhas de escrita usando gradiente */
  background-image: linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px);
  background-size: 100% 45px; /* Altura de cada linha */
  padding: 10px 0;
  min-height: 250px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px; /* Mesma altura das linhas do gradiente */
  padding: 0 25px;
  border-bottom: 1px solid rgba(0,0,0,0.03); /* Linhas mais fortes entre itens */
}

.conteudo-linha {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

/* Checkbox estilizado discreto */
.chk-ecologico {
  appearance: none; /* Remove visual padrão */
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #8D6E63;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  background-color: rgba(255,255,255,0.3);
}

.chk-ecologico:checked {
  background-color: #8D6E63; /* Cor quando marcado */
}

/* Ícone de check simples feito com CSS */
.chk-ecologico:checked::after {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 14px;
  top: -1px;
  left: 2px;
}

.texto-anotacao {
  font-size: 16px;
  position: relative;
  top: -1px; /* Ajuste fino para alinhar na linha */
}

.concluida {
  text-decoration: line-through;
  color: #8D6E63;
  opacity: 0.6;
}

/* Botão de remover minimalista */
.btn-remover-limpo {
  background: none;
  border: none;
  color: #8D6E63;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.3;
  padding: 0;
  transition: opacity 0.2s, color 0.2s;
}

.btn-remover-limpo:hover {
  opacity: 1;
  color: #a52a2a; /* Vermelho escuro para alerta */
}
</style>