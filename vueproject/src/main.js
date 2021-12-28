import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import VueCookies from 'vue-cookies';
import CKEditor from 'ckeditor4-vue';
Vue.use(VueCookies, CKEditor)
Vue.config.productionTip = false

new Vue({
    // render: h => h(App),
    router,
    render: h => h(App)
}).$mount('#app')