<template>
  <v-app>
    <v-main>
      <HeaderUser/>
      <v-row class="ms-5">
          <v-col v-for="hotel in hotels" cols="12" sm="4">
            <div >
              <v-card
                class="mx-5 mx-sm-2 mt-15"
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
  import { mapState } from 'vuex'
  import axios from 'axios'
  import HeaderUser from '@/components/User/Header'

export default {
  name: 'UserIndex',
  computed:{
    ...mapState([
      'user',
      'isLogin'
    ])
  },
  data(){
    return{
      show: false,
      hotels: null
    }
  },
  components:{
    HeaderUser
  },
  methods:{
    async getHotel(){
      const response = await axios.get("http://localhost:8081/hotel")
      this.hotels = response.data
    },
  },
  mounted(){
    if(!this.isLogin){
      this.$route.push('/connexion')
    }
    this.getHotel()
  }

}
</script>
