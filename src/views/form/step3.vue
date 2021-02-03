<template>
  <div>
    晚上
    <span class="dialog-footer" style="padding-top: 10px;">
      <el-button type="primary" size="small" @click="finish"
        >再转一笔</el-button
      >
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    finish() {
      this.$emit("finish");
    }
  }
};
</script>