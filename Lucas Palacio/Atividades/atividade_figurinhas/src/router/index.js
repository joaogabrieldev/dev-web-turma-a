import { createRouter, createWebHistory } from 'vue-router'
import FigurinhasComponent from '@/components/FigurinhasComponent.vue'


const routes = [
  // Rota principal — pode apontar para FigurinhasComponent direto
  
  {
    path: '/',
    name: 'home',
    component: FigurinhasComponent   // mude para MenuView se preferir
  },
  {
    path: '/figurinhas',
    name: 'figurinhas',
    component: FigurinhasComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router