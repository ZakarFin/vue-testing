
<template>
    <div class="jumbotron temperature">
          <h2>{{ msg }}</h2>
              <div class="row">
                  <div class="col-xs-4" v-for="sensor in values">
                      <div class="panel panel-default">
                        <div class="panel-body">
                            <small style="float:right;">
                                {{sensor.time}} 
                                <span v-if="sensor.fromLastUpdate > 15" class="glyphicon glyphicon-exclamation-sign"></span>
                                <span v-if="sensor.fromLastUpdate > 60" style="color:red" class="glyphicon glyphicon-exclamation-sign"></span>
                            </small>
                            <h3>{{sensor.value}}&deg;C </h3>
                        </div>
                        <div class="panel-footer">{{sensor.name}}</div>
                      </div>
                  </div>
              </div>
    </div>
</template>

<script>

import temperature from './temperatures';
import io from 'socket.io-client';
import moment from 'moment';

const VARASTO = 'Varasto';
const YLAKERTA = 'Yläkerta';
const TERASSI = 'Terassi';

var socket = null;

export default {
    name: 'temperature-overview',
    data () {
        return {
            msg: 'Lämpötila',
            values: [],
            sensors: [VARASTO, TERASSI, YLAKERTA]
        };
    },
    methods: {
        updateValues () {
            this.values = this.sensors.map((name) => {
                var data = temperature.getLatest(name);
                var latestTime = moment(data.time || moment(), 'hh:mm');
                return {
                    name,
                    fromLastUpdate: moment().diff(latestTime, 'minutes'),
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
            me.sensors.forEach((sensor) => {
                temperature.addReading(msg.time, sensor, msg[sensor]);
            });
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    padding: 0px;
    margin: 0px;
}

.jumbotron {
    padding: 10px;
}
/* We get sideways scrolls without this */
.row {
    margin-left: initial;
    margin-right: initial;
}
</style>
