
<template>
    <div class="jumbotron lights">
          <h2>{{ msg }}</h2>
              <div class="row">
                  <div class="col-xs-4" v-for="light in list">
                      <div class="panel panel-default">
                        <div class="panel-heading">{{light.name}}</div>
                        <div class="panel-body">
                            
                  <button type="button" class="btn btn-success" @click="toggle(light.id, true)">
                      ON
                  </button>
                  <button type="button" class="btn btn-danger" @click="toggle(light.id, false)">
                      OFF
                  </button>
                        </div>
                      </div>
                  </div>
              </div>
    </div>
</template>

<script>

import service from './lights';

export default {
    name: 'light-listing',
    data () {
        return {
            msg: 'Valot',
            list: []
        };
    },
    methods: {
        toggle (id, powerOn) {
            service.setState(id, powerOn)
                .then(() => {
                    console.log('Great success!');
                })
                .catch((err) => {
                    console.log('Virhe', err);
                });
        }
    },
    created () {
        var me = this;
        service.getList()
            .then((list) => {
                me.list = list;
            })
            .catch(() => console.log('Valolistaus epäonnistui'));
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    padding: 0px;
    margin: 0px;
}

.jumbotron {
    padding: 10px;
}
/* We get sideways scrolls without this */
.row {
    margin-left: initial;
    margin-right: initial;
}
</style>
