import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Hotel from '../views/Hotel.vue'
import Connexion from '../views/Connexion.vue'
import UserIndex from '../views/user/Index.vue'
import HotelDetails from '../views/user/HotelDetail.vue'

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
  },
  {
    path: '/user/index',
    name: 'UserIndex',
    component: UserIndex
  },
  {
    path: '/user/hotel/detail/:id',
    name: 'HotelDetail',
    component: HotelDetails
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
