<template>
  <div class="gloabl-header">
    <i
      :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      id="trigger"
      @click="handleTrigger"
    />
    <div style="flex: 1 1 0%;"></div>
    <div class="global-header-right">
      <NoticeIcon class="header-action notice" :notices="noticeTabs" />
      <div class="header-action">
        <el-dropdown @command="handleCommand">
          <span class="action account">
            <el-avatar
              class="avatar"
              size="small"
              icon="el-icon-user-solid"
              :src="userInfo.avatar"
            />
            <span>{{ userInfo.name }}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a" icon="el-icon-user">
              个人设置
            </el-dropdown-item>
            <el-dropdown-item command="c" icon="el-icon-switch-button" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import NoticeIcon from "../components/noticeIcon";
import { mapGetters } from "vuex";

export default {
  components: {
    NoticeIcon
  },
  props: {
    collapsed: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      noticeTabs: [
        {
          title: "通知",
          list: [
            {
              id: "000000001",
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
              title: "你收到了 14 份新周报",
              datetime: "2017-08-09",
              type: "通知"
            },
            {
              id: "000000002",
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
              title: "你推荐的 曲妮妮 已通过第三轮面试",
              datetime: "2017-08-08",
              type: "通知"
            },
            {
              id: "000000003",
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
              title: "这种模板可以区分多种通知类型",
              datetime: "2017-08-07",
              read: true,
              type: "通知"
            },
            {
              id: "000000004",
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
              title: "左侧图标用于区分不同的类型",
              datetime: "2017-08-07",
              type: "通知"
            },
            {
              id: "000000005",
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
              title: "内容不要超过两行字，超出时自动截断",
              datetime: "2017-08-07",
              type: "通知"
            }
          ],
          emptyText: "你已查看所有通知",
          emptyImage:
            "https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        },
        {
          title: "消息",
          list: [
            {
              id: "000000006",
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
              title: "曲丽丽 评论了你",
              description: "描述信息描述信息描述信息",
              datetime: "2017-08-07",
              type: "消息"
            },
            {
              id: "000000007",
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
              title: "朱偏右 回复了你",
              description:
                "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
              datetime: "2017-08-07",
              type: "消息"
            },
            {
              id: "000000008",
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
              title: "标题",
              description:
                "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
              datetime: "2017-08-07",
              type: "消息"
            }
          ],
          emptyText: "你已读完所有消息",
          emptyImage:
            "https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        }
      ]
    };
  },
  methods: {
    handleTrigger() {
      const { collapsed } = this;
      this.$emit("collapse", !collapsed);
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          this.handleSettings();
          break;
        case "b":
          break;
        case "c":
          this.handleLogout();
          break;
      }
    },
    handleSettings() {
      this.$router.push({ path: "/user/settings" });
    },
    handleLogout() {
      this.$confirm("是否确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("Logout").then(() => {
            this.$router.push({ name: "login" });
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.gloabl-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0;
  padding-right: 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  #trigger {
    font-size: 25px;
    line-height: 60px;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0 20px;
    &:hover {
      background: #eeeeee;
    }
  }

  .global-header-right {
    display: flex;
    float: right;
    height: 100%;

    .header-action {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 15px;
      cursor: pointer;
      transition: all 0.3s;
      > i {
        font-size: 12px;
        vertical-align: middle;
      }
      .el-badge__content {
        padding: 0 4px;
      }
      &.popover-open,
      &:hover {
        background: #eeeeee;
      }
      .action {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        transition: all 0.3s;

        .avatar {
          margin-right: 8px;
        }
      }
    }
    .notice {
      padding: 0;
    }
  }
}
</style>
