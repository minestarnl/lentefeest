<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Lentefeest</v-list-item-title>
          <div :v-if="user">
            <v-list-item-subtitle style="font-size: 400" :v-text="user['displayName']">
              <v-img :src="user.photoURL" class="userImg" width="30" height="30"></v-img>
            </v-list-item-subtitle>
          </div>
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
import store from "./store/index";
import firebase from "firebase";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        { title: "Stream", icon: "mdi-image", link: "/stream" },
        { title: "Account", icon: "mdi-account", link: "/account" }
      ],
      right: null
    };
  },
  computed: {
    user: () => {
      return store.getters.getUser
        ? store.getters.getUse
        : { displayName: "", photoURL: "" };
    }
  },

  watch: {
    group() {
      this.drawer = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.userImg {
  border-radius: 100%;
  padding-top: -20px;
  // width: 10px !important;
  // height: 10px;
  // padding-bottom: 200px;
  float: right;
}
</style>