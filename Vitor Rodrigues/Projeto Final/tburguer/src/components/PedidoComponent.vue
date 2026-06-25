<template>
  <div>
    <div v-if="msg" :class="['alerta-container', classeAlerta]">
      <span>{{ msg }}</span>
    </div>

    <form id="pedido-form" @submit="criarPedido($event)">
      <div v-if="baseAcai" class="banner-container">
  <div class="banner-foto" :style="{ backgroundImage: 'url(' + baseAcai.foto + ')' }">
    <p id="nome-base-content">{{ baseAcai.nome }}</p>
  </div>
</div>
      <div class="inputs">
        <label for="nome-cliente">Nome</label>
        <input
          type="text"
          v-model="nomeCliente"
          id="nome-cliente"
          name="nome-cliente"
          placeholder="Digite seu Nome"
        />
      </div>
      <div class="inputs">
        <label>Tamanho do Copo / Tigela</label>
        <select
          name="tamanho-copo"
          id="tamanho-copo"
          v-model="tamanhoSelecionado"
        >
          <option value="" selected>Selecione o tamanho</option>
          <option
            v-for="tamanho in listaTamanhos"
            :key="tamanho.id"
            :value="tamanho"
          >
            {{ tamanho.descricao }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <label id="opcionais-titulo"> Selecione os adicionais</label>
        <label id="opcionais-subtitulo"> Selecione os complementos e toppings</label>

        <div
          class="checkbox-container"
          v-for="complemento in listaComplementos"
          :key="complemento.id"
        >
          <input
            type="checkbox"
            :name="complemento.nome"
            :value="complemento"
            v-model="listaComplementosSelecionados"
          />
          <span>{{ complemento.nome }}</span>
        </div>

        <label> Adicione uma bebida</label>

        <div
          class="checkbox-container"
          id="checkbox-container"
          v-for="bebida in listaBebidas"
          :key="bebida.id"
        >
          <input
            type="checkbox"
            :name="bebida.nome"
            :value="bebida"
            v-model="listaBebidasSelecionadas"
          />
          <span>{{ bebida.nome }}</span>
        </div>
        <div class="inputs">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PedidoComponent",
  props: {
    // Atualizado de burguer para baseAcai
    baseAcai: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaBebidas: [],
      listaComplementos: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      listaComplementosSelecionados: [],
      listaBebidasSelecionadas: [],
      msg: null,
      classeAlerta: ""
    };
  },
  methods: {
    async getListaTamanhos() {
      // Endpoint ajustado para buscar a chave tipos_pontos sem espaços na URL
      const response = await fetch(`${this.$apiUrl}/tipos_pontos`);
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaComplementos = dados.complemento;
      this.listaBebidas = dados.bebidas;
    },
    async criarPedido(e) {
      e.preventDefault();

      // Validação adaptada para os termos de açaí
      if (!this.nomeCliente || !this.tamanhoSelecionado || !this.baseAcai) {
        this.msg = "⚠️ Erro: Por favor, informe seu nome e selecione o tamanho!";
        this.classeAlerta = "alerta-vermelho";
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        tamanho: this.tamanhoSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        complemento: Array.from(this.listaComplementosSelecionados),
        baseAcai: this.baseAcai,
        statusId: 5, // Mantido ID inicial "Pedido pendente"
      };

      console.log(dadosPedido);
      const dadosJson = JSON.stringify(dadosPedido);

      const response = await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      if (response.ok) {
        this.msg = "✅ Pedido enviado com sucesso!";
        this.classeAlerta = "alerta-verde";
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Limpa o formulário
        this.nomeCliente = "";
        this.tamanhoSelecionado = "";
        this.listaComplementosSelecionados = [];
        this.listaBebidasSelecionadas = [];

        setTimeout(() => {
          this.msg = null;
          this.$router.push("/pedidos");
        }, 2000);
      }
    },
  },
  mounted() {
    this.getListaTamanhos();
    this.getOpcionais();
  },
};
</script>

<style scoped>
.alerta-container {
  padding: 15px;
  max-width: 750px;
  margin: 20px auto;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.alerta-vermelho {
  background-color: #ffdddd;
  color: #d8000c;
  border: 1px solid #d8000c;
}
.alerta-verde {
  background-color: #ddffdd;
  color: #4f8a10;
  border: 1px solid #4f8a10;
}

/* Container que mantém a proporção do banner */
.banner-container {
  margin-bottom: 30px;
  border-radius: 12px;
  overflow: hidden;
}

/* A div que recebe a imagem como fundo */
.banner-foto {
  width: 100%;
  height: 220px;
  background-size: cover;      /* Garante que a imagem preencha toda a div */
  background-position: center; /* Centraliza a imagem */
  position: relative;
}

/* Ajuste para o nome sobreposto no banner */
#nome-base-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 20px 25px;
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  box-sizing: border-box;
}

#nome-base-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: antiquewhite;
  padding: 16px;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid darkgoldenrod;
}

input,
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 20px;
  font-size: 12px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

.submit-btn {
  background-color: #222;
  color: darkgoldenrod;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: darkgoldenrod;
  color: #222;
}
#pedido-form {
  max-width: 700px;
  margin: 40px auto;
  padding: 35px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: left;
}

#pedido-form > div:first-child {
  position: relative;
  margin-bottom: 30px;
  border-radius: 12px;
  overflow: hidden;
}


#nome-base-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 20px 25px;
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  box-sizing: border-box;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

label {
  font-weight: 700;
  margin-bottom: 10px;
  color: #1a1a1a;
  font-size: 16px;
  padding-left: 10px;
  border-left: 4px solid darkgoldenrod;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

#opcionais-subtitulo {
  border-left: none;
  padding-left: 0;
  color: #666;
  font-size: 14px;
  font-weight: normal;
  text-transform: none;
  margin-top: -4px;
  margin-bottom: 15px;
}

input[type="text"],
select {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  color: #333;
  background-color: #fafafa;
  transition: all 0.3s ease;
  box-sizing: border-box;
  height: auto;
}

input[type="text"]:focus,
select:focus {
  outline: none;
  border-color: darkgoldenrod;
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(184, 134, 11, 0.15);
}

.checkbox-container {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.checkbox-container:hover {
  background-color: #f1f1f1;
}

.checkbox-container input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin: 0 12px 0 0;
  cursor: pointer;
  accent-color: darkgoldenrod;
}

.checkbox-container span {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.inputs > label:not(:first-child) {
  margin-top: 20px;
}

.submit-btn {
  background-color: #222222;
  color: darkgoldenrod;
  font-weight: 700;
  border: none;
  font-size: 18px;
  border-radius: 8px;
  padding: 16px 30px;
  margin-top: 15px;
  cursor: pointer;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: darkgoldenrod;
  color: #222222;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(184, 134, 11, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

.alerta-container {
  padding: 16px;
  max-width: 700px;
  margin: 0 auto 25px auto;
  border-radius: 8px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}
.alerta-vermelho {
  background-color: #ffeef0;
  color: #d8000c;
  border: 1px solid #ffccd2;
}
.alerta-verde {
  background-color: #edf7ed;
  color: #1e4620;
  border: 1px solid #cce8cd;
}
</style>