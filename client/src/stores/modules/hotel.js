import axios from 'axios'

export const hotel = {
	namespaced: true,
	state: {
		hotels: "",
		singleHotel: ""
	},
	getters: {
		allHotel: (state) => {
			return state.hotels
		},
		hotelById: (state) => state.singleHotel,
		countHotel: (state) => {
			let count = 0
			for(let j in state.hotels){
				count++
			}
			return count
		}
	},
	actions: {
		async getHotels({ commit }){
			const response = await axios.get(`http://localhost:8081/hotel`)
			commit('setHotels', response.data)
		},
		async getHotelById({ commit }, id){
			const response = await axios.get(`http://localhost:8081/hotel/${id}`)
			commit('setSingleHotel', response.data[0])
		},
		async deleteHotel({ commit }, id){
			const response = await axios.delete(`http://localhost:8081/hotel/${id}`)
			commit('removeHotel', id)
		},
		async LogOut({ state }){
			state.hotels = null
			state.singleHotel = null
		}
	},
	mutations: {
		setHotels: (state, hotel) => (state.hotels = hotel),
		setSingleHotel: (state, hotel) => (state.singleHotel = hotel),
		removeHotel:(state, id) => state.hotels = state.hotels.filter((hotel) => hotel.id_user !== id)
	}
}
