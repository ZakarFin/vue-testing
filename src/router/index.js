import Vue from 'vue';
import Router from 'vue-router';
import VDR from '@/components/VDR';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: VDR
        }
    ]
});
