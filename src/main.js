import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vClickOutside from "click-outside-vue3"
// SASS global
import './assets/styles/index.sass'
import './assets/styles/colors.sass'

createApp(App).use(router).use(store).use(vClickOutside).mount('#app')
