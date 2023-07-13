<template>
  <v-app>
    <v-main>
      <Header/>
      <div v-for="dat in data" class="mt-5">
          <img style="height:25%px; width: 100%;" :src="`data:image/png;base64,${dat.img_hotel}`">
          <v-card
              v-if="seeAdress"
              class="mx-auto my-10"
              max-width="500"
            >
            <div style="height:400px; width:800px">
              <l-map
                style="height: 95%; width: 100%"
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
          <v-card
              v-if="!seeAdress"
              class="mx-auto my-10"
              max-width="500"
            >
            <div class="text-center text-red">
              <h1>Erreur lors de la recherche d'adresse</h1>
            </div>
          </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>
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
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [47.413220, -1.219482],
      seeAdress: true,
      seeError: true,
      data:null,
      lat: null,
      log: null,
      zoom: 24,
    };
  },
  methods:{
    async getSingleHotel(id){
      const response = await axios.get(`http://localhost:8081/hotel/${id}`)
      this.data = response.data
      for(let dat of this.data){
        const myArray = dat.adresse_hotel.split(" ");
        const entry = myArray.join('+')
        try{
          const response_latlon = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${entry}`)
          const result = response_latlon.data
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
          this.seeError = !this.seeError
        }catch(err){
          this.seeError = !this.seeError
        }
      }
    }
  },
  mounted(){
    // this.getLatLon()
    this.getSingleHotel(this.$route.params.id)
  }
};
</script>
