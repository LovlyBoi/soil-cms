<template>
  <div class="nav-menu">
    <div class="logo" @click="handleLogoClick">
      <img src="../../assets/img/logo.svg" alt="logo" />
      <span v-if="!fold" class="title">后台管理系统</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      :default-active="curActive"
      background-color="#001529"
      text-color="#ccc"
      active-text-color="#fff"
      :collapse="fold"
      unique-opened
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type == 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleSubMenuClick(subItem)"
              >
                <el-icon v-if="subItem.icon">
                  <component :is="getIconName(subItem.icon)"></component>
                </el-icon>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type == 2">
          <el-menu-item>
            <el-icon v-if="item.icon">
              <component :is="item.icon"></component>
            </el-icon>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, toRaw } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "nav-menu",
  props: {
    fold: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();

    const userMenus = computed(() => store.state.login.userMenus);

    const router = useRouter();

    // 递归的找到所有type == 2的菜单
    function getTypeTwoMenusArr(menus) {
      const typeTwoMenus = [];
      function _recurseVisitor(_menus) {
        for (let menu of _menus) {
          if (menu.children) {
            _recurseVisitor(menu.children);
          }
          if (menu.type == 2) {
            typeTwoMenus.push(menu);
          }
        }
      }
      _recurseVisitor(menus);
      return typeTwoMenus;
    }

    let typeTwoMenus = getTypeTwoMenusArr(toRaw(store.state.login.userMenus));

    // 当前高亮的元素，从当前url开始匹配
    const curActive = computed(() => {
      let curPath = router.currentRoute.value.fullPath
      let curId;
      typeTwoMenus.forEach(item => {
        if(item.url == curPath){
          curId = item.id
        }
      })
      return curId + '';
    });

    function handleSubMenuClick(item) {
      console.log(item);
      router.push({
        path: item.url ?? "not-found",
      });
    }

    function handleLogoClick() {
      router.push("/main");
    }

    return {
      userMenus,
      handleSubMenuClick,
      handleLogoClick,
      curActive,
    };
  },
};
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 34px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      line-height: 16px;
    }
  }

  .el-menu {
    border-right: none;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
</style>
