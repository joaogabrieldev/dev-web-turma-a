<template>
  <div id="home">

  
    <section id="hero">
      <div id="hero-conteudo">
        <img src="/img/Logotipo-sembg.png" id="hero-logo" alt="Tá na Massa" />
        <h1>A pizza que você merecia</h1>
        <p>Massa artesanal, ingredientes frescos e forno a lenha. Feita com amor, pedido a pedido.</p>
        <router-link to="/menu" class="btn-hero">Ver cardápio</router-link>
      </div>
    </section>

   
    <section id="diferenciais">
      <div class="diferencial">
        <div class="diferencial-icone">
          <img src="/img/logo_tanamassa.png" alt="" class="icon-decorativo" />
        </div>
        <h3>Massa artesanal</h3>
        <p>Preparada diariamente com fermentação lenta por 48 horas para uma textura única.</p>
      </div>
      <div class="diferencial">
        <div class="diferencial-icone forno">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="30" width="48" height="26" rx="4" fill="#c62828"/>
            <rect x="14" y="36" width="36" height="14" rx="3" fill="#fff8e7"/>
            <ellipse cx="32" cy="30" rx="24" ry="10" fill="#e57373"/>
            <circle cx="24" cy="43" r="4" fill="#c62828"/>
            <rect x="28" y="56" width="8" height="4" rx="2" fill="#6d4c41"/>
          </svg>
        </div>
        <h3>Forno a lenha</h3>
        <p>Assada a 400°C em forno a lenha artesanal para bordas crocantes e recheio derretido.</p>
      </div>
      <div class="diferencial">
        <div class="diferencial-icone entrega">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="24" width="38" height="22" rx="4" fill="#2e7d32"/>
            <rect x="42" y="30" width="18" height="16" rx="3" fill="#43a047"/>
            <polygon points="42,30 60,30 54,18 42,18" fill="#2e7d32"/>
            <circle cx="16" cy="48" r="6" fill="#1b5e20"/>
            <circle cx="16" cy="48" r="3" fill="#f5f5f5"/>
            <circle cx="50" cy="48" r="6" fill="#1b5e20"/>
            <circle cx="50" cy="48" r="3" fill="#f5f5f5"/>
          </svg>
        </div>
        <h3>Entrega rápida</h3>
        <p>Entregamos em até 40 minutos. Quente, crocante e direto na sua porta.</p>
      </div>
    </section>


    <section id="destaques">
      <h2>Pizzas em destaque</h2>
      <p class="secao-subtitulo">As favoritas dos nossos clientes</p>

      <div id="destaques-grid" v-if="pizzasDestaque.length">
        <div
          class="destaque-card"
          v-for="pizza in pizzasDestaque"
          :key="pizza.id"
        >
          <img :src="pizza.foto" :alt="pizza.nome" class="destaque-foto" />
          <div class="destaque-info">
            <h3>{{ pizza.nome }}</h3>
            <p class="destaque-descricao">{{ pizza.descricao }}</p>
            <div class="destaque-rodape">
              <span class="destaque-preco">R$ {{ pizza.valor }},00</span>
              <button @click="pedirPizza(pizza)" class="btn-pedir">Pedir agora</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="carregando">Carregando cardápio...</div>

      <router-link to="/menu" class="btn-ver-todos">Ver cardápio completo</router-link>
    </section>


    <section id="como-funciona">
      <h2>Como funciona</h2>
      <p class="secao-subtitulo">Simples, rápido e sem complicação</p>
      <div id="passos">
        <div class="passo">
          <div class="passo-numero">1</div>
          <h3>Escolha a pizza</h3>
          <p>Navegue pelo cardápio e encontre seu sabor favorito entre nossas opções artesanais.</p>
        </div>
        <div class="passo-seta">&#8594;</div>
        <div class="passo">
          <div class="passo-numero">2</div>
          <h3>Personalize</h3>
          <p>Escolha o tamanho, a borda recheada e adicione bebidas ao seu gosto.</p>
        </div>
        <div class="passo-seta">&#8594;</div>
        <div class="passo">
          <div class="passo-numero">3</div>
          <h3>Confirme o pedido</h3>
          <p>Finalize seu pedido e acompanhe o status em tempo real na tela de pedidos.</p>
        </div>
      </div>
    </section>


  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      pizzasDestaque: [],
    };
  },
  methods: {
    async carregarDestaques() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.pizzasDestaque = (dados.salgadas || []).slice(0, 3);
    },
    pedirPizza(pizza) {
      const pizzaJson = encodeURIComponent(JSON.stringify(pizza));
      this.$router.push({ path: "/config", query: { pizza: pizzaJson } });
    },
  },
  mounted() {
    this.carregarDestaques();
  },
};
</script>

