<template>
  <div>
    <StepForm ref="form" :formList="formList" :entity="entity" />
    <span class="dialog-footer" style="padding-top: 10px;">
      <el-button type="primary" size="small" @click="nextStep"
        >下一步</el-button
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
          prop: "title",
          label: "标题",
          align: "center",
          form: {
            placeholder: "请输入标题信息",
            rules: [{ required: true, message: "标题不能为空" }]
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
      const { $store } = this;
      const valid = this.$refs.form.validate();
      if (valid) {
        $store.commit({
          type: "form/saveStepFormData",
          entity: this.entity
        });
        this.$emit("nextStep");
      }
    }
  }
};
</script>