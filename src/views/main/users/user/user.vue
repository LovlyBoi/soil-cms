<template>
  <div class="user">
    <main-card
      title="用户管理"
      btn-name="添加值"
      @click="addValueHandle"
      @pleaseRefresh="refresh"
    >
    </main-card>
  </div>
</template>

<script>
import MainCard from "@/views/main/components/main-card.vue";

export default {
  name: "user",
  components: {
    MainCard,
  },
  setup() {
    function addValueHandle() {
      console.log("addValue!");
    }

    function refresh() {
      console.log("refresh!!");
    }

    return {
      addValueHandle,
      refresh,
    };
  },
};
</script>

<style scoped lang="less"></style>
