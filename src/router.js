import VueRouter from 'vue-router';
import Auth from './components/Auth.vue';
import Haiku from './components/Haiku.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Haiku},
    { path: '/auth', component: Auth }
  ],
});

export default router;
