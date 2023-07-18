<template>
	<v-app>
		<adminSidebar/>
      	<v-main class="my-5 mx-10">
      		<v-row justify="end">
		        <v-col cols="12" sm="4"> 
		          <v-text-field outlined label="Chercher un chambre par hotel" append-icon="mdi-bed" v-model="search"></v-text-field>
		        </v-col>
		      </v-row>
      		<h2 class="mb-5 text-grey">Chambre</h2>
      		<v-row align="center" justify="center" class="ms-sm-3">
		        <v-col v-for="(cham ,index) in filterRoom"  cols="12" sm="4">
		          <v-card
		            class="mx-auto"
		            max-width="344"
		          >
		            <v-img
		              :src="`data:image/png;base64,${cham.img_chambre}`"
		              height="200px"
		              cover
		            ></v-img>

		            <v-card-title>
		              <v-icon
		                color="#949cf7"
		                icon="mdi-calendar"
		                width="100"
		              ></v-icon>

		              <span class="text-medium-emphasis text-caption">{{ cham.date_chambre }}</span>
		              <v-spacer></v-spacer>
		              <v-avatar
		                :image="`data:image/png;base64,${cham.img_hotel}`"
		                size="x-small"
		              ></v-avatar><span class="text-medium-emphasis text-caption">   Chambre de l'hotel {{ cham.nom_hotel }}</span>
		            </v-card-title>

		            <v-card-subtitle>
		              <v-btn flat class="px-5">
		                {{ cham.nbr_pers }} 
		                <v-icon>mdi-account</v-icon>
		                Personne
		              </v-btn><br>
		              <v-btn flat class="px-5">
		                {{ cham.nbr_lit1 }} 
		                <v-icon>mdi-bed</v-icon>
		                1 Place
		              </v-btn>
		              <v-btn flat class="px-5">
		                {{ cham.nbr_lit2 }} 
		                <v-icon>mdi-bed</v-icon>
		                2 Places
		              </v-btn> <br>
		              <v-btn flat class="px-5">
		                {{ cham.nbr_douche }} 
		                <v-icon>mdi-toilet</v-icon>
		                Douche
		              </v-btn>  
		              <v-btn flat class="px-5">
		                {{ cham.nbr_tele }} 
		                <v-icon>mdi-television</v-icon>
		                TV
		              </v-btn>
		              <h2 class="mt-4 text-red">{{ cham.prix.toLocaleString("en-US") }} Ar</h2>
		            </v-card-subtitle>

		            <v-card-actions class="ms-16">
		              <v-btn 
		                class="ms-16"
		                @click="deleteRoom(cham.id_chambre)"
		                color="red-lighten-2"
		                prepend-icon="mdi-delete"
		                variant="text"
		              >
		                Supprimer
		              </v-btn>
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
	name: 'AdminChambre',
	components:{
		adminSidebar,
	},
	data(){
		return{
			search:""
		}
	},
	computed:{
		...mapGetters({
			allRooms: 'room/getAllRooms'
		}),
		filterRoom(){
	      return this.allRooms.filter((room) => {
	        if(room.nom_hotel.toLowerCase().includes(this.search.toLowerCase())){
	          return true
	        }
	      })
	    },
	},
	methods:{
		...mapActions({
			getAllRoomsFromBack: 'room/getAllRoomsFromBack',
			deleteRoom: 'room/deleteRoom'
		})
	},
	created(){
		this.getAllRoomsFromBack()
	}
}
</script>