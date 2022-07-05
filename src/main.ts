import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue';
import router from './router';
import '../index.css';
import dotenv from 'dotenv';

dotenv.config();

const pinia = createPinia();
pinia.use(createPersistedState());

export default createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');

