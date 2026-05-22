<template>
  <div>
    <form id="pedido-form">
      <div>
        <p id="nome-hamburguer-content">
          {{ burguer && burguer.nome ? burguer.nome : "-" }}
        </p>
        <img
          id="foto-content"
          :src="burguer && burguer.foto ? burguer.foto : ''" alt="foto-hamburguer"
        />
      </div>
      <div class="inputs" id="form-pedido">
        <label for="nome-cliente">
          Nome
          <input
            type="text"
            id="nome-cliente"
            name="nome-cliente"
            v-model="nomeCliente"
            placeholder="Digite seu Nome"
          />
        </label>
      </div>
      <div class="inputs">
        <label for="ponto-carne">
          Ponto da carne
          <select name="ponto-carne" id="ponto-carne">
            <option value="">Selecione o ponto</option>
            <option value="1">Mal Passada</option>
          </select>
        </label>
      </div>
      <div class="inputs">
        <label for="opcionais-titulo">
          Selecione os opcionais
        </label>

        <label for="checkbox-container">
          Selecione os complementos
          <div class="checkbox-container">
            <input type="checkbox" name="complemento" />
            <span>Batata</span>
          </div>
        </label>

        <label for="checkbox-container">
          Adicione uma bebida
          <div id="checkbox-container">
            <input type="checkbox" name="bebida" />
            <span>Coca</span>
          </div>
        </label>

        <div class="inputs">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'PedidoComponent',
  props: {
    burguer: null,
  },
};
</script>
<style scoped></style>
