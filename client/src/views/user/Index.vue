<template>
  <v-app>
    <v-main>
      <HeaderUser/>
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
      <h2 class="ms-10 mt-10">Nos chambres:</h2>
      <v-row align="center" justify="center" class="ms-sm-3">
        <v-col v-for="(cham ,index) in rooms"  cols="12" sm="3">
          <v-card
            class="mx-auto mt-5"
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

            <v-card-actions class="ms-16">
              <v-btn 
                class="ms-16"
                @click="edit(index, cham.id_chambre)"
                color="green-lighten-2"
                variant="text"
              >
              <v-icon
                icon="mdi-clipboard-check"
                width="100"
              ></v-icon>
                Reserver
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import axios from 'axios'
  import HeaderUser from '@/components/User/Header'

export default {
  name: 'UserIndex',
  computed:{
    ...mapState([
      'user',
    ]),
    ...mapGetters({
      hotels: 'hotel/allHotel',
      rooms: 'room/getAllRooms'
    })
  },
  data(){
    return{
      show: false
    }
  },
  components:{
    HeaderUser
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
  }

}
</script>
