import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import the Vuex store

createApp(App)
  .use(router) // Use Vue Router
  .use(store) // Use Vuex store
  .mount('#app'); // Mount the Vue application to #app element in DOM


