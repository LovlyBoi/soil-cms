<template>
  <div class="suggest-table">
    <el-table :data="tableData" style="width: 100%" stripe size="small">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        v-for="item in suggestTableConfig"
        :key="item.label"
      />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="alterRow(scope.$index)"
          >
            修改
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-form
      ref="dialogRef"
      :config="alterDialogConfig"
      @pleaseRefresh="refreshHandle"
    ></dialog-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSuggestData, deleteSuggestValue } from "@/network/suggest";
import message from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { suggestTableConfig, alterDialogConfig } from "./config";

import dialogForm from "./dialog-form.vue";

export default {
  name: "suggest-table",
  props: ["curPageNum"],
  components: {
    dialogForm,
  },
  emits: ["tableRequestRefresh"],
  setup(_, { emit }) {
    const tableData = ref([]);

    const dialogRef = ref(null);

    // 拿到对应页的建议值
    async function getSuggestHandle(page, size) {
      const { code, data } = await getSuggestData(page, size);
      if (code !== 200) {
        message("error", "获取建议值数据失败");
        return;
      }
      tableData.value = data;
    }

    // 删除一行建议值
    async function deleteRow(index) {
      await ElMessageBox.confirm("确定要删除这条建议值吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });

      const { code, msg } = await deleteSuggestValue(tableData.value[index].id);
      console.log(code)
      if (code !== 200) {
        message("error", "删除失败");
        message("error", msg);
        console.log("删除失败", msg);
        return;
      }
      refreshHandle()
      message("success", "删除成功！");
    }

    // 修改建议值
    function alterRow(index) {
      dialogRef.value.showDialog(tableData.value[index]);
    }

    function refreshHandle() {
      emit("tableRequestRefresh");
    }

    getSuggestHandle(1, 10);

    return {
      tableData,
      getSuggestHandle,
      deleteRow,
      alterRow,
      suggestTableConfig,
      dialogRef,
      alterDialogConfig,
      refreshHandle
    };
  },
};
</script>

<style scoped lang="less"></style>
