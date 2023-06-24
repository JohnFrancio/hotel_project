<template>
    <v-app>
      <Header :items="items"/>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  
  export default {
    name: 'Hotel',
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
  