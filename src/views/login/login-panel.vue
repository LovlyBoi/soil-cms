<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane label="账号登录" name="account">
        <template #label>
          <span>
            <el-icon><avatar /></el-icon>
            账号登录
          </span>
        </template>
        <login-panel-account ref="accountRef" />
      </el-tab-pane>
      <!-- <el-tab-pane label="手机登录" name="phone">
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>
            手机登录
          </span>
        </template>
        <login-panel-phone />
      </el-tab-pane> -->
    </el-tabs>

    <div class="login-control">
      <el-checkbox v-model="isRememberMe">记住密码</el-checkbox>
      <el-button type="text">忘记密码</el-button>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script>
import { ref } from "vue";
import LoginPanelAccount from "./login-panel-account.vue";

export default {
  name: "login-panel",
  components: {
    LoginPanelAccount,
  },
  setup() {
    const isRememberMe = ref(true);
    const currentTab = ref("account");

    const accountRef = ref();

    function handleLoginClick() {
      if (currentTab.value == 'account') {
        // 账号密码登录
        accountRef.value.login(isRememberMe.value)
      } else {
        console.log('拿手机组件的ref调用其中的登录逻辑')
      }
    }

    return {
      isRememberMe,
      handleLoginClick,
      accountRef,
      currentTab
    }
  },
};
</script>

<style scoped lang="less">
.login-panel {
  width: 380px;
  height: 300px;
  margin-bottom: 100px;
  .title {
    font-size: 24px;
    margin-bottom: 10px;
    text-align: center;
  }
  .login-control {
    width: 380px;
    padding: 0 3px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
