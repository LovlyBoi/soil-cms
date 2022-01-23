<template>
  <div class="user">
    <main-card
      title="用户管理"
      btn-name="添加用户"
      @click="addValueHandle"
      @pleaseRefresh="refresh"
    >
      <data-table :table-data="tableData" :tableConfig="userTableConfig">
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
import MainCard from "@/views/main/components/main-card.vue";
import DataTable from "../../components/data-table.vue";

import { getUserList, getTotal } from "@/network/user";
import message from "@/utils/message";

import { userTableConfig } from "./config";

export default {
  name: "user",
  components: {
    MainCard,
    DataTable,
  },
  setup() {
    const tableData = ref([]);

    const curPageNum = ref(1);

    const curPageSize = ref(10);

    const totalNum = ref(0);

    getTotal().then(({ code, data }) => {
      if (code == 200) {
        totalNum.value = data;
      } else {
        message('error', '获取用户总数失败')
      }
    });

    async function getList(pageNum, pageSize) {
      const { code, data, msg } = await getUserList(pageNum, pageSize);
      if (code !== 200) {
        message("error", msg);
        return;
      }
      tableData.value = data;
    }

    function refresh() {
      getList(curPageNum.value, curPageSize.value);
    }

    function changePageHandle(newPageNum) {
      curPageNum.value = newPageNum;
      refresh();
    }

    function addValueHandle() {
      console.log("addValue!");
    }

    function alterRow(row) {
      console.log(row);
    }

    function deleteRow(row) {
      console.log(row);
    }

    refresh();

    return {
      totalNum,
      tableData,
      addValueHandle,
      changePageHandle,
      refresh,
      alterRow,
      deleteRow,
      userTableConfig,
      curPageNum,
    };
  },
};
</script>

<style scoped lang="less">
.user {
  padding: 15px;

  .pagination {
    margin-top: 15px;
  }
}
</style>
