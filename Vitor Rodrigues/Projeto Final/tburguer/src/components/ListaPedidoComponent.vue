<template>
  <div>
    <div v-if="msgExclusao" class="alerta-container alerta-laranja">
      <span>{{ msgExclusao }}</span>
    </div>

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Base de Açaí</div>
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
      <div>{{ pedido.baseAcai && pedido.baseAcai.nome ? pedido.baseAcai.nome : "-" }}</div>
      <div>{{ pedido.tamanho && pedido.tamanho.descricao ? pedido.tamanho.descricao : "-" }}</div>
      <div>
        <ul>
          <li v-for="(complemento, index) in pedido.complemento" :key="index">
            {{ complemento.nome }}
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
          style="cursor: pointer;"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaPedidoComponent",
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      msgExclusao: null,
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch(`${this.$apiUrl}/pedidos`);
      const dados = await response.json();
      console.log(dados);
      this.listaPedidosRealizados = dados;
    },
    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async deletarPedido(id) {
      const response = await fetch(`${this.$apiUrl}/pedidos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        this.msgExclusao = `⚠️ O pedido #${id} foi removido com sucesso!`;
        this.consultarPedidos();

        setTimeout(() => {
          this.msgExclusao = null;
        }, 3000);
      }
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizaoJson = JSON.stringify({ statusId: idPedidoAtualizado });

      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: atualizaoJson,
      });
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
.alerta-container {
  padding: 15px;
  max-width: 600px;
  margin: 20px auto;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.alerta-laranja {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

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