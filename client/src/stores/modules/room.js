import axios from 'axios'

export const room = {
	namespaced: true,
	state: {
		rooms: null,
		allRooms: null
	},
	getters: {
		allRoom: (state) => {
			return state.rooms
		},
		countRoom: (state) => {
			let count = 0
			for(let j in state.rooms){
				count++
			}
			return count
		},
		getAllRooms: (state) => {
			return state.allRooms
		}
	},
	actions: {
		async getAllRooms({ commit }){
			const response = await axios.get(`http://localhost:8081/room`)
			for(let i in response.data){
				let date = new Date(response.data[i].date_chambre).toLocaleDateString(
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
				response.data[i].date_chambre = date
			}
			commit('setAllRooms', response.data)
		},
		async getRooms({ commit }, id){
			const response = await axios.get(`http://localhost:8081/room/${id}`)
			for(let i in response.data){
				let date = new Date(response.data[i].date_chambre).toLocaleDateString(
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
				response.data[i].date_chambre = date
			}
			commit('setRooms', response.data)
		},
		async addRooms({ commit }, credentials){
			const response = await axios.post('http://localhost:8081/room', credentials.form)
			const datas = await axios.get(`http://localhost:8081/room/${credentials.id}`)
			for(let i in datas.data){
				let date = new Date(datas.data[i].date_chambre).toLocaleDateString(
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
				datas.data[i].date_chambre = date
			}
			commit('updateRoom', datas.data)
			return response.data.fieldCount
		},
		async updateRoom({ commit }, credentials){
			const response = await axios.put(`http://localhost:8081/room/${credentials.id}`, credentials.form)
			const datas = await axios.get(`http://localhost:8081/room/${credentials.id_hotel}`)
			for(let i in datas.data){
				let date = new Date(datas.data[i].date_chambre).toLocaleDateString(
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
				datas.data[i].date_chambre = date
			}
			commit('updateRoom', datas.data)
			return response.data.fieldCount
		},
		async deleteRoom({ commit }, id){
			const response = await axios.delete(`http://localhost:8081/room/${id}`)
			commit('removeRoom', id)
		}
	},
	mutations: {
		setAllRooms: (state, rooms) => (state.allRooms = rooms),
		setRooms: (state, room) => (state.rooms = room),
		updateRoom: (state, room) => (state.rooms = room),
		removeRoom:(state, id) => state.rooms = state.rooms.filter((room) => room.id_chambre !== id)
	}
}
