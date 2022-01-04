<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script>
import LoginPanel from './login-panel.vue'

export default {
  name: "login",
  components: {
    LoginPanel
  }
};
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/login-bg.svg');
}
</style>
