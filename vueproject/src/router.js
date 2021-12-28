import Vue from 'vue'
import VueRouter from 'vue-router'
import detail from './components/Detail.vue'
import Home from './components/Home.vue'
import Read from './components/Read.vue'
import BookManagment from "./components/Adm/BookManagment.vue";

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/detail', component: detail },
        { path: '/read', component: Read },
        // Adm  
        { path: '/Adm/BookManagment', component: BookManagment },
    ]
})