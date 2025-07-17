import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/inicio'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/inicio'
      },
      {
        path: 'inicio',
        component: () => import('../views/InicioView.vue')
      },
      {
        path: 'favoritos',
        component: () => import('@/views/FavoritosView.vue')
      },
      {
        path: 'configuracoes',
        component: () => import('@/views/ConfiguracoesView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
