<template>
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
</template>

<script>
import {getApps} from '../routes';
export default {
    name: 'TopNavigation',
    data () {
        return {
            name: 'Koti',
            apps: getApps()
        };
    }
};
</script>
