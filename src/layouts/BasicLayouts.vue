<template>
  <el-container class="app-container">
    <el-drawer
      v-if="isMobile"
      :visible.sync="collapsed"
      :direction="direction"
      :with-header="false"
      @change="onDrawerChange"
    >
      <SiderMenu :collapsed="false"></SiderMenu>
    </el-drawer>
    <SiderMenu :collapsed="isMobile ? true : collapsed"></SiderMenu>
    <el-container class="beauty-scroll">
      <el-header :style="{ padding: 0 }">
        <Header :collapsed="collapsed" @collapse="handleCollapsed"></Header>
      </el-header>
      <el-main>
         <Tabs />
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./Header";
import SiderMenu from "./SiderMenu";
import Footer from "./Footer";
import Tabs from "@/components/tabs";
import { mapState } from "vuex";

export default {
  components: {
    Header,
    Tabs,
    Footer,
    SiderMenu,
  },
  data() {
    return {
      collapsed: false,
      direction: "ltr",
    };
  },
  computed: {
    ...mapState("setting", ["isMobile"]),
  },
  methods: {
    onDrawerChange(show) {
      this.collapsed = show;
    },
    handleCollapsed(collapsed) {
      this.collapsed = collapsed;
    },
  },
};
</script>

<style>
.app-container {
  position: relative;
  height: 100%;
  background: #f0f2f5;
}

.beauty-scroll {
  overflow-x: hidden;
}

.el-main {
  overflow: visible;
}
.el-footer {
  line-height: 60px;
  font-size: 14px;
  text-align: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.el-drawer {
  width: 260px !important;
  background-color: #001529;
}
</style>
