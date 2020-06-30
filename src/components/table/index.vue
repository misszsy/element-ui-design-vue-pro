<template>
  <div>
    <el-card style="margin-bottom:20px">
      <SearchForm
        :searchList="searchList"
        :listQuery="listQuery"
        @click="handleSearch"
        @reset="handlerReset"
      />
    </el-card>
    <el-card shadow="always">
      <div class="table-list-operator">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
        <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
          <el-button size="small" icon="el-icon-delete-solid" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="导出" placement="top">
          <el-button size="small" icon="el-icon-download" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="small" icon="el-icon-refresh-right" circle></el-button>
        </el-tooltip>
      </div>

      <el-table
        :data="dataList"
        v-loading="listLoading"
        element-loading-text="加载数据中..."
        border
        stripe
      >
        <el-table-column label="序号" align="center" type="index"></el-table-column>
        <template v-for="(c,index) in columns">
          <el-table-column
            :label="c.label"
            :align="c.align"
            :key="index"
            :show-overflow-tooltip="tooltip"
          >
            <template slot-scope="scope">
              <template v-if="c.render">
                <el-tag
                  v-if="c.render.type=='select'"
                  :type="c.render.dict[scope.row[c.prop]].type"
                  close-transition
                >{{c.render.dict[scope.row[c.prop]].label}}</el-tag>
                <el-image v-else style="width: 60px; height: 60px" :src="scope.row[c.prop]" />
              </template>
              <span v-else>{{scope.row[c.prop]}}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" align="center">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <DialogForm
        :formList="formList"
        :dialogStatus="dialogStatus"
        :dialogFormVisible="dialogFormVisible"
        @close="handlerVisible"
      />
    </el-card>
  </div>
</template>

<script>
import { pageList } from "@/api/base";
import SearchForm from "@/components/form/SearchForm";
import DialogForm from "@/components/form/DialogForm";

export default {
  components: {
    SearchForm,
    DialogForm
  },
  props: {
    columns: {
      type: Array
    },
    resource: {
      type: String
    }
  },
  data() {
    return {
      dataList: [],
      entity: {},
      listLoading: true,
      tooltip: true,
      total: null,
      dialogStatus: "create",
      dialogFormVisible: false,
      listQuery: {
        pageNum: 1,
        pageSize: 20
      }
    };
  },
  computed: {
    searchList() {
      return this.columns.filter(item => item.search && item.form);
    },
    formList() {
      return this.columns.filter(item => item.form);
    }
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      let _this = this;

      _this.listLoading = true;

      pageList(_this.resource, _this.listQuery).then(data => {
        _this.dataList = data.data.records;
        _this.total = data.data.total;
        _this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getDataList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getDataList();
    },
    handleSearch() {
      this.listQuery.pageNum = 1;
      this.getDataList();
    },
    handlerReset() {
      this.listQuery = {};
    },
    handleCreate() {
      //点击新增
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handlerVisible() {
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-list-operator {
  text-align: center;
  margin-bottom: 20px;
}
</style>