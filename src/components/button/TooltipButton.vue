<template>
  <div class="table-list-operator">
    <template v-for="(c,index) in buttons">
      <el-button
        v-if="!c.tooltip"
        :size="c.size?c.size:'small'"
        :key="index"
        :type="c.type?c.type:'primary'"
        :icon="`el-icon-${c.icon}`"
        @click="handleClick(c)"
      >{{c.label}}</el-button>
      <el-tooltip v-else class="item" effect="dark" placement="top" :content="c.label" :key="index">
        <el-button
          :size="c.size?c.size:'small'"
          :icon="`el-icon-${c.icon}`"
          @click="handleClick(c)"
          circle
        ></el-button>
      </el-tooltip>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array
    },
    func: {
      type: Function
    }
  },
  methods: {
    handleClick(e) {
      if (e.func) {
        e.func({
          table: e.table
        });
      }
    }
  }
};
</script>