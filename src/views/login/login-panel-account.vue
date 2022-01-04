<template>
  <div class="login-panel-account">
    <el-form
      :label-width="'70px'"
      :rules="rules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { rules } from "./config/account-config";
import { cache } from "../../utils/cache";

export default {
  name: "login-panel-account",
  setup() {
    const store = useStore();

    const account = reactive({
      name: cache.getCache("uname") ?? "",
      password: cache.getCache("upass") ?? "",
    });

    const formRef = ref();

    function login(isRememberMe) {
      formRef.value?.validate((valid) => {
        if (!valid) {
          return;
        }
        if (isRememberMe) {
          // 本地缓存
          cache.setCache("uname", account.name);
          cache.setCache("upass", account.password);
        } else {
          // 清除本地缓存
          cache.deleteCache("uname");
          cache.deleteCache("upass");
        }
        store.dispatch("login/accountLogin", {
          username: account.name,
          password: account.password,
          rememberMe: false
        });
      });
    }

    return {
      account,
      rules,
      login,
      formRef,
    };
  },
};
</script>

<style scoped lang="less"></style>
