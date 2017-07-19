
<template>
    <div class="nearstops">
        <h2>{{ msg }}</h2>
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{error}}</div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <Bus stop="2133210" name="Pääskyskuja"/>
            </div>
            <div class="col-xs-6">
                <Bus stop="2133204" name="Turuntie"/>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '@/components/bus/Bus';

export default {
    name: 'NearStops',
    data () {
        return {
            msg: 'Lähibussit',
            error: ''
        };
    },
    components: { Bus }
};
</script>
