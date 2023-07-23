import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Hotel from '../views/Hotel.vue'
import Connexion from '../views/Connexion.vue'
import UserIndex from '../views/user/Index.vue'
import UserProfil from '../views/user/Profil.vue'
import HotelIndex from '../views/hotel/Index.vue'
import HotelProfil from '../views/hotel/Profil.vue'
import HotelDetails from '../views/user/HotelDetail.vue'
import AdminIndex from '../views/admin/Index.vue'
import AdminHotel from '../views/admin/Hotel.vue'
import AdminClient from '../views/admin/Client.vue'
import AdminAvis from '../views/admin/Avis.vue'
import AdminChambre from '../views/admin/Chambre.vue'
import AdminReservation from '../views/admin/Reservation.vue'
import AdminImage from '../views/admin/Image.vue'
import AdminPaiement from '../views/admin/Paiement.vue'
import NotFound from '../views/NotFound.vue'
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
  {
    path: '/admin/index',
    name: 'AdminIndex',
    component: AdminIndex,
    meta: {requiresAuth: true},
  },
  {
    path: '/admin/hotel',
    name: 'AdminHotel',
    component: AdminHotel,
    meta: {requiresAuth: true},
  },{
    path: '/admin/client',
    name: 'AdminClient',
    component: AdminClient,
    meta: {requiresAuth: true},
  },{
    path: '/admin/avis',
    name: 'AdminAvis',
    component: AdminAvis,
    meta: {requiresAuth: true},
  },{
    path: '/admin/reservation',
    name: 'AdminReservation',
    component: AdminReservation,
    meta: {requiresAuth: true},
  },{
    path: '/admin/chambre',
    name: 'AdminChambre',
    component: AdminChambre,
    meta: {requiresAuth: true},
  },{
    path: '/admin/image',
    name: 'AdminImage',
    component: AdminImage,
    meta: {requiresAuth: true},
  },{
    path: '/admin/paiement',
    name: 'AdminPaiement',
    component: AdminPaiement,
    meta: {requiresAuth: true},
  },
  {
    path: "/:notFound",
    name: 'NotFound',
    component: NotFound,
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
