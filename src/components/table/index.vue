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
            v-if="c.prop !='operation'"
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
          <el-table-column v-else :label="c.label" :align="c.align" :key="index">
            <template v-for="(o,index) in c.buttons">
              <el-button :type="o.type" :size="o.size?o.size:'small'" :key="index">{{o.label}}</el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <Pagination
        :listQuery="listQuery"
        :total="total"
        @currentChange="handleCurrentChange"
        @sizeChange="handleSizeChange"
      />
      <DialogForm
        :formList="formList"
        :dialogStatus="dialogStatus"
        :dialogFormVisible="dialogFormVisible"
        @createData="createData"
        @close="handlerVisible"
      />
    </el-card>
  </div>
</template>

<script>
import { pageList } from "@/api/base";
import SearchForm from "@/components/form/SearchForm";
import DialogForm from "@/components/form/DialogForm";
import Pagination from "@/components/pagination";

export default {
  components: {
    SearchForm,
    DialogForm,
    Pagination
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
    createData() {
      this.handlerVisible();
      this.getDataList();
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