import { deleteById } from "@/api/base";

export const Create = {
  name: "create",
  label: "新增",
  icon: "plus",
  func: ({ table }) => {
    //点击新增
    const _this = table;
    _this.dialogLabel = "新增";
    _this.entity = {};
    _this.dialogFormVisible = true;
    _this.$refs[''].resetFields;
  }
}

export const Delete = {
  name: "delete",
  label: "批量删除",
  icon: "delete-solid",
  tooltip: true,
  func: ({ table }) => {
    if (table.multiple.length == 0) {
      table.$message({
        showClose: true,
        message: "请选择要删除的数据",
        type: 'warning',
      });
      return;
    }
    const data = table.multiple.filter((item) => item.state != '1').map(item => item.id);
    table.$confirm('确认提交吗？', '提示', {}).then(() => {
      deleteById(table.resource, data).then((res) => {
        if (res.code == 0) {
          table.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          table.getDataList();
        }
      })
    })
  }
}

export const Refresh = {
  name: 'refresh',
  label: '刷新',
  icon: 'refresh-right',
  tooltip: true,
  func: ({ table }) => {
    table.getDataList();
  }
}

export const Active = {
  name: 'success',
  label: '发布',
  icon: 'success',
  tooltip: true,
  func: () => {
    console.log("我是刷新")
  }
}


export const Cancel = {
  name: 'remove',
  label: '停止',
  icon: 'remove',
  tooltip: true,
  func: () => {
    console.log("我是刷新")
  }
}

export const View = {
  name: 'view',
  label: '查看',
  icon: 'info',
  func: ({ table, row }) => {
    table.dialogLabel = "查看";
    table.entity = Object.assign({}, row) // copy obj
    table.dialogFormVisible = true;
  }
}

export const Update = {
  name: 'edit',
  label: '编辑',
  icon: 'edit',
  func: () => {
    console.log("我是编辑")
  }
}