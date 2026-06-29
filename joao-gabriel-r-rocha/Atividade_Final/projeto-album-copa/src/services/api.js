// Serviço da API-Football: três endpoints REST consumidos em sequência.
// A chave e a base URL vêm do .env (prefixo VUE_APP_ exigido pelo Vue CLI).
const CHAVE = process.env.VUE_APP_API_FOOTBALL_KEY
const BASE_URL = process.env.VUE_APP_API_FOOTBALL_BASE_URL

// Centraliza o GET para garantir o header x-apisports-key em TODA requisição.
async function requisitar(caminho) {
  // Sem a chave a API recusa tudo; avisa cedo com orientação clara.
  if (!CHAVE) {
    throw new Error(
      'Chave da API não configurada. Copie .env.example para .env e preencha VUE_APP_API_FOOTBALL_KEY.'
    )
  }
  if (!BASE_URL) {
    throw new Error(
      'URL base da API não configurada. Preencha VUE_APP_API_FOOTBALL_BASE_URL no .env.'
    )
  }

  let resposta
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      method: 'GET',
      headers: { 'x-apisports-key': CHAVE }
    })
  } catch {
    // fetch rejeita em falha de rede/offline/DNS; troca a mensagem técnica por uma amigável.
    throw new Error('Não foi possível conectar. Verifique sua conexão e tente novamente.')
  }

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os dados. Tente novamente.')
  }

  const dados = await resposta.json()

  // A API responde 200 mesmo em erro de plano/limite; os detalhes vêm em "errors".
  const errosApi = dados.errors
  const temErro = Array.isArray(errosApi)
    ? errosApi.length > 0
    : errosApi && Object.keys(errosApi).length > 0
  if (temErro) {
    const mensagem = Array.isArray(errosApi)
      ? errosApi.join(' ')
      : Object.values(errosApi).join(' ')
    if (/limit|rate/i.test(mensagem)) {
      throw new Error('Limite de requisições da API atingido. Aguarde e tente novamente mais tarde.')
    }
    throw new Error(mensagem || 'Não foi possível carregar os dados. Tente novamente.')
  }

  return dados
}

// Passo A: lista de países para preencher o dropdown (cada item: { name, flag, code }).
export async function carregarPaises() {
  const dados = await requisitar('/teams/countries')
  return dados.response
}

// Passo B: a partir do nome do país, obtém o ID do time em response[0].team.id.
export async function buscarIdDoTime(pais) {
  const dados = await requisitar(`/teams?name=${encodeURIComponent(pais)}`)
  if (!dados.response || !dados.response[0]) {
    return null
  }
  return dados.response[0].team.id
}

// Passo C: a partir do ID do time, obtém o plantel em response[0].players.
export async function buscarPlantel(teamId) {
  const dados = await requisitar(`/players/squads?team=${teamId}`)
  if (!dados.response || !dados.response[0]) {
    return []
  }
  return dados.response[0].players
}
