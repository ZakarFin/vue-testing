<template>
  <div id="app">
      <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand">{{ name }}</router-link>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
              <template v-for="app in apps">
                  <router-link :to="app.path" tag="li" active-class="active">
                    <a>{{ app.name }}</a>
                  </router-link>
              </template>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <!--img src="./assets/logo.png" -->
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
  </div>
</template>

<script>
import {getApps} from './routes';
export default {
    name: 'app',
    data () {
        return {
            name: 'Koti',
            apps: getApps()
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
#app h1, #app h2 {
    text-align: center;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
