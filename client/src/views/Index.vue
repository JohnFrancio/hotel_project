<template>
  <v-app>
    <Header :items="items"/>
    <v-main  class="mx-5 mt-8">
      <v-card>
        <v-img
          style="border-radius=25px;"
          src="../assets/img/cover1.jpg"
          class="align-end"
          height="580px"
          cover
        >
          <VRow
            class=" mb-sm-16 text-white"
            justify="center"
            >
              <v-col
                class="mb-sm-16"
                md="7"
                lg="7"
                sm="12"
              >
              <p align="center" class="text-h4 text-md-h2 text-lg-h2">Bienvenue sur <span class="text-#0862a0" style="color:#0862a0;">HOTELINAO</span></p>
              <p align="center" class="text-h5 text-white text-md-h3 text-lg-h3 mb-3">Un site fait pour vous</p>
              <p align="center" class="mb-4 text-h6 font-weight-thin text-white">Venez explorer Madagascar et ces differents hotels avec nous. Trouvez selon vos gout, vos budget, vos horaires.
              Ensemble, cherchons l'hotel de vos reves</p>
              <div class="text-center">
                <router-link to="/connexion">
                  <v-btn
                    style="background-color:#0862a0;"
                    class="mr-sm-10 text-white"
                  >
                    Connexion
                    <v-icon class="ml-2" color="white">mdi-login</v-icon>
                  </v-btn>
                </router-link>
              </div>
              </v-col>
            </VRow>
        </v-img>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
// Components

export default defineComponent({
  name: "Index",
  data(){
    return{
      items : [{
          title:"Hotel",
          route:"hotel"
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      LogOut: 'LogOut',
      outRoom: 'room/LogOut',
      outPic: 'pic/LogOut',
      outHotel: 'hotel/LogOut',
      outReservation: 'reservation/LogOut',
      outAvis: 'avis/LogOut',
    })
  },
  components: {
    Header
  },
  created() {
    this.LogOut()
    this.outRoom()
    this.outPic()
    this.outHotel()
    this.outReservation()
    this.outAvis()
  },
  mounted() {
    this.LogOut()
    this.outRoom()
    this.outPic()
    this.outHotel()
    this.outReservation()
    this.outAvis()
  }
});
</script>
