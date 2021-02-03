<template>
  <div class="page-header-index-wide">
    <el-card
      :body-style="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="account-settings-info-main" :class="{ mobile: isMobile }">
        <div class="account-settings-info-left">
          <el-menu
            style="border: 0px;"
            :mode="mode"
            :default-active="selectedKeys"
            :default-openeds="openKeys"
            router
          >
            <el-menu-item index="/user/settings/base">
              <span slot="title">基础设置</span>
            </el-menu-item>
            <el-menu-item index="/user/settings/security">
              <span slot="title">安全设置</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ $route.name }}</span>
          </div>
          <RouteView></RouteView>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import RouteView from "@/layouts/RouteView";
import { mapState } from "vuex";

export default {
  components: {
    RouteView
  },
  data() {
    return {
      openKeys: ["/user/settings/base"],
      selectedKeys: "",
      mode: ""
    };
  },
  mounted() {
    this.updateMenu();
    this.mode = this.isMobile ? "horizontal" : "vertical";
  },
  computed: {
    ...mapState("setting", ["isMobile"])
  },
  watch: {
    $route() {
      this.updateMenu();
    },
    isMobile(val) {
      this.mode = val ? "horizontal" : "vertical";
    }
  },
  methods: {
    onSubmit() {},
    updateMenu() {
      const routes = this.$route.matched.concat();
      this.selectedKeys = [routes.pop().path] + "";
    }
  }
};
</script>
<style lang="scss" scoped>
.account-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .account-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 60px;
      overflow-x: auto;

      .el-menu-item {
        height: 60px;
        line-height: 60px;

        &.is-active {
          color: #409eff;
          background: none;
          font-weight: 700;
          border-right: none;
        }
      }
    }
    .account-settings-info-right {
      padding: 20px 40px;
    }
  }

  .account-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;

    .el-menu-item {
      height: 50px;
      line-height: 50px;

      &.is-active {
        color: #409eff;
        background: #ecf5ff;
        font-weight: 700;
        border-right: 3px solid #409eff;
      }
    }
  }

  .account-settings-info-right {
    flex: 1 1;
    padding: 8px 40px;

    .account-settings-info-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
