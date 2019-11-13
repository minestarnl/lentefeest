import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import firebase from "firebase";
import "firebase/firestore";
import { vuexfireMutations } from "vuexfire";
import authModule from "./auth";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    ytstream: "dQw4w9WgXcQ"
  },
  mutations: {
    ...vuexfireMutations
  },
  getters: {},
  actions: {},
  modules: {
    authModule
  },
  plugins: [vuexLocal.plugin]
});
