<template>
  <div>
    <StepForm ref="form" :formList="formList" :entity="entity"></StepForm>
    <span class="dialog-footer" style="padding-top: 10px;">
      <el-button type="primary" size="small" @click="nextStep">提交</el-button>
      <el-button size="small" style="margin-left: 10px" @click="prevStep"
        >上一步</el-button
      >
    </span>
  </div>
</template>

<script>
import StepForm from "@/components/form/StepForm";

export default {
  components: {
    StepForm
  },
  data() {
    return {
      formList: [
        {
          prop: "password",
          label: "支付密码",
          align: "center",
          form: {
            placeholder: "请输入支付密码",
            rules: [{ required: true, message: "支付密码不能为空" }]
          }
        }
      ]
    };
  },
  computed: {
    entity() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    nextStep() {
      console.log(this.entity);
      const valid = this.$refs.form.validate();
      if (valid) {
        this.$emit("nextStep");
      }
    },
    prevStep() {
      this.$emit("prevStep");
    }
  }
};
</script>