<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "./util/rem";

export default {
  name: "App",
  mounted() {
    console.log(this.$store);
  }
};
</script>

<style lang="scss">
@import "./style/reset.scss";
@import "./style/common.scss";

#app {
  font-family: "PingFang SC", "Microsoft Yahei", SimHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: $width;
  width: $height;
  display: flex;
}
.gotoinfo {
  position: absolute;
  background: #ccc;
  padding: 10px;
  border-radius: 50%;
  bottom: 10px;
  right: 10px;
  z-index: 999;
}
</style>
<style lang="less">
@import "~vux/src/styles/1px.less";
</style>

