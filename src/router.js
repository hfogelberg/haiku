import VueRouter from 'vue-router';
import Auth from './components/Auth.vue';
import AuthSuccess from './components/AuthSuccess.vue';
import AddNote from './components/AddNote.vue'
import EditNote from './components/EditNote.vue'
import Note from './components/Note.vue'
import Notes from './components/Notes.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Auth},
    { path: '/auth', component: Auth },
    { path: '/success', component: AuthSuccess },
    { path: '/addtext', component: AddNote},
    { path: '/edit/:id', component: EditNote},
    { path: '/text/:id', component: Note},
    { path: '/texts', component: Notes}
  ],
});

export default router;
