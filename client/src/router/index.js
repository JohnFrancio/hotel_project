import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Hotel from '../views/Hotel.vue'
import Connexion from '../views/Connexion.vue'
import UserIndex from '../views/user/Index.vue'
import UserProfil from '../views/user/Profil.vue'
import HotelIndex from '../views/hotel/Index.vue'
import HotelProfil from '../views/hotel/Profil.vue'
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
  {
    path: '/hotel/index',
    name: 'HotelIndex',
    component: HotelIndex
  },
  {
    path: '/hotel/profil',
    name: 'HotelProfil',
    component: HotelProfil
  },
  {
    path: '/user/profil',
    name: 'UserProfil',
    component: UserProfil
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
