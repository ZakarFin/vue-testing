<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Bussit
                <span v-if="loading"><Spinner style="float:right;"/></span>
                <span v-if="!loading">{{stopName}}</span>
            </h3>
        </div>
        <div class="panel-body">
            <div v-if="error">
                <div class="alert alert-danger" role="alert">{{error}}</div>
            </div>

            <ul class="list-group">
              <li v-for="bus in busses" class="list-group-item">
                  <b>{{ bus.line }}</b> {{ bus.until }} ({{ bus.time }})<br/>
                  {{ bus.info }}
              </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner';
import moment from 'moment';
moment.locale('fi');

const baseUrl = 'http://www.pubtrans.it/hsl/reittiopas/departure-api?';

export default {
    name: 'Bus',
    props: {
        'stop': String,
        'count': {
            type: Number,
            default: 5
        }
    },
    data () {
        return {
            timer: null,
            error: '',
            stopName: '',
            busses: [],
            loading: false
        };
    },
    created () {
        this.getSchedule();
    },
    methods: {
        getSchedule () {
            if (!this.stop) {
                this.error = 'Pysäkki puuttuu';
                return;
            }
            const url = baseUrl +
                'stops[]=' + this.stop +
                '&time=' + moment().format('YYYY-MM-DDTHH:mm:ss') +
                '&max=' + this.count;

            var self = this;
            this.loading = true;
            this.error = '';
            fetch(url, {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                self.busses = self.processData(json);
                if (self.busses.length) {
                    self.stopName = self.busses[0].stopname;
                }
                self.loading = false;
                clearTimeout(self.timer);
                self.timer = setTimeout(self.getSchedule, 60000);
            }).catch(function (err) {
                self.busses = [];
                self.loading = false;
                self.error = 'Aikataulun lataus epäonnistui';
                console.warn(err);
                clearTimeout(self.timer);
                self.timer = setTimeout(self.getSchedule, 10000);
            });
        },
        processData (json) {
            return json.map(value => {
                var datVal = new Date((value.rtime || value.time) * 1000);
                if (datVal.getTime() > new Date().getTime() + 43200000) {
                    // api failure giving next days schedule if happening "right now", checking for +12h
                    return;
                }
                var date = moment(datVal);
                return {
                    line: value.line,
                    info: value.info,
                    time: date.format('H:mm'),
                    until: date.fromNow()
                };
            });
        }
    },
    components: { Spinner }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
