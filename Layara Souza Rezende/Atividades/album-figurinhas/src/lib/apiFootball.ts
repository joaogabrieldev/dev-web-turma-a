const BASE_URL = import.meta.env.VITE_API_FOOTBALL_BASE_URL
const API_KEY = import.meta.env.VITE_API_FOOTBALL_API_KEY

if (!BASE_URL || !API_KEY) {
  console.error('[apiFootball] VITE_API_FOOTBALL_BASE_URL ou VITE_API_FOOTBALL_API_KEY não definidos no .env.local')
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'x-apisports-key': API_KEY,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)

  return res.json() as Promise<T>
}

export const apiFootball = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, { ...init, method: 'GET' }),
}
