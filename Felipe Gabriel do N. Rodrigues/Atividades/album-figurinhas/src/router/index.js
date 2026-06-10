import { createRouter, createWebHistory } from 'vue-router'
import AlbumView from '@/views/AlbumView.vue'
 
const routes = [
  {
    path: '/',
    name: 'album',
    component: AlbumView
  }
]
 
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
 
export default router