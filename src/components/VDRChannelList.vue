<template>
    <div>
        <ul class="sidebar-nav">
            <div v-if="error">
                <div class="alert alert-danger" role="alert">{{error}}</div>
            </div>
            <li class="sidebar-brand">
                <a href="#">{{ msg }}</a>
            </li>
              <li v-for="(chan, index) in channels" v-on:click="greet(index, chan.number, $event)">
                <b>{{ chan.number }} {{ chan.name }}</b>
            </li>
        </ul>
    </div>
</template>
<script>
import 'whatwg-fetch';
export default {
    name: 'VDRChannelList',
    props: {
        'baseURL': String
    },
    data () {
        return {
            msg: 'Kanavat',
            channels: [],
            error: ''
        };
    },
  // define methods under the `methods` object
    methods: {
        greet: function (index, channelNumber, event) {
            // `this` inside methods points to the Vue instance
            // `event` is the native DOM event

            // Emit the number value through the input event
            this.$emit('change', channelNumber);
        }
    },
    created: function () {
        var self = this;
        this.error = '';
        fetch(this.baseURL + '/channels', {
            method: 'get'
        }).then(function (response) {
            return response.json();
        }).then(function (channelsJSON) {
            self.channels = channelsJSON;
        }).catch(function (err) {
            self.error = 'Kanavien lataus epäonnistui';
            console.warn(err);
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

a {
  color: #42b983;
}
</style>