<style scoped>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

/* HERO */
#hero {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  padding: 80px 40px;
  text-align: center;
  color: #ffffff;
}

#hero-logo {
  width: 550px;
  height: 220px;
  object-fit: contain;
  margin-bottom: 20px;
  filter: drop-shadow(0 6px 18px rgba(0,0,0,0.35));
}

#hero-conteudo h1 {
  font-size: 48px;
  font-family: Georgia, serif;
  color: #fff8e7;
  margin: 0 0 16px;
}

#hero-conteudo p {
  font-size: 18px;
  color: #c8e6c9;
  max-width: 540px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.btn-hero {
  display: inline-block;
  background-color: #c62828;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 17px;
  padding: 16px 40px;
  border-radius: 50px;
  transition: background 0.25s, transform 0.2s;
  letter-spacing: 0.5px;
}

.btn-hero:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
}

/* DIFERENCIAIS */
#diferenciais {
  display: flex;
  justify-content: center;
  gap: 32px;
  padding: 60px 40px;
  background: #ffffff;
  flex-wrap: wrap;
}

.diferencial {
  text-align: center;
  max-width: 240px;
}

.diferencial-icone {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  overflow: hidden;
}

.diferencial-icone svg {
  width: 44px;
  height: 44px;
}

.icon-decorativo {
  width: 52px;
  height: 52px;
  object-fit: contain;
}

.diferencial h3 {
  font-size: 18px;
  color: #2e7d32;
  margin: 0 0 8px;
  font-family: Georgia, serif;
}

.diferencial p {
  font-size: 14px;
  color: #6d4c41;
  line-height: 1.6;
  margin: 0;
}

/* DESTAQUES */
#destaques {
  padding: 60px 40px;
  background: #f5f5f5;
  text-align: center;
}

#destaques h2,
#como-funciona h2 {
  font-size: 34px;
  font-family: Georgia, serif;
  color: #6d4c41;
  margin: 0 0 8px;
}

.secao-subtitulo {
  color: #9e9e9e;
  font-size: 15px;
  margin: 0 0 40px;
}

#destaques-grid {
  display: flex;
  gap: 28px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.destaque-card {
  background: #ffffff;
  border-radius: 16px;
  width: 300px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.09);
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
}

.destaque-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.14);
}

.destaque-foto {
  width: 100%;
  height: 190px;
  object-fit: cover;
  display: block;
}

.destaque-info {
  padding: 18px;
}

.destaque-info h3 {
  font-size: 19px;
  font-family: Georgia, serif;
  color: #6d4c41;
  margin: 0 0 8px;
}

.destaque-descricao {
  font-size: 13px;
  color: #9e9e9e;
  line-height: 1.5;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.destaque-rodape {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.destaque-preco {
  font-size: 22px;
  font-weight: bold;
  color: #c62828;
}

.btn-pedir {
  background-color: #c62828;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.25s;
}

.btn-pedir:hover {
  background-color: #2e7d32;
}

.btn-ver-todos {
  display: inline-block;
  border: 2px solid #2e7d32;
  color: #2e7d32;
  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
  padding: 12px 36px;
  border-radius: 50px;
  transition: background 0.25s, color 0.25s;
}

.btn-ver-todos:hover {
  background-color: #2e7d32;
  color: #ffffff;
}

.carregando {
  color: #9e9e9e;
  padding: 40px;
  font-size: 16px;
}

/* COMO FUNCIONA */
#como-funciona {
  padding: 60px 40px;
  background: #ffffff;
  text-align: center;
}

#passos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.passo {
  background: #f5f5f5;
  border-radius: 16px;
  padding: 32px 28px;
  max-width: 220px;
  text-align: center;
}

.passo-numero {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #c62828;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-family: Georgia, serif;
}

.passo h3 {
  font-size: 16px;
  color: #2e7d32;
  margin: 0 0 8px;
  font-family: Georgia, serif;
}

.passo p {
  font-size: 13px;
  color: #6d4c41;
  line-height: 1.6;
  margin: 0;
}

.passo-seta {
  font-size: 32px;
  color: #bdbdbd;
  flex-shrink: 0;
}

</style>
