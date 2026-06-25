import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import ConfiguracaoPedidoView from '../views/ConfiguracaoPedidoView.vue'
import PedidosView from '../views/PedidosView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/configuracao',
    name: 'configuracao',
    component: ConfiguracaoPedidoView
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: PedidosView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router