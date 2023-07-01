<template>
    <v-app>
      <Header :items="items"/>
      <v-main>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10">
            <v-card class="elevation-2 mt-10">
              <v-windows v-model="step">
                <v-windows-item :value="1">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-card-text class="mt-8">
                        <h2 class="text-center mb-3">Connexion</h2>
                        <h4 class="text-center text-grey">Veuillez vous connecter pour pouvoir continuer
                          <br> et d'acceder dans votre espace personnel
                        </h4>
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
                            @click="step++">S'inscrire</v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-windows-item>
              </v-windows>
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  
  export default {
    name: 'Connexion',
    components:{
      Header,
    },
    data: () => ({
        step: 1,
      	items : [{
            title:"Accueil",
            route:"/"
        }]
    }),
  }
  </script>