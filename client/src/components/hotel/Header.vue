<template>
    <v-app-bar app class="px-5 py-3"
    >
          <v-img
            @click="this.$router.push('/hotel/index')"
            class="ml-5"
            src="../../assets/img/h1_2.jpg"
            max-height="60"
            max-width="30"
            ></v-img>
        <v-spacer></v-spacer>
        <v-menu
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-account"
            >
            </v-btn>
          </template>

          <v-list>
                <v-list-item link
                    title="Profil"
                    to="profil"
                ></v-list-item>
                <v-list-item link
                    title="Deconnecter"
                    @click="this.$router.push('/')"
                ></v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import store from '../../stores/store'
export default {  
    computed: {
        user(){
            return this.$store.state.user
        }
    },
}
</script>
