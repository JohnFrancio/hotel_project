<template>
  <v-app>
    <v-main>
      <HeaderHotel/>
      <h2 class="text-center text-grey mt-9">Espace personne de l'hotel {{ profils.nom_hotel }}</h2>
      <v-row class="ms-sm-2 px-3 mt-3 text-grey">
        <v-col cols="12" sm="6">
          <h3>Nom: {{profils.nom_hotel}}</h3>
          <h3>Adresse: {{profils.adresse_hotel}}</h3>
          <h3>Contact: {{profils.contact_hotel}}</h3>
        </v-col>
        <v-col cols="12" sm="6">
          <h3>Membre depuis: {{ profils.date_hotel }}</h3>
          <h3>Nombre de chambre present dans le profile: {{ countRoom }}</h3>
          <h3>Nombre de photo present dans le profile: {{ countPic }}</h3>
        </v-col>
      </v-row>
      <v-row class="ms-sm-2 px-3 mt-3 mb-5">
        <v-col cols="12" sm="6">
          <v-img
            :src="`data:image/png;base64,${profils.img_hotel}`"
            height="450"
            cover
          >            
          </v-img>
          <v-btn
            class="text-white me-7"
            @click="dialog = true"
            color="#0862a0"
          >
          <v-icon
            icon="mdi-pencil"
            width="100"
          ></v-icon>
            Modifier
          </v-btn>
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
      <v-dialog v-model="dialog" width="50%">
          <v-card>
            <v-card-text>
              <v-form @submit.prevent="editProfil" class="px-5" ref="form"> 
                <v-row>
                  <v-col col="12" sm="6">
                    <v-text-field v-model="nom" :rules="[(nom.length == 0) ? 'Nom requis.' : true]" label="Nom d'hotel" outlined dense color="blue" autocomplete="false"></v-text-field>
                  </v-col>
                  <v-col col="12" sm="6">
                    <v-text-field v-model="adresse" :rules="[(adresse.length == 0) ? 'Adresse requis.' : true]" label="Adresse(entrer le nom de la ville)" outlined dense color="blue" autocomplete="false"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="12" sm="6">
                    <v-text-field v-model="contact" :rules="contactRules" label="Contact de l'hotel" outlined dense color="blue" autocomplete="false"></v-text-field>
                  </v-col>
                  <v-col col="12" sm="6">
                    <v-text-field v-model="nif" :rules="nifRules" label="Numero d'identification fiscale(NIF)" outlined dense color="blue" autocomplete="false"></v-text-field>
                  </v-col>
                </v-row>
                <v-file-input accept="image/*" :rules="[v => (v==false) ? 'Photo requis' : true]" @change="imgProfil" label="Photo de l'hotel"></v-file-input>
                <v-textarea
                  :rules="[(description.length == 0) ? 'Description requis.' : true]"
                  v-model="description"
                  label="Description"
                  append-icon="mdi-comment"
                ></v-textarea>
                <v-card-actions>
                  <div class="text-center">
                      <v-btn
                        @click="editProfil"
                        class="text-white mt-3 mx-5"
                        style="background-color:#0862a0;"
                        >
                        Modifier
                      </v-btn>
                     <v-btn
                      @click="dialog = false"
                      class="text-white mt-3"
                      style="background-color:orange;"
                      >
                        Close
                      </v-btn>
                  </div>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import "leaflet/dist/leaflet.css";
import leaflet from 'leaflet'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import HeaderHotel from '@/components/hotel/Header'
import { LMap, LTileLayer,  LMarker } from "@vue-leaflet/vue-leaflet";

export default {
  name: 'HotelProfil',
  computed:{
    ...mapGetters({
      profils: 'getProfil',
      countRoom: 'room/countRoom',
      countPic: 'pic/countPics'
    })
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    HeaderHotel
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [47.413220, -1.219482],
      seeAdress: true,
      seeError: true,
      lat: null,
      log: null,
      zoom: 24,
      dialog: false,
      id:"",
      nom:"",
      adresse:"",
      nif:"",
      img:null,
      description:"",
      contact:"",
      contactRules: [
        value => {
          if (value?.length == 10  && /[0-9-]+/.test(value)) return true

        return 'Le numero de contact doit avoir 10 chiffres.'
        }
      ],
      nifRules: [
          value => {
            if (value?.length > 3  && /[0-9-]+/.test(value)) {return true}

            return 'Le NIF doit etre un nombre et requis.'
          }
        ],
    }
  },
  methods:{
    imgProfil(event){
      this.img = event.target.files[0]
    },
    async getLatLon(){
      this.id = this.profils.id_hotel
      this.nom=this.profils.nom_hotel
      this.adresse=this.profils.adresse_hotel
      this.nif=this.profils.nif_hotel
      this.description=this.profils.description
      this.contact=this.profils.contact_hotel
      const myArray =this.profils.adresse_hotel.split(" ");
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
    },
    async editProfil(){
      const isValide = await this.$refs.form.validate()
      if(isValide){
        let form = new FormData()
        form.append("nom_hotel", this.nom)
        form.append("adresse_hotel", this.adresse)
        form.append("nif_hotel", this.nif)
        form.append("contact_hotel", this.contact)
        form.append("description", this.description)
        form.append("img_hotel", this.img)
        const credentials = {
          form,
          id: this.id
        }
        const response = await this.update(credentials)
        if(response != undefined){
            this.dialog = false
          }else{
            alert("Errer lors de la modification.")
          }
      }
    },
    ...mapActions({
      update: 'updateHotel'
    }),
  },
  created(){
    this.getLatLon()
  }
}
</script>
