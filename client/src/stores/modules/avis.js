import axios from 'axios'

export const avis = {
	namespaced: true,
	state: {
		avis: null,
		avisHotel: null
	},
	getters: {
		avis: (state) => {
			return state.avis
		},
		avisHotel: (state) => {
			return state.avisHotel
		},
		countAvis: (state) => {
			let c = 0
			for(let i in state.avisHotel){
				c++
			}
			return c
		},
		countAllAvis: (state) => {
			let c = 0
			for(let i in state.avis){
				c++
			}
			return c
		}
	},
	actions: {
		async getAvis({ commit }){
			const response = await axios.get(`http://localhost:8081/avis`)
			for(let i in response.data){
		        let date = new Date(response.data[i].date_avis).toLocaleDateString(
		            'fr-FR',
		            {
		              year: 'numeric',
		              month: 'long',
		              day: 'numeric'
		            }
		          )
		        response.data[i].date_avis = date
		      }
			commit('setAvis', response.data)
		},
		async getAvisHotel({ commit }, id){
			const response = await axios.get(`http://localhost:8081/avis/${id}`)
			for(let i in response.data){
		        let date = new Date(response.data[i].date_avis).toLocaleDateString(
		            'fr-FR',
		            {
		              year: 'numeric',
		              month: 'long',
		              day: 'numeric'
		            }
		          )
		        response.data[i].date_avis = date
		      }
			commit('setAvisHotel', response.data)
		},
		async addAvis({ commit }, credentials){
			const response = await axios.post('http://localhost:8081/avis', credentials)
			return response.data.fieldCount
		},
		async deleteAvis({ state, commit }, id){
			const response = await axios.delete(`http://localhost:8081/avis/${id}`)
			if(state.avisHotel){
				commit('removeAvis', id)
			}else{
				commit('removeAvisGlobal', id)
			}
		},
		async LogOut({ state }){
			state.avis = null
			state.avisHotel = null
		}
	},
	mutations: {
		setAvis: (state, avis) => (state.avis = avis),
		setAvisHotel: (state, avis) => (state.avisHotel = avis),
		removeAvis:(state, id) => state.avisHotel = state.avisHotel.filter((av) => av.id_avis !== id),
		removeAvisGlobal:(state, id) => state.avis = state.avis.filter((av) => av.id_avis !== id)
	}
}
