<template>
  <div class="config-page">
    <AlertaComponent
      :mensagem="alerta.mensagem"
      :tipo="alerta.tipo"
      @fechar="alerta.mensagem = ''"
    />

    <div class="config-container">
      <aside class="product-summary">
        <div class="product-image-container">
          <img :src="produto.foto || imagemFallback" :alt="produto.nome" @error="(e) => e.target.src = imagemFallback" />
        </div>
        <div class="product-details">
          <span class="category-pill">{{ produto.categoria || 'Especialidade' }}</span>
          <h2 class="product-title">{{ produto.nome || 'Café Especial' }}</h2>
          <p class="product-description-text">{{ produto.descricao || 'Prepare uma experiência única.' }}</p>
          <div class="price-row">
            <span class="price-label">Valor total</span>
            <span class="price-value">R$ {{ valorTotal }}</span>
          </div>
        </div>
      </aside>

      <section class="customization-panel">
        <div class="panel-header">
          <h2 class="config-title">
            {{ produto.categoria === 'bebidas' ? 'Personalize sua Bebida' : 'Personalize seu Lanche' }}
          </h2>
          <p class="config-subtitle">Escolha os detalhes perfeitos para a sua experiência Âmbar.</p>
        </div>

        <div class="form-group" :class="{ 'has-error': erros.nomeCliente }">
          <label class="form-label" for="nome-cliente">
            Nome do Cliente <span class="required">*</span>
          </label>
          <input
            id="nome-cliente"
            type="text"
            v-model.trim="nomeCliente"
            class="form-input"
            placeholder="Como devemos chamar você?"
            @input="erros.nomeCliente = false"
          />
          <span v-if="erros.nomeCliente" class="field-error">Informe seu nome para continuar.</span>
        </div>

        <div class="options-group" :class="{ 'has-error': erros.tamanho }">
          <h3 class="group-title">
            {{ produto.categoria === 'bebidas' ? 'Tamanho da Bebida' : 'Tamanho / Porção' }} <span class="required">*</span>
          </h3>
          <div class="radio-grid">
            <label
              v-for="op in opcoesTamanho"
              :key="op.value"
              :class="['radio-card', { selected: tamanhoSelecionado === op.value }]"
            >
              <input
                type="radio"
                name="tamanho"
                :value="op.value"
                v-model="tamanhoSelecionado"
                @change="erros.tamanho = false"
              />
              <span class="radio-label-text">
                <strong>{{ op.label }}</strong>
                <small>{{ op.desc }}</small>
              </span>
            </label>
          </div>
          <span v-if="erros.tamanho" class="field-error">Selecione uma opção para continuar.</span>
        </div>

        <div v-if="produto.categoria === 'bebidas'" class="options-group" :class="{ 'has-error': erros.leite }">
          <h3 class="group-title">
            Tipo de Leite <span class="required">*</span>
          </h3>
          <div class="radio-grid">
            <label
              v-for="op in opcoesLeite"
              :key="op.value"
              :class="['radio-card', { selected: leiteSelecionado === op.value }]"
            >
              <input
                type="radio"
                name="leite"
                :value="op.value"
                v-model="leiteSelecionado"
                @change="erros.leite = false"
              />
              <span class="radio-label-text">
                <strong>{{ op.label }}</strong>
                <small v-if="op.extra" class="extra-cost">{{ op.extra }}</small>
              </span>
            </label>
          </div>
          <span v-if="erros.leite" class="field-error">Selecione o tipo de leite para continuar.</span>
        </div>

        <div class="options-group">
          <h3 class="group-title">Acompanhamentos <span class="optional-tag">Opcional</span></h3>
          <div class="checkbox-grid">
            <label
              v-for="extra in extrasDisponiveis"
              :key="extra.id"
              :class="['checkbox-card', { selected: extrasAtivos.includes(extra.id) }]"
            >
              <input
                type="checkbox"
                :value="extra.id"
                v-model="extrasAtivos"
              />
              <span class="checkbox-label-text">
                {{ extra.nome }}
                <small v-if="extra.preco" class="extra-cost">+ R$ {{ extra.preco }}</small>
              </span>
            </label>
          </div>
        </div>

        <button
          class="btn-submit"
          :disabled="enviando"
          @click="confirmarPedido"
        >
          <span v-if="enviando" class="spinner-btn"></span>
          {{ enviando ? 'Enviando...' : 'Confirmar Pedido' }}
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: { AlertaComponent },

  data() {
    return {
      produto: {},
      nomeCliente: "",
      tamanhoSelecionado: "",
      leiteSelecionado: "",
      extrasAtivos: [],
      enviando: false,
      erros: {
        nomeCliente: false,
        tamanho: false,
        leite: false
      },
      alerta: { mensagem: "", tipo: "info" },
      imagemFallback:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop",
      opcoesLeite: [
        { value: "integral",  label: "Integral",      extra: null },
        { value: "desnatado", label: "Desnatado",     extra: null },
        { value: "aveia",     label: "Aveia",         extra: "+ R$ 4,00" },
        { value: "amêndoas",  label: "Amêndoas",      extra: "+ R$ 5,00" }
      ],
      extrasDisponiveis: [
        { id: 1, nome: "Chantilly extra",   preco: "2,00" },
        { id: 2, nome: "Calda de caramelo", preco: "2,00" },
        { id: 3, nome: "Shot duplo de café", preco: "3,00" },
        { id: 4, nome: "Cinnamon Roll",     preco: "9,90" }
      ]
    };
  },
