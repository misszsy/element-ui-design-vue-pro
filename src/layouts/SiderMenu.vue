<template>
  <el-aside :width="collapsed ? '64px' : '260px'" class="sider">
    <el-menu
      class="el-menu-vertical"
      collapse-transition
      :collapse="collapsed"
      :default-active="selectedKeys"
      :default-openeds="openKeys"
      unique-opened
      router
    >
      <div class="logo">Element UI Vue Pro</div>
      <template v-for="menu in menuData">
        <el-submenu :index="menu.path" :key="menu.path">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
          </template>
          <template v-for="item in menu.children">
            <el-menu-item :index="item.path" :key="item.path">
              <span slot="title" style="padding-left: 20px;">{{
                item.name
              }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean
    }
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val] + "";
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path] + "",
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    //递归渲染
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (let item of routes) {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      }
      return menuData;
    }
  }
};
</script>

<style lang="scss">
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
.sider {
  transition: all 0.3s;
  background-color: #001529;
  overflow: hidden;

  &.collapse {
    overflow: visible;
  }

  /deep/ .el-menu {
    color: $menu-dark-color;
    background: $menu-dark-bg;
    border-right: hidden;

    &-item {
      color: $menu-dark-color;
      i {
        color: $menu-dark-color;
      }
      &:hover {
        color: #fff;
        background: transparent;
        > a {
          color: #fff;
        }
        i {
          color: #fff;
        }
      }
      > a {
        color: $menu-dark-color;
        text-decoration: none;
        outline: none;
      }
      &.is-active {
        color: #fff;
        background-color: #1890ff;
        > a {
          color: #fff;
        }
        i {
          color: inherit;
        }
      }
    }
    .el-submenu {
      &__title {
        color: $menu-dark-color;
        > i {
          color: $menu-dark-color;
        }
        &:hover {
          color: #fff;
          background-color: transparent;
          > i {
            color: #fff;
          }
        }

        &__icon-arrow {
          margin-top: -4px;
        }
      }

      &.is-active {
        > .el-submenu__title {
          color: #fff;
          > i {
            color: #fff;
          }
        }
      }

      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
