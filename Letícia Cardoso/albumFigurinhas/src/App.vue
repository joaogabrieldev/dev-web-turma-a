<template>
  <div class="album-container">
    <header>
      <h1>⚽ Álbum de Figurinhas Virtual</h1>
      <p>Selecione um país para colar as figurinhas do elenco!</p>
    </header>

    <section class="controls">
      <label for="country-select">Escolha a Seleção:</label>
      <select 
        id="country-select" 
        v-model="paisSelecionado" 
        @change="carregarFigurinhas"
        :disabled="carregandoPaises"
      >
        <option value="" disabled>-- Selecione um país --</option>
        <option v-for="pais in listaDePaises" :key="pais.name" :value="pais.name">
          {{ pais.name }}
        </option>
      </select>
    </section>

    <div v-if="carregando" class="feedback loading">
      <div class="spinner"></div> Buscando craques na API...
    </div>
    
    <div v-if="erro" class="feedback error">
      ❌ {{ erro }}
    </div>

    <main v-if="!carregando && jogadores.length > 0" class="album-grid">
      <div v-for="jogador in jogadores" :key="jogador.id" class="card-figurinha">
        <div class="card-inner">
          <div class="badge-posicao">{{ traduzirPosicao(jogador.position) }}</div>
        <img 
  :src="jogador.photo" 
  :alt="jogador.name" 
  class="foto-jogador" 
  @error="substituirImagemPorPadrao"
  loading="lazy" 
/>
          <div class="info-jogador">
            <h3>{{ jogador.name }}</h3>
            <p>Idade: {{ jogador.age }} anos</p>
          </div>
        </div>
      </div>
    </main>

    <footer v-if="!carregando && jogadores.length === 0 && !erro" class="empty-state">
      <p>Nenhuma figurinha colada ainda. Escolha um país acima!</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 1. DEFINIÇÃO DE TIPOS PARA O TYPESCRIPT
interface Pais {
  name: string;
  code?: string;
  flag?: string;
}

interface Jogador {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string;
  photo: string;
}

// CONFIGURAÇÃO DA API (Substitua pela sua chave real obtida no painel)
const TOKEN = 'c32e284fdea5ff6e9a950c265957c885'; 
const BASE_URL = 'https://v3.football.api-sports.io';
const HEADERS = { 'x-apisports-key': TOKEN };

// 2. ESTADOS REATIVOS COM TIPAGEM DEFINIDA
const listaDePaises = ref<Pais[]>([]);
const paisSelecionado = ref<string>('');
const jogadores = ref<Jogador[]>([]);
const carregandoPaises = ref<boolean>(false);
const carregando = ref<boolean>(false);
const erro = ref<string | null>(null);

// REQUISITO 1: Carregar a lista de países ao montar o componente
const carregarPaises = async () => {
  carregandoPaises.value = true;
  try {
    const response = await fetch(`${BASE_URL}/teams/countries`, { method: 'GET', headers: HEADERS });
    if (!response.ok) throw new Error('Erro ao buscar lista de países.');
    
    const dados = await response.json();
    // Filtra apenas países válidos e tipa o retorno
    listaDePaises.value = (dados.response as Pais[]).filter((p: Pais) => p.name);
  } catch (err: any) {
    erro.value = 'Não foi possível carregar os países. Verifique sua API Key ou limite diário.';
    console.error(err);
  } finally {
    carregandoPaises.value = false;
  }
};

// REQUISITO 2: Encadeamento Lógico (País -> ID do Time -> Elenco)
const carregarFigurinhas = async () => {
  if (!paisSelecionado.value) return;

  carregando.value = true;
  erro.value = null;
  jogadores.value = []; // Limpa o álbum anterior

  try {
    // 1ª Etapa: Descobrir o ID da Seleção pelo nome
    const responseTime = await fetch(`${BASE_URL}/teams?name=${paisSelecionado.value}`, { method: 'GET', headers: HEADERS });
    const dadosTime = await responseTime.json();

    if (!dadosTime.response || dadosTime.response.length === 0) {
      throw new Error(`Nenhum time encontrado para o país: ${paisSelecionado.value}`);
    }

    const teamId = dadosTime.response[0].team.id;

    // 2ª Etapa: Buscar as figurinhas (squad) usando o ID retornado
    const responseElenco = await fetch(`${BASE_URL}/players/squads?team=${teamId}`, { method: 'GET', headers: HEADERS });
    const dadosElenco = await responseElenco.json();

    if (!dadosElenco.response || dadosElenco.response.length === 0) {
      throw new Error('Elenco não disponível para esta seleção no momento.');
    }

    jogadores.value = dadosElenco.response[0].players as Jogador[];
  } catch (err: any) {
    erro.value = err.message || 'Erro ao processar os dados do servidor.';
    console.error(err);
  } finally {
    carregando.value = false;
  }
};

