<template>
  <v-navigation-drawer
    permanent
    color="#0862a0"
    class="text-white"
  >
    <v-list>
      <v-list-item
        prepend-icon="mdi-account"
        :title="getProfil.nom_admin"
        :subtitle="getProfil.email_admin"
      ></v-list-item>
    </v-list>

    <v-divider color="white"></v-divider>

    <v-list density="compact" nav>
      <v-list-item link to="index" prepend-icon="mdi-view-dashboard" title="Tableau de bord"></v-list-item>
      <v-list-item link to="hotel" prepend-icon="mdi-home-city" title="Hotel"></v-list-item>
      <v-list-item link to="client" prepend-icon="mdi-account-group-outline" title="Client"></v-list-item>
      <v-list-item link to="reservation" prepend-icon="mdi-book" title="Reservation"></v-list-item>
      <v-list-item link to="paiement" prepend-icon="mdi-bitcoin" title="Paiement"></v-list-item>
      <v-list-item link to="avis" prepend-icon="mdi-comment-processing-outline" title="Avis"></v-list-item>
      <v-list-item link to="chambre" prepend-icon="mdi-bed" title="Chambre"></v-list-item>
      <v-list-item link to="image" prepend-icon="mdi-image" title="Photo"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar flat class="bg-blue">
  	<span class="mx-10 text-h5">Espace administrateur</span>
  	<v-spacer></v-spacer>
  	<v-btn prepend-icon="mdi-logout" @click="this.$router.push('/')">Deconnecter</v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
	computed:{
		...mapGetters({
			getProfil: 'getProfil'
		})
	}
}
</script>