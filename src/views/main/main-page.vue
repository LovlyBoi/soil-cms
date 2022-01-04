<template>
  <div class="main-page">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '64px' : '210px'">
        <nav-menu :fold="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @collapseClick="collapseHandle" />
        </el-header>
        <el-main class="page-content">
          <div class="page-table">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref } from 'vue'
import NavMenu from './nav-menu'
import NavHeader from './nav-header'

export default {
  name: 'main-page',
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    function collapseHandle(val) {
      isCollapse.value = val
    }
    return {
      collapseHandle,
      isCollapse
    }
  }
}
</script>

<style scoped lang="less">
.main-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .main-content,
  .page {
    height: 100%;
  }

  .page-content {
    height: calc(100% - 48px);
    .page-table {
      background-color: #fff;
      border-radius: 5px;
    }
  }

  .el-header,
  .el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
  }

  .el-header {
    height: 48px !important;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    // cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
}
</style>
