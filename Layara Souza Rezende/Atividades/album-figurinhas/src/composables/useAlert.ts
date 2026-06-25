import { ref } from 'vue'

const message = ref<string | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null

export function useAlert() {
  function show(text: string) {
    if (timer) clearTimeout(timer)
    message.value = text
    timer = setTimeout(dismiss, 5000)
  }

  function dismiss() {
    message.value = null
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return { message, show, dismiss }
}