// Função auxiliar com mapeamento estrito de strings para evitar erro de indexação
const traduzirPosicao = (pos: string): string => {
  const posicoes: Record<string, string> = {
    'Goalkeeper': 'Goleiro',
    'Defender': 'Defensor',
    'Midfielder': 'Meio-Campo',
    'Attacker': 'Atacante'
  };
  return posicoes[pos] || pos;
};
const substituirImagemPorPadrao = (event: Event) => {
  const elemento = event.target as HTMLImageElement;
  
  // 1. Pega a URL original da foto que falhou (enviada pela API-Football)
  const urlOriginal = elemento.src;

  // 2. Se a imagem falhou e ainda não tentamos usar o proxy, injetamos o CorsProxy
  // Isso quebra o bloqueio 403 do servidor deles e força a imagem real a carregar
  if (urlOriginal && !urlOriginal.includes('cors-anywhere') && !urlOriginal.includes('images.weserv.nl')) {
    // Usamos o wsrv.nl, um proxy de imagens ultra rápido e gratuito
    elemento.src = `https://images.unsplash.com/proxy?url=${encodeURIComponent(urlOriginal)}`;
    
    // Alternativa direta caso a de cima tenha instabilidade:
    elemento.src = `https://images.weserv.nl/?url=${urlOriginal.replace('https://', '')}`;
    return;
  }

  // 3. Fallback absoluto: Se até o proxy falhar (ex: jogador sem foto cadastrada na API)
  // Mostra um card cinza padrão sem quebrar o layout
  elemento.src = 'https://cdn-icons-png.flaticon.com/512/2102/2102633.png';
};
// Gatilho do Ciclo de Vida
onMounted(() => {
  carregarPaises();
});
</script>

<style scoped>
/* REQUISITO 3: Apresentação Gráfica Responsiva (CSS Grid e Flexbox) */
.album-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #333;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  color: #2c3e50;
  margin-bottom: 5px;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}

.controls select {
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #3498db;
  border-radius: 6px;
  outline: none;
  background-color: white;
  cursor: pointer;
  min-width: 200px;
}

/* Grid das Figurinhas */
.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 10px;
}

/* Estilização do Card de Figurinha */
.card-figurinha {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 4px solid #f1c40f; /* Borda dourada estilo álbum */
  background-image: linear-gradient(135deg, #fff 70%, #fef9e7 100%);
}

.card-figurinha:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  position: relative;
}

.badge-posicao {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #2c3e50;
  color: white;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
}
.foto-jogador {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #34495e;
  margin-top: 25px; /* Aumentamos o espaço para o nome de cima não bater */
  background-color: #ecf0f1;
  
  /* Se a imagem falhar, isso garante que o texto não quebre */
  display: block; 
  position: relative;
}

/* Ajuste fino opcional no container interno para dar mais espaço */
.card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px 15px 15px; /* Aumentamos o topo */
  position: relative;
}


.info-jogador {
  text-align: center;
  margin-top: 15px;
  width: 100%;
}

.info-jogador h3 {
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-jogador p {
  font-size: 13px;
  color: #7f8c8d;
  margin: 0;
}

/* Feedbacks Visuais */
.feedback {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  font-weight: 500;
}

.error { color: #e74c3c; }

.empty-state {
  text-align: center;
  color: #95a5a6;
  margin-top: 50px;
  font-style: italic;
}

/* Spinner Simples para o Loading */
.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(52, 152, 219, 0.3);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>