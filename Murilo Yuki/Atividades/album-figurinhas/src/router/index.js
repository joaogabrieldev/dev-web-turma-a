import { createRouter, createWebHashHistory } from 'vue-router'
import AlbumView from '../views/AlbumView.vue'

const routes = [
  { path: '/', component: AlbumView }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})