computed: {
    // Retorna os tamanhos dinamicamente de acordo com a categoria do produto
    opcoesTamanho() {
      if (this.produto.categoria === "bebidas") {
        return [
          { value: "p", label: "Pequeno", desc: "200ml" },
          { value: "m", label: "Medio",   desc: "350ml" },
          { value: "g", label: "Grande",  desc: "500ml" }
        ];
      } else {
        return [
          { value: "p", label: "Padrao", desc: "Padrao Individual" },
          { value: "g", label: "Grande",  desc: "Combo / Para dividir" }
        ];
      }
    },

    // CALCULA O VALOR TOTAL DINAMICAMENTE
    valorTotal() {
      // Começa com o valor base do produto (convertendo texto "18,50" para número 18.50)
      let total = 0;
      if (this.produto.valor) {
        total = parseFloat(this.produto.valor.replace(",", "."));
      }

      // Se for bebida e tiver leite especial selecionado, soma o extra do leite
      if (this.produto.categoria === "bebidas" && this.leiteSelecionado) {
        const leiteObj = this.opcoesLeite.find(o => o.value === this.leiteSelecionado);
        if (leiteObj && leiteObj.value === "aveia") total += 4.00;
        if (leiteObj && leiteObj.value === "amÃªndoas") total += 5.00;
      }

      // Soma os acompanhamentos ativos
      this.extrasAtivos.forEach(id => {
        const extraObj = this.extrasDisponiveis.find(e => e.id === id);
        if (extraObj && extraObj.preco) {
          total += parseFloat(extraObj.preco.replace(",", "."));
        }
      });

      // Retorna formatado em string com vírgula de volta: "21,50"
      return total.toFixed(2).replace(".", ",");
    }
  },

  methods: {
    mostrarAlerta(mensagem, tipo = "info") {
      this.alerta = { mensagem, tipo };
    },
    validar() {
      let valido = true;
      this.erros = { nomeCliente: false, tamanho: false, leite: false };

      if (!this.nomeCliente) {
        this.erros.nomeCliente = true;
        valido = false;
      }
      if (!this.tamanhoSelecionado) {
        this.erros.tamanho = true;
        valido = false;
      }
      
      // SÓ VALIDA O LEITE SE FOR BEBIDA
      if (this.produto.categoria === "bebidas" && !this.leiteSelecionado) {
        this.erros.leite = true;
        valido = false;
      }

      if (!valido) {
        this.mostrarAlerta(
          "Preencha todos os campos obrigatórios antes de confirmar o pedido.",
          "erro"
        );
      }
      return valido;
    },
    async confirmarPedido() {
      if (!this.validar()) return;

      this.enviando = true;

      const tamanhoTexto = this.opcoesTamanho.find(o => o.value === this.tamanhoSelecionado);
      const leiteTexto   = this.opcoesLeite.find(o => o.value === this.leiteSelecionado);
      const extrasSelecionados = this.extrasDisponiveis.filter(e => this.extrasAtivos.includes(e.id));

      const dadosPedido = {
        nome_cliente:  this.nomeCliente,
        nome_cafe:     this.produto.nome     || "Item Especial",
        foto_cafe:     this.produto.foto     || this.imagemFallback,
        categoria:     this.produto.categoria || "bebidas",
        tamanho:       tamanhoTexto ? `${tamanhoTexto.label} (${tamanhoTexto.desc})` : this.tamanhoSelecionado,
        tipo_leite:    this.produto.categoria === "bebidas" && leiteTexto ? leiteTexto.label : "NÃ£o se aplica",
        opcionais:     extrasSelecionados,
        valor_total:   this.valorTotal, // <-- MUDADO AQUI: Envia o valor somado correto!
        status:        "Em preparaÃ§Ã£o",
        ponto:         tamanhoTexto ? tamanhoTexto.label : this.tamanhoSelecionado,
        data_pedido:   new Date().toISOString()
      };

      try {
        const response = await fetch("https://api-ambarcafe.onrender.com/pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosPedido)
        });

        if (response.ok) {
          this.mostrarAlerta(
            "Pedido confirmado com sucesso! Redirecionando para seus pedidos...",
            "sucesso"
          );
          setTimeout(() => {
            this.$router.push("/pedidos");
          }, 2000);
        } else {
          this.mostrarAlerta(
            "Erro ao registrar o pedido. Tente novamente.",
            "erro"
          );
        }
      } catch (err) {
        console.error("Erro de rede:", err);
        this.mostrarAlerta(
          "Não foi possível conectar ao servidor. Verifique se o JSON Server está rodando.",
          "aviso"
        );
      } finally {
        this.enviando = false;
      }
    }
  },

  created() {
    try {
      if (this.$route.query.produto) {
        this.produto = JSON.parse(decodeURIComponent(this.$route.query.produto));
      }
    } catch (e) {
      console.warn("Produto inválido na query, usando padrão.");
      this.produto = {};
    }
  }
};
</script>

