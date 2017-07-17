
<template>
    <div class="nearstops">
        <h2>{{ msg }}</h2>
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{error}}</div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <ul>
                    <li v-for="sensor in values">
                        {{sensor.time}} - {{sensor.name}}: {{sensor.value}}&deg;C
                    </li>
                </ul>
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
            values: [],
            sensors: [VARASTO, YLAKERTA, TERASSI]
        };
    },
    methods: {
        updateValues () {
            this.values = this.sensors.map((name) => {
                var data = temperature.getLatest(name);
                return {
                    name,
                    time: data.time,
                    value: data.value
                };
            });
        }
    },
    created () {
        var me = this;
        var socket = io('http://10.0.0.14:3000');
        socket.on('temp', function (msg) {
            temperature.addReading(msg.time, VARASTO, msg[VARASTO]);
            temperature.addReading(msg.time, YLAKERTA, msg[YLAKERTA]);
            temperature.addReading(msg.time, TERASSI, msg[TERASSI]);
            me.updateValues();
        });
    },
    destroyed () {
        if (socket) {
            socket.disconnect();
        }
    }
};
</script>
