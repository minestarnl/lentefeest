<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-text>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="loginWithGoogle"
              prepend-icon="mdi-account"
            >Login with Google</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
        <v-card>
          <v-card-text>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Account</v-toolbar-title>
            </v-toolbar>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="logout">Log out</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import * as firebase from "firebase/app";
import "firebase/auth";
import store from "../../store/index";
import AccountContent from "./accountPages/accountcontent.vue";

export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    "account-content": AccountContent
  },
  methods: {
    logout: () => {
      firebase
        .auth()
        .signOut()
        .then(res => {})
        .catch(err => console.log(err));
    },
    loginWithGoogle: () => {
      var _provider = new firebase.auth.GoogleAuthProvider();
      _provider.addScope("https://www.googleapis.com/auth/youtube");
      _provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

      firebase
        .auth()
        .signInWithPopup(_provider)
        .then(user => {
          console.log(user.user);
          store.commit("setUser", user);
          console.log(store.getters.getUser);
        });
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isUserLoggedIn;
    }
  }
};
</script>

<style>
</style>