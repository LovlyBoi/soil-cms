<template>
  <div class="suggest-table">
    <el-table :data="tableData" style="width: 100%" stripe size="small" >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        v-for="item in tableConfig"
        :key="item.label"
      />
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "suggest-table",
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableConfig: {
      type: Array,
      required: true
    }
  },
  setup() {
    const dialogRef = ref(null);

    return {
      dialogRef,
    };
  },
};
</script>
