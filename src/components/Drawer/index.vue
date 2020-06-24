<template>
  <el-drawer
    :visible.sync="collapsed"
    :direction="direction"
    :with-header="isHeader"
    @click="handleTrigger"
  >
    <slot></slot>
  </el-drawer>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    direction: {
      type: String
    },
    isHeader: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    handleTrigger() {
      const { collapsed } = this;
      this.$emit("change", !collapsed);
    }
  }
};
</script>
