<template>
	<v-app>
		<adminSidebar/>
      	<v-main class="my-5 mx-10">
      		<v-row justify="end">
		        <v-col cols="12" sm="4"> 
		          <v-text-field outlined label="Chercher une photo par hotel" append-icon="mdi-bed" v-model="search"></v-text-field>
		        </v-col>
		      </v-row>
      		<h2 class="mb-5 text-grey">Photo</h2>
  			<v-row align="center" justify="center" class="ms-sm-3 mt-3 mb-5">
		        <v-col v-for="(pic ,index) in filterPic"  cols="12" sm="3">
			  		<v-card
					    class="mx-auto"
					    max-width="344"
	    			>
				    <v-img
				      :src="`data:image/png;base64,${pic.img}`"
				      height="200px"
				      cover
				    ></v-img>
				    <v-card-text>Photo de l'hotel {{ pic.nom_hotel }}</v-card-text>
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
			getAllPic: 'pic/getAllPic'
		}),
		filterPic(){
	      return this.getAllPic.filter((pic) => {
	        if(pic.nom_hotel.toLowerCase().includes(this.search.toLowerCase())){
	          return true
	        }
	      })
	    },
	},
	methods:{
		...mapActions({
			getAllPics:'pic/getAllPics',
			deletePic: 'pic/deletePic'
		})
	},
	created(){
		this.getAllPics()
	}
}
</script>