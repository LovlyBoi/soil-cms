<template>
  <div class="user-info">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="circleUrl"></el-avatar>
        <span>{{ userName }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { cache } from "../../utils/cache";

export default {
  name: "user-info",
  setup() {
    const store = useStore();
    const router = useRouter();

    const circleUrl =
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

    const userName = computed(() => store.state.login.userInfo.name);

    function exitLogin() {
      console.log("退出登录");
      // 清除token
      cache.deleteCache("token");
      // 跳到登录页面
      router.replace('/login')
    }
    return {
      circleUrl,
      userName,
      exitLogin,
    };
  },
};
</script>

<style lang="less" scoped>
.user-info {
  margin-right: 10px;
  .el-dropdown-link {
    display: flex;
    align-content: center;
    cursor: pointer;
    span {
      line-height: 30px;
      margin-left: 6px;
    }
  }
}
</style>
