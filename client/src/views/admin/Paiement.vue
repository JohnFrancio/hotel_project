<template>
	<v-app>
		<adminSidebar/>
      	<v-main class="my-5 mx-10">
      		<v-row justify="end">
		        <v-col cols="12" sm="4"> 
		          <v-text-field variant="outlined" label="Chercher un paiement par user/hotel/date" append-icon="mdi-bitcoin" v-model="search"></v-text-field>
		        </v-col>
		      </v-row>
      		<h2 class="mb-5 text-grey">Paiement</h2>
      		<v-table class="mb-5">
		        <thead>
		          <th>Id paiement</th>
		          <th>Id reservation</th>
		          <th>serverCorrelationId</th>
		          <th>objectReference</th>
		          <th>Action</th>
		        </thead>
		        <tbody  class="text-center">
		          <tr v-for="res in filterPaiement">
		            <td>{{ res.id_paiement }}</td>
		            <td>{{ res.id_reservation }}</td>
		            <td>{{ res.serverCorrelationId }}</td>
		            <td>{{ res.objectReference }}</td>
		            <v-btn @click="deletePaiement(res.id_paiement)" class="mt-2 text-white" prepend-icon="mdi-delete" color="red-lighten-2" variant="text"></v-btn>
		          </tr>
		        </tbody>
		     </v-table>
      	</v-main>
    </v-app>
</template>

<script>
import adminSidebar from '../../components/admin/Sidebar.vue'
import { mapGetters, mapActions } from 'vuex'
export default{
	name: 'AdminReservation',
	data(){
		return{
			search:""
		}
	},
	components:{
		adminSidebar,
	},
	computed:{
		...mapGetters({
			allPaiement: 'paiement/allPaiement',
		}),
		filterPaiement(){
	      return this.allPaiement?.filter((res) => {
	        if(res.nom_user.toLowerCase().includes(this.search.toLowerCase()) || 
	          res.nom_hotel.toLowerCase().includes(this.search.toLowerCase()) || res.date_reservation.toLowerCase().includes(this.search.toLowerCase())){
	          return true
	        }
	      })
	    }
	},
	methods:{
		...mapActions({
			deletePaiement: 'paiement/deletePaiement',
			getAllPaiement: 'paiement/getAllPaiement'
		})
	},
	async created(){
		await this.getAllPaiement()
	}
}
</script>