<style scoped>
.config-page {
  min-height: 100vh;
  background-color: #fcfbfa;
  padding-bottom: 80px;
}

.config-container {
  max-width: 1140px;
  margin: 40px auto 0;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 50px;
  align-items: start;
}

/* === COLUNA ESQUERDA === */
.product-summary {
  position: sticky;
  top: 120px;
}

.product-image-container {
  width: 100%;
  height: 380px;
  border-radius: 28px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 16px 40px rgba(43, 27, 18, 0.1);
}

.product-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-image-container:hover img {
  transform: scale(1.04);
}

.product-details {
  text-align: left;
}

.category-pill {
  display: inline-block;
  background-color: #f5efe6;
  color: #8c6d53;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.product-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 30px;
  color: #2b1b12;
  margin: 0 0 12px;
  font-weight: 700;
  line-height: 1.2;
}

.product-description-text {
  font-size: 15px;
  color: #7a6a5e;
  line-height: 1.65;
  margin: 0 0 20px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5efe6;
  padding: 14px 18px;
  border-radius: 14px;
}

.price-label {
  font-size: 13px;
  color: #8c6d53;
  font-weight: 500;
}

.price-value {
  font-size: 22px;
  font-weight: 800;
  color: #2b1b12;
}

/* === COLUNA DIREITA === */
.customization-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: left;
}

.panel-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 32px;
  color: #2b1b12;
  margin: 0 0 6px;
}

.panel-subtitle {
  color: #7a6a5e;
  font-size: 15px;
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 600;
  color: #2b1b12;
  font-size: 15px;
}

.required { color: #dc3545; }
.optional-tag { font-size: 12px; color: #7a6a5e; font-weight: 400; margin-left: 6px;}

.form-input {
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid rgba(43, 27, 18, 0.15);
  font-family: inherit;
  font-size: 15px;
  outline: none;
}

.form-input:focus {
  border-color: #2b1b12;
}

.options-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.group-title {
  font-size: 16px;
  color: #2b1b12;
  margin: 0;
  font-weight: 700;
}

.radio-grid, .checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.radio-card, .checkbox-card {
  border: 1px solid rgba(43, 27, 18, 0.15);
  padding: 16px;
  border-radius: 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  background: #ffffff;
  transition: all 0.2s ease;
}

.radio-card:hover, .checkbox-card:hover {
  background: #fcfbfa;
  border-color: rgba(43, 27, 18, 0.3);
}

.radio-card.selected, .checkbox-card.selected {
  border-color: #2b1b12;
  background-color: #f5efe6;
}

.radio-label-text, .checkbox-label-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 14px;
  color: #2b1b12;
}

.radio-label-text small, .extra-cost {
  color: #7a6a5e;
  font-size: 12px;
  margin-top: 2px;
}

.has-error .form-input, .has-error .radio-card {
  border-color: #dc3545;
}

.field-error {
  color: #dc3545;
  font-size: 13px;
  text-align: left;
}

.btn-submit {
  background-color: #2b1b12;
  color: #ffffff;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.btn-submit:hover { background-color: #4a3425; }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

@media (max-width: 768px) {
  .config-container { grid-template-columns: 1fr; gap: 30px; }
  .product-summary { position: static; }
}
</style>