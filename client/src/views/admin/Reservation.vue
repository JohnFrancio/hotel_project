<template>
	<v-app>
		<adminSidebar/>
      	<v-main class="my-5 mx-10">
      		<v-row justify="end">
		        <v-col cols="12" sm="4"> 
		          <v-text-field outlined label="Chercher un date" append-icon="mdi-calendar-search" v-model="search"></v-text-field>
		        </v-col>
		      </v-row>
      		<h2 class="mb-5 text-grey">Reservation</h2>
      		<v-table v-if="countReservation !== 0" class="mb-5">
		        <thead>
		          <th>Nom du client</th>
		          <th>Nom de l'hotel</th>
		          <th>Debut de sejour</th>
		          <th>Fin de sejour</th>
		          <th>Reserver le</th>
		          <th>Identifiant du chambre</th>
		          <th>Action</th>
		        </thead>
		        <tbody  class="text-center">
		          <tr v-for="res in filterReservation">
		            <td>{{ res.nom_user }}</td>
		            <td>{{ res.nom_hotel }}</td>
		            <td>{{ res.reserver_pour }}</td>
		            <td>{{ res.nbr_jour }}</td>
		            <td>{{ res.date_reservation }}</td>
		            <td>{{ res.id_chambre }}</td>
		            <v-btn v-if="res.paye == 'non'" class="mt-1 text-white" color="red-lighten-2" variant="text">Non payé</v-btn>
		            <v-btn v-if="res.paye !== 'non'" class="mt-2 text-white" color="green-lighten-2" variant="text">Deja Payé</v-btn>
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
			reservation: 'reservation/reservation'
		}),
		filterReservation(){
	      return this.reservation?.filter((res) => {
	        if(res.reserver_pour.toLowerCase().includes(this.search.toLowerCase()) || 
	          res.nbr_jour.toLowerCase().includes(this.search.toLowerCase()) || res.date_reservation.toLowerCase().includes(this.search.toLowerCase())){
	          return true
	        }
	      })
	    }
	},
	methods:{
		...mapActions({
			getAllReservation: 'reservation/getAllReservation'
		})
	},
	created(){
		this.getAllReservation()
	}
}
</script>