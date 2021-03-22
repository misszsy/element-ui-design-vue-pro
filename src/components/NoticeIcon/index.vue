<template>
  <div class="wrapper" :class="{ 'popover-open': popoverOpen }">
    <el-popover
      placement="bottom-end"
      ref="notice-popover"
      v-model="popoverOpen"
      popper-class="notice-popover"
      :offset="-3"
    >
      <el-tabs class="tabs" v-model="activeTab" @tab-click="handleClick">
        <template v-for="notice in noticeList">
          <el-tab-pane
            class="tab-pane"
            :key="notice.title"
            :label="notice.titleShow"
            :name="notice.title"
          ></el-tab-pane>
        </template>
      </el-tabs>
    </el-popover>

    <div class="noticeButton" v-popover:notice-popover>
      <el-badge :value="10" class="badge">
        <i class="el-icon-bell"></i>
      </el-badge>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notices: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    const activeTab =
      this.notices && this.notices.length > 0 ? this.notices[0].title : "";
    return {
      popoverOpen: false,
      activeTab
    };
  },
  computed: {
    noticeList() {
      return this.notices.map(tab => {
        const titleShow =
          tab.list && tab.list.length > 0
            ? `${tab.title} (${tab.list.length})`
            : tab.title;
        return {
          ...tab,
          titleShow
        };
      });
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss">
.notice-popover {
  width: 336px;
  padding: 4px 0 0 0;

  &[x-placement^="bottom"] {
    margin-top: -8px;
  }
}
</style>

<style lang="scss" scoped>
.noticeButton {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  font-size: 18px;
}
.badge {
  /deep/ .el-badge__content {
    z-index: 1;
  }
}

.tabs {
  /deep/ .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }

  /deep/ .el-tabs__header {
    margin-bottom: 4px;
  }
}
</style>
