<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useCountries } from '@/composables/useCountries'
import { groups, wcTeamNames } from '@/data/groups'

const router = useRouter()

const { countriesByName, loading, error, refresh } = useCountries()

const currentIndex = ref(0)
const currentGroup = computed(() => groups[currentIndex.value]!)

function prev() {
  currentIndex.value = (currentIndex.value - 1 + groups.length) % groups.length
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % groups.length
}

function navigateToTeam(name: string | null) {
  if (name) router.push({ name: 'team', params: { name } })
}

const countriesNotInWC = computed(() =>
  Object.values(countriesByName.value)
    .filter((c) => c.code !== null && !wcTeamNames.has(c.name))
    .sort((a, b) => a.name.localeCompare(b.name)),
)
</script>

<template>
  <div class="page">
    <section class="groups-section">
      <div v-if="loading" class="skeleton-wrapper">
        <div class="skeleton-card" />
      </div>

      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button class="retry-btn" @click="refresh">Tentar novamente</button>
      </div>

      <div v-else class="carousel">
        <button class="arrow" aria-label="Grupo anterior" @click="prev">
          <Icon icon="lucide:chevron-left" width="20" />
        </button>

        <article class="group-card">
          <p class="group-label">Grupo {{ currentGroup.letter }}</p>
          <ul class="team-list">
            <li
              v-for="team in currentGroup.teams"
              :key="team.apiName"
              class="team-row"
              @click="navigateToTeam(team.apiName)"
            >
              <img
                v-if="countriesByName[team.apiName]?.flag"
                :src="countriesByName[team.apiName]!.flag!"
                :alt="team.displayName"
                class="team-flag"
              />
              <span v-else class="team-flag-placeholder" />
              <span class="team-code">{{ countriesByName[team.apiName]?.code ?? '—' }}</span>
              <span class="team-name">{{ team.displayName }}</span>
            </li>
          </ul>
        </article>

        <button class="arrow" aria-label="Próximo grupo" @click="next">
          <Icon icon="lucide:chevron-right" width="20" />
        </button>
      </div>

      <div v-if="!loading && !error" class="dots">
        <button
          v-for="(group, i) in groups"
          :key="group.letter"
          class="dot"
          :class="{ active: i === currentIndex }"
          :aria-label="`Grupo ${group.letter}`"
          @click="currentIndex = i"
        />
      </div>
    </section>

    <section v-if="!loading && !error" class="non-wc-section">
      <h2 class="section-title">Países fora da Copa 2026</h2>
      <select class="country-select" @change="navigateToTeam(($event.target as HTMLSelectElement).value || null)">
        <option value="">Selecione um país</option>
        <option v-for="c in countriesNotInWC" :key="c.name" :value="c.name">
          {{ c.name }}
        </option>
      </select>
    </section>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 2rem 1.5rem 5rem;
  max-width: 580px;
  margin: 0 auto;
}

/* ── Groups ── */
.groups-section {
  margin-bottom: 4rem;
}

/* ── Carousel ── */
.carousel {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.arrow {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-muted);
  font-size: 1rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.arrow:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* ── Group card ── */
.group-card {
  flex: 1;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 1.5rem 1.5rem 1rem;
}

.group-label {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.85rem;
}

/* ── Team rows ── */
.team-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.team-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.42rem 0;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: opacity 0.15s;
}

.team-row:hover {
  opacity: 0.7;
}

.team-row:last-child {
  border-bottom: none;
}

.team-flag {
  width: 26px;
  height: 18px;
  object-fit: cover;
  border-radius: 2px;
  flex-shrink: 0;
}

.team-flag-placeholder {
  display: inline-block;
  width: 26px;
  height: 18px;
  border-radius: 2px;
  background: var(--color-border);
  flex-shrink: 0;
}

.team-code {
  font-size: 0.62rem;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
  flex-shrink: 0;
  min-width: 2.8rem;
}

.team-name {
  font-size: 0.85rem;
  color: var(--color-text);
}

/* ── Dots ── */
.dots {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 1rem;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: var(--color-border);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
}

.dot.active {
  background: var(--color-accent);
}

/* ── Skeleton ── */
.skeleton-wrapper {
  display: flex;
  justify-content: center;
}

.skeleton-card {
  width: 100%;
  height: 198px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  animation: pulse 1.6s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}

/* ── Error ── */
.error-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.retry-btn {
  padding: 0.5rem 1.25rem;
  background: transparent;
  border: 1px solid var(--color-accent);
  border-radius: 6px;
  color: var(--color-accent);
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: rgba(245, 184, 0, 0.1);
}

/* ── Non-WC section ── */
.non-wc-section {
  border-top: 1px solid var(--color-border);
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.country-select {
  appearance: none;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 0.9rem;
  padding: 0.65rem 2.5rem 0.65rem 0.9rem;
  width: 100%;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234d6080' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.85rem center;
  transition: border-color 0.2s;
}

.country-select:focus {
  outline: none;
  border-color: var(--color-accent);
}

.country-select option {
  background: var(--color-surface);
  color: var(--color-text);
}

@media (prefers-reduced-motion: reduce) {
  .arrow,
  .dot,
  .retry-btn,
  .country-select {
    transition: none;
  }

  .skeleton-card {
    animation: none;
  }
}
</style>
