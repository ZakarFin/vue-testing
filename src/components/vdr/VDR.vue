
<template>
    <div class="vdr">
        <h2>{{ msg }}</h2>
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{error}}</div>
        </div>
        <div class="row">
            <div class="col-xs-3">
                <VDRChannelList
                    @change="channelChanged"/>
            </div>
            <div class="col-xs-9">
                <VDREPG
                    v-bind:channel="activeChannel"
                    v-bind:timers="timers"
                    @timer-update="updateTimers"/>
                <hr />
                <VDRTimers 
                    v-bind:timers="timers"
                    @timer-update="updateTimers"/>
            </div>
        </div>
    </div>
</template>

<script>
import VDRChannelList from '@/components/vdr/VDRChannelList';
import VDREPG from '@/components/vdr/VDREPG';
import VDRTimers from '@/components/vdr/VDRTimers';
import VDR from './vdrservice';

export default {
    name: 'VDR',
    data () {
        return {
            msg: 'VDR',
            timers: [],
            activeChannel: {
                number: -1,
                name: ''
            },
            error: ''
        };
    },
    methods: {
        channelChanged: function (channel) {
            this.activeChannel = channel;
        },
        // {"channel":"C-0-2-529-0","name":"The Walking Dead (16)","desc":"","startDate":1489435020000,"endDate":1489438980000,"duration":66}
        updateTimers: function () {
            var self = this;
            self.error = '';

            VDR.getTimers()
                .then(timers => {
                    self.timers = timers;
                })
                .catch(err => {
                    self.timers = [];
                    self.error = err;
                });
        }

    },
    mounted: function () {
        this.updateTimers();
    },
    components: { VDRChannelList, VDREPG, VDRTimers }
};
</script>
