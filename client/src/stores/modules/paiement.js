import axios from 'axios'

export const paiement = {
	namespaced: true,
	state: {
		paiement: "",
		singlePaiement: ""
	},
	getters: {
		allPaiement: (state) => {
			return state.paiement
		},
		onePaiement: (state) => state.singlePaiement,
		countPaiement: (state) => {
			let count = 0
			for(let j in state.paiement){
				count++
			}
			return count
		}
	},
	actions: {
		async updateRef({ commit }, id){
			const response = await axios.get(`http://localhost:8081/paiement/${id}`)
			const datas = await axios.get(`http://localhost:8081/paiement/info/${id}`)
			commit('setPaiement', datas.data)
			return response.data.fieldCount
		},
		async addPaiement({ commit }, credentials){
			const response = await axios.post(`http://localhost:8081/paiement/${credentials.id}`, {
				prix: credentials.prix,
				contact_user: credentials.contact_user
			})
			return response.data.fieldCount
		},
	},
	mutations: {
		setPaiement: (state, paiement) => {
			return state.singlePaiement = paiement[0]
		}
	}
}
