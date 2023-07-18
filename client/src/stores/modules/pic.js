import axios from 'axios'

export const pic = {
	namespaced: true,
	state: {
		pics: null,
		allPics: null
	},
	getters: {
		allPics: (state) => {
			return state.pics
		},
		countPics: (state) => {
			let count = 0
			for(let j in state.pics){
				count++
			}
			return count
		},
		countAllPics: (state) => {
			let count = 0
			for(let j in state.allPics){
				count++
			}
			return count
		},
		getAllPic: (state) => {
			return state.allPics
		}
	},
	actions: {
		async getAllPics({ commit }){
			const response = await axios.get(`http://localhost:8081/pic`)
			commit('setAllPics', response.data)
		},
		async getPics({ commit }, id){
			const response = await axios.get(`http://localhost:8081/pic/${id}`)
			commit('setPics', response.data)
		},
		async addPics({ commit }, credentials){
			const response = await axios.post('http://localhost:8081/pic', credentials.form)
			const datas = await axios.get(`http://localhost:8081/pic/${credentials.id}`)
			commit('updatePic', datas.data)
			console.log(response)
			return response.data.fieldCount
		},
		async deletePic({ state, commit }, id){
			const response = await axios.delete(`http://localhost:8081/pic/${id}`)
			if(state.pics){
				commit('removePic', id)
			}
			commit('removePicGlobal', id)
		},
		async LogOut({ state }){
			state.pics = null
			state.allPics = null
		}
	},
	mutations: {
		setAllPics: (state, pics) => (state.allPics = pics),
		setPics: (state, pic) => (state.pics = pic),
		updatePic: (state, pic) => (state.pics = pic),
		removePic:(state, id) => state.pics = state.pics.filter((pic) => pic.id_img !== id),
		removePicGlobal:(state, id) => state.allPics = state.allPics.filter((pic) => pic.id_img !== id)
	}
}
