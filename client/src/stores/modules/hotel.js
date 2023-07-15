import axios from 'axios'

export const hotel = {
	namespaced: true,
	state: {
		hotels: null,
		singleHotels: null
	},
	getters: {
		allHotel: (state) => {
			return state.hotels
		},
		hotel: (state) => state.singleHotels 
	},
	actions: {
		async getHotels({ commit }, id){
			const response = await axios.get(`http://localhost:8081/hotel`)
			commit('setHotels', response.data)
		},
		async getHotelById({ commit }, id){
			const response = await axios.get(`http://localhost:8081/hotel/${id}`)
			commit('setSingleHotel', response.data)
		}
	},
	mutations: {
		setHotels: (state, hotel) => (state.hotels = hotel),
		setSingleHotel: (state, hotel) => (state.singleHotels = hotel)
	}
}
