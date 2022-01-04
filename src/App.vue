<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // HelloWorld
  },
};
</script>

<style lang="less">
html, body, .app, #app {
  width: 100%;
  height: 100%;
}

</style>
