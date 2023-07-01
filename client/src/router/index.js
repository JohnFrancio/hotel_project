import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Hotel from '../views/Hotel.vue'
import Connexion from '../views/Connexion.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: Hotel
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
