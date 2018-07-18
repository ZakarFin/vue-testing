<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Ajastukset</h3>
        </div>
        <div class="panel-body">
            <div v-if="error">
                <div class="alert alert-danger" role="alert">{{error}}</div>
            </div>

            <ul class="list-group">
              <li v-for="(prog, index) in timers" class="list-group-item">
                  <span class="badge"><span v-if="prog.hasTimer" class="glyphicon glyphicon-time" aria-hidden="true"></span></span>
                  <b>{{ formatDates(prog) }}</b> {{ prog.name }} <br/>
                  {{ prog.desc }}
                  <!-- button v-if="!prog.hasTimer" type="button" class="btn btn-default" @click="removeTimer(prog)">
                    <span class="glyphicon glyphicon-time" aria-hidden="true"></span> Poista
                  </button -->
              </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner';
import VDR from './vdrservice';
import moment from 'moment';
moment.locale('fi');
export default {
    name: 'VDRTimers',
    props: {
        'timers': Array
    },
    methods: {
        formatDates (timer) {
            let start = moment(timer.startDate);
            let end = moment(timer.endDate);
            if (start.day() !== end.day()) {
                // add end date
            }
            let formatted = start.format('dddd HH:mm') + ' - ';

            if (start.day() !== end.day()) {
                // add end date
                formatted += end.format('ddd, HH:mm');
            } else {
                formatted += end.format('HH:mm');
            }
            return formatted;
        },
        removeTimer: function (program) {
            var me = this;
            VDR.removeTimer(program)
                .then(() => {
                    me.$emit('timer-update');
                    // http://codeseven.github.io/toastr/demo.html
                    window.toastr.info('Ohjelman tallennus poistettu');
                })
                .catch(err => {
                    window.toastr.error(err);
                });
        }
    },
    data () {
        return {
            error: ''
        };
    },
    components: { Spinner }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

li h4 {
    background-color: black;
    color: white;
    padding: 10px;
}

a {
  color: #42b983;
}
</style>
