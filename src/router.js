import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import WeatherPage from './views/WeatherPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/weather', component: WeatherPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

