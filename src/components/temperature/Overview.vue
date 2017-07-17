
<template>
    <div class="nearstops">
        <h2>{{ msg }}</h2>
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{error}}</div>
        </div>
        <div class="row">
            <div class="col-sm-4" v-for="sensor in sensors">
                {{latest.time}} - {{sensor}}: {{latest.values[sensor]}}
                <hr />
                {{latest}}
            </div>
        </div>
    </div>
</template>

<script>

import temperature from './temperatures';
import io from 'socket.io-client';

// socket.emit('news', { hello: 'world' });
var socket = null;

const VARASTO = 'Varasto';
const YLAKERTA = 'Yläkerta';
const TERASSI = 'Terassi';

export default {
    name: 'temperature-overview',
    data () {
        return {
            msg: 'Lämpötila',
            error: '',
            latest: temperature.getLatest(),
            sensors: [VARASTO, YLAKERTA, TERASSI]
        };
    },
    watch: {
        latest () {
            return this.latest;
        }
    },
    created () {
        var me = this;
        var socket = io('http://10.0.0.14:3000');
        socket.on('temp', function (msg) {
            temperature.addReading(msg.time, VARASTO, msg[VARASTO]);
            temperature.addReading(msg.time, YLAKERTA, msg[YLAKERTA]);
            me.latest = temperature.addReading(msg.time, TERASSI, msg[TERASSI]);
        });
    },
    destroyed () {
        if (socket) {
            socket.disconnect();
        }
    }
};
</script>
