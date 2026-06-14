import { createRouter, createWebHistory } from 'vue-router'

import AlbumComponent from '@/components/AlbumComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AlbumComponent
  },
  {
    path: '/album',
    name: 'album',
    component: AlbumComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router