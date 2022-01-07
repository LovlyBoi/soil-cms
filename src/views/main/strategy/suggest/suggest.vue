<template>
  <div class="suggest">
    <el-card class="wrapper" shadow="always">
      <template #header>
        <div class="header">
          <h2>建议值管理</h2>
          <div class="btn-table">
            <el-button
              type="text"
              :icon="Refresh"
              @click="refreshHandle"
            ></el-button>
            <el-button
              class="add-value-btn"
              type="primary"
              size="small"
              @click="addValueHandle"
              >添加值</el-button
            >
          </div>
        </div>
        <dialog-form
          ref="dialogRef"
          :config="addDialogConfig"
          @pleaseRefresh="refreshHandle"
        ></dialog-form>
      </template>

      <div class="data-table">
        <suggest-table
          ref="tableRef"
          :curPageNum="curPageNum"
          @tableRequestRefresh="refreshHandle"
        ></suggest-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalNum"
          @current-change="changePageHandle"
          :current-page="curPageNum"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { getTotalSuggest as getTotal } from "@/network/suggest";
import { message } from "@/utils/message";
import { addDialogConfig } from "./config";
import dialogForm from "./dialog-form.vue";
import suggestTable from "./suggest-table.vue";
import { Refresh } from "@element-plus/icons-vue";

export default {
  name: "suggest",
  components: {
    suggestTable,
    dialogForm,
  },
  setup() {
    const totalNum = ref(0);

    const tableRef = ref(null);

    const dialogRef = ref(null);

    const curPageNum = ref(1);

    // 那全部建议数量
    async function getTotalSuggest() {
      const { code, data } = await getTotal();
      if (code !== 200) {
        message("error", "获取建议值总数失败");
        return;
      }
      totalNum.value = data;
    }

    // 改变页码时子组件重新拉取数据
    function changePageHandle(newPageNum) {
      curPageNum.value = newPageNum;
      tableRef.value.getSuggestHandle(newPageNum, 10);
    }

    // 添加值
    function addValueHandle() {
      dialogRef.value.showDialog();
    }

    function refreshHandle() {
      tableRef.value.getSuggestHandle(curPageNum.value, 10);
    }

    getTotalSuggest();

    return {
      totalNum,
      tableRef,
      dialogRef,
      curPageNum,
      changePageHandle,
      refreshHandle,
      addValueHandle,
      Refresh,
      addDialogConfig,
    };
  },
};
</script>

<style scoped lang="less">
.suggest {
  padding: 15px;

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

  .pagination {
    margin-top: 15px;
  }
}
</style>
