import Vue from 'vue'
import App from './App.vue'
import Axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from 'vue-router';

// Components
import AppsComponent from './components/AppsComponents';
import LoginComponent from './components/Auth/LoginComponent'
import PaymentComponent from './components/PaymentComponent';
import TicketsComponent from './components/TicketsComponent';

// import TicketsIndexComponent from './components/Tickets/IndexComponent';
// import TicketsClosedComponent from './components/Tickets/ClosedComponent'

const helper = require('./resources/helper');

Vue.use(VueAxios, Axios);
Vue.use(VueRouter);
Vue.mixin(helper)

const token  = localStorage.getItem('token');

if(token) { Vue.prototype.$http.defaults.headers.common['Authorization'] }

Axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false;

const routes = [
    { path: '/', component: TicketsComponent, alias: ['/tickets', '/tickets/closed', '/tickets/my-new', '/tickets/unanswered'], meta: { auth: true, admin: false }},
    { path: '/apps', component: AppsComponent, alias: ['/apps/system', '/apps/by-user', '/apps/support', '/tickets/others'], meta: { auth: true, admin: false } },
    { path: '/auth/login', component: LoginComponent, meta: { guest: true } },
    { path: '/payment', component: PaymentComponent, meta: { auth: true, admin: true } }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.auth)){
         // if(localStorage.getItem('token') == null){
         //     next({
         //         path: '/auth/login',
         //         query: { redirect_to: (to.path === '/' || to.path === '') ? 'tickets' : to.path.replace('/', '') }
         //     });
         // }else{
         //     let user = JSON.parse(localStorage.getItem('user'));
         //     if(to.matched.some(record => record.meta.admin)) {
         //         if(user.is_admin){
         //             next();
         //         }else{
         //             next({
         //                 path: '/error/404'
         //             });
         //         }
         //     }else{
         //         // next({
         //         //     path: '/error/404'
         //         // });
         //     }
         // }

        let user = JSON.parse(localStorage.getItem('user'));
        if(user !== null || user !== '') {
            if (to.matched.some(record => record.meta.admin)) {
                if (user.is_admin) {
                    next();
                } else {
                    next({
                        path: '/error/404'
                    });
                }
            }
        }else{
            next({
                to: {
                    path: '/auth/login'
                }
            })
        }
    }

    next();
});

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
