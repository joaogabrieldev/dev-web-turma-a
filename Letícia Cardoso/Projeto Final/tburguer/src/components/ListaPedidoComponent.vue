<template>
  <div>
    <AlertaComponent :mensagem="alerta.mensagem" :tipo="alerta.tipo" />

    <div id="pedidos-tabela">
      <div id="pedidos-tabela-cabecalho">
        <div id="ordem-id">#ID</div>
        <div>Cliente</div>
        <div>Item</div>
        <div>Preparo</div>
        <div>Extras</div>
        <div>Status</div>
        <div id="div-acoes">Ações</div>
      </div>
    </div>

    <div class="pedidos-tabela-linha" v-for="pedido in listaPedidosRealizados" :key="pedido.id">
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.burguer ? pedido.burguer.nome : 'Café Tradicional' }}</div>
      <div>{{ pedido.ponto ? pedido.ponto.descricao : '-' }}</div>
      <div>
        <ul>
          <li v-for="(extra, index) in pedido.complemento" :key="index">{{ extra.nome }}</li>
        </ul>
      </div>
      <div>
        <select class="status" @change="atualizarStatusPedido($event, pedido.id)">
          <option v-for="status in listaStatusPedido" :key="status.id" :value="status.id" :selected="status.id == pedido.statusId">
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div id="div-acoes">
        <img @click="deletarPedido(pedido.id)" src="/img/icone_lixeira.png" width="30px" height="30px" style="cursor:pointer;" />
      </div>
    </div>
  </div>
</template>

<script>
import AlertaComponent from './AlertaComponent.vue';

export default {
  name: "ListaPedidoComponent",
  components: { AlertaComponent },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      alerta: { mensagem: "", tipo: "" }
    };
  },
  methods: {
    exibirAlerta(mensagem, tipo) {
      this.alerta = { mensagem, tipo };
      setTimeout(() => { this.alerta = { mensagem: "", tipo: "" }; }, 3500);
    },
    async consultarPedidos() {
      const response = await fetch(`${this.$apiUrl}/pedidos`);
      this.listaPedidosRealizados = await response.json();
    },
    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async deletarPedido(id) {
      if (confirm("Deseja realmente remover este pedido?")) {
        const response = await fetch(`${this.$apiUrl}/pedidos/${id}`, { method: "DELETE" });
        
        if (response.ok) {
          this.exibirAlerta("Pedido excluído com sucesso!", "aviso"); // Laranja/Aviso de remoção
          
          // ATUALIZAÇÃO EM TEMPO REAL: Filtra o array local imediatamente para re-renderizar a tela
          this.listaPedidosRealizados = this.listaPedidosRealizados.filter(pedido => pedido.id !== id);
        }
      }
    },
    async atualizarStatusPedido(event, idPedido) {
      const novoStatus = event.target.value;
      const response = await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusId: novoStatus }),
      });

      if (response.ok) {
        this.exibirAlerta("Status do pedido atualizado!", "info"); // Azul
      }
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>