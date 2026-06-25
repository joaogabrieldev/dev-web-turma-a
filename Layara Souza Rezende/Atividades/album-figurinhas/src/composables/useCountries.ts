import { ref, onMounted } from 'vue'
import { apiFootball } from '@/lib/apiFootball'
import type { ApiResponse, Country } from '@/types/apiFootball'

export function useCountries() {
  const countriesByName = ref<Record<string, Country>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCountries() {
    loading.value = true
    error.value = null
    try {
      const data = await apiFootball.get<ApiResponse<Country>>('/teams/countries')
      countriesByName.value = Object.fromEntries(data.response.map((c) => [c.name, c]))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao carregar países'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchCountries)

  return { countriesByName, loading, error, refresh: fetchCountries }
}
