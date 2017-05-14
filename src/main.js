// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// fecth polyfill
import 'whatwg-fetch';

Vue.config.productionTip = false;

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
