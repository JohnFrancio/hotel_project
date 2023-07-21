<template>
	<v-app>
		<adminSidebar/>
      	<v-main class="my-5 mx-10">
      		<v-row justify="end">
		        <v-col cols="12" sm="4"> 
		          <v-text-field outlined label="Chercher un hotel/adresse" append-icon="mdi-home-search" v-model="search"></v-text-field>
		        </v-col>
		      </v-row>
      		<h2 class="mb-5 text-grey">Hotel</h2>
      		<v-row align="center" justify="center">
	          <v-col v-for="hotel in filterHotel" cols="12" sm="4">
	            <div >
	              <v-card
	                class="mx-5 mx-sm-2 mt-5"
	                max-width="400"
	              >
	                <v-img
	                  :src="'data:image/png;base64,'+hotel.img_hotel"
	                  height="200px"
	                  cover
	                ></v-img>
	                <v-card-title>
	                  {{hotel.nom_hotel}}
	                </v-card-title>

	                <v-card-subtitle>
	                  Adresse: {{hotel.adresse_hotel}} <br>
	                  Contact: {{hotel.contact_hotel}} <br>
	                  Email: {{hotel.email_hotel}} <br>
	                </v-card-subtitle>

	                <v-card-actions>
	                  <v-btn
	                    @click="detail(hotel.id_hotel)"
	                    color="orange"
	                    icon="mdi-alert-circle"
	                  >
	                  </v-btn>

	                  <v-spacer></v-spacer>

	                  <v-btn
	                  	@click="deleteHotel(hotel.id_hotel)"
	                  	color="red-lighten-2"
	                    icon="mdi-delete"
	                  ></v-btn>
	                </v-card-actions>

	                <v-expand-transition>
	                  <div v-show="show">
	                    <v-divider></v-divider>

	                    <v-card-text>
	                      {{hotel.description}}
	                    </v-card-text>
	                  </div>
	                </v-expand-transition>
	              </v-card>
	            </div>
	          </v-col>
	        </v-row>
	        <v-dialog v-model="dialog" width="50%">
	          <v-card>
	          	<v-card-title class="text-center">Detail sur l'hotel {{ hotelById.nom_hotel }}</v-card-title>
	            <v-card-text>
	              <v-form @submit.prevent="editProfil" class="px-5" ref="form"> 
	                <v-row>
	                  <v-col col="12" sm="6">
	                    <v-text-field readonly v-model="nom" label="Nom d'hotel" outlined dense color="blue" autocomplete="false"></v-text-field>
	                  </v-col>
	                  <v-col col="12" sm="6">
	                    <v-text-field readonly v-model="adresse" label="Adresse(entrer le nom de la ville)" outlined dense color="blue" autocomplete="false"></v-text-field>
	                  </v-col>
	                </v-row>
	                <v-row>
	                  <v-col col="12" sm="6">
	                    <v-text-field readonly v-model="contact" label="Numero de telephone" outlined dense color="blue" autocomplete="false"></v-text-field>
	                  </v-col>
	                  <v-col col="12" sm="6">
	                    <v-text-field readonly v-model="nif" label="Numero d'identification fiscale(NIF)" outlined dense color="blue" autocomplete="false"></v-text-field>
	                  </v-col>
	                </v-row>
	                <v-textarea readonly
	                  v-model="description"
	                  label="Description"
	                  append-icon="mdi-comment"
	                ></v-textarea>
	                <v-text-field readonly v-model="email" label="Adresse email" outlined dense color="blue" autocomplete="false"></v-text-field>
	                <v-card-actions>
	                  <div class="text-center">
	                     <v-btn
	                      @click="dialog = false"
	                      class="text-white mt-2"
	                      style="background-color:orange;"
	                      >
	                        Fermer
	                      </v-btn>
	                  </div>
	                </v-card-actions>
	              </v-form>
	            </v-card-text>
	          </v-card>
	        </v-dialog>
      	</v-main>
    </v-app>
</template>

<script>
import adminSidebar from '../../components/admin/Sidebar.vue'
import { mapGetters, mapActions } from 'vuex'

export default{
	name: 'AdminHotel',
	data(){
		return{
			search:"",
			dialog:false,
			nom: "",
			adresse:"",
			contact:"",
			description:"",
			nif:"",
			email:""
		}
	},
	components:{
		adminSidebar,
	},
	computed:{
		...mapGetters({
	      hotels: 'hotel/allHotel',
	      hotelById: 'hotel/hotelById'
	    }),
	    filterHotel(){
	      return this.hotels?.filter((hotel) => {
	        if(hotel.nom_hotel.toLowerCase().includes(this.search.toLowerCase()) || 
	          hotel.adresse_hotel.toLowerCase().includes(this.search.toLowerCase())){
	          return true
	        }
	      })
	    },
	},
	methods:{
	    ...mapActions({
	      getHotels:'hotel/getHotels',
	      getHotelById: 'hotel/getHotelById',
	      deleteHotel: 'hotel/deleteHotel'
	    }),
	    async detail(id){
	    	await this.getHotelById(id)	
	    	this.dialog = true
	    	this.nom = this.hotelById.nom_hotel
			this.adresse = this.hotelById.adresse_hotel
			this.contact = this.hotelById.contact_hotel
			this.description = this.hotelById.description
			this.nif = this.hotelById.nif_hotel
			this.email = this.hotelById.email_hotel
	    }
	},
    created(){
    	this.getHotels()
    }
}
</script>