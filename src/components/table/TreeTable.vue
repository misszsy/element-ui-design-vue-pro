<template>
  <div>
    <el-card>
      <el-table
        :data="dataList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="55"
        ></el-table-column>
        <template v-for="(c, index) in columns">
          <el-table-column
            prop="date"
            :label="c.label"
            :align="c.align"
            :key="index"
            v-if="c.prop != 'operation'"
          >
            <template slot-scope="scope">
              <template v-if="c.render">
                <el-tag
                  v-if="c.render.type == 'select'"
                  :type="c.render.dict[scope.row[c.prop]].type"
                  close-transition
                  >{{ c.render.dict[scope.row[c.prop]].label }}</el-tag
                >
                <i :class="scope.row[c.prop]"></i>
              </template>
              <span v-else>{{ scope.row[c.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :label="c.label"
            :align="c.align"
            :key="index"
          >
            <template slot-scope="scope">
              <el-button
                v-for="(o, index) in c.buttons"
                :type="o.type ? o.type : 'text'"
                :size="o.size ? o.size : 'small'"
                :key="index"
                v-bind="o"
                @click="handleClick(o, scope.row)"
                >{{ o.label }}</el-button
              >
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array
    },
    columns: {
      type: Array
    }
  },
  methods: {
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
