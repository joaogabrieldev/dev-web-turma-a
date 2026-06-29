import { createRouter, createWebHistory } from 'vue-router';
import AlbumCopaComponent from '../components/AlbumCopaComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AlbumCopaComponent
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;