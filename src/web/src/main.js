import Vue from 'vue'
import App from './App.vue'
import Axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from 'vue-router';

// Components
import LoginComponent from './components/Auth/LoginComponent'
import PaymentComponent from './components/PaymentComponent';
import TicketsComponent from './components/TicketsComponent';

Vue.use(VueAxios, Axios);
Vue.use(VueRouter);

const token  = localStorage.getItem('token');

if(token) { Vue.prototype.$http.defaults.headers.common['Authorization'] }

Axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false;

const routes = [
    { path: '/', component: TicketsComponent },
    { path: '/auth/login', component: LoginComponent },
    { path: '/tickets', component: TicketsComponent },
    { path: '/payment', component: PaymentComponent}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
