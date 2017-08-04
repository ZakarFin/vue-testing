<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <span v-if="loading">Bussit <Spinner style="float:right;"/></span>
                <span v-if="!loading">{{name}}</span>
                <span v-if="url"><a :href="url" target="_blank" class="glyphicon glyphicon-time" style="float:right;"></a></span>
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
// https://alligator.io/vuejs/using-bootstrap4/
// https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication
import Spinner from '@/components/Spinner';
import moment from 'moment';
moment.locale('fi');

// pääskyskujan pysäkki 2133210, turuntien 2133204
const baseUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
function getPayload (stop, date) {
    return `{
      stop(id: "HSL:${stop}") {
        name
        lat
        lon
        url
        stoptimesForServiceDate(date:"${date}") {
          pattern {
            name
            route {
              shortName
            }
          }
          stoptimes {
            serviceDay
            scheduledDeparture
            realtimeDeparture
            trip {
              serviceId
              alerts {
                alertHeaderText
              }
            }
          }
        }
      }
  }`;
}

export default {
    name: 'Bus',
    props: {
        'stop': String,
        'name': String,
        'url': String,
        'count': {
            type: Number,
            default: 5
        }
    },
    data () {
        return {
            timer: null,
            error: '',
            busses: [],
            loading: false,
            msg: getPayload()
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
            var self = this;
            this.loading = true;
            this.error = '';

            fetch(baseUrl, {
                headers: {
                    'Content-Type': 'application/graphql'
                },
                method: 'POST',
                body: getPayload(this.stop, moment().format('YYYYMMDD'))
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                const data = json.data.stop;
                // console.log(data);
                if (!self.name) {
                    self.name = data.name;
                }
                self.url = data.url;
                self.busses = self.processData(data.stoptimesForServiceDate);
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
            let times = [];
            json.forEach(value => {
                const line = value.pattern.route.shortName;
                value.stoptimes.forEach(stopTime => {
                    // times in seconds so multiple by 1000 for ms
                    let datVal = new Date((stopTime.serviceDay + stopTime.realtimeDeparture) * 1000);
                    if (datVal.getTime() < new Date().getTime()) {
                        return;
                    }
                    const date = moment(datVal);
                    const bus = {
                        line,
                        info: stopTime.trip.alerts.join(),
                        time: date.format('H:mm'),
                        until: date.fromNow(),
                        ts: datVal.getTime()
                    };
                    times.push(bus);
                });
            });
            times.sort((a, b) => a.ts - b.ts);
            return times.slice(0, this.count);
        }
    },
    components: { Spinner }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
