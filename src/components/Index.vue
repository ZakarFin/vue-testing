
<template>
    <div class="home">
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{error}}</div>
        </div>
        <temperature-overview />
        <NearStops />
        <Lightlist />
    </div>
</template>
<script>
import {getApps} from '../routes';
import TemperatureOverview from '@/components/temperature/Overview';
import NearStops from '@/components/bus/NearStops';
import Lightlist from '@/components/lights/Lightlist';

export default {
    name: 'Index',
    data () {
        return {
            msg: 'Koti',
            apps: getApps(),
            error: ''
        };
    },
    components: { TemperatureOverview, NearStops, Lightlist }
};
</script>
