<template>
	<v-app>
		<adminSidebar/>
      	<v-main class="my-10 mx-10">
      		<h2 class="mb-5 text-grey">Tableau de bord</h2>
      		<v-row>
      			<v-col v-for="item in dashbord" cols="12" sm="6">
      				<v-card class="ma-3" height="200px">
      					<v-list-item>
      						<v-list-item-avatar tile>
      							<v-sheet :color="`${item.color}-lighten-1`" class="rounded" width="80" height="80" elevation="10">
      								<v-icon color="white" class="ms-5 mt-5" size="40">{{ item.icon }}</v-icon>
      							</v-sheet>
      						</v-list-item-avatar>
      						<v-list-item-content>
      							<div class="overline text-h5 text-end">{{ item.title }}</div>
      							<v-list-item-title v-if="item.title == 'Hotel'" class="headline mb-1 text-end">Nombre : {{ countHotel }}</v-list-item-title>
      							<v-list-item-title v-if="item.title == 'Client'" class="headline mb-1 text-end">Nombre : {{ countUser }}</v-list-item-title>
      							<v-list-item-title v-if="item.title == 'Reservation'" class="headline mb-1 text-end">Nombre : {{ countReservation }}</v-list-item-title>
      							<v-list-item-title v-if="item.title == 'Avis'" class="headline mb-1 text-end">Nombre : {{ countAllAvis }}</v-list-item-title>
      							<v-list-item-title v-if="item.title == 'Chambre'" class="headline mb-1 text-end">Nombre : {{ countAllRoom }}</v-list-item-title>
      							<v-list-item-title v-if="item.title == 'Photo'" class="headline mb-1 text-end">Nombre : {{ countAllPics }}</v-list-item-title>
      							<div><v-divider></v-divider></div>
      						</v-list-item-content>
      					</v-list-item>
      					<v-card-actions>
      						<v-icon :color="`${item.color}-lighten-1`" class="ms-5">{{ item.icon }}</v-icon>
      						<div class="ms-5 overline">{{ item.title }}</div>
      					</v-card-actions>
      				</v-card>
      			</v-col>
      		</v-row>
      	</v-main>
    </v-app>
</template>

<script>
import adminSidebar from '../../components/admin/Sidebar.vue'
import { mapGetters, mapActions } from 'vuex'

export default{
	name: 'AdminIndex',
	components:{
		adminSidebar,
	},
	computed:{
		...mapGetters({
			countHotel:'hotel/countHotel',
			countReservation: 'reservation/countReservation',
			countAllAvis: 'avis/countAllAvis',
			countUser: 'user/countUser',
			countAllRoom:'room/countAllRoom',
			countAllPics: 'pic/countAllPics'
		})
	},
	data(){
		return {
			test:0,
			dashbord:[
				{
					"color":"green",
					"icon":"mdi-home-city",
					"title":"Hotel",
				},
				{
					"color":"red",
					"icon":"mdi-account-group-outline",
					"title":"Client",
				},
				{
					"color":"blue",
					"icon":"mdi-book",
					"title":"Reservation",
				},
				{
					"color":"yellow",
					"icon":"mdi-comment-processing-outline",
					"title":"Avis",
				},
				{
					"color":"orange",
					"icon":"mdi-bed",
					"title":"Chambre",
				},
				{
					"color":"purple",
					"icon":"mdi-image",
					"title":"Photo",
				},
			]
		}
	},
	methods: {
	  ...mapActions({
	  	getHotels: 'hotel/getHotels',
	  	getAllReservation: 'reservation/getAllReservation',
	  	getAvis: 'avis/getAvis',
	  	getUser: 'user/getUser',
	  	getAllPics: 'pic/getAllPics',
	  	getAllRoomsFromBack: 'room/getAllRoomsFromBack'
	  })
	},
	created(){
		this.getAvis()
		this.getHotels()
		this.getUser()
		this.getAllReservation()
		this.getAllRoomsFromBack()
		this.getAllPics()
	}
}
</script>