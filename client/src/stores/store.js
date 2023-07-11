import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
  state () {
    return {
      token: null,
      user: null,
      isLogin: false
    }
  },
  mutations: {
    setToken(state, token){
      state.token = token
    },
    setUser(state, user){
      state.user = user
      state.isLogin = true
    }
  },
  actions:{
    setToken({commit}, { token, user }){
      commit('setUser', user)
      commit('setToken', token)
    }
  }
})

