<script setup lang="ts">
defineProps<{
  name: string
  age: number
  number: number
  position: string
  photo: string
}>()

const positionColors: Record<string, string> = {
  Goalkeeper: '#22c55e',
  Defender: '#3b82f6',
  Midfielder: '#a855f7',
  Attacker: '#ef4444',
}

const positionLabels: Record<string, string> = {
  Goalkeeper: 'GOL',
  Defender: 'DEF',
  Midfielder: 'MEI',
  Attacker: 'ATA',
}
</script>

<template>
  <article class="sticker">
    <header class="sticker-header">
      <span class="position-badge" :style="{ background: positionColors[position] ?? '#4d6080' }">
        {{ positionLabels[position] ?? position.slice(0, 3).toUpperCase() }}
      </span>
      <span class="jersey-number">#{{ number }}</span>
    </header>

    <div class="photo-area">
      <img :src="photo" :alt="name" class="photo" loading="lazy" />
    </div>

    <footer class="sticker-footer">
      <p class="player-name">{{ name }}</p>
      <p class="player-age">{{ age }} anos</p>
    </footer>
  </article>
</template>

<style scoped>
.sticker {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 0 0 2px var(--color-accent);
  transition: transform 0.15s, box-shadow 0.15s;
}

.sticker:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 0 0 2px var(--color-accent), 0 8px 20px rgba(245, 184, 0, 0.15);
}

.sticker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.35rem 0.5rem;
  background: #0a1220;
  border-bottom: 1px solid var(--color-border);
}

.position-badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fff;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  line-height: 1;
}

.jersey-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.3rem;
  color: var(--color-accent);
  line-height: 1;
  letter-spacing: 0.03em;
}

.photo-area {
  flex: 1;
  background: linear-gradient(to bottom, #0d1a2a, #0a1220);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: 1 / 1.1;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.sticker-footer {
  padding: 0.45rem 0.5rem 0.5rem;
  background: #0a1220;
  border-top: 2px solid var(--color-accent);
}

.player-name {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-age {
  font-size: 0.68rem;
  color: var(--color-text);
  margin-top: 0.15rem;
  line-height: 1;
}
</style>
