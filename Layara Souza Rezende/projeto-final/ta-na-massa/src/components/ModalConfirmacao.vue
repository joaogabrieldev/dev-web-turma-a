<template>
  <transition name="modal-fade">
    <div v-if="visivel" class="overlay" @click.self="$emit('cancelar')">
      <div class="modal-box">

        <!-- CABEÇALHO -->
        <div class="modal-header">
          <img :src="pedido.pizza.foto" :alt="pedido.pizza.nome" class="pizza-thumb" />
          <div class="header-info">
            <h2>{{ pedido.pizza.nome }}</h2>
            <p class="cliente-nome">Pedido de <strong>{{ pedido.nome }}</strong></p>
          </div>
          <button class="btn-fechar" @click="$emit('cancelar')">&#10005;</button>
        </div>

        <!-- RESUMO -->
        <div class="modal-body">

          <div class="linha-resumo">
            <span class="resumo-label">Tamanho</span>
            <span class="resumo-valor">{{ pedido.tamanho.descricao }}</span>
          </div>

          <div class="linha-resumo" v-if="pedido.ingredientesRemovidos && pedido.ingredientesRemovidos.length">
            <span class="resumo-label">Sem ingredientes</span>
            <span class="resumo-valor remover">{{ pedido.ingredientesRemovidos.join(", ") }}</span>
          </div>

          <div class="linha-resumo" v-if="pedido.bordas && pedido.bordas.length">
            <span class="resumo-label">Borda</span>
            <ul class="resumo-lista">
              <li v-for="(b, i) in pedido.bordas" :key="i">{{ b.nome }} <span class="preco">+R$ {{ b.valor }},00</span></li>
            </ul>
          </div>

          <div class="linha-resumo" v-if="pedido.bebidas && pedido.bebidas.length">
            <span class="resumo-label">Bebidas</span>
            <ul class="resumo-lista">
              <li v-for="(beb, i) in pedido.bebidas" :key="i">{{ beb.nome }}</li>
            </ul>
          </div>

          <!-- AVISO INLINE: sem bebidas e sem bordas -->
          <div
            class="aviso-inline"
            v-if="(!pedido.bebidas || !pedido.bebidas.length) && (!pedido.bordas || !pedido.bordas.length)"
          >
            <span class="aviso-icone">&#9888;</span>
            <span>Você não adicionou bordas nem bebidas ao pedido. Deseja continuar assim?</span>
          </div>

        </div>

        <!-- RODAPÉ -->
        <div class="modal-footer">
          <button class="btn-cancelar" @click="$emit('cancelar')" :disabled="confirmando">
            Voltar e editar
          </button>
          <button class="btn-confirmar" @click="$emit('confirmar')" :disabled="confirmando">
            {{ confirmando ? "Enviando..." : "Confirmar Pedido" }}
          </button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalConfirmacao",
  props: {
    visivel: {
      type: Boolean,
      default: false,
    },
    pedido: {
      type: Object,
      default: () => ({}),
    },
    confirmando: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["confirmar", "cancelar"],
};
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}

.modal-box {
  background: #ffffff;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

/* CABEÇALHO */
.modal-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}

.pizza-thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

.header-info h2 {
  font-family: Georgia, serif;
  font-size: 20px;
  color: #6d4c41;
  margin: 0 0 4px;
}

.cliente-nome {
  font-size: 13px;
  color: #9e9e9e;
  margin: 0;
}

.btn-fechar {
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #9e9e9e;
  padding: 2px 5px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.btn-fechar:hover {
  color: #3e2723;
  background: #e0e0e0;
}

/* CORPO */
.modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.linha-resumo {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 14px;
  background: #fafafa;
  border-radius: 8px;
  border-left: 4px solid #2e7d32;
}

.resumo-label {
  font-size: 13px;
  font-weight: bold;
  color: #6d4c41;
  min-width: 120px;
  flex-shrink: 0;
}

.resumo-valor {
  font-size: 13px;
  color: #6d4c41;
}

.resumo-valor.remover {
  color: #e65100;
}

.resumo-lista {
  margin: 0;
  padding-left: 16px;
  font-size: 13px;
  color: #6d4c41;
}

.resumo-lista li {
  margin-bottom: 2px;
}

.preco {
  color: #c62828;
  font-size: 12px;
  margin-left: 4px;
}

.aviso-inline {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  background: #fff3e0;
  border-radius: 8px;
  border-left: 4px solid #e65100;
  font-size: 13px;
  color: #bf360c;
}

.aviso-icone {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* RODAPÉ */
.modal-footer {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #e0e0e0;
  justify-content: flex-end;
}

.btn-cancelar {
  padding: 12px 24px;
  border: 2px solid #2e7d32;
  background: #ffffff;
  color: #2e7d32;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.btn-cancelar:hover:not(:disabled) {
  background: #2e7d32;
  color: #ffffff;
}

.btn-confirmar {
  padding: 12px 24px;
  background: #c62828;
  color: #ffffff;
  font-weight: bold;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-confirmar:hover:not(:disabled) {
  background: #b71c1c;
}

.btn-cancelar:disabled,
.btn-confirmar:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* ANIMAÇÃO */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-active .modal-box,
.modal-fade-leave-active .modal-box {
  transition: transform 0.25s ease;
}

.modal-fade-enter-from {
  opacity: 0;
}

.modal-fade-enter-from .modal-box {
  transform: scale(0.92) translateY(-12px);
}

.modal-fade-leave-to {
  opacity: 0;
}
</style>
