<template>
  <!-- 表格渲染 -->
  <DataTable :resource="resource" :buttons="buttons" :columns="columns" />
</template>

<script>
import DataTable from "@/components/table";
import { commonDict } from "@/utils/dict/index";
import {
  Create,
  Delete,
  Refresh,
  Active,
  Cancel,
  View,
  Update
} from "@/utils/operation";

export default {
  components: {
    DataTable
  },
  data() {
    return {
      resource: "article", //必写信息,用于请求后台对应资源链接
      columns: columns,
      buttons: buttons
    };
  },
  methods: {}
};

//table头部操作按钮
const buttons = [Create, Delete, Refresh, Active, Cancel];

//属性列表
const columns = [
  {
    prop: "title",
    label: "标题",
    align: "center",
    roles: ["table", "search", "form"], //作用：table: 在table中显示，search：作为搜索条件，form：在form表单中显示
    form: {
      type: "input", //默认为input,可不写
      placeholder: "请输入标题信息",
      rules: [{ required: true, message: "标题不能为空" }]
    }
  },
  {
    prop: "typeId",
    label: "资讯分类",
    align: "center",
    form: {
      type: "select",
      placeholder: "请选择资讯分类",
      options: [{ label: "中区", value: "2" }],
      rules: [{ required: true, message: "资讯分类不能为空" }]
    }
  },
  {
    prop: "author",
    label: "作者",
    align: "center",
    form: {
      placeholder: "请输入作者名字",
      rules: [{ required: true, message: "作者名字不能为空" }]
    }
  },
  {
    prop: "tags",
    label: "标签",
    align: "center",
    search: true,
    form: {
      placeholder: "请输入标签内容",
      rules: [{ required: true, message: "标签不能为空" }]
    }
  },
  {
    prop: "imageUrl",
    label: "图片",
    align: "center",
    render: {
      type: "image"
    },
    form: {
      type: "upload"
    }
  },
  {
    prop: "digest",
    label: "摘要",
    align: "center",
    search: true,
    form: {
      type: "textarea",
      placeholder: "请输入摘要内容",
      rules: [{ required: true, message: "摘要不能为空" }]
    }
  },
  {
    prop: "state",
    label: "状态",
    align: "center",
    render: {
      //用于格式化单元格信息内容,图片则选type为image,内容则选select对应字典属性dict
      type: "select",
      dict: commonDict.state
    }
  },
  {
    prop: "operation",
    label: "操作",
    align: "center",
    buttons: [View, Update]
  }
];
</script>
