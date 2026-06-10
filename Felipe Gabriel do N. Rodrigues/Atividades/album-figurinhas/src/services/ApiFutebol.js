// =============================================
// ApiFutebol.js - Servico de dados da API
// =============================================
// Fluxo: db.json primeiro → API so se precisar
// Tabelas: countries | teams | squads
// =============================================

const API_KEY = '66ed9cd03ee9ea7d7a2f6116c4545e66'
const API_URL = 'https://v3.football.api-sports.io'
const DB_URL  = 'http://localhost:3001'

// -----------------------------------------------
// Funcao auxiliar: faz requisicao para a API-Football
// -----------------------------------------------
async function buscarNaApi(endpoint) {
  const resposta = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: { 'x-apisports-key': API_KEY }
  })

  if (!resposta.ok) {
    throw new Error(`Erro na API: ${resposta.status} ${resposta.statusText}`)
  }

  const json = await resposta.json()

  // A API retorna erros dentro do JSON mesmo com status 200
  if (json.errors && Object.keys(json.errors).length > 0) {
    throw new Error(`Erro da API: ${JSON.stringify(json.errors)}`)
  }

  return json.response
}

// -----------------------------------------------
// Funcao auxiliar: salva um registro no db.json
// -----------------------------------------------
async function salvarNoBanco(tabela, dado) {
  await fetch(`${DB_URL}/${tabela}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dado)
  })
}

// -----------------------------------------------
// 1. Buscar lista de paises
//    Tabela: countries { name, code, flag }
// -----------------------------------------------
export async function fetchCountries() {
  const respostaBanco = await fetch(`${DB_URL}/countries`)
  const countriesNoBanco = await respostaBanco.json()

  if (countriesNoBanco.length > 0) {
    console.log('[BANCO] Paises carregados do db.json')
    return countriesNoBanco
  }

  console.log('[API] Buscando paises na API...')
  const paises = await buscarNaApi('/countries')

  if (!paises || paises.length === 0) {
    throw new Error('Nenhum pais retornado pela API.')
  }

  const paisesFormatados = paises.map(p => ({
    name: p.name,
    code: p.code,
    flag: p.flag
  }))

  // Salva todos em paralelo em vez de um por um sequencialmente
  // Um loop com await sequencial travaria com 196 POSTs em fila
  await Promise.all(
    paisesFormatados.map(pais => salvarNoBanco('countries', pais))
  )

  console.log(`[BANCO] ${paisesFormatados.length} paises salvos no db.json`)
  return paisesFormatados
}

// -----------------------------------------------
// 2. Buscar ID da selecao pelo nome do pais
//    Tabela: teams { name, teamId }
// -----------------------------------------------
export async function fetchTeamId(nomePais) {
  const respostaBanco = await fetch(`${DB_URL}/teams?name=${encodeURIComponent(nomePais)}`)
  const teamsNoBanco = await respostaBanco.json()

  if (teamsNoBanco.length > 0) {
    console.log(`[BANCO] Selecao de ${nomePais} carregada do db.json`)
    return teamsNoBanco[0].teamId
  }

  console.log(`[API] Buscando selecao de ${nomePais} na API...`)
  const times = await buscarNaApi(`/teams?search=${encodeURIComponent(nomePais)}`)

  if (!times || times.length === 0) {
    throw new Error(`Nenhuma selecao encontrada para: ${nomePais}`)
  }

  // /teams?search= retorna clubes e selecoes misturados
  // Prioriza onde team.national === true para pegar a selecao nacional
  const selecao = times.find(t => t.team.national === true) || times[0]
  const teamId = selecao.team.id

  await salvarNoBanco('teams', { name: nomePais, teamId })

  return teamId
}

// -----------------------------------------------
// 3. Buscar elenco pelo ID da selecao
//    Tabela: squads { teamId, jogadores: [...] }
// -----------------------------------------------
export async function fetchSquad(teamId) {
  const respostaBanco = await fetch(`${DB_URL}/squads?teamId=${teamId}`)
  const squadsNoBanco = await respostaBanco.json()

  if (squadsNoBanco.length > 0) {
    console.log(`[BANCO] Elenco do time ${teamId} carregado do db.json`)
    return squadsNoBanco[0].jogadores
  }

  console.log(`[API] Buscando elenco do time ${teamId} na API...`)
  const elencos = await buscarNaApi(`/players/squads?team=${teamId}`)

  if (!elencos || elencos.length === 0) {
    throw new Error(`Nenhum elenco encontrado para o time: ${teamId}`)
  }

  const jogadores = elencos[0].players.map(jogador => ({
    ...jogador,
    photo: jogador.photo
      ? `https://wsrv.nl/?url=${encodeURIComponent(jogador.photo)}`
      : `https://wsrv.nl/?url=https://media.api-sports.io/football/players/default.png`
  }))

  await salvarNoBanco('squads', { teamId, jogadores })

  return jogadores
}