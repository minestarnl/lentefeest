<template>
  <v-container>
    <v-card class="elevation-12" v-if="userLoggedIn">
      <v-card-text>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-text-field
            label="Login"
            name="login"
            prepend-icon="mdi-account"
            type="text"
            v-model="username"
          />

          <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="$emit('loginWithGoogle')"
          prepend-icon="mdi-account"
        >Login with Google</v-btn>
        <v-spacer />
        <v-btn color="primary">Login</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-text>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Account</v-toolbar-title>
        </v-toolbar>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="$emit('logout')">Log out</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
export default {
  props: {
    userInfo: {
      type: Object,
      default: {
        name: null
      }
    },
    userLoggedIn: Boolean
  },
  data: () => {
    return {
      userInfo: this.userInfo,
      userLoggedIn: this.userLoggedIn
    };
  },
  name: " accountcontent",
  mounted: () => {
    console.log(this.userInfo);
  }
};
</script>

<style>
</style>