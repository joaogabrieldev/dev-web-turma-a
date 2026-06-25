<template>
  <div id="lista-wrapper">
    <alert-component ref="alerta" />

    <div v-if="listaPedidosRealizados.length === 0" id="lista-vazia">
      <img src="/img/logo_tanamassa.png" id="logo-vazia" alt="Tá na Massa" />
      <p>Nenhum pedido registrado ainda.</p>
    </div>

    <div v-else id="pedidos-tabela">
      <div id="pedidos-tabela-cabecalho">
        <div id="ordem-id">#</div>
        <div>Cliente</div>
        <div>Pizza</div>
        <div>Tamanho</div>
        <div>Opcionais</div>
        <div>Status</div>
        <div id="div-acoes">Ações</div>
      </div>

      <div
        class="pedidos-tabela-linha"
        v-for="pedido in listaPedidosRealizados"
        :key="pedido.id"
      >
        <div id="ordem-numero">{{ pedido.id }}</div>
        <div class="col-nome">{{ pedido.nome }}</div>
        <div>{{ pedido.pizza.nome }}</div>
        <div class="col-tamanho">{{ pedido.tamanho.descricao }}</div>
        <div class="col-opcionais">
          <ul v-if="pedido.bordas && pedido.bordas.length">
            <li v-for="(borda, index) in pedido.bordas" :key="index">{{ borda.nome }}</li>
          </ul>
          <div class="divider" v-if="pedido.bordas && pedido.bordas.length && pedido.bebidas && pedido.bebidas.length"></div>
          <ul v-if="pedido.bebidas && pedido.bebidas.length">
            <li v-for="(bebida, index) in pedido.bebidas" :key="index">{{ bebida.nome }}</li>
          </ul>
          <p v-if="pedido.ingredientesRemovidos && pedido.ingredientesRemovidos.length" class="sem-ingrediente">
            Sem: {{ pedido.ingredientesRemovidos.join(", ") }}
          </p>
          <span v-if="(!pedido.bordas || !pedido.bordas.length) && (!pedido.bebidas || !pedido.bebidas.length) && (!pedido.ingredientesRemovidos || !pedido.ingredientesRemovidos.length)" class="sem-opcionais">—</span>
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
          <button
            class="btn-deletar"
            @click="deletarPedido(pedido.id, pedido.nome)"
            title="Excluir pedido"
          ><img src="/img/icone_lixeira.png" width="28" height="28" alt="Excluir" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertComponent from "./AlertComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: { AlertComponent },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch(`${this.$apiUrl}/pedidos`);
      const dados = await response.json();
      this.listaPedidosRealizados = dados;
    },
    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async deletarPedido(id, nome) {
      const resp = await fetch(`${this.$apiUrl}/pedidos/${id}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
          (p) => p.id !== id
        );
        this.$refs.alerta.mostrar(
          "sucesso",
          `Pedido de ${nome || "#" + id} removido com sucesso.`
        );
      } else {
        this.$refs.alerta.mostrar("erro", "Não foi possível remover o pedido.");
      }
    },
    async atualizarStatusPedido(event, idPedido) {
      const idStatus = event.target.value;
      if (!idStatus) return;

      const resp = await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusId: idStatus }),
      });

      if (resp.ok) {
        const statusObj = this.listaStatusPedido.find((s) => s.id == idStatus);
        const descricao = statusObj ? statusObj.descricao : "novo status";
        const tipo = descricao === "Entregue" ? "info" : "sucesso";
        const mensagem =
          descricao === "Entregue"
            ? `Pedido marcado como "${descricao}". Pedido finalizado!`
            : `Status atualizado para "${descricao}".`;
        this.$refs.alerta.mostrar(tipo, mensagem);
      } else {
        this.$refs.alerta.mostrar("erro", "Erro ao atualizar o status do pedido.");
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
#lista-wrapper {
  padding: 0 20px 40px;
}

#lista-vazia {
  text-align: center;
  color: #6d4c41;
  padding: 60px 20px;
  font-size: 18px;
}

#logo-vazia {
  width: 100px;
  height: 100px;
  object-fit: contain;
  display: block;
  margin: 0 auto 16px;
  opacity: 0.5;
}

#pedidos-tabela {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

#pedidos-tabela-cabecalho,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 14px 12px;
  background-color: #2e7d32;
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 0.3px;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 17%;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 4%;
}

.pedidos-tabela-linha {
  padding: 12px;
  border-bottom: 1px solid #f5f5f5;
  background: #ffffff;
  font-size: 14px;
  color: #6d4c41;
}

.pedidos-tabela-linha:nth-child(even) {
  background: #fff8e7;
}

.pedidos-tabela-linha:hover {
  background: #f1f8e9;
}

.col-tamanho {
  font-size: 12px;
}

.col-opcionais ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

.col-opcionais .divider {
  border-top: 1px dashed #bdbdbd;
  margin: 4px 0;
}

.sem-opcionais {
  color: #bdbdbd;
}

.sem-ingrediente {
  font-size: 11px;
  color: #e65100;
  background: #fff3e0;
  border-radius: 4px;
  padding: 3px 6px;
  margin: 4px 0 0;
}

.btn-deletar {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-deletar:hover {
  background-color: #ffebee;
}

.status {
  border: 1.5px solid #bdbdbd;
  border-radius: 6px;
  padding: 5px 6px;
  font-size: 12px;
  background: #fff8e7;
  color: #6d4c41;
  width: 100%;
  cursor: pointer;
  transition: border-color 0.2s;
}

.status:focus {
  border-color: #2e7d32;
  outline: none;
}
</style>
