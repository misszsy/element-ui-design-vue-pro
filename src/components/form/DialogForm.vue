<template>
  <el-dialog
    :title="$attrs.dialogLabel"
    :visible.sync="$attrs.dialogFormVisible"
    :close-on-click-modal="false"
    :before-close="handlerVisible"
    center
  >
    <BaseForm ref="form" v-bind="$attrs" v-on="$listeners" />

    <span class="dialog-footer" slot="footer" style="padding-top: 10px;">
      <el-button type="primary" @click="createData">确认</el-button>
      <el-button @click="handlerVisible">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import BaseForm from "./BaseForm";

export default {
  inheritAttrs: false,
  components: {
    BaseForm
  },
  methods: {
    createData() {
      this.$refs.form.createData();
    },
    handlerVisible() {
      this.$emit("close", this.dialogFormVisible);
    },
    clearValidateForm() {
      const _this = this;
      _this.$nextTick(function() {
        _this.$refs.form.clearValidateForm();
      });
    }
  }
};
</script>
