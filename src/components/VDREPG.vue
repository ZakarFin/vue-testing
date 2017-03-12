<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{ msg }} {{ channelNumber }}</h3>
        </div>
        <div class="panel-body">
            <Spinner v-if="loading"/>
            <div v-if="channelNumber === -1">
                <div class="alert alert-danger" role="alert">{{choose_msg}}</div>
            </div>
            <div v-if="error">
                <div class="alert alert-danger" role="alert">{{error}}</div>
            </div>

            <ul class="list-group">
              <li v-for="(prog, index) in epg" class="list-group-item">
                  <h4 v-if="shouldPrintDay(index, prog)">{{ prog.day }}</h4>
                  <b>{{ prog.start }} - {{ prog.end }}</b> {{ prog.name }} <br/>
                  {{ prog.desc }}
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
        }
    },
    watch: {
        channelNumber: function () {
            if (this.channelNumber === -1) {
                this.epg = [];
                return;
            }
            var self = this;
            let url = 'http://10.0.0.10/vdr/channels/' + this.channelNumber;
            this.loading = true;
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
                alert(err);
            });
/*
      return [{
        name: 'jee',
        start: 1,
        end: 2,
        number: 1,
        desc: 'sdfasdff'
      }, {
        name: 'moi',
        start: 2,
        end: 3,
        number: 2
      }];
*/
        }
    },
    data () {
        return {
            msg: 'Ohjelmat',
            error: undefined,
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
                return prog;
            });
        },
        shouldPrintDay: function (index, current) {
            if (index === 0) {
                return true;
            }
            return this.epg[index - 1].day !== current.day;
        }
    },
    mounted: function () {
        /*
        if (this.channelNumber === -1) {
            this.error = 'Select channel';
        } else {
            this.error = undefined;
        } */
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
