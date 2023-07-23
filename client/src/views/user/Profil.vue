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
      <!-- info paiement -->
      <v-dialog v-if="onePaiement" v-model="dialog3" width="60%">
        <v-card height="500px">
          <v-row align="center">   
            <v-col cols="12" sm="6" class="text-center">
              <p class="text-start my-5 text-subtitle-1 mx-10">Identifiant chambre: {{ onePaiement.id_chambre }}</p>
              <p class="text-start my-5 text-subtitle-1 mx-10">Identifiant Paiement: {{ onePaiement.id_paiement }}</p>
              <p class="text-start my-5 text-subtitle-1 mx-10">Identifiant Reservation: {{ onePaiement.id_reservation}}</p>
              <p class="text-start my-5 text-subtitle-1 mx-10">Identifiant Prix Payé: {{ onePaiement.prix }}</p>
              <p class="text-start my-5 text-subtitle-1 mx-10">Reference du Paiement: {{ onePaiement.objectReference }}</p>
              <p class="text-start my-5 text-subtitle-1 mx-10">ServerCorrelationId du paiement: {{ onePaiement.serverCorrelationId }}</p>
              <div class="text-center">
                <v-btn @click="printPDF()" class="text-white mt-3 mx-5" style="background-color:green;">
                  Facture
                </v-btn>
                <v-btn @click="dialog3 = false" class="text-white mt-3" style="background-color:orange;">
                  Fermer
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card
                  class="mx-5"
                  flat
                  >
                    <v-img
                      :src="`data:image/png;base64,${onePaiement.img_chambre}`"
                      height="200px"
                      cover
                    ></v-img>

                    <v-card-title>
                      <v-icon
                        color="#949cf7"
                        icon="mdi-calendar"
                        width="100"
                      ></v-icon>

                      <span class="text-medium-emphasis text-caption">{{ (onePaiement.date_chambre) }}</span>
                      <v-spacer></v-spacer>
                      <v-avatar
                        :image="`data:image/png;base64,${onePaiement.img_hotel}`"
                        size="x-small"
                      ></v-avatar><span class="text-medium-emphasis text-caption">Chambre de l'hotel {{ onePaiement.nom_hotel }}</span>
                    </v-card-title>

                    <v-card-subtitle>
                      <v-btn flat class="px-5">
                        {{ onePaiement.nbr_pers }} 
                        <v-icon>mdi-account</v-icon>
                        Personne
                      </v-btn><br>
                      <v-btn flat class="px-5">
                        {{ onePaiement.nbr_lit1 }} 
                        <v-icon>mdi-bed</v-icon>
                        1 Place
                      </v-btn>
                      <v-btn flat class="px-5">
                        {{ onePaiement.nbr_lit2 }} 
                        <v-icon>mdi-bed</v-icon>
                        2 Places
                      </v-btn> <br>
                      <v-btn flat class="px-5">
                        {{ onePaiement.nbr_douche }} 
                        <v-icon>mdi-toilet</v-icon>
                        Douche
                      </v-btn>  
                      <v-btn flat class="px-5">
                        {{ onePaiement.nbr_tele }} 
                        <v-icon>mdi-television</v-icon>
                        TV
                      </v-btn>
                      <h2 class="mt-3 text-center text-red">{{ onePaiement.prix.toLocaleString("en-US") }} Ar</h2>
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
        </v-card>
      </v-dialog>

      <!-- //reservation -->
      <v-table v-if="countReservation !== 0" class="mb-5 mx-3">
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
        <tbody class="text-center">
          <tr v-for="res in reservation">
            <td><v-btn  v-if="res.paye != 'non'" @click="infoRef(res.id_reservation)" color="blue" icon="mdi-alert-circle" variant="text"></v-btn></td>
            <td>{{ res.nom_hotel }}</td>
            <td>{{ res.adresse_hotel }}</td>
            <td>{{ res.reserver_pour }}</td>
            <td>{{ res.nbr_jour }}</td>
            <td>{{ res.date_reservation }}</td>
            <td>{{ res.id_chambre }}</td>
            <v-btn @click="dialog2 = true" v-if="res.paye == 'non'" class="mt-1 text-green-darken-4 font-weight-bold" color="yellow"><v-img width="50" src="../../assets/Mvola.png"></v-img>Payer</v-btn>
            <v-btn v-if="res.paye !== 'non'" class="mt-2 text-white" color="green-lighten-2" variant="text">Deja Payé</v-btn>
            <!-- dialog pour effectuer un paiement -->
            <v-dialog v-model="dialog2" width="50%">
              <v-card class="my-5 rounded-5" color="#FFDE00">
                <v-card-title class="text-center my-3" justify="center">
                  <span class="text-h4 font-weight-bold text-green-darken-4">Payer avec</span>
                  <v-img class="mx-auto" width="150" src="../../assets/CEdwx6OVEAAfGzN.png"></v-img>
                </v-card-title>
                <v-form @submit.prevent="paiement" class="text-green-darken-4 px-16 py-5" ref="form2"> 
                  <v-text-field v-model="res.prix" label="Prix" color="green-darken-4" autocomplete="false"></v-text-field>
                  <v-text-field v-model="profils.contact_user" label="Contact" outlined dense color="green-darken-4" autocomplete="false" readonly></v-text-field>
                  <v-card-actions>
                    <div class="mx-auto">
                        <v-btn
                          @click="paiement(res.prix, profils.contact_user, res.id_reservation)"
                          class="text-white mt-3 me-5"
                          color="blue-darken-4"
                          variant="outlined"
                          >
                          Effectuer
                        </v-btn>
                       <v-btn
                        @click="dialog2 = false"
                        class="text-white mt-3"
                        color="red-darken-4"
                        variant="outlined"
                        >
                          Fermer
                        </v-btn>
                    </div>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </tr>
        </tbody>
      </v-table>
      <!-- modification du profil -->
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
        <v-snackbar
          :timeout="3000"
          color="success"
          v-model="successPaiement"
        >
          Votre transaction a été <strong>envoyer</strong>.
        </v-snackbar>
        <v-snackbar
          :timeout="3000"
          color="success"
          v-model="success"
        >
          Votre transaction a été un <strong>succes</strong>.
        </v-snackbar>
        <v-snackbar
          :timeout="3000"
          color="red"
          v-model="failed"
        >
          <strong>Erreur</strong> lors de votre transaction.
        </v-snackbar>
        <v-snackbar
          :timeout="3000"
          color="info"
          v-model="pending"
        >
          Votre transaction est en <strong>attente</strong>.
        </v-snackbar>
        <v-snackbar
          :timeout="3000"
          color="warning"
          v-model="warning"
        >
          Verifier votre <strong>connexion</strong> et <strong>ressayer</strong> ulterieurement.
        </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import HeaderUser from '@/components/User/Header'

