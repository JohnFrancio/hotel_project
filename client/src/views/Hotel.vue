<template>
    <v-app>
      <Header :items="items"/>
      <v-main>
        <h2 class="ms-10 mt-10">Nos hotels:</h2>
      <v-row align="center" justify="center">
          <v-col v-for="hotel in hotels" cols="12" sm="3">
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
                    @click="this.$router.push('/user/hotel/detail/'+hotel.id_hotel)"
                    color="orange"
                    variant="text"
                  >
                    Voir Details
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn
                    :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="show = !show"
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
      </v-main>
    </v-app>
  </template>
  
  <script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Header from '../components/Header.vue';
import axios from 'axios'
export default {
  name: 'Hotel',
  computed:{
    ...mapState([
      'user',
      'isLogin'
    ]),
    ...mapGetters({
      hotels: 'hotel/allHotel',
      rooms: 'room/getAllRooms'
    })
  },
  methods:{
    ...mapActions({
      getHotels:'hotel/getHotels',
      getAllRooms: 'room/getAllRooms'
    })
  },
  created(){
    this.getHotels()
    this.getAllRooms()
  },
  components:{
    Header
  },
  data: () => ({
    show:false,
    items: [{
      title:"Accueil",
      route:"/"
    }]
  }),
}
  </script>
  