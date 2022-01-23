<template>
  <div class="suggest">
    <main-card
      title="建议值管理"
      btn-name="添加值"
      @click="showAddDialog"
      @pleaseRefresh="refreshHandle"
    >
      <dialog-form
        ref="addDialogRef"
        :config="addDialogConfig"
        @confirm="addValueConfirm"
      ></dialog-form>

      <dialog-form
        ref="alterDialogRef"
        :config="alterDialogConfig"
        @confirm="alterValueConfirm"
      ></dialog-form>

      <div class="data-table">
        <data-table ref="tableRef" :table-data="tableData">
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click.prevent="alterRow(scope.row)"
              >
                修改
              </el-button>
              <el-button
                type="text"
                size="small"
                @click.prevent="deleteRow(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </data-table>
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
    </main-card>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  getTotalSuggest as getTotal,
  addSuggestValue,
  deleteSuggestValue,
  getSuggestData,
  alterSuggestValue
} from "@/network/suggest";
import message from "@/utils/message";
import { addDialogConfig, alterDialogConfig } from "./config";
import { ElMessageBox } from "element-plus";
import DialogForm from "../../components/dialog-form.vue";
import DataTable from "../../components/data-table.vue";
import MainCard from "../../components/main-card.vue";
import { Refresh } from "@element-plus/icons-vue";

export default {
  name: "suggest",
  components: {
    DataTable,
    DialogForm,
    MainCard,
  },
  setup() {
    const totalNum = ref(0);

    const tableRef = ref(null);

    const tableData = ref([]);

    const addDialogRef = ref(null);
    const alterDialogRef = ref(null);

    const curPageNum = ref(1);

    // 拿全部建议数量
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
      getSuggestHandle(newPageNum, 10);
    }

    function showAddDialog() {
      addDialogRef.value.showDialog();
    }
    function showAlterDialog(row) {
      alterDialogRef.value.showDialog(row);
    }

    function refreshHandle() {
      getSuggestHandle(curPageNum.value, 10);
    }

    // 添加值
    async function addValueConfirm(form) {
      const { code, msg } = await addSuggestValue(form);
      if (code !== 200) {
        message("error", "添加失败");
        message("error", msg);
        console.log("添加失败", msg);
        return;
      }
      message("success", "添加成功！");
      refreshHandle();
    }

    async function alterValueConfirm(form) {
      const { code, msg } = await alterSuggestValue(form);
      // console.log(result)
      if (code !== 200) {
        message("error", "修改失败");
        message("error", msg);
        console.log("修改失败", msg);
        return;
      }
      message("success", "修改成功！");
      refreshHandle();
    }

    // 删除一行建议值
    async function deleteRow(row) {
      await ElMessageBox.confirm("确定要删除这条建议值吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });

      const { code, msg } = await deleteSuggestValue(row.id);
      console.log(code);
      if (code !== 200) {
        message("error", "删除失败");
        message("error", msg);
        console.log("删除失败", msg);
        return;
      }
      refreshHandle();
      message("success", "删除成功！");
    }

    // 修改建议值
    function alterRow(row) {
      showAlterDialog(row);
    }

    // 拿到对应页的建议值
    async function getSuggestHandle(page, size) {
      const { code, data } = await getSuggestData(page, size);
      if (code !== 200) {
        message("error", "获取建议值数据失败");
        return;
      }
      tableData.value = data;
    }

    getTotalSuggest();
    getSuggestHandle(1, 10);

    return {
      totalNum,
      tableRef,
      addDialogRef,
      alterDialogRef,
      curPageNum,
      changePageHandle,
      refreshHandle,
      showAddDialog,
      Refresh,
      addDialogConfig,
      alterDialogConfig,
      addValueConfirm,
      alterValueConfirm,
      deleteRow,
      alterRow,
      tableData,
    };
  },
};
</script>

<style scoped lang="less">
.suggest {
  padding: 15px;

  .pagination {
    margin-top: 15px;
  }
}
</style>
