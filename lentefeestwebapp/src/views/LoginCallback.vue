<template>
  <div>
    <p>Hello There You are being redirected</p>
  </div>
</template>

<script>
import Vue from "vue";
import router from "../router/index";
import store from "../store/index";

export default {
  name: "LoginCallback",
  mounted: () => {
    console.log(router.currentRoute.hash);
    var params = router.currentRoute.hash.substr(1).split("&");

    var locationList = {};

    for (var i = 0; i < params.length; i++) {
      var a = params[i].split("=");
      // Now every parameter from the hash is beind handled this way
      locationList[a[0]] = a[1];
    }

    console.log(locationList);

    store.commit("setGoogle", locationList);
  }
};
</script>

<style>
</style>