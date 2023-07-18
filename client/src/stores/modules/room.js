import axios from 'axios'

export const room = {
	namespaced: true,
	state: {
		rooms: null,
		allRooms: null,
		roomReserve:null
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
		countAllRoom: (state) => {
			let count = 0
			for(let j in state.allRooms){
				count++
			}
			return count
		},
		getAllRooms: (state) => {
			return state.allRooms
		},
		getRoomReserve: (state) => {
			return state.roomReserve
		}
	},
	actions: {
		async getAllRoomsFromBack({ commit }){
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
		async getRoomReserve({ commit }, id){
			const response = await axios.get(`http://localhost:8081/room/chambre/${id}`)
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
			commit('setRoomReserve', response.data)
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
		async deleteRoom({ state, commit }, id){
			const response = await axios.delete(`http://localhost:8081/room/${id}`)
			if(state.rooms){
				commit('removeRoom', id)
			}else{
				commit('removeRoomGlobal', id)
			}
		},
		async LogOut({ state }){
			state.rooms = null
			state.allRooms = null
		}
	},
	mutations: {
		setAllRooms: (state, rooms) => (state.allRooms = rooms),
		setRoomReserve: (state, room) => {
			(state.roomReserve = room)
			// return state.roomReserve = state.roomReserve.map((item) => item.id_chambre !== room[0].id_hotel ? item : room[0])
		},
		setRooms: (state, room) => (state.rooms = room),
		updateRoom: (state, room) => (state.rooms = room),
		removeRoom:(state, id) => state.rooms = state.rooms.filter((room) => room.id_chambre !== id),
		removeRoomGlobal:(state, id) => state.allRooms = state.allRooms.filter((room) => room.id_chambre !== id)
	}
}
