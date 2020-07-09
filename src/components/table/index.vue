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
      <TooltipButton :buttons="toolbarList" />

      <el-table
        :data="dataList"
        v-loading="listLoading"
        element-loading-text="加载数据中..."
        border
        stripe
        empty-text
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" align="center" type="index" width="55"></el-table-column>
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
            <template slot-scope="scope">
              <el-button
                v-for="(o,index) in c.buttons"
                :type="o.type?o.type:'text'"
                :size="o.size?o.size:'small'"
                :key="index"
                v-bind="o"
                @click="handleClick(o,scope.row)"
              >{{o.label}}</el-button>
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
        ref="form"
        v-if="showDialog"
        :formList="formList"
        :entity="entity"
        :resource="resource"
        :dialogLabel="dialogLabel"
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
import TooltipButton from "@/components/button/TooltipButton";

export default {
  components: {
    SearchForm,
    DialogForm,
    Pagination,
    TooltipButton
  },
  props: {
    columns: {
      type: Array
    },
    resource: {
      type: String
    },
    buttons: {
      type: Array
    },
    showDialog: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      dataList: [],
      multiple: [],
      entity: {},
      disabled: false,
      listLoading: true,
      tooltip: true,
      total: null,
      dialogLabel: "",
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
      return this.columns.filter(item => item.form && !item.form.show);
    },
    toolbarList() {
      return this.buttons.reduce((res, toolbar) => {
        res.push({ ...toolbar, table: this });
        return res;
      }, []);
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
    handlerVisible() {
      this.dialogFormVisible = false;
    },
    handleSelectionChange(row) {
      this.multiple = row;
    },
    handleClick(e, row) {
      if (e.func) {
        e.func({
          table: this,
          row: row
        });
      }
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