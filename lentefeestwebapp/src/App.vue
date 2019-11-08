<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Application</v-list-item-title>
          <v-list-item-subtitle>subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item key="google" tap="loginWithGoogle" @click="loginWithGoogle">
          <v-list-item-icon>
            <v-icon>'mdi-google'</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import router from "./router/index";

export default Vue.extend({
  name: "App",

  components: {},

  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        { title: "Stream", icon: "mdi-image", link: "/stream" }
      ],
      right: null
    };
  },

  methods: {
    loginWithGoogle() {
      var LoginString: string = `https://accounts.google.com/o/oauth2/auth?
client_id=73713534571-7d72icncvsacbo2lipfipv13bj21tmiv.apps.googleusercontent.com&
redirect_uri=http://localhost:8080/logincallback&
scope=https://www.googleapis.com/auth/youtube&state=${router.currentRoute.path}&
response_type=token`;
      window.open(LoginString);
    }
  },

  computed: {
    googleUrl: () => {
      return `https://accounts.google.com/o/oauth2/auth?
client_id=73713534571-7d72icncvsacbo2lipfipv13bj21tmiv.apps.googleusercontent.com&
redirect_uri=${router.currentRoute.fullPath}/logincallback&
scope=https://www.googleapis.com/auth/youtube&state=${router.currentRoute.path}&
response_type=token`;
    }
  },

  watch: {
    group() {
      this.drawer = false;
    }
  }
});
</script>
