<template>
  <div id="pedido-wrapper">
    <alert-component ref="alerta" />
    <modal-confirmacao
      :visivel="mostrarConfirmacao"
      :pedido="dadosParaConfirmacao"
      :confirmando="enviando"
      @confirmar="confirmarPedido"
      @cancelar="mostrarConfirmacao = false"
    />

    <form id="pedido-form" @submit="abrirConfirmacao($event)">
      <div id="pizza-hero">
        <p id="nome-pizza-content">
          {{ pizza && pizza.nome ? pizza.nome : "-" }}
        </p>
        <img id="foto-content" :src="pizza && pizza.foto ? pizza.foto : ''" />
      </div>

      <div class="card-form">

        <!-- NOME -->
        <div class="inputs" :class="{ 'campo-invalido': erros.nomeCliente }">
          <label for="nome-cliente">Nome do cliente <span class="obrigatorio">*</span></label>
          <input
            type="text"
            v-model="nomeCliente"
            id="nome-cliente"
            placeholder="Digite seu nome"
            @input="erros.nomeCliente = false"
          />
          <span v-if="erros.nomeCliente" class="msg-erro">Campo obrigatório</span>
        </div>

        <!-- TAMANHO -->
        <div class="inputs" :class="{ 'campo-invalido': erros.tamanho }">
          <label>Tamanho da pizza <span class="obrigatorio">*</span></label>
          <select v-model="tamanhoSelecionado" @change="erros.tamanho = false">
            <option value="" selected>Selecione o tamanho</option>
            <option v-for="t in listaTamanhos" :key="t.id" :value="t">
              {{ t.descricao }}
            </option>
          </select>
          <span v-if="erros.tamanho" class="msg-erro">Selecione um tamanho</span>
        </div>

        <!-- REMOVER INGREDIENTES -->
        <div class="inputs" v-if="pizza && pizza.ingredientes && pizza.ingredientes.length">
          <label class="label-secao label-remover">Remover ingredientes</label>
          <p class="secao-dica">Marque os ingredientes que deseja retirar da pizza</p>
          <div class="checkbox-container" v-for="ing in pizza.ingredientes" :key="ing">
            <input
              type="checkbox"
              :id="'ing-' + ing"
              :value="ing"
              v-model="ingredientesRemovidos"
            />
            <label :for="'ing-' + ing" class="label-inline">{{ ing }}</label>
          </div>
          <p v-if="ingredientesRemovidos.length" class="resumo-remocao">
            Sem: {{ ingredientesRemovidos.join(", ") }}
          </p>
        </div>

        <!-- BORDAS -->
        <div class="inputs">
          <label class="label-secao">Personalize seu pedido</label>
          <label class="label-sub">Escolha a borda</label>
          <div class="checkbox-container" v-for="borda in listaBordas" :key="borda.id">
            <input
              type="checkbox"
              :id="'borda-' + borda.id"
              :value="borda"
              v-model="listaBorasSelecionadas"
            />
            <label :for="'borda-' + borda.id" class="label-inline">
              {{ borda.nome }}
              <span class="preco-opcional">+ R$ {{ borda.valor }},00</span>
              <span v-if="borda.tipo === 'doce'" class="badge-tipo doce">Doce</span>
              <span v-else class="badge-tipo salgada">Salgada</span>
            </label>
          </div>
        </div>

        <!-- BEBIDAS -->
        <div class="inputs">
          <label class="label-sub">Adicione uma bebida</label>
          <div class="bebidas-grid">
            <div class="checkbox-container" v-for="bebida in listaBebidas" :key="bebida.id">
              <input
                type="checkbox"
                :id="'beb-' + bebida.id"
                :value="bebida"
                v-model="listaBebidasSelecionadas"
              />
              <label :for="'beb-' + bebida.id" class="label-inline">
                {{ bebida.nome }}
                <span class="preco-opcional">R$ {{ bebida.valor }},00</span>
              </label>
            </div>
          </div>
        </div>

        <!-- SUBMIT -->
        <div class="inputs submit-area">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import AlertComponent from "./AlertComponent.vue";
import ModalConfirmacao from "./ModalConfirmacao.vue";

