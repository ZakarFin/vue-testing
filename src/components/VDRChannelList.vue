<template>
    <div>
        <ul class="sidebar-nav">
            <li class="sidebar-brand">
                <a href="#">{{ msg }}</a>
            </li>
              <li v-for="(chan, index) in channels" v-on:click="greet(index, chan.number, $event)">
                <b>{{ chan.name }}</b>
            </li>
        </ul>
    </div>
</template>
/*{
  name: 'jee',
  number: 1
}, {
  name: 'moi',
  number: 2
}
*/
<script>
import 'whatwg-fetch';
export default {
  name: 'VDRChannelList',
  data () {
    return {
      msg: 'Kanavat',
      channels: []
    };
  },
  // define methods under the `methods` object
  methods: {
    greet: function (index, channelNumber, event) {
      // `this` inside methods points to the Vue instance
      alert('Hello ' + this.channels[index].name + '!');
      // `event` is the native DOM event
      /*
      if (event) {
        alert(event.target.tagName)
      }
    */
    }
  },
  mounted: function () {
    var self = this;
    fetch('http://10.0.0.10/vdr/channels', {
      method: 'get'
    }).then(function (response) {
      return response.json();
    }).then(function (channelsJSON) {
      self.channels = channelsJSON;
    }).catch(function (err) {
      // Error :(
      alert(err);
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
