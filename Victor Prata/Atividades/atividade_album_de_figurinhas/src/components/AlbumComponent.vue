<template>
  <div class="album-container">
    
    <header class="album-header">
      <h1>Álbum de Figurinhas - Seleções do Mundo</h1>
      <h2>Explore o elenco das seleções nacionais de futebol</h2>
    </header>
 
    <main>
      <section class="controls-section">
        <label for="country-picker">Escolha uma Seleção:</label>
        <select id="country-picker" v-model="selecaoAtual" @change="buscarElenco">
          <option value="" disabled>-- Selecione o país --</option>
          <option v-for="(item, index) in paisesDisponiveis" :key="index" :value="item.name">
            {{ item.name }}
          </option>
        </select>
      </section>
 
      <section class="feedback-section">
        <div v-if="isLoading" class="alert info">
          Buscando dados na API-Sports...
        </div>
        
        <div v-if="erroAPI" class="alert danger">
          ⚠️ {{ erroAPI }}
        </div>
        
        <div v-if="!isLoading && selecaoAtual && elenco.length === 0 && !erroAPI" class="alert warning">
          Nenhum jogador encontrado para esta seleção.
        </div>
      </section>
 
      <section v-if="elenco.length > 0 && !isLoading" class="cards-grid">
        <article class="player-card" v-for="atleta in elenco" :key="atleta.id">
          
          <div class="card-image-wrapper">
            <img
              :src="proxyUrl(atleta.photo)"
              :alt="atleta.name"
              loading="lazy"
              @error="imagemFallback($event, atleta.name)"
            />
            <span class="player-number">{{ atleta.number ? atleta.number : '-' }}</span>
          </div>
          
          <div class="card-details">
            <h3 class="player-name">{{ atleta.name }}</h3>
            <p class="player-position">{{ atleta.position }}</p>
          </div>
          
        </article>
      </section>
    </main>
 
  </div>
</template>
 
<script>
 
const API_KEY = 'de01e032300b551facaa42b920ac51b4';
 
export default {
  name: 'AlbumComponent',
 
  data() {
    return {
      paisesDisponiveis: [],
      selecaoAtual: '',
      elenco: [],
      isLoading: false,
      erroAPI: null
    };
  },
 
  async mounted() {
    await this.buscarPaises();
  },
 
  methods: {
    
    async buscarPaises() {
      try {
        const req = await fetch('https://v3.football.api-sports.io/teams/countries', {
          headers: { 'x-apisports-key': API_KEY }
        });
        const res = await req.json();
        
        this.paisesDisponiveis = res.response;
      } catch (e) {
        this.erroAPI = 'Falha de conexão ao carregar a lista de países.';
      }
    },
 
    
    async buscarElenco() {
      if (!this.selecaoAtual) return;
 
      this.isLoading = true;
      this.erroAPI = null;
      this.elenco = []; 
 
      try {
        
        const reqTime = await fetch(`https://v3.football.api-sports.io/teams?name=${encodeURIComponent(this.selecaoAtual)}`, {
          headers: { 'x-apisports-key': API_KEY }
        });
        const resTime = await reqTime.json();
 
        if (!resTime.response || resTime.response.length === 0) {
          this.erroAPI = 'Seleção não localizada no banco de dados.';
          this.isLoading = false;
          return;
        }
 
        const idSelecao = resTime.response[0].team.id;
 
        const reqPlantel = await fetch(`https://v3.football.api-sports.io/players/squads?team=${idSelecao}`, {
          headers: { 'x-apisports-key': API_KEY }
        });
        const resPlantel = await reqPlantel.json();
 
        if (!resPlantel.response || resPlantel.response.length === 0) {
          this.erroAPI = 'Plantel não disponível para a seleção indicada.';
          this.isLoading = false;
          return;
        }
 
        this.elenco = resPlantel.response[0].players;
        
      } catch (e) {
        this.erroAPI = 'Ocorreu um erro ao comunicar com a API-Sports.';
      } finally {
        this.isLoading = false;
      }
    },
 
    proxyUrl(url) {
      if (!url) return '';
      return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=200&h=200&fit=contain&bg=transparent`;
    },
 
    imagemFallback(event, nome) {
      const iniciais = (nome || '??').substring(0, 2).toUpperCase();
      const cores = ['#3b0764', '#4c1d95', '#312e81', '#581c87', '#6b21a8'];
      const cor = cores[(nome?.charCodeAt(0) ?? 0) % cores.length];
 
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
          <rect width="150" height="150" fill="${cor}"/>
          <circle cx="75" cy="58" r="26" fill="#c0c0c0" opacity="0.9"/>
          <ellipse cx="75" cy="120" rx="42" ry="28" fill="#c0c0c0" opacity="0.7"/>
          <text x="75" y="64" text-anchor="middle" dominant-baseline="middle"
            font-family="sans-serif" font-size="22" font-weight="700" fill="#1e0a2e">
            ${iniciais}
          </text>
        </svg>`.trim();
 
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      event.target.src = URL.createObjectURL(blob);
      event.target.onerror = null;
    }
  }
};
</script>
 
<style scoped>
 
.album-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f4f8;
}
 
 
.album-header {
  text-align: center;
  background: linear-gradient(135deg, #0a3060, #0a1e3a);
  color: #f8fafc;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
}

.album-header h1 {
  margin: 0;
  font-size: 2.2rem;
  color: #bfdbfe;
}

.album-header h2 {
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: 400;
  color: #7dd3fc;
}
 
 
.controls-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
 
.controls-section label {
  font-weight: 600;
  color: #0a3060;
  font-size: 1.1rem;
}

#country-picker {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #7ab8f5;
  background-color: white;
  font-size: 1rem;
  color: #0a1e3a;
  cursor: pointer;
  transition: border-color 0.2s;
}

#country-picker:focus {
  outline: none;
  border-color: #1a56db;
}
 
 
.alert {
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 1.5rem;
}
 
.info    { background-color: #dbeafe; color: #1d4ed8; }
.danger  { background-color: #fee2e2; color: #b91c1c; }
.warning { background-color: #eff6ff; color: #1a56db; }
 
 
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}
 
 
.player-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(7, 59, 100, 0.12);
  border: 1px solid #bfdbfe;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.player-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(7, 59, 100, 0.2);
}

.card-image-wrapper {
  position: relative;
  background-color: #dbeafe;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-top: 1rem;
}
 
.card-image-wrapper img {
  height: 90%;
  object-fit: contain;
}
 
 
.player-number {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #bfdbfe;
  color: #0a1e3a;
  font-weight: bold;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.card-details {
  padding: 1rem;
  text-align: center;
  background-color: white;
  border-top: 4px solid #1a56db;
}

.player-name {
  margin: 0;
  font-size: 1.1rem;
  color: #0a1e3a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-position {
  margin: 0.4rem 0 0;
  font-size: 0.8rem;
  color: #1a56db;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
}
</style>
 