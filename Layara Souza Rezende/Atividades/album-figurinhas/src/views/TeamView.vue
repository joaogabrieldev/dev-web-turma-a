<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { apiFootball } from '@/lib/apiFootball'
import { useAlert } from '@/composables/useAlert'
import PlayerCard from '@/components/PlayerCard.vue'
import type { ApiResponse, Team, Venue, TeamResponse, SquadPlayer, SquadResponse } from '@/types/apiFootball'

const route = useRoute()
const router = useRouter()
const { show: showAlert } = useAlert()

const name = route.params.name as string
const searchTerm = name.includes('-') ? name.split('-').at(-1)! : name

const team = ref<Team | null>(null)
const venue = ref<Venue | null>(null)
const loadingTeam = ref(true)

const squad = ref<SquadPlayer[]>([])
const loadingSquad = ref(false)
const squadError = ref<string | null>(null)

const surfaceLabels: Record<string, string> = {
  grass: 'Grama natural',
  artificial: 'Grama sintética',
  turf: 'Turf',
}

function formatCapacity(n: number) {
  return n.toLocaleString('pt-BR')
}

onMounted(async () => {
  try {
    const res = await apiFootball.get<ApiResponse<TeamResponse>>(
      `/teams?search=${encodeURIComponent(searchTerm)}`,
    )
    const entry = res.response.find((e) => e.team.national)

    if (!entry) {
      showAlert('Seleção não encontrada.')
      router.replace({ name: 'home' })
      return
    }

    team.value = entry.team
    venue.value = entry.venue
  } catch {
    showAlert('Não foi possível carregar a seleção.')
    router.replace({ name: 'home' })
    return
  } finally {
    loadingTeam.value = false
  }

  loadingSquad.value = true
  try {
    const res = await apiFootball.get<ApiResponse<SquadResponse>>(
      `/players/squads?team=${team.value!.id}`,
    )
    squad.value = res.response[0]?.players ?? []
  } catch {
    squadError.value = 'Não foi possível carregar o elenco.'
  } finally {
    loadingSquad.value = false
  }
})
</script>

<template>
  <div class="page">
    <button class="back" @click="router.back()">
      <Icon icon="lucide:arrow-left" width="16" />
      Voltar
    </button>

    <div v-if="loadingTeam" class="skeleton-header" />

    <article v-else-if="team && venue" class="team-header">
      <div class="venue-strip">
        <img :src="venue.image" :alt="venue.name" class="venue-img" />
        <div class="venue-img-fade" />
      </div>

      <div class="team-identity">
        <img :src="team.logo" :alt="team.name" class="team-logo" />
        <div class="team-info">
          <h1 class="team-name">{{ team.name }}</h1>
          <p class="team-meta">
            <span class="team-code">{{ team.code }}</span>
            <span class="meta-sep">·</span>
            <span>Fundado em {{ team.founded }}</span>
          </p>
        </div>
      </div>

      <div class="venue-details">
        <p class="venue-eyebrow">Estádio</p>
        <p class="venue-name">{{ venue.name }}</p>
        <p class="venue-stats">
          <span>{{ venue.city }}</span>
          <span class="stat-sep">·</span>
          <span>{{ formatCapacity(venue.capacity) }} lugares</span>
          <span class="stat-sep">·</span>
          <span>{{ surfaceLabels[venue.surface] ?? venue.surface }}</span>
        </p>
      </div>
    </article>

    <section class="squad-section">
      <div v-if="loadingSquad" class="squad-loading">
        <div v-for="n in 6" :key="n" class="skeleton-card" />
      </div>

      <div v-else-if="squadError" class="squad-error">
        <Icon icon="lucide:wifi-off" width="20" />
        <p>{{ squadError }}</p>
      </div>

      <div v-else-if="squad.length" class="squad-grid">
        <PlayerCard
          v-for="player in squad"
          :key="player.id"
          :name="player.name"
          :age="player.age"
          :number="player.number"
          :position="player.position"
          :photo="player.photo"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 2rem 1.5rem 5rem;
  max-width: 80%;
  margin: 0 auto;
}

.back {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back:hover {
  color: var(--color-accent);
}

/* ── Skeleton ── */
.skeleton-header {
  width: 100%;
  height: 320px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 2px solid var(--color-accent);
  border-radius: 10px;
  animation: pulse 1.6s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

/* ── Team header card ── */
.team-header {
  border: 1px solid var(--color-border);
  border-top: 2px solid var(--color-accent);
  border-radius: 10px;
  overflow: hidden;
  background: var(--color-surface);
}

/* ── Venue photo strip ── */
.venue-strip {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.venue-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.venue-img-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, var(--color-surface));
}

/* ── Team identity ── */
.team-identity {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem 1rem;
}

.team-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
}

.team-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.team-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.4rem;
  line-height: 1;
  color: var(--color-text);
  letter-spacing: 0.04em;
}

.team-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.team-code {
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

.meta-sep {
  color: var(--color-border);
}

/* ── Venue details ── */
.venue-details {
  border-top: 1px solid var(--color-border);
  padding: 0.85rem 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.venue-eyebrow {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.venue-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.venue-stats {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-top: 0.1rem;
}

.stat-sep {
  color: var(--color-border);
}

/* ── Squad section ── */
.squad-section {
  margin-top: 2rem;
}

.squad-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.85rem;
}

.squad-loading {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.85rem;
}

.skeleton-card {
  aspect-ratio: 2 / 3;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  animation: pulse 1.6s ease-in-out infinite;
}

.squad-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .back,
  .skeleton-header,
  .skeleton-card {
    transition: none;
    animation: none;
  }
}
</style>