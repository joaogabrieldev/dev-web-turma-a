<template>
  <transition name="modal-fade">
    <div v-if="visivel" class="modal-overlay" @click.self="fechar">
      <div class="modal-box" :class="tipo">
        <div class="modal-icone-area">
          <div class="modal-icone">
            <span v-if="tipo === 'erro'">&#10007;</span>
            <span v-else-if="tipo === 'aviso'">&#9888;</span>
            <span v-else-if="tipo === 'info'">&#9432;</span>
            <span v-else-if="tipo === 'sucesso'">&#10003;</span>
          </div>
        </div>
        <div class="modal-conteudo">
          <p class="modal-titulo">{{ titulos[tipo] }}</p>
          <p class="modal-mensagem">{{ mensagem }}</p>
        </div>
        <button class="modal-fechar" @click="fechar">&#10005;</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AlertComponent",
  data() {
    return {
      visivel: false,
      tipo: "info",
      mensagem: "",
      titulos: {
        erro: "Erro",
        aviso: "Atenção",
        info: "Informação",
        sucesso: "Sucesso",
      },
      timer: null,
    };
  },
  methods: {
    mostrar(tipo, mensagem, duracao = 2500) {
      clearTimeout(this.timer);
      this.tipo = tipo;
      this.mensagem = mensagem;
      this.visivel = true;
      if (duracao > 0) {
        this.timer = setTimeout(() => {
          this.visivel = false;
        }, duracao);
      }
    },
    fechar() {
      clearTimeout(this.timer);
      this.visivel = false;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-box {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 18px;
  background: #ffffff;
  border-radius: 14px;
  padding: 28px 32px 28px 24px;
  min-width: 340px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
  border-top: 5px solid;
}

.modal-box.erro   { border-color: #c62828; }
.modal-box.aviso  { border-color: #e65100; }
.modal-box.info   { border-color: #1565c0; }
.modal-box.sucesso{ border-color: #2e7d32; }

.modal-icone-area {
  flex-shrink: 0;
}

.modal-icone {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
}

.erro    .modal-icone { background: #ffebee; color: #c62828; }
.aviso   .modal-icone { background: #fff3e0; color: #e65100; }
.info    .modal-icone { background: #e3f2fd; color: #1565c0; }
.sucesso .modal-icone { background: #e8f5e9; color: #2e7d32; }

.modal-conteudo {
  flex: 1;
}

.modal-titulo {
  font-size: 17px;
  font-weight: bold;
  margin: 0 0 6px;
  color: #3e2723;
}

.erro    .modal-titulo { color: #c62828; }
.aviso   .modal-titulo { color: #e65100; }
.info    .modal-titulo { color: #1565c0; }
.sucesso .modal-titulo { color: #2e7d32; }

.modal-mensagem {
  font-size: 14px;
  color: #6d4c41;
  margin: 0;
  line-height: 1.5;
}

.modal-fechar {
  position: absolute;
  top: 12px;
  right: 14px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #9e9e9e;
  line-height: 1;
  padding: 2px 4px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.modal-fechar:hover {
  color: #3e2723;
  background: #f5f5f5;
}

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
  transform: scale(0.9) translateY(-16px);
}

.modal-fade-leave-to {
  opacity: 0;
}
</style>
