import { deleteById } from "@/api/base";

//表格工具栏的操作按钮

//打开模态框的form
export const CreateDialog = {
  name: "create",
  label: "新增",
  icon: "plus",
  func: ({ table }) => {
    //点击新增
    const _this = table;
    _this.dialogLabel = "新增";
    _this.entity = {};
    _this.dialogFormVisible = true;
    _this.$refs.form.clearValidateForm();
  }
};

//批量删除
export const DeleteAll = {
  name: "delete",
  label: "批量删除",
  icon: "delete-solid",
  tooltip: true,
  func: ({ table }) => {
    if (table.multiple.length == 0) {
      table.$message({
        showClose: true,
        message: "请选择要删除的数据",
        type: "warning"
      });
      return;
    }
    const data = table.multiple
      .filter(item => item.state != "1")
      .map(item => item.id);
    table.$confirm("确认提交吗？", "提示", {}).then(() => {
      deleteById(table.resource, data).then(res => {
        if (res.code == 0) {
          table.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          table.getDataList();
        }
      });
    });
  }
};

//刷新按钮
export const Refresh = {
  name: "refresh",
  label: "刷新",
  icon: "refresh-right",
  tooltip: true,
  func: ({ table }) => {
    table.getDataList();
  }
};

//发布
export const Active = {
  name: "success",
  label: "发布",
  icon: "success",
  tooltip: true,
  func: () => {
    console.log("我是刷新");
  }
};

//下架
export const Cancel = {
  name: "remove",
  label: "停止",
  icon: "remove",
  tooltip: true,
  func: () => {
    console.log("我是刷新");
  }
};
