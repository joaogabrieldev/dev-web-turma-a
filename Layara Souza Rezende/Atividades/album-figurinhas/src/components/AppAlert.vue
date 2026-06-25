<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useAlert } from '@/composables/useAlert'

const { message, dismiss } = useAlert()
</script>

<template>
  <Transition name="alert">
    <div v-if="message" class="alert" role="alert">
      <span class="alert-message">{{ message }}</span>
      <button class="alert-dismiss" aria-label="Fechar" @click="dismiss">
        <Icon icon="lucide:x" width="14" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.alert {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem 0.75rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid #ef4444;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  min-width: 260px;
  max-width: calc(100vw - 3rem);
  z-index: 100;
}

.alert-message {
  font-size: 0.85rem;
  color: var(--color-text);
  flex: 1;
}

.alert-dismiss {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.15s;
}

.alert-dismiss:hover {
  color: var(--color-text);
}

.alert-enter-active,
.alert-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(0.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .alert-enter-active,
  .alert-leave-active {
    transition: opacity 0.2s;
  }

  .alert-enter-from,
  .alert-leave-to {
    transform: translateX(-50%);
  }
}
</style>
