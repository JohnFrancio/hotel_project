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
                            <v-form @submit.prevent="submitLogin" ref="form1">
                              <v-text-field v-model="email" :rules="emailRules" label="Email" outlined dense color="blue" autocomplete="false" class="mt-8"></v-text-field>   
                              <v-text-field v-model="password" label="Mot de passe" type="password" outlined dense color="blue" autocomplete="false"></v-text-field>
                              <v-row>
                                <v-col cols="12">
                                  <h5 v-if="loginErr" class="text-red text-center">Email ou Mot de passe invalide.</h5>
                                  <v-btn
                                    @click="submitLogin"
                                    block
                                    title
                                    class="text-white mt-3"
                                    style="background-color:#0862a0;"
                                  >
                                    Connexion
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-form>
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
  <!-- windows for inscription -->
                    <v-col cols="12" sm="6">
                      <v-card-text class="mt-8">
                        <h2 class="text-center mb-3">Inscription</h2>
                        <h5 v-if="existEmail" class="text-red text-center">Email deja enregistrer avec un utilisateur</h5>
                        <h3 class="text-center text-grey">S'inscrire en tant que: <span @click="clientInscri" class="text-grey yeah">Client</span> / <span @click="hotelInscri" class="text-grey yeah">Hotel</span></h3>
  <!-- //inscription en tant que client -->
                        <v-row v-if="clientIn" align="center" justify="center">
                          <v-col cols="12" sm="8"> 
                            <v-form @submit.prevent="submitUserInscri" ref="form2">  
                              <v-text-field :rules="nameRules" v-model="nom_user_inscri" label="Nom complet" color="blue" autocomplete="false" class="mt-8"></v-text-field>   
                              <v-text-field :rules="emailRules" v-model="email_user_inscri" label="Adresse email" color="blue" autocomplete="false"></v-text-field>
                              <v-row>
                                <v-col cols="12" sm="6">
                                  <v-text-field :rules="contactRules" v-model="contact_user_inscri" label="Contact" color="blue" autocomplete="false"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-file-input :rules="[v => !!v || 'Profil requis.']" accept="image/*" v:model="profil_pic" label="Photo de Profile"></v-file-input>
                                </v-col>
                              </v-row>
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
                              <v-text-field v-model="nom_hotel" label="Nom de l'hotel" color="blue" autocomplete="false" class="mt-8"></v-text-field>   
                              <v-text-field v-model="adresse" label="Adresse de l'hotel" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field v-model="nif" label="Numero d'identification fiscale (NIF)" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field v-model="email_hotel_inscri" :rules="emailRules" label="Adresse email" color="blue" autocomplete="false"></v-text-field>
                              <v-row>
                                <v-col cols="12" sm="6">
                                  <v-text-field :rules="contactRules" outlined v-model="contact_hotel_inscri" label="Contact" color="blue" autocomplete="false"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-file-input accept="image/*" v:model="hotel_pic" label="Photo de Profile"></v-file-input>
                                </v-col>
                              </v-row>
                              <v-text-field type="password" v-model="mdp_hotel_inscri" label="Mot de passe" color="blue" autocomplete="false"></v-text-field>
                              <v-text-field type="password" v-model="mdp2_hotel_inscri" :rules="[() => mdp_hotel_inscri === mdp2_hotel_inscri || 'Mot de passe invalide.']" label="Confirmation du mot de passe" color="blue" autocomplete="false"></v-text-field>
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
  // import { mapActions } from 'vuex';
  
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
        nom_hotel:"",
        email_hotel_inscri:"",
        contact_hotel_inscri:"",
        mdp_hotel_inscri:"",
        mdp2_hotel_inscri:"",
        adresse:"",
        nif:"",
        profil_pic:"",
        hotel_pic:"",
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
        }],
        existEmail: false,
        email:"",
        password:"",
        loginErr:false
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
      // submit client singUp inscription
      async submitUserInscri(){
        const isValid = await this.$refs.form2.validate();
        if(isValid.valid){
          axios.post("http://localhost:8081/user",{
            nom_user: this.nom_user_inscri,
            email_user: this.email_user_inscri,
            contact_user: this.contact_user_inscri,
            mdp_user: this.mdp2_user_inscri,
            img_user: this.profil_pic
          }).then((response)=>{
            console.log(response)
            if(response.data){
              this.existEmail = !this.existEmail
              if(this.existEmail){
                setTimeout(() => {
                  this.existEmail = !this.existEmail
                }, 3000)
              this.mdp2_user_inscri = ""
              this.contact_user_inscri = ""
              this.email_user_inscri = ""
              this.nom_user_inscri = ""
              this.mdp_user_inscri = ""
              this.profil_pic = ""
              } 
            }else{
              this.$router.push({ name:'Connexion', query:{ redirect:'/connexion'}})
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      },
      // submit signUp hotel inscription
      async submitHotelInscri(){
        const isValid = await this.$refs.form3.validate();
        if(isValid.valid){
          axios.post("http://localhost:8081/hotel",{
            nom_hotel: this.nom_hotel,
            adresse_hotel: this.adresse,
            nif_hotel: this.nif,
            email_hotel: this.email_hotel_inscri,
            contact_hotel: this.contact_hotel_inscri,
            mdp_hotel: this.mdp2_hotel_inscri,
            img_hotel: this.hotel_pic
          }).then((response)=>{
            const type = typeof response.data
            console.log(response.data)
            if(type == "string"){
              this.existEmail = !this.existEmail
              if(this.existEmail){
                setTimeout(() => {
                  this.existEmail = !this.existEmail
                }, 3000)
              } 
              this.adresse=""
              this.nif=""
              this.mdp2_hotel_inscri = ""
              this.contact_hotel_inscri = ""
              this.email_hotel_inscri = ""
              this.nom_hotel_inscri = ""
              this.mdp_hotel_inscri = ""
              this.hotel_pic = ""
            }else{
              this.$router.push({ name:'Connexion', query:{ redirect:'/connexion'}})
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      },
// submit login connexion signIn
      async submitLogin(){
        const isValid = await this.$refs.form1.validate();
        if(isValid.valid){
          axios.post("http://localhost:8081/auth",{
            email: this.email,
            password: this.password,
          }).then((response)=>{
            const type = typeof response.data
            if(type == "string"){
              this.loginErr = !this.loginErr
              if(this.loginErr){
                setTimeout(() => {
                  this.loginErr = !this.loginErr
                }, 3000)
              this.email = ""
              this.password = ""
              } 
            }else{
              const role = response.data.role
              if(response.data.role == "user"){
                const user = response.data.user
                const token = response.data.token
                this.$store.dispatch('setToken', { token, user })
                this.$router.push('/user/index')
              }else{
                const user = response.data.user
                const token = response.data.token
                this.$store.dispatch('setToken', { token, user })
                this.$router.push('/hotel')
              }
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      }  
    }
  }
  </script>