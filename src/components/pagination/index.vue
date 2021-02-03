<template>
  <div class="pagination-container" style="padding-top: 20px;text-align:right;">
    <el-pagination
      background
      :page-sizes="[20, 50, 100]"
      layout="total, prev, pager, next,sizes"
      :total="total"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default() {
        return 0;
      }
    },
    listQuery: {}
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
    },
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
    }
  }
};
</script>
