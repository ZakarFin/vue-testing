
<template>
    <div class="home">
        <h2>{{ msg }}</h2>
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{error}}</div>
        </div>
        <div class="row">
            <div class="col-md-3" v-for="app in apps">
                <router-link :to="app.path">{{ app.name }}</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import {getApps} from '../routes';

export default {
    name: 'Index',
    data () {
        return {
            msg: 'Koti',
            apps: getApps(),
            error: ''
        };
    }
};
</script>
