import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import { room } from './modules/room'
import { hotel } from './modules/hotel'
import { pic } from './modules/pic'
import { reservation } from './modules/reservation'
import { avis } from './modules/avis'
import axios from 'axios'


// Create a new store instance.
export const store = createStore({
  plugins:[
    createPersistedState()
  ],
  modules:{
    room,
    hotel,
    pic,
    reservation,
    avis
  },
  state: {
    token: null,
    user: Array()
  },
  getters:{
    getProfil: (state) => (state.user[0]),
    getToken: (state) => state.token
  },
  actions:{
    async updateClient({ commit }, credentials){
      const response = await axios.put(`http://localhost:8081/user/${credentials.id}`, credentials.form)
      const datas = await axios.get(`http://localhost:8081/user/${credentials.id}`)
      for(let i in datas.data){
        let date = new Date(datas.data[i].date_user).toLocaleDateString(
            'fr-FR',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour12: false,
              hour: '2-digit',
              minute: '2-digit'
            }
          )
        datas.data[i].date_user = date
      }
      commit('updateClient', datas.data)
      return response.data.fieldCount
    },
    async updateHotel({ commit }, credentials){
      const response = await axios.put(`http://localhost:8081/hotel/${credentials.id}`, credentials.form)
      const datas = await axios.get(`http://localhost:8081/hotel/${credentials.id}`)
      for(let i in datas.data){
        let date = new Date(datas.data[i].date_hotel).toLocaleDateString(
            'fr-FR',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour12: false,
              hour: '2-digit',
              minute: '2-digit'
            }
          )
        datas.data[i].date_hotel = date
      }
      commit('updateHotel', datas.data)
      console.log(datas.data)
      return response.data.fieldCount
    },
    async LogOut({commit}){
      let user = null
      commit('logout', user)
    }    
  },
  mutations: {
    updateClient(state, client){
      return state.user = state.user.map((item) => item.id_hotel !== client[0].id_hotel ? item : client[0])
    },
    updateHotel(state, hotel){
      return state.user = state.user.map((item) => item.id_hotel !== hotel[0].id_hotel ? item : hotel[0])
    },
    setToken: (state, token) => state.token = token,
    setUser: (state, user) => state.user = Array(user),
    logout(state){
      state.user = null
      state.token = null
    },
  }
})

