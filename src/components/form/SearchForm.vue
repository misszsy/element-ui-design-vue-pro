<template>
  <el-form
    :inline="true"
    :model="listQuery"
    size="small"
    class="demo-form-inline"
  >
    <el-row :gutter="20">
      <template v-for="(c, index) in searchList">
        <template v-if="c.search && c.form">
          <el-col
            :xs="24"
            :sm="6"
            :key="index"
            v-if="index >= 3 ? advanced : true"
          >
            <el-form-item :label="c.label">
              <el-select
                v-if="c.form.type == 'select'"
                v-model="listQuery[c.prop]"
                :placeholder="c.form.placeholder"
                filterable
                clearable
              >
                <el-option label="待发布" value="0"></el-option>
                <el-option label="已发布" value="1"></el-option>
              </el-select>
              <el-input
                v-else
                v-model="listQuery[c.prop]"
                :placeholder="c.form.placeholder"
              ></el-input>
            </el-form-item>
          </el-col>
        </template>
      </template>
      <el-col :xs="24" :sm="6" class="el-col-button">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
          <el-button icon="el-icon-refresh" @click="handlerReset"
            >重置</el-button
          >
          <el-link
            type="primary"
            :underline="false"
            @click="() => (advanced = !advanced)"
            style="margin-left: 8px"
          >
            {{ advanced ? "收起" : "展开" }}
            <i :class="advanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
          </el-link>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array
    },
    listQuery: {
      type: Object
    }
  },
  data() {
    return {
      advanced: false
    };
  },
  methods: {
    handleSearch() {
      this.$emit("click");
    },
    handlerReset() {
      this.$emit("reset", this.listQuery);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row::after,
.el-row::before {
  display: inline-block;
}
@media only screen and (min-width: 768px) {
  .el-col-button {
    float: right;
    text-align: right;
  }
  .el-input,
  .el-select {
    width: 280px;
  }
}
@media only screen and (max-width: 768px) {
  .el-col-button {
    text-align: center;
  }
  .el-input,
  .el-select {
    width: 45vh;
  }
}
</style>
