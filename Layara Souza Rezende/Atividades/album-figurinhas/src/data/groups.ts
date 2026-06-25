export interface GroupTeam {
  apiName: string
  displayName: string
}

export interface Group {
  letter: string
  teams: GroupTeam[]
}

export const groups: Group[] = [
  {
    letter: 'A',
    teams: [
      { apiName: 'Mexico', displayName: 'México' },
      { apiName: 'South-Africa', displayName: 'África do Sul' },
      { apiName: 'South-Korea', displayName: 'Coreia do Sul' },
      { apiName: 'Czech-Republic', displayName: 'Rep. Tcheca' },
    ],
  },
  {
    letter: 'B',
    teams: [
      { apiName: 'Switzerland', displayName: 'Suíça' },
      { apiName: 'Canada', displayName: 'Canadá' },
      { apiName: 'Bosnia', displayName: 'Bósnia' },
      { apiName: 'Qatar', displayName: 'Catar' },
    ],
  },
  {
    letter: 'C',
    teams: [
      { apiName: 'Brazil', displayName: 'Brasil' },
      { apiName: 'Morocco', displayName: 'Marrocos' },
      { apiName: 'Scotland', displayName: 'Escócia' },
      { apiName: 'Haiti', displayName: 'Haiti' },
    ],
  },
  {
    letter: 'D',
    teams: [
      { apiName: 'USA', displayName: 'Estados Unidos' },
      { apiName: 'Australia', displayName: 'Austrália' },
      { apiName: 'Paraguay', displayName: 'Paraguai' },
      { apiName: 'Turkey', displayName: 'Turquia' },
    ],
  },
  {
    letter: 'E',
    teams: [
      { apiName: 'Germany', displayName: 'Alemanha' },
      { apiName: 'Ivory-Coast', displayName: 'Costa do Marfim' },
      { apiName: 'Ecuador', displayName: 'Equador' },
      { apiName: 'Curacao', displayName: 'Curaçao' },
    ],
  },
  {
    letter: 'F',
    teams: [
      { apiName: 'Netherlands', displayName: 'Países Baixos' },
      { apiName: 'Japan', displayName: 'Japão' },
      { apiName: 'Sweden', displayName: 'Suécia' },
      { apiName: 'Tunisia', displayName: 'Tunísia' },
    ],
  },
  {
    letter: 'G',
    teams: [
      { apiName: 'Egypt', displayName: 'Egito' },
      { apiName: 'Iran', displayName: 'Irã' },
      { apiName: 'Belgium', displayName: 'Bélgica' },
      { apiName: 'New-Zealand', displayName: 'Nova Zelândia' },
    ],
  },
  {
    letter: 'H',
    teams: [
      { apiName: 'Spain', displayName: 'Espanha' },
      { apiName: 'Uruguay', displayName: 'Uruguai' },
      { apiName: 'Cape-Verde', displayName: 'Cabo Verde' },
      { apiName: 'Saudi-Arabia', displayName: 'Arábia Saudita' },
    ],
  },
  {
    letter: 'I',
    teams: [
      { apiName: 'France', displayName: 'França' },
      { apiName: 'Norway', displayName: 'Noruega' },
      { apiName: 'Senegal', displayName: 'Senegal' },
      { apiName: 'Iraq', displayName: 'Iraque' },
    ],
  },
  {
    letter: 'J',
    teams: [
      { apiName: 'Argentina', displayName: 'Argentina' },
      { apiName: 'Austria', displayName: 'Áustria' },
      { apiName: 'Algeria', displayName: 'Argélia' },
      { apiName: 'Jordan', displayName: 'Jordânia' },
    ],
  },
  {
    letter: 'K',
    teams: [
      { apiName: 'Colombia', displayName: 'Colômbia' },
      { apiName: 'Portugal', displayName: 'Portugal' },
      { apiName: 'Congo-DR', displayName: 'Congo (RD)' },
      { apiName: 'Uzbekistan', displayName: 'Uzbequistão' },
    ],
  },
  {
    letter: 'L',
    teams: [
      { apiName: 'England', displayName: 'Inglaterra' },
      { apiName: 'Ghana', displayName: 'Gana' },
      { apiName: 'Croatia', displayName: 'Croácia' },
      { apiName: 'Panama', displayName: 'Panamá' },
    ],
  },
]

export const wcTeamNames = new Set(groups.flatMap((g) => g.teams.map((t) => t.apiName)))
