import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate'
import VueCookies from "vue-cookies";
import App from './App.vue';
import router from './router';
import '../index.css';

const pinia = createPinia();
pinia.use(createPersistedState());

export default createApp(App)
    .use(pinia)
    .use(VueCookies)
    .use(router)
    .mount('#app');

