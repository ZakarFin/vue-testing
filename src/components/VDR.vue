
<template>
    <div class="vdr">
        <h2>{{ msg }}</h2>
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{error}}</div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <VDRChannelList @change="channelChanged"/>
            </div>
            <div class="col-md-9">
                <VDREPG v-bind:channelNumber="activeChannel" v-bind:timers="timers" @timer-update="updateTimers"/>
            </div>
        </div>
    </div>
</template>

<script>
import VDRChannelList from '@/components/VDRChannelList';
import VDREPG from '@/components/VDREPG';

export default {
    name: 'VDR',
    data () {
        return {
            msg: 'VDR',
            timers: [],
            activeChannel: -1,
            error: ''
        };
    },
    methods: {
        channelChanged: function (channelNumber) {
      // this.$set(VDRChannelList, 'channelNumber', channelNumber);
      // this.$set(this, 'activeChannel', channelNumber);
            this.activeChannel = channelNumber;
        },
        // {"channel":"C-0-2-529-0","name":"The Walking Dead (16)","desc":"","startDate":1489435020000,"endDate":1489438980000,"duration":66}
        updateTimers: function () {
            var self = this;
            self.error = '';
            fetch('http://10.0.0.10/vdr/timers', {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                self.timers = json;
            }).catch(function (err) {
                self.timers = [];
                self.error = 'Unable to load timers';
                console.warn(err);
            });
        }

    },
    mounted: function () {
        this.updateTimers();
    },
    components: { VDRChannelList, VDREPG }
};
</script>
