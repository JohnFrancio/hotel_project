import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"
var ls = new SecureLS({ isCompression: false })

// Create a new store instance.
export const store = createStore({
  plugins:[
    createPersistedState()
  ],
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
    },
    logout(state){
      state.user = null
      state.isLogin = false
      state.token = null
    }
  }
})

