<template>
  <v-app>
    <v-main>
      <HeaderUser/>
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
            <v-form @submit.prevent="reserver" class="px-5" ref="form">
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
      <div class="d-sm-flex mt-15">
        <v-slider label="Nombre de personne:" style="width:100%;" v-model="persRange" :min="0" :max="4" :step="1" thumb-label></v-slider>
        <v-slider label="Nombre de lit 1place:" style="width:100%;" v-model="unlitRange" :min="-1" :max="4" :step="1" thumb-label></v-slider>
        <v-slider label="Nombre de lit 2places:" style="width:100%;" v-model="deuxlitRange" :min="-1" :max="4" :step="1" thumb-label></v-slider>
      </div>
      <h2 class="ms-10">Nos chambres: </h2>
      <v-row align="center" justify="center" class="ms-sm-3" v-if="filterRoom">
        <v-col v-if="filterRoom.length != 0" v-for="(cham ,index) in filterRoom" :key="index" cols="12" sm="3">
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
      <div class="text-center mt-3" v-if="filterRoom">
        <h2  v-if="filterRoom.length == 0" class="mt-3 text-grey">Aucune chambre correspondante au recherche</h2>
      </div>
      <v-row justify="end">
        <v-col cols="12" sm="4">
          <v-text-field variant="outlined" append-icon="mdi-home-search" label="Chercher un hotel/adresse" class="me-16" v-model="search"></v-text-field>
        </v-col>
      </v-row>
      <h2 class="ms-10">Nos hotels:</h2>
      <v-row align="center" justify="center">
          <v-col v-for="hotel in filterHotel" class="mb-5" cols="12" sm="3">
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
            <div class="text-center mt-3" v-if="filterHotel.length == 0">
              <h2 class="mt-3 text-grey">Aucun hotel correspondant au recherche</h2>
            </div>
          </v-col>
        </v-row>
        <div class="text-center" v-if="filterHotel">
          <h2 v-if="filterHotel.length == 0">Aucun hotel correspondant au recherche</h2>
        </div>
      <v-snackbar
          :timeout="3000"
          color="success"
          v-model="success"
        >
          Reservation effectuer avec <strong>succes</strong>.
        </v-snackbar>
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
      rooms: 'room/getAllRooms',
      singleRoom: 'room/getRoomReserve',
      getProfil: 'getProfil'
    }),
    filterHotel(){
      return this.hotels?.filter((hotel) => {
        if(hotel.nom_hotel.toLowerCase().includes(this.search.toLowerCase()) || 
          hotel.adresse_hotel.toLowerCase().includes(this.search.toLowerCase())){
          return true
        }
      })
    },
    filterRoom(){
      return this.rooms?.filter((room) => {
        if(room.nbr_pers.includes(this.persRange) || room.nbr_lit1.includes(this.unlitRange) ||
          room.nbr_lit2.includes(this.deuxlitRange)){
          return true
        }
      })
    }
  },
  data(){
    return{
      persRange: 2,
      unlitRange: 0,
      deuxlitRange: 0,
      success: false,
      error:false,
      dateValue: null,
      search:"",
      dialog: false,
      show: false
    }
  },
  components:{
    HeaderUser,
  },
  methods:{
    ...mapActions({
      getHotels:'hotel/getHotels',
      getAllRooms: 'room/getAllRoomsFromBack',
      getRoomReserve: 'room/getRoomReserve'
    }),
    async getCham(id){
      await this.getRoomReserve(id)
      this.dialog=true
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
          this.success = true
        }
      }
    }
  },
  async created(){
    await this.getAllRooms()
    await this.getHotels()
  }

}
</script>
