<template>
    <div>
        <ul class="sidebar-nav">
            <div v-if="error">
                <div class="alert alert-danger" role="alert">{{error}}</div>
            </div>
            <li class="sidebar-brand">
                <a href="#">{{ msg }}</a>
            </li>
            <li class="channel" v-for="(chan, index) in channels" v-on:click="greet(index, chan.number, $event)"
             v-bind:class="{ active: chan.number == selected }">
                <b>{{ chan.name }}</b>
            </li>
        </ul>
    </div>
</template>
<script>
import VDR from './vdrservice';
export default {
    name: 'VDRChannelList',
    props: {
        'baseURL': String
    },
    data () {
        return {
            msg: 'Kanavat',
            channels: [],
            selected: -1,
            error: ''
        };
    },
  // define methods under the `methods` object
    methods: {
        greet: function (index, channelNumber, event) {
            // `this` inside methods points to the Vue instance
            // `event` is the native DOM event
            this.selected = channelNumber;

            // Emit the number value through the input event
            this.$emit('change', {
                number: channelNumber,
                name: this.channels[index].name
            });
        }
    },
    created: function () {
        var self = this;
        this.error = '';
        VDR.getChannels()
            .then(channels => {
                self.channels = channels;
            })
            .catch(err => {
                self.channels = [];
                self.error = err;
            });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  //display: inline-block;
  margin: 0 10px;
}

li.channel {
    font-size: 14pt;
    padding: 5px;
    font-weight: normal;
}
li.channel:hover, li.channel.active {
    background-color: black;
    color: white;
}
li.channel:hover::after {
   content: " >>";
   font-weight: bold;
   color: #42b983;
}

a {
  color: #42b983;
}
</style>
