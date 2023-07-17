import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { store } from './stores/store.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'leaflet/dist/leaflet.css';

loadFonts()

createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(router)
  .use(vuetify)
  .mount('#app')
