<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{ msg }}</h3>
        </div>
        <div class="panel-body">
            <div v-if="error">
                <div class="alert alert-danger" role="alert">{{error}}</div>
            </div>

            <ul class="list-group">
              <li v-for="prog in epg" class="list-group-item">
                  <b>{{ prog.start }} - {{ prog.end }}</b> {{ prog.name }} <br/>
                  {{ prog.desc }}
              </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'VDREPG',
  props: {
    'channelNumber': {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      msg: 'Ohjelmat',
      error: undefined,
      epg: [{
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
      }]
    };
  },
  mounted: function () {
    if (this.channelNumber === -1) {
      this.error = 'Select channel';
    } else {
      this.error = undefined;
    }
  }
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
