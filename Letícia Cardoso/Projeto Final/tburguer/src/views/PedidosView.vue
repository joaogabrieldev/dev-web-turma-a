<template>
  <div class="pedidos-page">
    <!-- Alerta de feedback global -->
    <AlertaComponent
      :mensagem="alerta.mensagem"
      :tipo="alerta.tipo"
      @fechar="alerta.mensagem = ''"
    />

    <!-- Modal de confirmação de remoção -->
    <transition name="modal-fade">
      <div v-if="modal.visivel" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-card">
          <div class="modal-header">
            <span class="modal-icon">⚠️</span>
            <h3>Remover Pedido</h3>
          </div>
          <div class="modal-body">
            <p>
              Tem certeza que deseja remover
              <strong>{{ modal.nomeItem }}</strong> do histórico de pedidos?
            </p>
            <p class="modal-warning">Essa ação não pode ser desfeita.</p>
          </div>
          <div class="modal-footer">
            <button class="btn-modal-cancelar" @click="fecharModal">Cancelar</button>
            <button class="btn-modal-confirmar" :disabled="removendo" @click="confirmarRemocao">
              <span v-if="removendo" class="spinner-btn"></span>
              {{ removendo ? 'Removendo...' : 'Sim, remover' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div class="page-header">
      <div>
        <span class="section-tag">ÁREA DE PEDIDOS</span>
        <h1 class="page-title">Seus Pedidos</h1>
      </div>
      <router-link to="/menu" class="btn-novo-pedido">+ Novo Pedido</router-link>
    </div>

    <!-- Loading -->
    <div v-if="carregando" class="state-container">
      <div class="loading-spinner"></div>
      <p>Buscando seus pedidos...</p>
    </div>

    <!-- Carrinho vazio -->
    <div v-else-if="listaPedidos.length === 0" class="state-container carrinho-vazio">
      <span class="state-icon">☕</span>
      <h3>Nenhum pedido encontrado</h3>
      <p>Que tal explorar nosso cardápio e fazer o primeiro pedido?</p>
      <router-link to="/menu" class="btn-voltar">Ver o Cardápio</router-link>
    </div>

    <!-- Lista de pedidos + resumo -->
    <div v-else class="pedidos-layout">
      <div class="lista-pedidos">
        <div
          v-for="pedido in listaPedidos"
          :key="pedido.id"
          class="pedido-card"
        >
          <div class="pedido-foto">
            <img
              :src="pedido.foto_cafe || imagemFallback"
              :alt="pedido.nome_cafe"
              @error="(e) => e.target.src = imagemFallback"
            />
          </div>

          <div class="pedido-info">
            <div class="pedido-top">
              <h3 class="pedido-nome">{{ pedido.nome_cafe || 'Café Especial' }}</h3>
              <span :class="['status-badge', statusClass(pedido.status)]">
                {{ pedido.status || 'Em preparação' }}
              </span>
            </div>

            <p class="pedido-cliente">
              <strong>Cliente:</strong> {{ pedido.nome_cliente || 'Não informado' }}
            </p>

            <div class="pedido-tags">
              <span class="tag" v-if="pedido.tamanho">📏 {{ pedido.tamanho }}</span>
              <span class="tag" v-if="pedido.tipo_leite">🥛 {{ pedido.tipo_leite }}</span>
            </div>

            <div v-if="pedido.opcionais && pedido.opcionais.length" class="pedido-extras">
              <span class="extras-label">Extras:</span>
              <span
                v-for="extra in pedido.opcionais"
                :key="extra.id"
                class="extra-tag"
              >{{ extra.nome }}</span>
            </div>
          </div>

          <div class="pedido-preco-acao">
            <span class="pedido-preco">R$ {{ parseFloat(String(pedido.valor_total).replace(',', '.')).toFixed(2) }}</span>
            <button
              class="btn-remover"
              @click="abrirModal(pedido)"
              title="Remover pedido"
              aria-label="Remover pedido"
            >
              <!-- Ícone de lixeira inline SVG (sem depender de imagem local) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Painel de resumo -->
      <aside class="resumo-painel">
        <h3 class="resumo-titulo">Resumo</h3>
        <div class="resumo-linha">
          <span>Itens</span>
          <span>{{ listaPedidos.length }}</span>
        </div>
        <div class="resumo-linha resumo-total">
          <span>Total</span>
          <span>R$ {{ totalGeral }}</span>
        </div>
        <button class="btn-finalizar" @click="finalizarCompra">
          Confirmar e Pagar
        </button>
        <router-link to="/menu" class="btn-continuar">Continuar Comprando</router-link>
      </aside>
    </div>
  </div>
</template>

<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "PedidosView",
  components: { AlertaComponent },

  data() {
    return {
      listaPedidos: [],
      carregando: true,
      removendo: false,

      modal: {
        visivel: false,
        idItem: null,
        nomeItem: ""
      },

      alerta: { mensagem: "", tipo: "info" },

      imagemFallback:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=300&auto=format&fit=crop"
    };
  },

  computed: {
    totalGeral() {
      const soma = this.listaPedidos.reduce((acc, p) => {
        const val = parseFloat(String(p.valor_total).replace(",", ".")) || 0;
        return acc + val;
      }, 0);
      return soma.toFixed(2);
    }
  },

  methods: {
    mostrarAlerta(mensagem, tipo = "info") {
      this.alerta = { mensagem, tipo };
    },

    statusClass(status) {
      if (!status) return "badge-default";
      const s = status.toLowerCase();
      if (s.includes("conclu") || s.includes("entregue")) return "badge-verde";
      if (s.includes("prepara") || s.includes("andamento")) return "badge-laranja";
      if (s.includes("cancel")) return "badge-vermelho";
      return "badge-default";
    },

    /** Busca pedidos do JSON Server ao montar a view */
    async buscarPedidos() {
      this.carregando = true;
      try {
        const response = await fetch("https://api-ambarcafe.onrender.com/pedidos");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        this.listaPedidos = await response.json();
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        this.mostrarAlerta(
          "Não foi possível carregar os pedidos. Verifique se o JSON Server está rodando.",
          "aviso"
        );
      } finally {
        this.carregando = false;
      }
    },

    abrirModal(pedido) {
      this.modal.idItem = pedido.id;
      this.modal.nomeItem = pedido.nome_cafe || "este pedido";
      this.modal.visivel = true;
    },

    fecharModal() {
      this.modal = { visivel: false, idItem: null, nomeItem: "" };
    },

    /** DELETE no JSON Server + atualização reativa imediata da lista */
    async confirmarRemocao() {
      const id = this.modal.idItem;
      this.removendo = true;
      try {
        const response = await fetch(`https://api-ambarcafe.onrender.com/pedidos/${id}`, {
          method: "DELETE"
        });

        if (response.ok) {
          // Atualização reativa: filtra o array local — sem refresh de página
          this.listaPedidos = this.listaPedidos.filter(p => p.id !== id);
          this.fecharModal();
          this.mostrarAlerta("Pedido removido com sucesso.", "aviso");
        } else {
          this.mostrarAlerta("Não foi possível remover o pedido. Tente novamente.", "erro");
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
        this.mostrarAlerta("Erro de conexão ao remover o pedido.", "erro");
      } finally {
        this.removendo = false;
      }
    },

    finalizarCompra() {
      if (this.listaPedidos.length === 0) {
        this.mostrarAlerta("Seu carrinho está vazio!", "aviso");
        return;
      }
      this.mostrarAlerta(
        "Pedido enviado para a cozinha do Âmbar Café! ☕ Prepare-se para uma ótima experiência.",
        "sucesso"
      );
    }
  },

  /** Carrega pedidos imediatamente ao montar a view */
  mounted() {
    this.buscarPedidos();
  }
};
</script>

<style scoped>
.pedidos-page {
  max-width: 1140px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

/* Header da página */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.section-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #8c6d53;
  display: block;
  margin-bottom: 6px;
}

.page-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 36px;
  color: #2b1b12;
  margin: 0;
  font-weight: 700;
}

.btn-novo-pedido {
  display: inline-flex;
  align-items: center;
  background-color: #2b1b12;
  color: #f7f3ee;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: all 0.2s;
  gap: 6px;
}

.btn-novo-pedido:hover {
  background-color: #4a3427;
  transform: translateY(-1px);
}

/* Estados de loading / vazio */
.state-container {
  text-align: center;
  padding: 80px 20px;
  color: #7a6a5e;
}

.state-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.carrinho-vazio h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  color: #2b1b12;
  margin: 0 0 8px;
}

