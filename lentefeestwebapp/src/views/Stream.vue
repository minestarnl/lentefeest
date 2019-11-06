<template>
  <div>
    <video-player :options="videoOptions" />
  </div>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer.vue";
import "video.js/dist/video-js.css";
export default {
  name: "Stream",
  components: {
    VideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        liveui: true,
        techOrder: ["html5", "flash"],
        sources: [
          {
            src: "https://lentefeest.bramkoene.nl/live/lentefeest/index.m3u8",
            type: "application/x-mpegURL"
          }
        ]
      }
    };
  }
};
</script>

<style lang="sass" scoped>
    // @import 'video.js/dist/video-js.css'
</style>