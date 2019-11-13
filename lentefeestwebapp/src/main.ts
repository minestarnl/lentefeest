import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAw3s_o7PxKheElgBplWnsKNlT5cSQE6uw",
  authDomain: "lentefeestapp.firebaseapp.com",
  databaseURL: "https://lentefeestapp.firebaseio.com",
  projectId: "lentefeestapp",
  storageBucket: "lentefeestapp.appspot.com",
  messagingSenderId: "73713534571",
  appId: "1:73713534571:web:55a8a6d1ec1f4d4c97932e"
};
firebase.initializeApp(firebaseConfig);
import { firestorePlugin } from "vuefire";
import router from "./router";
import vuex from "vuex";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import VueGoogleCharts from "vue-google-charts";

firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  user != null ? store.commit("setUser", user) : store.commit("setUser", null);
  user != null
    ? store.commit("setUserLoggedIn", true)
    : store.commit("setUserLoggedIn", false);
});

Vue.use(vuex);
Vue.use(VueGoogleCharts);
Vue.use(firestorePlugin);
Vue.config.productionTip = false;

var db = firebase.firestore();

new Vue<any>({
  router,
  store,
  vuetify,
  data: () => {
    todos: [];
  },

  firestore: {
    todos: db.collection("todos")
  },
  render: h => h(App)
}).$mount("#app");

import VueCookies from "vue-cookies";
Vue.use(VueCookies);