.carrinho-vazio p {
  font-size: 15px;
  margin: 0 0 24px;
}

.btn-voltar {
  display: inline-block;
  background-color: #2b1b12;
  color: #f7f3ee;
  text-decoration: none;
  padding: 13px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: opacity 0.2s;
}

.btn-voltar:hover { opacity: 0.88; }

.loading-spinner {
  width: 44px;
  height: 44px;
  border: 3px solid #e6dfd5;
  border-top-color: #2b1b12;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Layout principal */
.pedidos-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  align-items: start;
}

/* Lista de pedidos */
.lista-pedidos {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pedido-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid rgba(43, 27, 18, 0.05);
  box-shadow: 0 4px 16px rgba(43, 27, 18, 0.03);
  transition: box-shadow 0.2s;
}

.pedido-card:hover {
  box-shadow: 0 8px 24px rgba(43, 27, 18, 0.06);
}

.pedido-foto {
  width: 90px;
  height: 90px;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #f5efe6;
}

.pedido-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pedido-info {
  flex: 1;
  text-align: left;
  min-width: 0;
}

.pedido-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.pedido-nome {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px;
  color: #2b1b12;
  margin: 0;
  font-weight: 700;
}

/* Status badges */
.status-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.badge-verde    { background-color: #d4edda; color: #155724; }
.badge-laranja  { background-color: #fff3cd; color: #856404; }
.badge-vermelho { background-color: #f8d7da; color: #721c24; }
.badge-default  { background-color: #e6dfd5; color: #523b2e; }

.pedido-cliente {
  font-size: 13.5px;
  color: #523b2e;
  margin: 0 0 8px;
}

.pedido-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.tag {
  background-color: #f5efe6;
  color: #615045;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 20px;
  font-weight: 500;
}

.pedido-extras {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.extras-label {
  font-size: 12px;
  color: #8c6d53;
  font-weight: 600;
}

.extra-tag {
  background-color: #eae3da;
  color: #523b2e;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
}

.pedido-preco-acao {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

.pedido-preco {
  font-size: 19px;
  font-weight: 800;
  color: #2b1b12;
  white-space: nowrap;
}

.btn-remover {
  background: none;
  border: 1.5px solid rgba(192, 57, 43, 0.25);
  color: #c0392b;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-remover:hover {
  background-color: #fdf0ee;
  border-color: #c0392b;
  transform: scale(1.08);
}

/* Painel de resumo */
.resumo-painel {
  background-color: #2b1b12;
  color: #f7f3ee;
  padding: 28px 24px;
  border-radius: 24px;
  position: sticky;
  top: 100px;
}

.resumo-titulo {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  margin: 0 0 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(247, 243, 238, 0.12);
}

.resumo-linha {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgba(247, 243, 238, 0.7);
  margin-bottom: 12px;
}

.resumo-total {
  font-size: 17px;
  font-weight: 700;
  color: #f7f3ee;
  padding-top: 12px;
  border-top: 1px solid rgba(247, 243, 238, 0.12);
  margin-top: 6px;
}

.btn-finalizar {
  width: 100%;
  background-color: #f7f3ee;
  color: #2b1b12;
  border: none;
  padding: 15px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  margin-top: 20px;
}

.btn-finalizar:hover { background-color: #e6dfd5; }

.btn-continuar {
  display: block;
  text-align: center;
  margin-top: 12px;
  color: rgba(247, 243, 238, 0.6);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: color 0.2s;
}

.btn-continuar:hover { color: #f7f3ee; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(43, 27, 18, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 8000;
}

.modal-card {
  background-color: #f7f3ee;
  border-radius: 22px;
  width: 90%;
  max-width: 420px;
  padding: 28px;
  box-shadow: 0 20px 50px rgba(43, 27, 18, 0.2);
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.modal-icon {
  font-size: 22px;
  background-color: #fff3cd;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.modal-header h3 {
  font-family: 'Playfair Display', Georgia, serif;
  color: #2b1b12;
  font-size: 20px;
  margin: 0;
}

.modal-body p {
  color: #615045;
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 10px;
  text-align: left;
}

.modal-warning {
  font-size: 13px !important;
  color: #c0392b !important;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-modal-cancelar {
  background-color: #e6dfd5;
  color: #523b2e;
  border: none;
  padding: 11px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.btn-modal-cancelar:hover { background-color: #dcd4c9; }

.btn-modal-confirmar {
  background-color: #c0392b;
  color: #ffffff;
  border: none;
  padding: 11px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.btn-modal-confirmar:hover:not(:disabled) { opacity: 0.9; }
.btn-modal-confirmar:disabled { opacity: 0.65; cursor: not-allowed; }

.spinner-btn {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

/* Transição do modal */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* Responsividade */
@media (max-width: 820px) {
  .pedidos-layout { grid-template-columns: 1fr; }
  .resumo-painel { position: static; }
  .page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
}

@media (max-width: 480px) {
  .pedido-card { flex-wrap: wrap; }
  .pedido-preco-acao { flex-direction: row; align-items: center; width: 100%; justify-content: space-between; }
}
</style>