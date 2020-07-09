<template>
  <BaseForm ref="form" v-bind="$attrs" class="stepform" />
</template>

<script>
import BaseForm from "./BaseForm";

export default {
  inheritAttrs: false,
  components: { BaseForm },
  methods: {
    validate() {
      return this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss" scoped>
.stepform {
  width: 50%;
  margin: auto;
}
</style>