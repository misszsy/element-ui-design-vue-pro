<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import enquireScreen from "./utils/device";

export default {
  name: "App",
  created() {
    let _this = this;
    enquireScreen(isMobile => {
      console.log("deviceType", isMobile);
      _this.$store.commit("setting/setDevice", isMobile);
    });
  }
};
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
}

body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  margin: 0px;
}
</style>
