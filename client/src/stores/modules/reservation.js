import axios from 'axios'

export const reservation = {
	namespaced: true,
	state: {
		reservation: null,
	},
	getters: {
		reservation: (state) => {
			return state.reservation
		},
		countReservation: (state) => {
			let count = 0
			for(let j in state.reservation){
				count++
			}
			return count
		}
	},
	actions: {
		async getAllReservation({ commit }){
			const response = await axios.get(`http://localhost:8081/reservation`)
			for(let i in response.data){
		        let date = new Date(response.data[i].reserver_pour).toLocaleDateString(
		            'fr-FR',
		            {
		              year: 'numeric',
		              month: 'long',
		              day: 'numeric'
		            }
		          )
		        response.data[i].reserver_pour = date
		        let date2 = new Date(response.data[i].nbr_jour).toLocaleDateString(
		            'fr-FR',
		            {
		              year: 'numeric',
		              month: 'long',
		              day: 'numeric'
		            }
		          )
		        response.data[i].nbr_jour = date2
		        let date3 = new Date(response.data[i].date_reservation).toLocaleDateString(
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
		        response.data[i].date_reservation = date3
		      }
			commit('setReservation', response.data)
		},
		async getAllReservationHotel({ commit }, credentials){
			const response = await axios.get(`http://localhost:8081/reservation/hotel/${credentials}`)
			for(let i in response.data){
		        let date = new Date(response.data[i].reserver_pour).toLocaleDateString(
		            'fr-FR',
		            {
		              year: 'numeric',
		              month: 'long',
		              day: 'numeric'
		            }
		          )
		        response.data[i].reserver_pour = date
		        let date2 = new Date(response.data[i].nbr_jour).toLocaleDateString(
		            'fr-FR',
		            {
		              year: 'numeric',
		              month: 'long',
		              day: 'numeric'
		            }
		          )
		        response.data[i].nbr_jour = date2
		        let date3 = new Date(response.data[i].date_reservation).toLocaleDateString(
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
		        response.data[i].date_reservation = date3
		      }
			commit('setReservationHotel', response.data)
		},
		async getAllReservationUser({ commit }, credentials){
			const response = await axios.get(`http://localhost:8081/reservation/user/${credentials}`)
			for(let i in response.data){
		        let date = new Date(response.data[i].reserver_pour).toLocaleDateString(
		            'fr-FR',
		            {
		              year: 'numeric',
		              month: 'long',
		              day: 'numeric'
		            }
		          )
		        response.data[i].reserver_pour = date
		        let date2 = new Date(response.data[i].nbr_jour).toLocaleDateString(
		            'fr-FR',
		            {
		              year: 'numeric',
		              month: 'long',
		              day: 'numeric'
		            }
		          )
		        response.data[i].nbr_jour = date2
		        let date3 = new Date(response.data[i].date_reservation).toLocaleDateString(
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
		        response.data[i].date_reservation = date3
		      }
			commit('setReservationUser', response.data)
		},
		async deleteReservation({ commit }, id){
			const response = await axios.delete(`http://localhost:8081/reservation/${id}`)
			commit('removeReservation', id)
		},
		async LogOut({ state }){
			state.reservation = null
		}
	},
	mutations: {
		setReservationHotel: (state, reservation) => (state.reservation = reservation),
		setReservation: (state, reservation) => (state.reservation = reservation),
		setReservationUser: (state, reservation) => (state.reservation = reservation),
		deleteReservation:(state, id) => state.reservation = state.reservation.filter((res) => res.id_reservation !== id)
	}
}
