<template>
  <v-app>
    <v-main>
      <Header/>
      <el-dialog v-model="dialog" height="50%" center="true" width="70%" title="Reservation d'une chambre">
        <v-row align="center">   
          <v-col cols="12" sm="6">
            <v-card
              height="450px"
            >
              <v-img
                :src="`data:image/png;base64,${singleRoom[0].img_chambre}`"
                height="200px"
                cover
              ></v-img>

              <v-card-title>
                <v-icon
                  color="#949cf7"
                  icon="mdi-calendar"
                  width="100"
                ></v-icon>

                <span class="text-medium-emphasis text-caption">{{ (singleRoom[0].date_chambre) }}</span>
                <v-spacer></v-spacer>
                <v-avatar
                  :image="`data:image/png;base64,${singleRoom[0].img_hotel}`"
                  size="x-small"
                ></v-avatar><span class="text-medium-emphasis text-caption">   Chambre de l'hotel {{ singleRoom[0].nom_hotel }}</span>
              </v-card-title>

              <v-card-subtitle>
                <v-btn flat class="px-5">
                  {{ singleRoom[0].nbr_pers }} 
                  <v-icon>mdi-account</v-icon>
                  Personne
                </v-btn><br>
                <v-btn flat class="px-5">
                  {{ singleRoom[0].nbr_lit1 }} 
                  <v-icon>mdi-bed</v-icon>
                  1 Place
                </v-btn>
                <v-btn flat class="px-5">
                  {{ singleRoom[0].nbr_lit2 }} 
                  <v-icon>mdi-bed</v-icon>
                  2 Places
                </v-btn> <br>
                <v-btn flat class="px-5">
                  {{ singleRoom[0].nbr_douche }} 
                  <v-icon>mdi-toilet</v-icon>
                  Douche
                </v-btn>  
                <v-btn flat class="px-5">
                  {{ singleRoom[0].nbr_tele }} 
                  <v-icon>mdi-television</v-icon>
                  TV
                </v-btn>
                <h2 class="mt-4 text-red">{{ singleRoom[0].prix.toLocaleString("en-US") }} Ar</h2>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" class="text-center">
            <v-form @submit.prevent="reserver" class="px-5" ref="form1">
              <h2 class="mb-5">Choisissez votre date</h2>
              <el-date-picker v-model="dateValue"
              type="daterange" range-separator="a" start-placeholder="Debut du sejour" end-placeholder="Fin du sejour"
              :size="default" /><br>
              <p v-if="error" class="text-red">Veuillez choisir une date</p>              
              <div class="text-center">
                <v-btn @click=" reserver(singleRoom[0].id_chambre)" class="text-white mt-3 mx-5" style="background-color:green;">
                  Reserver
                </v-btn>
                <v-btn @click="dialog = false" class="text-white mt-3" style="background-color:orange;">
                  Fermer
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </el-dialog>
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
      <div class="text-center">
        <v-btn append-icon="mdi-comment" @click="dialog2 = true" class="text-h6" color="#0862a0" variant="text">{{ countAvis }} Avis</v-btn>
      </div>
      <v-dialog v-model="dialog2" width="80%">
        <v-card>
          <v-card-text>
            <div align="center" justify="center" v-if="countAvis == 0">
              <h3>Auncun avis sur {{ hotel[0].nom_hotel }}</h3>
            </div>
            <div v-if="countAvis !== 0">
              <h3 class="text-center my-3"> Les avis sur {{ hotel[0].nom_hotel }}</h3>
              <v-divider></v-divider>
              <v-row class="mt-3">
                <v-col cols="12" sm="6" v-for="avis in avisHotel">
                  <v-card
                    prepend-icon="mdi-comment"
                  >
                    <template v-slot:title> Avis donner par {{ avis.nom_user }} </template>
                    <v-divider></v-divider>
                    <v-card-title>
                      <v-icon
                        color="#949cf7"
                        icon="mdi-calendar"
                        width="100"
                      ></v-icon>
                      <span class="me-16 text-medium-emphasis text-subtitle-2">{{ (avis.date_avis) }}</span>
                      <span class="ms-16"></span>
                      <span class="ms-16"></span>
                      <span class="ms-14"></span>
                      <v-avatar
                        class="ms-16"
                        :image="`data:image/png;base64,${avis.img_user}`"
                        size="small"
                      ></v-avatar>
                      <v-card-text class="text-center">
                        {{ avis.avis }}
                      </v-card-text>
                      <v-card-action v-if="avis.id_user == this.getProfil.id_user">
                        <v-btn color="red-lighten-1" @click="deleteAvis(avis.id_avis)" variant="text" icon="mdi-delete"></v-btn>
                      </v-card-action>
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
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
                @click="getCham(cham.id_chambre)"
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
      <h2 class="text-center my-5 text-grey">Laissez un commentaire</h2>
      <v-row justify="center">
        <v-col cols="12" class="px-sm-5" sm="6">
          <v-form @submit.prevent="addNewAvis" class="mb-5 text-center" ref="form2">
            <v-textarea
              :rules="[(avis.length == 0 || avis == '') ? 'Commentaire requis avant d\'envoyer.' : true]"
              v-model="avis"
              label="Votre commentaire"
              append-icon="mdi-comment"
            ></v-textarea>
            <p v-if="coms == true" class="text-green">Commentaire envoyer</p>
            <p v-if="coms == false" class="text-red">Erreur lors de l'envoye</p>
            <v-btn
                @click="addNewAvis"
                class="text-white me-10"
                style="background-color:#0862a0;"
                >
                Envoyer
            </v-btn>
            <v-btn
              @click="avis = ''"
              class="text-white"
              color="orange-lighten-2"
              >
                Effacer
              </v-btn>
          </v-form>
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
      hotel: 'hotel/hotelById',
      room:'room/allRoom',
      countPics: 'pic/countPics',
      singleRoom: 'room/getRoomReserve',
      pics: 'pic/allPics',
      getProfil: 'getProfil',
      avisHotel: 'avis/avisHotel',
      countAvis: 'avis/countAvis',
    })
  },
  data() {
    return {
      dialog2:false,
      center: [47.413220, -1.219482],
      seeAdress: true,
      seeError: true,
      lat: null,
      log: null,
      zoom: 24,
      error:false,
      dateValue: null,
      dialog:false,
      avis:"",
      test:null,
      coms: null
    };
  },
  methods:{
    ...mapActions({
      getHotelById: 'hotel/getHotelById',
      getPics: 'pic/getPics',
      getRooms: 'room/getRooms',
      getRoomReserve: 'room/getRoomReserve',
      addAvis: 'avis/addAvis',
      getAvisHotel: 'avis/getAvisHotel',
      deleteAvis: 'avis/deleteAvis'
    }),
    async getCham(id){
      await this.getRoomReserve(id)
      this.dialog=true
    },
    async getSingleHotel(id){
      const test = await this.getHotelById(id)
      for(let dat of test){
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
          this.seeError = false
        }catch(err){
          this.seeError = true
        }
      }
    },
    async addNewAvis(){
      const isValide = await this.$refs.form2.validate()
      if(isValide.valid){
        const credentials = {
          "id_user": this.getProfil.id_user,
          "id_hotel": this.hotel[0].id_hotel,
          "avis": this.avis,
        }
        const another = await this.addAvis(credentials)
        if(another == 0){
          this.getAvisHotel(this.$route.params.id)
          this.coms = true
          this.avis = ''
          setTimeout(() => this.coms = null, 3000)
        }else{
          this.avis = ''
          this.coms = false
          setTimeout(() => this.coms = null, 3000)
        }
      }else{
        this.avis=''
      }
    },
    async reserver(id) {
      const date = (date) => {
        return [
          date.getFullYear(),
          ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
          date.getDate(),
        ].join('-')
      }
      if(this.dateValue == null){
        this.error = true
        setTimeout(() => {
          return this.error = false
        }, 3000)
      }else{
        let form = new FormData()
        form.append('id_user', this.getProfil.id_user)
        form.append('id_chambre', id)
        form.append('reserver_le', this.dateValue[0])
        form.append('nbr_jour', this.dateValue[1])
        console.log(this.getProfil.id_user, id, this.dateValue[0], this.dateValue[1])
        const response = await axios.post('http://localhost:8081/reservation', {
          id_user: this.getProfil.id_user,
          id_chambre: id,
          reserver_pour: date(new Date(this.dateValue[0])),
          nbr_jour: date(new Date(this.dateValue[1]))
        })
        if(response.data.fieldCount == 0){
          this.dialog = false
          this.dateValue = null
        }
      }
    }
  },
  created(){
    this.getRooms(this.$route.params.id)
    this.getSingleHotel(this.$route.params.id)
    this.getPics(this.$route.params.id)
    this.getHotelById(this.$route.params.id)
    this.getAvisHotel(this.$route.params.id)
  }
};
</script>
