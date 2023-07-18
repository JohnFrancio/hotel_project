import axios from 'axios'

export const user = {
	namespaced: true,
	state: {
		users: "",
		singleUser: ""
	},
	getters: {
		allUser: (state) => {
			return state.users
		},
		userById: (state) => state.singleUser,
		countUser: (state) => {
			let count = 0
			for(let j in state.users){
				count++
			}
			return count
		}
	},
	actions: {
		async getUser({ commit }){
			const response = await axios.get(`http://localhost:8081/user`)
			commit('setUsers', response.data)
			return response.data
		},
		async getUserById({ commit }, id){
			const response = await axios.get(`http://localhost:8081/user/${id}`)
			commit('setSingleUser', response.data)
			return response.data
		},
		async deleteUser({ commit }, id){
			const response = await axios.delete(`http://localhost:8081/user/${id}`)
			commit('removeUser', id)
		}
	},
	mutations: {
		setUsers: (state, user) => (state.users = user),
		setSingleUser: (state, user) => (state.singleUser = user),
		removeUser:(state, id) => state.users = state.users.filter((user) => user.id_user !== id)
	}
}
