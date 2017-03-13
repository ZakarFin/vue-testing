<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 v-if="loading" class="panel-title"> <Spinner style="float:left;" />hjelmat </h3>
            <h3 v-if="!loading" class="panel-title">Ohjelmat</h3>

        </div>
        <div class="panel-body">
            <div v-if="channelNumber === -1">
                <div class="alert alert-danger" role="alert">{{choose_msg}}</div>
            </div>
            <div v-if="error">
                <div class="alert alert-danger" role="alert">{{error}}</div>
            </div>

            <ul class="list-group">
              <li v-for="(prog, index) in epg" class="list-group-item">
                  <h4 v-if="shouldPrintDay(index, prog)">{{ prog.day }}</h4>
                  <span class="badge"><span v-if="prog.hasTimer" class="glyphicon glyphicon-time" aria-hidden="true"></span></span>
                  <b>{{ prog.start }} - {{ prog.end }}</b> {{ prog.name }} <br/>
                  {{ prog.desc }}
                  <button v-if="!prog.hasTimer" type="button" class="btn btn-default" @click="addTimer(prog)">
                    <span class="glyphicon glyphicon-time" aria-hidden="true"></span> Ajasta
                  </button>
              </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner';
import moment from 'moment';
moment.locale('fi');
export default {
    name: 'VDREPG',
    props: {
        'channelNumber': {
            type: Number,
            default: -1
        },
        'timers': Array,
        'baseURL': String
    },
    watch: {
        channelNumber: function () {
            if (this.channelNumber === -1) {
                this.epg = [];
                return;
            }
            var self = this;
            let url = this.baseURL + '/channels/' + this.channelNumber;
            this.loading = true;
            this.error = '';
            fetch(url, {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                self.epg = self.processEPG(json);
                self.loading = false;
            }).catch(function (err) {
                self.epg = [];
                self.loading = false;
                self.error = 'Ohjelmien lataus epäonnistui';
                console.warn(err);
            });
        }
        /*
        {"channel":"C-0-2-65-0","name":"The Voice of Finland","desc":"Kausi 6. Jakso 19/24. Kolmas Knockout-jakso! Tämäniltaisessa tuolileikissä selviää,  ketkä neljä laulajaa Redraman tiimistä jatkavat live-lähetyksiin. Kotimainen viihdeohjelma. (64')                                       ","startDate":1489168800000,"endDate":1489173900000,"duration":85},{"channel":"C-0-2-65-0","name":"Keno","desc":"Illan Keno arvonnan tulokset. Arvonta on suoritettu Poliisihallituksen hyväksymällä arvontajärjestelmällä. Keno arvonnan tulokset myös Veikkauksen sivuilta www.veikkaus.fi. Kotimainen visailuohjelma. (2')                                       ","startDate":1489173900000,"endDate":1489174200000,"duration":5},{"channel":"C-0-2-65-0","name":"Elokuva: Twilight - Aamunkoi, osa 2 (12)","desc":"(Twilight Saga: Breaking Dawn - Part 2 2012). Twilight-fantasiaelokuvasarjan viimeisessä osassa Bella nauttii vampyyrivoimistaan ja roolistaan Renesmee-pienokaisen äitinä. Perheonni kuitenkin järkkyy, kun Vo","startDate":1489174200000,"endDate":1489182600000,"duration":140}
        */
    },
    data () {
        return {
            error: '',
            choose_msg: 'Valitse kanava',
            epg: [],
            loading: false
        };
    },
    methods: {
        processEPG: function (epg) {
            return epg.map(prog => {
                let start = moment(prog.startDate);
                let end = moment(prog.endDate);
                prog.start = start.format('HH:mm');
                prog.end = end.format('HH:mm');
                prog.day = start.format('dddd (D. MMMM)');
                prog.hasTimer = false;
                this.timers.forEach(function (timer) {
                    if (prog.hasTimer || timer.channel !== prog.channel) {
                        return;
                    }
                    let timerStart = moment(timer.startDate);
                    let timerEnd = moment(timer.endDate);
                    prog.hasTimer = timerStart.isSameOrBefore(start) && timerEnd.isSameOrAfter(end);
                });
                return prog;
            });
        },
        shouldPrintDay: function (index, current) {
            if (index === 0) {
                return true;
            }
            return this.epg[index - 1].day !== current.day;
        },
        addTimer: function (program) {
            console.log('TODO: add timer for', program);
            this.$emit('timer-update');
        }
    },
    components: { Spinner }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
