import axios from 'axios'

export const hotel = {
	namespaced: true,
	state: {
		hotels: null,
		singleHotel: ""
	},
	getters: {
		allHotel: (state) => {
			return state.hotels
		},
		hotelById: (state) => state.singleHotel
	},
	actions: {
		async getHotels({ commit }){
			const response = await axios.get(`http://localhost:8081/hotel`)
			commit('setHotels', response.data)
		},
		async getHotelById({ commit }, id){
			const response = await axios.get(`http://localhost:8081/hotel/${id}`)
			commit('setSingleHotel', response.data)
			return response.data
		}
	},
	mutations: {
		setHotels: (state, hotel) => (state.hotels = hotel),
		setSingleHotel: (state, hotel) => (state.singleHotel = hotel)
	}
}
