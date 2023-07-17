<template>
	<v-app>
	    <v-main>
	      <HeaderHotel/>
	      <div class="mt-6 px-5 py-3">
	      	<div class="text-end">
		      	<v-btn class="me-4" @click="dialog = true">
			      	<v-icon
		            icon="mdi-plus-thick"
		            width="100"
		          ></v-icon>
		        	Chambre
		      	</v-btn>
		      	<v-btn @click="dialog2 = true">
			      	<v-icon
		            icon="mdi-image-plus"
		            width="100"
		          ></v-icon>
		        	Photo
		      	</v-btn>
	      	</div>
	      </div>
      	<h2 class="ms-10 text-grey">Vos chambres:</h2>
	      <v-row align="center" justify="center" class="ms-sm-3 mt-3">
          <v-col v-for="(cham ,index) in room"  cols="12" sm="3">
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

			          <span class="text-medium-emphasis text-caption">{{ (cham.date_chambre) }}</span>
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

					    <v-card-actions>
					      <v-btn 
					      	class="me-7"
					      	@click="edit(index, cham.id_chambre)"
					        color="orange-lighten-2"
					        variant="text"
					      >
					      <v-icon
			            icon="mdi-pencil"
			            width="100"
			          ></v-icon>
					        Modifier
					      </v-btn>
					      <v-btn 
					      	@click="deleteRoom(cham.id_chambre)"
					        color="red-lighten-2"
					        variant="text"
					      >
					      <v-icon
			            icon="mdi-delete"
			            width="100"
			          ></v-icon>
					        Supprimer
					      </v-btn>
					    </v-card-actions>
					  </v-card>
	        </v-col>
	      </v-row>
	      <h2 class="ms-10 text-grey">Vos images:</h2>
	      <v-row align="center" justify="center" class="ms-sm-3 mt-3 mb-5">
          <v-col v-for="(pic ,index) in pics"  cols="12" sm="3">
	      		<v-card
					    class="mx-auto"
					    max-width="344"
					  >
					    <v-img
					      :src="`data:image/png;base64,${pic.img}`"
					      height="200px"
					      cover
					    ></v-img>
					    <v-card-actions>
					      <v-btn 
					      	@click="deletePic(pic.id_img)"
					        color="red-lighten-2"
					        variant="text"
					      >
					      <v-icon
			            icon="mdi-delete"
			            width="100"
			          ></v-icon>
					        Supprimer
					      </v-btn>
					    </v-card-actions>
					  </v-card>
					</v-col>
				</v-row>
	      <v-dialog v-model="dialog2" width="50%">
	      	<v-card>
	      		<v-card-text>
              <v-form @submit.prevent="addImg" class="px-5" ref="form2"> 
                  <v-file-input accept="image/*" multiple :rules="[v => (v==false) ? 'Image illustrant l\'hotel requis.' : true]" @change="imgHotel" label="Image illustrant l'hotel"></v-file-input>
              	<v-card-actions>
              		<div class="text-center">
              			<v-btn
                        @click="addImg"
                        class="text-white mt-3 mx-5"
                        style="background-color:#0862a0;"
                        >
                        Envoyer
                      </v-btn>
                     <v-btn
                      @click="closeAddImg"
                      class="text-white mt-3"
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
	      <v-dialog v-model="dialog" width="50%">
	      	<v-card>
	      		<v-card-text>
              <v-form @submit.prevent="addRoom" class="px-5" ref="form"> 
              	<h3 class="text-center mb-3" >Ajout d'une chambre pour {{ user.nom_hotel }}</h3>
              	<v-divider class="mb-3"></v-divider>
              	<h4>Le nombre de personne: <br>
              		<v-radio-group inline :rules="[(this.nbr_pers == 0) ? 'Choisir une personne' : true]" v-model="nbr_pers">
              			<v-radio label="1 Personne" value="1"></v-radio>
              			<v-radio label="2 Personnes" value="2"></v-radio>
              			<v-radio label="4 Personnes" value="4"></v-radio>
              			<v-radio label="6 Personnes" value="6"></v-radio>
              		</v-radio-group>
              	</h4>
              	<h4>Le nombre de lit 1 place: <br>
              		<v-radio-group inline v-model="nbr_lit1">
              			<v-radio label="1 lit" value="1"></v-radio>
              			<v-radio label="2 lits" value="2"></v-radio>
              			<v-radio label="4 lits" value="4"></v-radio>
              		</v-radio-group>
              	</h4> 
              	<h4>Le nombre de lit 2 places: <br>
              		<v-radio-group inline v-model="nbr_lit2">
              			<v-radio label="1 lit" value="1"></v-radio>
              			<v-radio label="2 lits" value="2"></v-radio>
              			<v-radio label="4 lits" value="4"></v-radio>
              		</v-radio-group>
              	</h4>
              	<h4>Le nombre de douche: <br>
              		<v-radio-group inline :rules="[(this.nbr_douche == 0) ? 'Choisir une personne' : true]" v-model="nbr_douche">
              			<v-radio label="1 douche" value="1"></v-radio>
              			<v-radio label="2 douches" value="2"></v-radio>
              		</v-radio-group>
              	</h4>
              	<h4>Le nombre de television: <br>
              		<v-radio-group inline v-model="nbr_tele">
              			<v-radio label="1 television" value="1"></v-radio>
              			<v-radio label="2 televisions" value="2"></v-radio>
              		</v-radio-group>
              	</h4>  
              	<v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field :rules="priceRules" outlined v-model="prix" label="Prix" color="blue" autocomplete="false"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-file-input accept="image/*" :rules="[v => (v==false) ? 'Image du chambre requis' : true]" @change="roomImg" label="Photo de la chambre"></v-file-input>
                    </v-col>
                 </v-row>
              	<v-card-actions>
              		<div class="text-center">
              			<v-btn
              					v-if="add == true"
                        @click="addRoom"
                        class="text-white mt-3 mx-5"
                        style="background-color:#0862a0;"
                        >
                        Envoyer
                      </v-btn>
                      <v-btn
              					v-if="add == false"
                        @click="editRoom"
                        class="text-white mt-3 mx-5"
                        style="background-color:#0862a0;"
                        >
                        Modifier
                      </v-btn>
                     <v-btn
                      @click="closeAddRoom"
                      class="text-white mt-3"
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
import axios from 'axios'
import HeaderHotel from '@/components/hotel/Header'
import { mapState, mapGetters, mapActions } from 'vuex'
export default{
	name: 'HotelIndex',
	computed:{
		...mapState(['user']),
		...mapGetters({
			profil: 'getProfil',
			room:'room/allRoom',
			pics:'pic/allPics'
		})
	},
	data (){
		return{
			img_hotel: null,
			add:true,
			id_chambre: null,
			nbr_pers: 0,
			nbr_lit1: 0,
			nbr_lit2: 0,
			nbr_douche: 0,
			nbr_tele: 0,
			dialog: false,
			dialog2: false,
			prix: null,
			priceRules: [
		      value => {
		        if (value?.length > 1  && /[0-9-]+/.test(value)) {return true}

		      	return 'Le prix doit etre un nombre et requis.'
		      }
		    ],
		  img_chambre: null,
		}
	},
	components:{
		HeaderHotel,
	},
	methods:{
			imgHotel(event){
				this.img_hotel = event.target.files
			},
      roomImg(event){
        this.img_chambre = event.target.files[0]
      },
      async addImg(){
      	const isValid = await this.$refs.form2.validate();
        if(isValid.valid){
	      	let form = new FormData()
	      	for(let i in this.img_hotel){
	      		form.append('image', this.img_hotel[i])
	      	}
	      	form.append('id_hotel', this.profil.id_hotel)
	      	const credentials = {
	      		form,
	      		id: this.profil.id_hotel
	      	}
	      	const response = await this.addPics(credentials)
	      	if(response != undefined){
	      		this.dialog2 = false
		      	this.img_hotel = null
		      }
	      }
      },
      async addRoom(){
      	const isValid = await this.$refs.form.validate();
        if(isValid.valid){
	      	let form = new FormData()
	      	form.append('nbr_pers', this.nbr_pers)
	      	form.append('nbr_lit1', this.nbr_lit1)
	      	form.append('nbr_lit2', this.nbr_lit2)
	      	form.append('nbr_douche', this.nbr_douche)
	      	form.append('nbr_tele', this.nbr_tele)
	      	form.append('prix', this.prix)
	      	form.append('img_chambre', this.img_chambre)
	      	form.append('id_hotel', this.profil.id_hotel)
	      	const credentials = {
	      		form,
	      		id: this.profil[0].id_hotel
	      	}
	      	const response = await this.addRooms(credentials)
	      	console.log(response)
	      	if(response != undefined){
	      		this.dialog = false
		      	this.nbr_pers = 0
						this.nbr_lit1 = 0
						this.nbr_lit2 = 0
						this.nbr_douche = 0
						this.nbr_tele = 0
						this.prix = null
			    	this.img_chambre = null
	      	}else{
	      		alert("Taille de la photo trop grande.")
	      	}
	    	}
      },
      closeAddImg(){
      	this.dialog2 = false
				this.img_hotel= null
      },
      closeAddRoom(){
      	this.add = true
      	this.dialog = false
      	this.nbr_pers = 0
				this.nbr_lit1 = 0
				this.nbr_lit2 = 0
				this.nbr_douche = 0
				this.nbr_tele = 0
				this.prix = null
		    this.img_chambre = null
      },
      edit(index, id){
      	this.id_chambre = id
      	this.add = false
      	this.dialog = true
      	this.nbr_pers = this.room[index].nbr_pers
				this.nbr_lit1 = this.room[index].nbr_lit1
				this.nbr_lit2 = this.room[index].nbr_lit2
				this.nbr_douche = this.room[index].nbr_douche
				this.nbr_tele = this.room[index].nbr_tele
				this.prix = this.room[index].prix
      },
      async editRoom(){
      	const isValid = await this.$refs.form.validate();
        if(isValid.valid){
	      	let form = new FormData()
	      	form.append('nbr_pers', this.nbr_pers)
	      	form.append('nbr_lit1', this.nbr_lit1)
	      	form.append('nbr_lit2', this.nbr_lit2)
	      	form.append('nbr_douche', this.nbr_douche)
	      	form.append('nbr_tele', this.nbr_tele)
	      	form.append('prix', this.prix)
	      	form.append('img_chambre', this.img_chambre)
	      	const credentials = {
	      		form,
	      		id: this.id_chambre,
	      		id_hotel: this.profil[0].id_hotel
	      	}
	      	const response = await this.updateRoom(credentials)
	      	console.log(response)
	      	if(response != undefined){
	      		this.dialog = false
		      	this.nbr_pers = 0
						this.nbr_lit1 = 0
						this.nbr_lit2 = 0
						this.nbr_douche = 0
						this.nbr_tele = 0
						this.prix = null
			    	this.img_chambre = null
	      	}else{
	      		alert("Erreur lors de l'insertion.")
	      	}
				}
      },
      ...mapActions({
      	getRooms: 'room/getRooms',
      	addRooms: 'room/addRooms',
      	deleteRoom: 'room/deleteRoom',
      	updateRoom: 'room/updateRoom',
      	addPics: 'pic/addPics',
      	getPics: 'pic/getPics',
      	deletePic: 'pic/deletePic'
      })
    },
		created(){
			this.getRooms(this.profil.id_hotel)
			this.getPics(this.profil.id_hotel)
		}
}
	
</script>