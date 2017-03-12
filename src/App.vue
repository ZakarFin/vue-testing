<template>
  <div id="app">
      <h1>{{ msg }}</h1>
    <!--img src="./assets/logo.png" -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Samin koti'
        };
    }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
#app h1,#app h2 {
    text-align: center;
}
</style>