export default {
  name: "PedidoComponent",
  components: { AlertComponent, ModalConfirmacao },
  props: { pizza: null },
  data() {
    return {
      listaTamanhos: [],
      listaBebidas: [],
      listaBordas: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      listaBorasSelecionadas: [],
      listaBebidasSelecionadas: [],
      ingredientesRemovidos: [],
      erros: { nomeCliente: false, tamanho: false },
      mostrarConfirmacao: false,
      enviando: false,
    };
  },
  computed: {
    dadosParaConfirmacao() {
      return {
        nome: this.nomeCliente,
        pizza: this.pizza || {},
        tamanho: this.tamanhoSelecionado || {},
        bordas: this.listaBorasSelecionadas,
        bebidas: this.listaBebidasSelecionadas,
        ingredientesRemovidos: this.ingredientesRemovidos,
      };
    },
  },
  methods: {
    async getTamanhos() {
      const response = await fetch(`${this.$apiUrl}/tamanhos`);
      this.listaTamanhos = await response.json();
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaBordas = dados.bordas;
      this.listaBebidas = dados.bebidas;
    },
    validar() {
      this.erros.nomeCliente = !this.nomeCliente.trim();
      this.erros.tamanho = !this.tamanhoSelecionado;
      if (this.erros.nomeCliente || this.erros.tamanho) {
        this.$refs.alerta.mostrar("erro", "Preencha os campos obrigatórios antes de confirmar o pedido.");
        return false;
      }
      return true;
    },
    abrirConfirmacao(e) {
      e.preventDefault();
      if (!this.validar()) return;
      this.mostrarConfirmacao = true;
    },
    async confirmarPedido() {
      this.enviando = true;

      const dadosPedido = {
        nome: this.nomeCliente,
        tamanho: this.tamanhoSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        bordas: Array.from(this.listaBorasSelecionadas),
        ingredientesRemovidos: Array.from(this.ingredientesRemovidos),
        pizza: this.pizza,
        statusId: 5,
      };

      try {
        const resp = await fetch(`${this.$apiUrl}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosPedido),
        });

        if (!resp.ok) throw new Error();

        this.mostrarConfirmacao = false;
        this.$refs.alerta.mostrar("sucesso", `Pedido de ${this.nomeCliente} confirmado! Redirecionando...`, 2000);
        setTimeout(() => this.$router.push("/pedidos"), 2000);
      } catch {
        this.mostrarConfirmacao = false;
        this.$refs.alerta.mostrar("erro", "Não foi possível registrar o pedido. Verifique a conexão com o servidor.");
        this.enviando = false;
      }
    },
  },
  mounted() {
    this.getTamanhos();
    this.getOpcionais();
  },
};
</script>

<style scoped>
#pedido-wrapper {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

#pizza-hero {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
}

#foto-content {
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 16px;
}

#nome-pizza-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 36px;
  font-weight: bold;
  color: #fff8e7;
  padding: 40px 20px 16px;
  margin: 0;
  font-family: Georgia, serif;
  background: linear-gradient(transparent, rgba(0,0,0,0.65));
  text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
  box-sizing: border-box;
}

.card-form {
  background: #ffffff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
  color: #6d4c41;
  padding: 5px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-left: 4px solid #2e7d32;
  font-size: 15px;
}

.label-secao { border-left-color: #c62828; }
.label-remover { border-left-color: #e65100; }

.label-sub {
  font-weight: bold;
  margin-bottom: 10px;
  color: #6d4c41;
  padding: 4px 12px;
  display: flex;
  border-left: 4px solid #bdbdbd;
  font-size: 14px;
}

.label-inline {
  font-weight: 500;
  color: #6d4c41;
  font-size: 14px;
  padding: 0;
  border: none;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.secao-dica {
  font-size: 12px;
  color: #9e9e9e;
  margin: -6px 0 10px 14px;
}

.obrigatorio { color: #c62828; }

input[type="text"], select {
  padding: 12px;
  width: 100%;
  max-width: 360px;
  border: 1.5px solid #bdbdbd;
  border-radius: 8px;
  font-size: 14px;
  color: #6d4c41;
  background: #fafafa;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

input[type="text"]:focus, select:focus {
  border-color: #2e7d32;
  outline: none;
}

select { height: 46px; }

.campo-invalido input, .campo-invalido select {
  border-color: #c62828;
  background: #fff5f5;
}

.msg-erro {
  color: #c62828;
  font-size: 12px;
  margin-top: 4px;
  padding-left: 4px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-left: 4px;
}

.checkbox-container input[type="checkbox"] {
  width: 17px;
  height: 17px;
  min-width: 17px;
  padding: 0;
  accent-color: #2e7d32;
  cursor: pointer;
}

.preco-opcional {
  font-weight: normal;
  color: #c62828;
  font-size: 12px;
}

.badge-tipo {
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 20px;
  font-weight: bold;
}

.badge-tipo.doce { background: #fce4ec; color: #c2185b; }
.badge-tipo.salgada { background: #e8f5e9; color: #2e7d32; }

.resumo-remocao {
  font-size: 12px;
  color: #e65100;
  background: #fff3e0;
  border-radius: 6px;
  padding: 6px 12px;
  margin-top: 4px;
}

.bebidas-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 16px;
}

.submit-area { margin-top: 8px; }

.submit-btn {
  background-color: #c62828;
  color: #ffffff;
  font-weight: bold;
  border: none;
  font-size: 17px;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.25s;
  letter-spacing: 0.5px;
}

.submit-btn:hover { background-color: #2e7d32; }
</style>
