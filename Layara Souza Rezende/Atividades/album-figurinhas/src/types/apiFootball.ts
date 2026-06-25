export interface ApiResponse<T> {
  get: string
  parameters: unknown[]
  errors: unknown[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: T[]
}

export interface Country {
  name: string
  code: string | null
  flag: string | null
}

export interface Team {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}

export interface Venue {
  id: number
  name: string
  address: string
  city: string
  capacity: number
  surface: string
  image: string
}

export interface TeamResponse {
  team: Team
  venue: Venue
}

export interface SquadPlayer {
  id: number
  name: string
  age: number
  number: number
  position: string
  photo: string
}

export interface SquadResponse {
  team: {
    id: number
    name: string
    logo: string
  }
  players: SquadPlayer[]
}
