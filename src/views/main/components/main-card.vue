<template>
  <el-card class="wrapper" shadow="always">
    <template #header>
      <div class="header">
        <h2>{{ title }}</h2>
        <div class="btn-table">
          <el-button
            type="text"
            :icon="Refresh"
            @click="$emit('pleaseRefresh')"
          ></el-button>
          <el-button
            class="add-value-btn"
            type="primary"
            size="small"
            @click="$emit('click')"
            >{{ btnName }}</el-button
          >
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script>
import { Refresh } from "@element-plus/icons-vue";

export default {
  name: "main-card",
  props: {
    title: {
      type: String,
      required: true,
    },
    btnName: {
      type: String,
      required: true,
    },
  },
  emits: ["pleaseRefresh", "click"],
  setup() {
    return {
      Refresh,
    };
  },
};
</script>

<style scoped lang="less">
.wrapper {
  .header {
    display: flex;
    justify-content: space-between;

    .btn-table {
      display: flex;
      flex-direction: row-reverse;
      padding: 0 15px;
      align-items: center;

      .add-value-btn {
        margin-right: 10px;
      }
    }
  }

  h2 {
    text-align: left;
    font-size: 18px;
    line-height: 40px;
  }
}
</style>
