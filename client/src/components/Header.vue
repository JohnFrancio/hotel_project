<template>
    <v-app-bar app class="px-5 py-3"
    >
          <v-img
            class="ml-5"
            src="../assets/img/h1_2.jpg"
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
            >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-btn>
          </template>

          <v-list>
                <v-list-item link
                    v-for="item in items"
                    :key="item.title"
                    :title="item.title"
                    :to="item.route"
                ></v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
<script>
export default {
    props: ['items'],
    data() {
        return {
            drawer: false,
        }
    }
}
</script>

<style scooped>
    .text-h6{
        color:#0862a0;
    }
</style>