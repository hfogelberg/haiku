import VueRouter from 'vue-router';
import Auth from './components/Auth.vue';
import Haiku from './components/Haiku.vue';
import Admin from './components/Admin.vue';
import Contact from './components/Contact.vue';
import About from './components/About.vue';
import Edit from './components/Edit.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Haiku},
    { path: '/auth', component: Auth },
    { path: '/admin', component: Admin},
    { path: '/contact', component: Contact},
    { path: '/about', component: About},
    { path: '/edit', component: Edit}
  ],
});

export default router;
