<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-text>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-form>
              <v-text-field
                label="Username"
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
            <v-spacer />
            <v-btn color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data: () => {
    return {
      username: "",
      password: "",
      warning: false,
      warningMessage: ""
    };
  },
  methods: {
    login: () => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.$data.username)) {
        this.$refs.warningMessage.text = "Please enter a valid email";
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.$data.email, this.$data.password)
          .catch(error => {
            console.log(error.message);
            this.$data.warningMessage = error.message;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.warningmessage {
  color: red;
  display: none;
}
</style>