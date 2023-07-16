import axios from 'axios'

export const hotel = {
	namespaced: true,
	state: {
		hotels: null,
		singleHotel: null
	},
	getters: {
		allHotel: (state) => {
			return state.hotels
		},
		hotel: (state) => state.singleHotel
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
		setSingleHotel: (state, hotel) => {
			return state.singleHotel = hotel
			// return state.singleHotel = state.singleHotel.map((item) => item.id_hotel !== hotel[0].id_hotel ? item : hotel[0])
		},
	}
}
