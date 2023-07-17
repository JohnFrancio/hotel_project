import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Hotel from '../views/Hotel.vue'
import Connexion from '../views/Connexion.vue'
import UserIndex from '../views/user/Index.vue'
import UserProfil from '../views/user/Profil.vue'
import HotelIndex from '../views/hotel/Index.vue'
import HotelProfil from '../views/hotel/Profil.vue'
import HotelDetails from '../views/user/HotelDetail.vue'
import { store } from '../stores/store'

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
    component: UserIndex,
    meta: {requiresAuth: true},
  },
  {
    path: '/user/hotel/detail/:id',
    name: 'HotelDetail',
    component: HotelDetails,
    meta: {requiresAuth: true},
  },
  {
    path: '/hotel/index',
    name: 'HotelIndex',
    component: HotelIndex,
    meta: {requiresAuth: true},
  },
  {
    path: '/hotel/profil',
    name: 'HotelProfil',
    component: HotelProfil,
    meta: {requiresAuth: true},
  },
  {
    path: '/user/profil',
    name: 'UserProfil',
    component: UserProfil,
    meta: {requiresAuth: true},
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.getToken) {
      next()
      return
    }
    next('/connexion')
  } else {
    next()
  }
})

export default router
