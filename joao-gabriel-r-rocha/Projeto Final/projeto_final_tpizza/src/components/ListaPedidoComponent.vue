<template>
  <div>
    <AlertaComponent
      v-if="alerta"
      :key="alertaKey"
      :tipo="alerta.tipo"
      :mensagem="alerta.mensagem"
      @fechar="alerta = null"
    />

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Pizza</div>
          <div>Tamanho</div>
          <div>Adicionais</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>
    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.pizza ? pedido.pizza.nome : "-" }}</div>
      <div>{{ pedido.tamanho ? pedido.tamanho.descricao : "-" }}</div>
      <div>
        <ul>
          <li v-for="(adicional, index) in pedido.adicionais" :key="index">
            {{ adicional.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(bebida, index) in pedido.bebidas" :key="index">
            {{ bebida.nome }}
          </li>
        </ul>
      </div>
      <div>
        <select
          name="status"
          class="status"
          @change="atualizarStatusPedido($event, pedido.id)"
        >
          <option value="">Selecione</option>
          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div id="div-acoes">
        <img
          @click="deletarPedido(pedido.id)"
          src="/img/icone_lixeira.png"
          width="35px"
          height="35px"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: {
    AlertaComponent,
  },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      alerta: null,
      alertaKey: 0,
    };
  },
  methods: {
    mostrarAlerta(tipo, mensagem) {
      this.alertaKey++;
      this.alerta = { tipo, mensagem };
    },
    async consultarPedidos() {
      try {
        const response = await fetch(`${this.$apiUrl}/pedidos`);
        if (!response.ok) throw new Error("Falha ao carregar pedidos");
        this.listaPedidosRealizados = await response.json();
      } catch (erro) {
        console.error(erro);
        this.mostrarAlerta(
          "erro",
          "Não foi possível carregar os pedidos. Tente novamente."
        );
      }
    },
    async consultarStatusPedido() {
      try {
        const response = await fetch(`${this.$apiUrl}/status_pedido`);
        if (!response.ok) throw new Error("Falha ao carregar status");
        this.listaStatusPedido = await response.json();
      } catch (erro) {
        console.error(erro);
        this.mostrarAlerta(
          "erro",
          "Não foi possível carregar a lista de status. Tente novamente."
        );
      }
    },
    async deletarPedido(id) {
      try {
        const response = await fetch(`${this.$apiUrl}/pedidos/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Falha ao remover o pedido");

        // Re-render imediato: remove a linha sem refresh (AC-07.1)
        this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
          (p) => p.id !== id
        );
        this.mostrarAlerta("sucesso", "Pedido removido com sucesso.");
      } catch (erro) {
        console.error(erro);
        // A linha permanece e exibimos o erro (AC-07.2)
        this.mostrarAlerta(
          "erro",
          "Não foi possível remover o pedido. Tente novamente."
        );
      }
    },
    async atualizarStatusPedido(event, idPedido) {
      const idStatusAtualizado = event.target.value;
      const atualizacaoJson = JSON.stringify({ statusId: idStatusAtualizado });

      try {
        const response = await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: atualizacaoJson,
        });

        if (!response.ok) throw new Error("Falha ao atualizar o status");

        // Reflete no estado local para manter a lista coerente
        const pedido = this.listaPedidosRealizados.find(
          (p) => p.id === idPedido
        );
        if (pedido) pedido.statusId = idStatusAtualizado;

        this.mostrarAlerta("info", "Status do pedido atualizado.");
      } catch (erro) {
        console.error(erro);
        this.mostrarAlerta(
          "erro",
          "Não foi possível atualizar o status. Tente novamente."
        );
      }
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>
<style scoped>
#pedidos-tabela {
  width: 100%;
  margin: 0 auto;
}

#pedidos-tabela-cabecalho,
#pedidos-tabela-linhas,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #222;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #222;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}
</style>
