<template>
    <v-app>
      <Header :items="items"/>
      <v-main>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10">
            <v-card class="elevation-2 mt-10">
              <v-window v-model="step">
                <v-window-item :value="2">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-card-text class="mt-8">
                        <h2 class="text-center mb-3">Connexion</h2>
                        <h4 class="text-center text-grey">Veuillez vous connecter pour pouvoir continuer
                          <br> et d'acceder dans votre espace personnel
                        </h4>
  <!-- //connexion -->
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">   
                            <v-text-field label="Email" outlined dense color="blue" autocomplete="false" class="mt-8"></v-text-field>   
                            <v-text-field label="Mot de passe" type="password" outlined dense color="blue" autocomplete="false"></v-text-field>
                            <v-row>
                              <v-col cols="12">
                                <span class="caption text-blue">Mot de passe oublie</span>
                                <v-btn
                                  block
                                  title
                                  class="text-white mt-3"
                                  style="background-color:#0862a0;"
                                >
                                  Connexion
                                </v-btn>
                                <h5 class="text-center text-grey mt-4 mb-3">Ou connectez vous avec</h5>
                                <div class="d-flex justify-space-between align-center mx-10 mb-10">
                                  <v-btn depressed outlined >
                                    <v-icon color="red">mdi-google</v-icon>
                                  </v-btn>
                                  <v-btn depressed outlined >
                                    <v-icon color="blue">mdi-facebook</v-icon>
                                  </v-btn>
                                  <v-btn depressed outlined>
                                    <v-icon >mdi-github</v-icon>
                                  </v-btn>
                                </div>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-col>
                    <v-col style="background-color:#0862a0; border-radius:0 0 0 60%;" cols="12" sm="6">
                      <div style="text-aling:center; padding: 180px 0;">
                        <v-card-text class="text-white">
                          <h3 class="text-center">Vous n'avez pas encore de compte?</h3>
                          <h5 class="text-center">
                            Allons creer votre compte pour obtenir votre espace personnel 
                            <br> et y acceder quand/où vous voulez
                          </h5>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn 
                            outlined
                            border
                            color="#0862a0"
                            class="text-white"
                            @click="step--">S'inscrire</v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col style="background-color:#0862a0; border-radius:0 0 60% 0;" cols="12" sm="6">
                      <div  style="text-align:center; padding: 180px 0;">
                        <v-card-text class="text-white">
                          <h3 class="text-center">Vous avez deja un compte?</h3>
                          <h5 class="text-center">
                            Venez entrer vos informations pour votre connexion
                            <br> et acceder a votre espace personnel
                          </h5>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn 
                            outlined
                            border
                            color="#0862a0"
                            class="text-white"
                            @click="step++">Connexion</v-btn>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-card-text class="mt-8">
                        <h2 class="text-center mb-3">Inscription</h2>
                        <h4 class="text-center text-grey">S'inscrire en tant que: <span @click="clientInscri" class="text-grey yeah">Client</span> / <span @click="hotelInscri" class="text-grey yeah">Hotel</span></h4>
  <!-- //inscription en tant que client -->
                        <v-row v-if="clientIn" align="center" justify="center">
                          <v-col cols="12" sm="8"> 
                            <v-form @submit.prevent="submitUserInscri" ref="form2">  
                              <v-text-field :rules="nameRules" v-model="nom_user_inscri" label="Nom complet" color="blue" autocomplete="false" class="mt-8"></v-text-field>   
                              <v-text-field :rules="emailRules" v-model="email_user_inscri" label="Adresse email" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field :rules="contactRules" v-model="contact_user_inscri" label="Contact" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field v-model="mdp_user_inscri" type="password" label="Mot de passe" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field :rules="[() => mdp_user_inscri === mdp2_user_inscri || 'Mot de passe invalide.']" v-model="mdp2_user_inscri" type="password" label="Confirmation du mot de passe" color="blue" autocomplete="false"></v-text-field>
                              <v-row>
                                <v-col cols="12">
                                  <v-btn
                                    @click="submitUserInscri"
                                    block
                                    title
                                    class="text-white mt-3"
                                    style="background-color:#0862a0;"
                                  >
                                    Envoyer
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-form>
                          </v-col>
                        </v-row>
  <!-- inscription en tant qu'hotel -->
                        <v-row v-if="hotelIn" align="center" justify="center">
                          <v-col cols="12" sm="8"> 
                            <v-form @submit.prevent="submitHotelInscri" ref="form3">  
                              <v-text-field :rules="nameHotel" v-model="nom_hotel_incri" label="Nom de l'hotel" color="blue" autocomplete="false" class="mt-8"></v-text-field>   
                              <v-text-field v-model="adresse" label="Adresse de l'hotel" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field v-model="nif" label="Numero d'identification fiscale (NIF)" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field v-model="email_hotel_inscri" :rules="emailRules" label="Adresse email" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field v-model="contact_hotel_inscri" :rules="contactRules" label="Contact" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field v-model="mdp_hotel_inscri" label="Mot de passe" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field v-model="mdp2_hotel_inscri" :rules="[() => mdp_hotel_inscri === mdp2_hotel_inscri || 'Mot de passe invalide.']" label="Confirmation du mot de passe" color="blue" autocomplete="false"></v-text-field>
                              <v-row>
                                <v-col cols="12">
                                  <span class="caption text-blue"></span>
                                  <v-btn
                                    @click="submitHotelInscri"
                                    block
                                    title
                                    class="text-white mt-3"
                                    style="background-color:#0862a0;"
                                  >
                                  Envoyer
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-form>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import axios from 'axios'
  
  export default {
    name: 'Connexion',
    components:{
      Header,
    },
    data: () => ({
        nom_user_inscri:"",
        email_user_inscri:"",
        contact_user_inscri:"",
        mdp_user_inscri:"",
        mdp2_user_inscri:"",
        nom_hotel_inscri:"",
        email_hotel_inscri:"",
        contact_hotel_inscri:"",
        mdp_hotel_inscri:"",
        mdp2_hotel_inscri:"",
        adresse:"",
        nif:"",
        nameHotel:[
          value => {
            if (value) return true

            return 'Le nom est requis.'
          }],
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
        emailRules: [
          value => {
            if (value) return true

            return 'L\'email est requis.'
          },
          value => {
            if (/.+@.+\..+/.test(value)) return true

            return 'L\'email est invalide.'
          }],
        step: 1,
        clientIn:true,
        hotelIn:false,
      	items : [{
            title:"Accueil",
            route:"/"
        }]
    }),
    methods:{
      clientInscri(){
        this.clientIn = true
        this.hotelIn = (this.hotelIn) ? false : false
      },
      hotelInscri(){
        this.hotelIn = !this.hotelIn
        this.clientIn = !this.clientIn
      },
      async submitUserInscri(){
        const isValid = await this.$refs.form2.validate();
        if(isValid.valid){
          axios.post("http://localhost:8081/user",{
            nom_user: this.nom_user_inscri,
            email_user: this.email_user_inscri,
            contact_user: this.contact_user_inscri,
            mdp_user: this.mdp2_user_inscri
          }).then((response)=>{
            console.log(response)
          }).catch((err)=>{
            console.log(err)
          })
        }
        this.mdp2_user_inscri = ""
        this.contact_user_inscri = ""
        this.email_user_inscri = ""
        this.nom_user_inscri = ""
        this.mdp_user_inscri = ""
      },
      async submitHotelInscri(){
        const isValid = await this.$refs.form3.validate();
        if(isValid.valid){
          axios.post("http://localhost:8081/hotel",{
            nom_hotel: this.nom_hotel_inscri,
            adresse_hotel: this.adresse,
            nif_hotel: this.nif,
            email_hotel: this.email_hotel_inscri,
            contact_hotel: this.contact_hotel_inscri,
            mdp_hotel: this.mdp2_hotel_inscri
          }).then((response)=>{
            console.log(response)
          }).catch((err)=>{
            console.log(err)
          })
        }
        this.adresse=""
        this.nif=""
        this.mdp2_hotel_inscri = ""
        this.contact_hotel_inscri = ""
        this.email_hotel_inscri = ""
        this.nom_hotel_inscri = ""
        this.mdp_hotel_inscri = ""
      }
    }
  }
  </script>
  <style scooped>
  .yeah{
    cursor: pointer;
  }
  .yeah#hover{
    color: red;
  }
  </style>