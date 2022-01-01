import Vue from 'vue'
import VueRouter from 'vue-router'
import detail from './components/Detail.vue'
import Home from './components/Home.vue'
import Read from './components/Read.vue'
import BookManagment from "./components/Adm/BookManagment.vue";
import Category from "./components/Category.vue";
import DetailCategory from "./components/DetailCategory.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/detail', component: detail },
        { path: '/read', component: Read },
        { path: '/Category', component: Category },
        { path: '/Category/detail', component: DetailCategory },

        //User
        {path: '/login', component: Login},
        {path: '/signup', component: Signup},

        // Adm  
        { path: '/Adm/BookManagment', component: BookManagment },
        
    ]
})