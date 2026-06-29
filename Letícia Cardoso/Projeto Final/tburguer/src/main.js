import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Certifica-te de que esta linha existe!

createApp(App)
  .use(router) // Esta linha é crucial para ativar as rotas
  .mount('#app')