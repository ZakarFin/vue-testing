<template>
  <div id="app">
        <TopNavigation />
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
  </div>
</template>

<script>
import TopNavigation from '@/components/TopNavigation';
export default {
    name: 'app',
    data () {
        return {
            name: 'Koti'
        };
    },
    components: { TopNavigation }
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
