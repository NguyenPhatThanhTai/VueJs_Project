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
import Author from "./components/Author.vue";
import DetailAuthor from "./components/DetailAuthor.vue";
import UserInfomation from "./components/UserInfomation.vue";
import AuthorManagment from "./components/Adm/AuthorManagment.vue";
import CategoryManagment from "./components/Adm/CategoryManagment.vue";
import PublisherManagment from "./components/Adm/PublisherManagment.vue";
import UserManagment from "./components/Adm/UserManagment.vue";
import LoginAdm from "./components/Adm/LoginAdm.vue";

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/detail', component: detail },
        { path: '/read', component: Read },
        { path: '/category', component: Category },
        { path: '/category/detail', component: DetailCategory },
        { path: '/author', component: Author },
        { path: '/author/detail', component: DetailAuthor },

        //User
        {path: '/login', component: Login},
        {path: '/signup', component: Signup},
        {path: '/user-infomation', component: UserInfomation},

        // Adm  
        { path: '/Adm/LoginAdm', component: LoginAdm },
        { path: '/Adm/BookManagment', component: BookManagment },
        { path: '/Adm/AuthorManagment', component: AuthorManagment },
        { path: '/Adm/CategoryManagment', component: CategoryManagment },
        { path: '/Adm/PublisherManagment', component: PublisherManagment },
        { path: '/Adm/UserManagment', component: UserManagment },
    ]
})