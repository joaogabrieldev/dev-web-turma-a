<template>
  <div>
    <AlertaComponent :mensagem="alerta.mensagem" :tipo="alerta.tipo" />

    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-produto-content">
          {{ produto && produto.nome ? produto.nome : "-" }}
        </p>
        <img id="foto-content" :src="produto && produto.foto ? produto.foto : ''" />
      </div>

      <div class="inputs">
        <label for="nome-cliente">Nome do Cliente *</label>
        <input
          type="text"
          v-model="nomeCliente"
          id="nome-cliente"
          placeholder="Digite seu Nome"
        />
      </div>

      <div class="inputs">
        <label>Tamanho/Preparo *</label>
        <select v-model="preparoSelecionado">
          <option value="">Selecione a opção base</option>
          <option v-for="opcao in listaPreparos" :key="opcao.id" :value="opcao">
            {{ opcao.descricao }}
          </option>
        </select>
      </div>

      <div class="inputs">
        <label id="opcionais-titulo"> Acompanhamentos & Extras</label>
        <div class="checkbox-container" v-for="extra in listaExtras" :key="extra.id">
          <input type="checkbox" :value="extra" v-model="listaExtrasSelecionados" />
          <span>{{ extra.nome }}</span>
        </div>

        <div class="inputs">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AlertaComponent from './AlertaComponent.vue';

export default {
  name: "PedidoComponent",
  components: { AlertaComponent },
  props: { produto: null },
  data() {
    return {
      listaPreparos: [],
      listaExtras: [],
      nomeCliente: "",
      preparoSelecionado: "",
      listaExtrasSelecionados: [],
      alerta: { mensagem: "", tipo: "" }
    };
  },
  methods: {
    exibirAlerta(mensagem, tipo) {
      this.alerta = { mensagem, tipo };
      setTimeout(() => { this.alerta = { mensagem: "", tipo: "" }; }, 4000);
    },
    async getDadosCafeteria() {
      // Ajuste os endpoints baseados na sua API mockada
      const resPreparo = await fetch(`${this.$apiUrl}/tipos_pontos`);
      this.listaPreparos = await resPreparo.json();
      
      const resOpcionais = await fetch(`${this.$apiUrl}/opcionais`);
      const dadosOpcionais = await resOpcionais.json();
      this.listaExtras = dadosOpcionais.complemento || [];
    },
    async criarPedido(e) {
      e.preventDefault();

      // REGRA: Campos Obrigatórios Bloqueados
      if (!this.nomeCliente.trim() || !this.preparoSelecionado) {
        this.exibirAlerta("Erro: Preencha o Nome e o Tamanho/Preparo!", "erro");
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        ponto: this.preparoSelecionado,
        complemento: Array.from(this.listaExtrasSelecionados),
        burguer: this.produto, // Mantido o mapeamento original da API do professor se necessário
        statusId: 1, 
      };

      try {
        const req = await fetch(`${this.$apiUrl}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosPedido),
        });

        if (req.ok) {
          this.exibirAlerta("Pedido cadastrado com sucesso! Redirecionando...", "sucesso");
          
          // Redirecionamento Inteligente pós exibição do feedback positivo
          setTimeout(() => {
            this.$router.push("/pedidos");
          }, 2000);
        }
      } catch (err) {
        this.exibirAlerta("Erro ao processar requisição com a API.", "erro");
      }
    }
  },
  mounted() {
    this.getDadosCafeteria();
  }
};
</script>

<style scoped>
/* Aproveite a sua estilização adicionando tons #5c3a21 (marrom) nos botões e bordas de destaque */
label { border-left: 4px solid #5c3a21; }
.submit-btn { background-color: #5c3a21; color: white; }
.submit-btn:hover { background-color: #3e2723; }
</style>