<template>
	<v-app>
		<adminSidebar/>
      	<v-main class="my-5 mx-10">
      		<v-row justify="end">
		        <v-col cols="12" sm="4"> 
		          <v-text-field outlined label="Chercher un avis par hotel/client/date de publication" append-icon="mdi-calendar-search" v-model="search"></v-text-field>
		        </v-col>
		      </v-row>
      		<h2 class="mb-5 text-grey">Avis</h2>
      		<v-row class="mt-3">
                <v-col cols="12" sm="6" v-for="avis in filterAvis">
                  <v-card
                    prepend-icon="mdi-comment"
                  >
                    <template v-slot:title> Avis donner par {{ avis.nom_user }} </template>
                    <v-divider></v-divider>
                    <v-card-title>
                      <v-icon
                        color="#949cf7"
                        icon="mdi-calendar"
                        width="100"
                      ></v-icon>
                      <span class="me-16 text-medium-emphasis text-subtitle-2">{{ (avis.date_avis) }}</span>
                      <span class="ms-16"></span>
                      <span class="ms-16"></span>
                      <span class="ms-10"></span>
                      <v-avatar
                        class="ms-16"
                        :image="`data:image/png;base64,${avis.img_user}`"
                        size="small"
                      ></v-avatar>
                      <p class="text-center text-subtitle-2">Pour l'hotel {{ avis.nom_hotel }}</p>
                      <v-divider></v-divider>
                      <v-card-text class="text-center">
                        {{ avis.avis }}
                      </v-card-text>
                      <v-card-action>
                        <v-btn color="red-lighten-1" @click="deleteAvis(avis.id_avis)" variant="text" prepend-icon="mdi-delete">Supprimer</v-btn>
                      </v-card-action>
                    </v-card-title>
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
	name: 'AdminAvis',
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
			avis: 'avis/avis'
		}),
		filterAvis(){
	      return this.avis?.filter((avis) => {
	        if(avis.date_avis.toLowerCase().includes(this.search.toLowerCase()) || 
	          avis.nom_user.toLowerCase().includes(this.search.toLowerCase()) || avis.nom_hotel.toLowerCase().includes(this.search.toLowerCase())){
	          return true
	        }
	      })
	    }
	},
	methods:{
		...mapActions({
			getAvis: 'avis/getAvis',
			deleteAvis: 'avis/deleteAvis'
		})
	},
	created(){
		this.getAvis()
	}
}
</script>