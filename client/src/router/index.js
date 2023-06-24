import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Hotel from '../views/Hotel.vue'
import Inscription from '../views/inscription.vue'
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
    path: '/inscription',
    name: 'Inscription',
    component: Inscription
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
