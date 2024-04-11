import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import './style.css';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App);

app.use(PrimeVue);
app.use(pinia)
app.mount('#app');
