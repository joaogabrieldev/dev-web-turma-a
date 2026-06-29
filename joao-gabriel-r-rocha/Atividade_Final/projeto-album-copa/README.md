# ⚽ Álbum da Copa

Aplicação de tela única em **Vue 3 (Options API)** que consome a **API-Football** real.
O usuário escolhe uma seleção nacional num dropdown e vê as "figurinhas" (cards) dos
jogadores daquela seleção, com dados vindos da API em tempo de execução.

## Como funciona

Três endpoints REST consultados em sequência, todos com o header `x-apisports-key`:

1. `GET /teams/countries` — carrega os países no dropdown (no hook `mounted`).
2. `GET /teams?name={pais}` — obtém o ID do time (`response[0].team.id`) ao trocar o dropdown.
3. `GET /players/squads?team={id}` — obtém o plantel (`response[0].players`) e renderiza os cards.

## Pré-requisitos

- Node.js 16+ e npm
- Uma chave gratuita da API-Football: https://dashboard.api-football.com

## Configuração da chave (.env)

A chave fica **somente** em variável de ambiente, nunca no código.

```bash
# 1. Copie o modelo versionado para o arquivo local (ignorado pelo git)
cp .env.example .env
```

Abra o `.env` e preencha a sua chave:

```
VUE_APP_API_FOOTBALL_KEY=sua_chave_aqui
VUE_APP_API_FOOTBALL_BASE_URL=https://v3.football.api-sports.io
```

> O prefixo `VUE_APP_` é obrigatório para o Vue CLI expor a variável ao front-end.

## Rodando o projeto

```bash
npm install
npm run serve
```

A aplicação sobe em `http://localhost:8080`.

## Observação sobre o plano gratuito

O plano gratuito permite **50 requisições/dia**. A aplicação carrega os países apenas
uma vez (no `mounted`) e só busca o plantel quando há uma seleção escolhida, para
economizar requisições.
