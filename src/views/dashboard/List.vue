<template>
  <div>
    <el-card style="margin-bottom:20px">
      <el-form :inline="true" :model="queryParam" size="small" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="6">
            <el-form-item label="规则编号">
              <el-input v-model="queryParam.no" placeholder="请输入规则编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="用户名称">
              <el-input v-model="queryParam.name" placeholder="请输入用户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="禁用状态">
              <el-select v-model="queryParam.disabled" placeholder="请选择禁用状态">
                <el-option label="禁用" value="shanghai"></el-option>
                <el-option label="正常" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <template v-if="advanced">
            <el-col :xs="24" :sm="6">
              <el-form-item label="调用次数">
                <el-input v-model="queryParam.callNo" placeholder="请输入调用次数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6">
              <el-form-item label="使用状态">
                <el-select v-model="queryParam.status" placeholder="请选择使用状态">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="关闭" value="1"></el-option>
                  <el-option label="运行中" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <el-col :xs="24" :sm="6" class="el-col-button">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
              <el-button icon="el-icon-refresh" @click="() => queryParam = {}">重置</el-button>
              <el-link
                type="primary"
                :underline="false"
                @click="toggleAdvanced"
                style="margin-left: 8px"
              >
                {{ advanced ? '收起' : '展开' }}
                <i
                  :class="advanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                />
              </el-link>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="always">
      <div class="table-list-operator">
        <el-button size="small" type="primary" icon="el-icon-plus">新增</el-button>
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="small" icon="el-icon-refresh-right" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="导出" placement="top">
          <el-button size="small" icon="el-icon-upload2" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
          <el-button size="small" icon="el-icon-delete-solid" circle></el-button>
        </el-tooltip>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" align="center" type="index"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="date" label="日期" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container" style="padding-top: 20px;text-align:right;">
        <el-pagination
          background
          :page-sizes="[100, 200, 400]"
          :page-size="100"
          layout="total, prev, pager, next,sizes"
          :total="100"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "tableList",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      //查询参数
      queryParam: {},
      tableData: Array(15).fill(item)
    };
  },
  methods: {
    onSubmit() {
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
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
.table-list-operator {
  text-align: right;
  margin-bottom: 20px;
}
</style>