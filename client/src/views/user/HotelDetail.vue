<template>
  <v-app>
    <v-main>
      <Header/>
      <v-carousel v-if="countPics !== 0" class="mt-12" show-arrows="hover">
        <v-carousel-item
          v-for="(pic, index) in pics"
          :key="index"
          :src="`data:image/png;base64,${pic.img}`"
          cover
        >
        </v-carousel-item>
      </v-carousel>
      <h2 v-if="countPics == 0" class="mt-12 text-center">L'hotel n'a aucune photo a montrer</h2>
      <v-row class="ms-sm-2 px-3 mt-3 mb-3">
        <v-col cols="12" sm="6">
          <v-card
            height="100%"
            max-width="100%"
          >
            <v-img
              :src="`data:image/png;base64,${hotel[0]?.img_hotel}`"
              height="251px"
              cover
            ></v-img>
            <v-card-title>
              {{hotel[0]?.nom_hotel}}
            </v-card-title>

            <v-card-subtitle>
              Adresse: {{hotel[0]?.adresse_hotel}} <br>
              Contact: {{hotel[0]?.contact_hotel}} <br>
              Email: {{hotel[0]?.email_hotel}} <br>
            </v-card-subtitle>
            <v-card-text>
              {{hotel[0]?.description}}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card
              v-if="seeAdress"
              class="mx-auto"
              max-width="100%"
              height="450"
            >
            <div style="height:430px; width:800px">
              <l-map
                style="height: 100%; width: 100%"
                :zoom="zoom"
                :center="center"
              >
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>
                <l-marker :lat-lng="center" ></l-marker>
              </l-map>
              <div v-if="seeError" class="ms-16 text-red">
                <h4>Verifier votre connexion internet</h4>
              </div>
            </div>
          </v-card>
        </v-col>    
      </v-row>
      <h2 class="ms-10 text-grey">Chambre disponible:</h2>
      <v-row align="center" justify="center" class="ms-sm-3 mb-5">
        <v-col v-for="(cham ,index) in room"  cols="12" sm="3">
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
                {{ cham.nbr_pers }} 
                <v-icon>mdi-account</v-icon>
                Personne
              </v-btn><br>
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
import { mapGetters, mapActions } from 'vuex'
import "leaflet/dist/leaflet.css";
import leaflet from 'leaflet'
import axios from 'axios'
import Header from '@/components/User/Header'
import { LMap, LTileLayer,  LMarker } from "@vue-leaflet/vue-leaflet";

export default {
  name: 'HotelDetail',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    Header
  },
  computed:{
    ...mapGetters({
      // hotel: 'hotel/hotel',
      room:'room/allRoom',
      countPics: 'pic/countPics',
      pics: 'pic/allPics'
    })
  },
  data() {
    return {
      center: [47.413220, -1.219482],
      seeAdress: true,
      seeError: true,
      hotel: this.$store.state.hotel.singleHotel,
      lat: null,
      log: null,
      zoom: 24,
    };
  },
  methods:{
    ...mapActions({
      getHotelById: 'hotel/getHotelById',
      getPics: 'pic/getPics',
      getRooms: 'room/getRooms',
    }),
    async getSingleHotel(){
      for(let dat of this.$store.state.hotel.singleHotel){
        const myArray = dat.adresse_hotel.split(" ");
        const entry = myArray.join('+')
        try{
          const response_latlon = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${entry}`)
          const result = response_latlon.data
          // console.log(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${entry}`)
          if(result.length > 0){
            for(let res of result){
            this.lat = res.lat
            this.log = res.lon
            break
          }
            this.center = [this.lat, this.log]
          }else{
            this.seeAdress = !this.seeAdress
          }
          this.seeError = false
        }catch(err){
          this.seeError = true
        }
      }
    }
  },
  mounted(){
    this.getHotelById(this.$route.params.id)
    this.getRooms(this.$route.params.id)
    this.getPics(this.$route.params.id)
    this.getSingleHotel()
  },
  async created(){
    await this.getHotelById(this.$route.params.id)
    await this.getRooms(this.$route.params.id)
    await this.getSingleHotel()
    await this.getPics(this.$route.params.id)
  }
};
</script>
