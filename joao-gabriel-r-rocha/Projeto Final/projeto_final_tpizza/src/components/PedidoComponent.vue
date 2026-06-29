<template>
  <div>
    <AlertaComponent
      v-if="alerta"
      :key="alertaKey"
      :tipo="alerta.tipo"
      :mensagem="alerta.mensagem"
      @fechar="alerta = null"
    />

    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-pizza-content">
          {{ pizza && pizza.nome ? pizza.nome : "-" }}
        </p>
        <img id="foto-content" :src="pizza && pizza.foto ? pizza.foto : ''" />
      </div>
      <div class="inputs">
        <label for="nome-cliente">Nome</label>
        <input
          type="text"
          v-model="nomeCliente"
          id="nome-cliente"
          name="nome-cliente"
          placeholder="Digite seu Nome"
        />
      </div>
      <div class="inputs">
        <label>Tamanho</label>
        <select name="tamanho" id="tamanho" v-model="tamanhoSelecionado">
          <option value="" selected>Selecione o tamanho</option>
          <option
            v-for="tamanho in listaTamanhos"
            :key="tamanho.id"
            :value="tamanho"
          >
            {{ tamanho.descricao }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <label id="opcionais-titulo"> Selecione os opcionais</label>
        <label id="opcionais-subtitulo"> Bordas / Adicionais</label>

        <div
          class="checkbox-container"
          v-for="adicional in listaAdicionais"
          :key="adicional.id"
        >
          <input
            type="checkbox"
            :name="adicional.nome"
            :value="adicional"
            v-model="listaAdicionaisSelecionados"
          />
          <span>{{ adicional.nome }}</span>
        </div>

        <label> Adicione uma bebida</label>

        <div
          class="checkbox-container"
          id="checkbox-container"
          v-for="bebida in listaBebidas"
          :key="bebida.id"
        >
          <input
            type="checkbox"
            :name="bebida.nome"
            :value="bebida"
            v-model="listaBebidasSelecionadas"
          />
          <span>{{ bebida.nome }}</span>
        </div>
        <div class="inputs">
          <input
            type="submit"
            class="submit-btn"
            :value="enviando ? 'Enviando...' : 'Confirmar Pedido'"
            :disabled="enviando || pizzaAusente"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "PedidoComponent",
  components: {
    AlertaComponent,
  },
  props: {
    pizza: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaBebidas: [],
      listaAdicionais: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      listaAdicionaisSelecionados: [],
      listaBebidasSelecionadas: [],
      enviando: false,
      alerta: null,
      alertaKey: 0,
    };
  },
  computed: {
    pizzaAusente() {
      return !this.pizza;
    },
  },
  methods: {
    mostrarAlerta(tipo, mensagem) {
      this.alertaKey++;
      this.alerta = { tipo, mensagem };
    },
    async getTamanhos() {
      try {
        const response = await fetch(`${this.$apiUrl}/tamanhos`);
        if (!response.ok) throw new Error("Falha ao carregar tamanhos");
        this.listaTamanhos = await response.json();
      } catch (erro) {
        console.error(erro);
        this.mostrarAlerta(
          "erro",
          "Não foi possível carregar os tamanhos. Tente novamente."
        );
      }
    },
    async getOpcionais() {
      try {
        const response = await fetch(`${this.$apiUrl}/opcionais`);
        if (!response.ok) throw new Error("Falha ao carregar opcionais");
        const dados = await response.json();
        this.listaAdicionais = dados.adicionais;
        this.listaBebidas = dados.bebidas;
      } catch (erro) {
        console.error(erro);
        this.mostrarAlerta(
          "erro",
          "Não foi possível carregar os adicionais e bebidas. Tente novamente."
        );
      }
    },
    async criarPedido(e) {
      e.preventDefault();

      // Bloqueio: pizza não selecionada (AC-03.3)
      if (this.pizzaAusente) {
        this.mostrarAlerta(
          "aviso",
          "Selecione uma pizza no menu antes de montar o pedido."
        );
        return;
      }

      // Bloqueio: campos obrigatórios vazios (AC-03.1)
      if (!this.nomeCliente.trim() || !this.tamanhoSelecionado) {
        this.mostrarAlerta(
          "erro",
          "Preencha os campos obrigatórios: Nome e Tamanho."
        );
        return;
      }

      // Anti duplo clique
      if (this.enviando) return;
      this.enviando = true;

      const dadosPedido = {
        nome: this.nomeCliente.trim(),
        tamanho: this.tamanhoSelecionado,
        pizza: this.pizza,
        adicionais: Array.from(this.listaAdicionaisSelecionados),
        bebidas: Array.from(this.listaBebidasSelecionadas),
        statusId: 1,
      };

      try {
        const req = await fetch(`${this.$apiUrl}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosPedido),
        });

        if (!req.ok) throw new Error("Falha ao enviar o pedido");

        this.mostrarAlerta("sucesso", "Pedido realizado com sucesso! 🍕");
        setTimeout(() => {
          this.$router.push("/pedidos");
        }, 2000);
      } catch (erro) {
        console.error(erro);
        this.enviando = false;
        this.mostrarAlerta(
          "erro",
          "Não foi possível enviar o pedido. Verifique sua conexão."
        );
      }
    },
  },
  mounted() {
    this.getTamanhos();
    this.getOpcionais();

    if (this.pizzaAusente) {
      this.mostrarAlerta(
        "aviso",
        "Selecione uma pizza no menu antes de montar o pedido."
      );
    }
  },
};
</script>
<style scoped>
#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: -1;
  justify-content: center;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

#nome-pizza-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: #fff8f0;
  padding: 16px;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid #c0392b;
}

input,
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 20px;
  font-size: 12px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

.submit-btn {
  background-color: #2c2c2c;
  color: #fff8f0;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: #c0392b;
  color: #fff8f0;
}

.submit-btn:disabled {
  background-color: #999;
  color: #eee;
  cursor: not-allowed;
}
</style>
