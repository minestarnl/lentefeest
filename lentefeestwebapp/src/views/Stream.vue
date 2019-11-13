<template>
  <div v-if="hasenteredPassword">
    <vue-plyr>
      <div class="plyr__video-embed">
        <iframe :src="stream" allowfullscreen allowtransparency allow="autoplay"></iframe>
      </div>
      <v-divider></v-divider>
      <v-btn @click="changeStream" rounded color="primary" dark>Again!</v-btn>
    </vue-plyr>
  </div>
</template>

<script>
import vue from "vue";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";
import store from "../store/index";
import axios from "axios";
vue.use(VuePlyr, { global: false });

export default {
  name: "Stream",
  components: {},
  data() {
    return {};
  },
  computed: {
    stream: () => {
      return `https://www.youtube.com/embed/${store.state.ytstream}?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`;
    }
  },
  methods: {
    changeStream: () => {
      store.state.ytstream = "d-diB65scQU";
    }
  }
};
</script>

<style lang="sass" scoped>
    // @import 'video.js/dist/video-js.css'
</style>