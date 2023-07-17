<template>
  <v-app>
    <v-main>
      <HeaderUser/>
      <v-row class="ms-2 mt-8" justify="center">
        <v-col cols="12" sm="4">
          <v-img
            :src="`data:image/png;base64,${profils.img_user}`"
            width="300"
            height="300"
            :aspect-ration="1"
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
        <v-col cols="12" sm="4" class="text-grey">
          <h3 class="my-5">Nom complet: {{profils.nom_user}}</h3>
          <h3 class="my-5">Contact: {{profils.contact_user}}</h3>
          <h3 class="my-5">Adresse email: {{profils.email_user}}</h3>
          <h3 class="my-5">Membre depuis: {{profils.date_user}}</h3>
        </v-col>    
      </v-row>
      <h2 class="ms-10 my-3 text-grey">Vos reservations:</h2>
      <h2 v-if="countReservation==0" class="text-center mb-5">Aucune reservation pour l'instant</h2>
      <v-table v-if="countReservation !== 0" class="mb-5">
        <thead>
          <th>...</th>
          <th>Nom de l'hotel</th>
          <th>Adresse de l'hotel</th>
          <th>Debut de sejour</th>
          <th>Fin de sejour</th>
          <th>Reserver le</th>
          <th>Identifiant du chambre</th>
          <th>Action</th>
        </thead>
        <tbody  class="text-center">
          <tr v-for="res in reservation">
            <td><v-btn icon="mdi-delete" flat></v-btn></td>
            <td>{{ res.nom_hotel }}</td>
            <td>{{ res.adresse_hotel }}</td>
            <td>{{ res.reserver_pour }}</td>
            <td>{{ res.nbr_jour }}</td>
            <td>{{ res.date_reservation }}</td>
            <td>{{ res.id_chambre }}</td>
            <v-btn v-if="res.paye == 'non'" class="mt-1 text-white" color="orange-lighten-2">Payer</v-btn>
            <v-btn v-if="res.paye !== 'non'" class="mt-2 text-white" color="green-lighten-2" variant="text">Deja Payé</v-btn>
          </tr>
        </tbody>
      </v-table>
      <v-dialog v-model="dialog" width="50%">
          <v-card>
            <v-card-text>
              <v-form @submit.prevent="editProfil" class="px-5" ref="form"> 
                <v-text-field v-model="nom" :rules="nameRules" label="Nom complet" outlined dense color="blue" autocomplete="false"></v-text-field>
                <v-text-field v-model="contact" :rules="contactRules" label="Contact" outlined dense color="blue" autocomplete="false"></v-text-field>
                <v-file-input accept="image/*" :rules="[v => (v==false) ? 'Photo requis' : true]" @change="imgProfil" label="Photo de profil"></v-file-input>
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
                      color="orange-lighten-2"
                      >
                        Fermer
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
import HeaderUser from '@/components/User/Header'
import { LMap, LTileLayer,  LMarker } from "@vue-leaflet/vue-leaflet";

export default {
  name: 'UserProfil',
  computed:{
    ...mapGetters({
      profils: 'getProfil',
      reservation: 'reservation/reservation',
      countReservation: 'reservation/countReservation'
    })
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    HeaderUser
  },
  data() {
    return {
      dialog: false,
      id:"",
      nom:"",
      contact:"",
      img:null,
      nameRules: [
        value => {
          if (value) return true

          return 'Le nom est requis.'
        },
        value => {
          if (value?.length >= 10) return true

          return 'Le nom doit avoir au moins 10 caracteres.'
        }
      ],
      contactRules: [
        value => {
          if (value?.length == 10  && /[0-9-]+/.test(value)) return true

        return 'Le numero de contact doit avoir 10 chiffres.'
        }
      ],
    }
  },
  methods:{
    imgProfil(event){
      this.img = event.target.files[0]
    },
    async editProfil(){
      const isValide = await this.$refs.form.validate()
      if(isValide){
        let form = new FormData()
        form.append("nom_user", this.nom)
        form.append("contact_user", this.contact)
        form.append("img_user", this.img)
        const credentials = {
          form,
          id: this.id
        }
        const response = await this.update(credentials)
        if(response != undefined){
            this.dialog = false
            this.id = this.profils.id_user
            this.nom = this.profils.nom_user
            this.contact = this.profils.contact_user
            this.img_chambre = null
          }else{
            alert("Errer lors de la modification.")
          }
      }
    },
    ...mapActions({
      update: 'updateClient',
      getAllReservationUser: 'reservation/getAllReservationUser'
    }),
  },
  created(){
    this.id = this.profils.id_user
    this.nom = this.profils.nom_user
    this.contact = this.profils.contact_user
    this.getAllReservationUser(this.id)
  }
}
</script>
