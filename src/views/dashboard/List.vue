<template>
  <!-- 表格渲染 -->
  <DataTable :resource="resource" :columns="columns" />
</template>

<script>
import DataTable from "@/components/table";
import { commonDict } from "@/utils/dict/index";

//属性列表
const columns = [
  {
    prop: "title",
    label: "标题",
    align: "center",
    search: true, //是否作為搜索條件并且要有form属性
    form: {
      type: "input", //默认为input,可不写
      placeholder: "请输入标题信息",
      rules: [{ required: true, message: "标题不能为空" }]
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
      type: "upload",
      rules: [{ required: true, message: "图片不能为空" }]
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
      //用于格式化单元格信息内容,图片则选type为image,内容则选select
      type: "select",
      dict: commonDict.state
    }
  }
];

export default {
  components: {
    DataTable
  },
  data() {
    return {
      resource: "article", //必写信息,用于请求后台对应资源链接
      columns: columns
    };
  },
  methods: {}
};
</script>
