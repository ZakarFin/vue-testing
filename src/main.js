// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';
import App from './App';
import routes from './routes';
import store from './store';
// fecth polyfill
import 'whatwg-fetch';

Vue.use(Router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    router: new Router({
        routes
    }),
    store,
    template: '<App/>',
    components: { App }
});
