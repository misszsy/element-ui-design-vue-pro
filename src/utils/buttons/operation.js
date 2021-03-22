import { deleteById } from "@/api/base";

//表格操作列的按钮
//详情
export const View = {
  name: "view",
  label: "查看",
  icon: "info",
  func: ({ table, row }) => {
    table.dialogLabel = "查看";
    table.entity = Object.assign({}, row); // copy obj
    table.dialogFormVisible = true;
  }
};

//批量删除
export const Delete = {
  name: "delete",
  label: "删除",
  icon: "remove",
  func: ({ table, row }) => {
    table.$confirm("确认删除吗？", "提示", {}).then(() => {
      deleteById(table.resource, row.id).then(res => {
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

//编辑打开模态框的Form
export const Update = {
  name: "edit",
  label: "编辑",
  icon: "edit",
  func: ({ table, row }) => {
    table.dialogLabel = "编辑";
    table.entity = Object.assign({}, row); // copy obj
    table.dialogFormVisible = true;
  }
};
