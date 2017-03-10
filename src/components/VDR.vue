
<template>
    <div class="vdr">
        <h2>{{ msg }}</h2>
        <div class="row">
            <div class="col-md-3">
                <VDRChannelList @change="channelChanged"/>
            </div>
            <div class="col-md-9">
                <VDREPG v-bind:channelNumber="activeChannel"/>
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
      activeChannel: -1
    };
  },
  methods: {
    channelChanged: function (channelNumber) {
      // this.$set(VDRChannelList, 'channelNumber', channelNumber);
      // this.$set(this, 'activeChannel', channelNumber);
      this.activeChannel = channelNumber;
    }
  },
  components: { VDRChannelList, VDREPG }
};
</script>
