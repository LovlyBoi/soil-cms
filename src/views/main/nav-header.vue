<template>
  <div class="nav-header">
    <div class="collapse-btn">
      <el-icon class="collapse-icon" @click="handleCollapseClick">
        <component :is="isFold ? 'expand' : 'fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div>面包屑</div>
      <user-info></user-info>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import UserInfo from './user-info'

export default {
  name: 'nav-header',
  emits: ['collapseClick'],
  components: {
    UserInfo
  },
  setup(_, context) {
    const isFold = ref(false)
    function handleCollapseClick() {
      isFold.value = !isFold.value
      context.emit('collapseClick', isFold.value)
    }
    return {
      handleCollapseClick,
      isFold
    }
  }
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .collapse-icon {
    font-size: 21px;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-grow: 1;
    padding-left: 15px;
    justify-content: space-between;
  }
}
</style>
