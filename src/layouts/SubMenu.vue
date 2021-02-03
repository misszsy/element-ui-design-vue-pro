<template >
  <el-submenu :index="menuInfo.path">
    <template slot="title">
      <i :class="menuInfo.icon"></i>
      <span slot="title">{{ menuInfo.name }}</span>
    </template>
    <template v-for="item in menuInfo.children">
      <el-menu-item :index="item.path" :key="item.path">
        <span slot="title" style="padding-left: 20px;">{{ item.name }}</span>
      </el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
export default {
  props: {
    menuInfo: {}
  }
};
</script>
