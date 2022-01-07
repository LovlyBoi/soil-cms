<template>
  <div class="dialog-form">
    <el-dialog v-model="dialogFormVisible" title="修改建议值">
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
          <el-button type="primary" @click="submitAlter">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "dialog-form",
  props: {
    config: {
      type: Object,
    },
  },
  emits: ["pleaseRefresh"],
  setup(props, { emit }) {
    const dialogFormVisible = ref(false);

    const formRef = ref(null);

    const form = ref({
      id: "",
      cropName: "",
      min_value: "",
      max_value: "",
      name_element: "",
      result: "",
    });

    // 展示弹窗
    function showDialog(payload) {
      dialogFormVisible.value = true;
      // console.log(payload);
      if (payload) form.value = { ...payload };
    }

    // 提交修改
    function submitAlter() {
      formRef.value?.validate((valid) => {
        if (!valid) {
          return;
        }

        dialogFormVisible.value = false;
        // 校验成功的话调用传入的回调函数
        if (!props.config.successFunction) {
          return;
        }
        props.config.successFunction(form.value).then(() => {
          emit("pleaseRefresh");
        });
      });
    }

    return {
      dialogFormVisible,
      showDialog,
      submitAlter,
      form,
      formRef,
    };
  },
};
</script>

<style scoped lang="less"></style>
