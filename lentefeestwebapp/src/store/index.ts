import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import firebase from "firebase";
import "firebase/firestore";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    google: {
      placeholder: true,
      access_token: "false",
      scope: "https://www.googleapis.com/auth/youtube",
      state: "/",
      token_type: "Bearer"
    },
    ytstream: "dQw4w9WgXcQ"
  },
  mutations: {
    setGoogle(state: any, payload) {
      state.google.placeholder = false;
      state.google.access_token = payload.access_token;
      state.google.state = payload.state;
      state.google.token_type = payload.token_type;
    }
  },
  getters: {
    getGoogle(state) {
      return state.google;
    }
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin]
});
