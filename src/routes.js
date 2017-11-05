
import Home from '@/components/Index';
import VDR from '@/components/vdr/VDR';
import NearStops from '@/components/bus/NearStops';
import LightListing from '@/components/lights/Lightlist';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/vdr',
        name: 'Digibox',
        component: VDR
    },
    {
        path: '/bus',
        name: 'Bussit',
        component: NearStops
    },
    {
        path: '/lights',
        name: 'Valot',
        component: LightListing
    }
];

export default routes;

export function getApps () {
    return routes.slice(1);
}
