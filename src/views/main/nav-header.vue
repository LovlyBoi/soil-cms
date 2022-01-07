<template>
  <div class="nav-header">
    <div class="collapse-btn">
      <el-icon class="collapse-icon" @click="handleCollapseClick">
        <component :is="isFold ? 'expand' : 'fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in breadArr"
          :key="item"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script>
import { ref, computed, toRaw } from "vue";
import UserInfo from "./user-info";
import { ArrowRight } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "nav-header",
  emits: ["collapseClick"],
  components: {
    UserInfo,
    ArrowRight,
  },
  setup(_, context) {
    const isFold = ref(false);

    const store = useStore();

    const router = useRouter();

    const userMenus = toRaw(store.state.login.userMenus);

    function getBreadArr(menus, url) {
      let result = [];
      function _recurseMenus(_menus, arr) {
        for (const menu of _menus) {
          if (menu.url === url) {
            arr.push({
              id: menu.id,
              name: menu.name,
              to: menu.url,
            });
            return true;
          } else {
            if (menu.children) {
              arr.push({
                id: menu.id,
                name: menu.name,
                to: menu.url,
              });
              if (_recurseMenus(menu.children, arr)) {
                return true;
              } else {
                arr.pop();
              }
            }
          }
        }
      }
      _recurseMenus(menus, result);
      return result;
    }

    // [{ to: '/mian', name: ''， url:  }, {}]
    const breadArr = computed(() => {
      let curPath = router.currentRoute.value.fullPath;
      return getBreadArr(userMenus, curPath)
    });

    function handleCollapseClick() {
      isFold.value = !isFold.value;
      context.emit("collapseClick", isFold.value);
    }

    return {
      handleCollapseClick,
      isFold,
      ArrowRight,
      breadArr,
    };
  },
};
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .collapse-icon {
    margin-top: 4px;
    font-size: 22px;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-grow: 1;
    padding-left: 15px;
    justify-content: space-between;

    .el-breadcrumb {
      height: 100%;
      line-height: 30px;
    }
  }
}
</style>
