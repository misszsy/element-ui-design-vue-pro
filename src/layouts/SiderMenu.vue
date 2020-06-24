<template>
  <el-aside :width="collapsed ?'64px':'260px'">
    <el-menu
      class="el-menu-vertical"
      background-color="#001529"
      text-color="#ffffff"
      collapse-transition
      active-text-color="#1890ff"
      :collapse="collapsed"
    >
      <div class="logo">Element UI Vue Pro</div>
      <SubMenu></SubMenu>
    </el-menu>
  </el-aside>
</template>

<script>
import SubMenu from "./SubMenu";

export default {
  components: {
    SubMenu
  },
  props: {
    collapsed: {
      type: Boolean
    }
  }
};
</script>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 260px;
  min-height: 400px;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  overflow: hidden;
  color: #ffffff;
  transition: all 0.3s;
  background: #002140;
}

.el-aside {
  transition: all 0.3s;
  background-color: #001529;
}

.el-menu {
  border-right: hidden;
}
</style>