export default {
  name: 'UserProfil',
  computed:{
    ...mapGetters({
      profils: 'getProfil',
      reservation: 'reservation/reservation',
      countReservation: 'reservation/countReservation',
      onePaiement: 'paiement/onePaiement'
    })
  },
  components: {
    HeaderUser
  },
  data() {
    return {
      success: false,
      warning: false,
      pending: false,
      successPaiement: false,
      failed: false,
      dialog: false,
      dialog2: false,
      dialog3:false,
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
    async printPDF(){
      require('jspdf-autotable');

      var doc = new jsPDF();

      // Company Information
      doc.setFontSize(18);
      doc.text(this.onePaiement.nom_hotel, 14, 15);
      doc.setFontSize(11);
      doc.text(this.onePaiement.adresse_hotel, 14, 20);
      doc.text('Lot 123', 14, 25);
      doc.text('Email: '+this.onePaiement.email_hotel, 14, 30);
      doc.text('Phone: '+this.onePaiement.contact_hotel, 14, 35);

      // Invoice Information
      doc.setFontSize(18);
      doc.text('Facture', 140, 15);
      doc.setFontSize(11);
      doc.text('Facture Numero: '+this.onePaiement.id_paiement, 140, 20);
      doc.text('Date: ' + new Date().toLocaleDateString(), 140, 25);
      doc.text('Reference de paiement: '+this.onePaiement.objectReference, 120, 65)
      doc.text('ServerCorrelationId: '+this.onePaiement.serverCorrelationId, 120, 70)

      // Customer Information
      doc.setFontSize(18);
      doc.setFontSize(11);
      doc.text('Facture Pour:'+this.onePaiement.nom_user, 14, 65);
      doc.text('Email: '+this.onePaiement.email_user, 14, 70);
      doc.text('Phone: '+this.onePaiement.contact_user, 14, 75);

      // Invoice Table
      doc.autoTable({
      head: [['#', 'Chambre', 'Nombre personne', 'Nombre de lit 1', 'Nombre de lit 2', 'Nombre de douche', 'Nombre de tele', 'Prix', 'Debut du sejour', 'Fin du sejour']],
      body: [
      [this.onePaiement.id_reservation, this.onePaiement.id_chambre , this.onePaiement.nbr_pers, this.onePaiement.nbr_lit1, this.onePaiement.nbr_lit2, this.onePaiement.nbr_douche, this.onePaiement.nbr_tele, this.onePaiement.prix, new Date(this.onePaiement.reserver_pour).toLocaleDateString(), new Date(this.onePaiement.nbr_jour).toLocaleDateString()],
      ],
      startY: 85
      });

      // Invoice Total
      doc.setFontSize(14);
      doc.text('Subtotal: '+this.onePaiement.prix+'Ar', 140, 130);
      doc.text('Total: '+this.onePaiement.prix+'Ar', 140, 135);

      // Terms and Conditions
      doc.setFontSize(11);
      doc.text('Termes et Conditions', 14, 150);
      doc.text('1. Confimer votre reservation en nous contactant 3j avant votre arriver', 14, 155);
      doc.text('2. La reservation est annulee apres 12h de retard', 14, 160);
      doc.text('3. Le serverCorrelationId c\'est pour reclamer votre reference de paiement', 14, 165);

      doc.save(this.onePaiement.nom_user+'_facture.pdf');
    },
    imgProfil(event){
      this.img = event.target.files[0]
    },
    async infoRef(id){
      const response = await this.updateRef(id)
      if(response == "completed"){
        this.dialog3 = true
        this.success = true
      }
      else if(response == "failed"){
        this.dialog3 = true
        this.failed = true
      }
      else if(response == "pending"){
        this.dialog3 = true
        this.pending = true
      } else{
        this.warning = true
      }
    },
    async paiement(prix, contact, id){
      const credentials = {
        prix: prix,
        contact_user: contact,
        id: id
      }
      const response = await this.addPay(credentials)
      if(response == 0){
        this.dialog2 = false
        this.successPaiement = true
      }else{
        this.dialog2 = false
        this.warning = true
      }
      this.getAllReservationUser(this.id)
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
      getAllReservationUser: 'reservation/getAllReservationUser',
      addPay: 'paiement/addPaiement',
      updateRef: 'paiement/updateRef'
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

<style>
  body {
    margin: 0.2em;
  }

  #logo {
    margin-top: 10px;
    
  }

  .container {
    margin-left: auto; 
    margin-right: auto;
  }

  h4 {
    font-color: #707070;
    font-weight: 450;
  }

  th {
    background-color: #EFEFEF;
    table-border: black;
    font-size: 14px;
    font-weight: 600;
    align-text: left;
  }
</style>