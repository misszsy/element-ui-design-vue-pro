<template>
  <TreeTable :dataList="dataList" :columns="columns" />
</template>

<script>
import TreeTable from "@/components/table/TreeTable";
import { Update } from "@/utils/operation";

const columns = [
  {
    prop: "name",
    label: "菜单名称",
    align: "left"
  },
  {
    prop: "typeId",
    label: "菜单类型",
    align: "center"
  },
  {
    prop: "router",
    label: "路由地址",
    align: "center"
  },
  {
    prop: "icon",
    label: "图标",
    align: "center",
    render: {
      type: "icon"
    }
  },
  {
    prop: "permission",
    label: "权限标识",
    align: "center"
  },
  {
    prop: "operation",
    label: "操作",
    align: "center",
    buttons: [Update]
  }
];
export default {
  components: {
    TreeTable
  },
  data() {
    return {
      columns: columns,
      dataList: [
        {
          id: 1,
          name: "表格管理",
          icon: "el-icon-s-home",
          router: "/table",
          permission: "sys:contact:view",
          date: "2020-05-02",
          children: [
            {
              id: 2,
              name: "查询表格",
              router: "/table/list",
              permission: "sys:table:view",
              date: "2016-05-01"
            },
            {
              id: 3,
              name: "树形表格",
              router: "/table/treeTable",
              permission: "sys:table:view",
              date: "2016-05-01"
            }
          ]
        }
      ]
    };
  }
};
</script>