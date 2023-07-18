<template>
	<v-app>
		<adminSidebar/>
      	<v-main class="my-5 mx-10">
      		<v-row justify="end">
		        <v-col cols="12" sm="4"> 
		          <v-text-field outlined label="Chercher un client/contact" append-icon="mdi-account-search" v-model="search"></v-text-field>
		        </v-col>
		      </v-row>
      		<h2 class="mb-5 text-grey">Client</h2>
      		<v-row align="center" justify="center">
	          <v-col v-for="client in filterUser" cols="12" sm="4">
	            <div >
	              <v-card
	                class="mx-5 mx-sm-2 mt-5"
	                max-width="400"
	              >
	                <v-img
	                  :src="'data:image/png;base64,'+client.img_user"
	                  height="200px"
	                  cover
	                ></v-img>
	                <v-card-title>
	                  {{client.nom_user}}
	                </v-card-title>

	                <v-card-subtitle>
	                  Contact: {{client.contact_user}} <br>
	                  Email: {{client.email_user}} <br>
	                </v-card-subtitle>
	                <v-card-actions>
	                  <v-spacer></v-spacer>
	                  <v-btn
	                  	@click="deleteUser(client.id_user)"
	                  	color="red-lighten-2"
	                    prepend-icon="mdi-delete"
	                  >Supprimer</v-btn>
	                </v-card-actions>
	              </v-card>
	            </div>
	          </v-col>
	        </v-row>
      	</v-main>
    </v-app>
</template>

<script>
import adminSidebar from '../../components/admin/Sidebar.vue'
import { mapGetters, mapActions } from 'vuex'

export default{
	name: 'AdminClient',
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
	      allUser: 'user/allUser',
	      userById: 'user/userById'
	    }),
	    filterUser(){
	      return this.allUser?.filter((user) => {
	        if(user.nom_user.toLowerCase().includes(this.search.toLowerCase()) || 
	          user.contact_user.toLowerCase().includes(this.search.toLowerCase())){
	          return true
	        }
	      })
	    },
	},
	methods:{
		...mapActions({
			getUser: 'user/getUser',
			getUserById: 'user/getUserById',
			deleteUser: 'user/deleteUser'
		})
	},
	created(){
		this.getUser()
	}
}
</script>