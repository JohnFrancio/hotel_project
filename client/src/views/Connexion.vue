<template>
    <v-app>
      <Header :items="items"/>
      <v-main>

      </v-main>
    </v-app>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  
  export default {
    name: 'Connexion',
    components:{
      Header
    },
    data: () => ({
      	items : [{
            title:"Accueil",
            route:"/"
        }]
    }),
  }
  </script>