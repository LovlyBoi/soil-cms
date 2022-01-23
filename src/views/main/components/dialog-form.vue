<template>
  <div class="dialog-form">
    <el-dialog v-model="visible" :title="config.title">
      <el-form :model="form" :rules="config.rules" ref="formRef">
        <el-form-item
          v-for="item in config.formItems"
          :key="item.prop"
          :label="item.label"
          :label-width="'120px'"
          :prop="item.prop"
        >
          <el-select
            v-if="item.select"
            style="width: 100%"
            :placeholder="item.placeholder"
            v-model="form[item.prop]"
          >
            <el-option
              v-for="option in item.options"
              :key="option.label"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <el-input
            v-else
            v-model="form[item.prop]"
            autocomplete="off"
            :disabled="item.disabled ? true : false"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmHandle"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "dialog-form",
  props: {
    config: {
      type: Object,
      required: true
    },
  },
  emits: ["confirm"],
  setup(_, { emit }) {
    const visible = ref(false);

    const formRef = ref(null);

    let form = reactive({});

    // 展示弹窗
    function showDialog(payload) {
      visible.value = true;
      // 如果有数据带进来，就添加到form中，展示的时候就可以带着数据了
      if (payload) {
        for(const key in payload) {
          form[key] = payload[key]
        }
      }
    }

    // 确定
    function confirmHandle() {
      formRef.value?.validate((valid) => {
        if (!valid) return;

        emit("confirm", form);
        visible.value = false;
      });
    }

    return {
      visible,
      showDialog,
      confirmHandle,
      form,
      formRef,
    };
  },
};
</script>

<style scoped lang="less"></style>
