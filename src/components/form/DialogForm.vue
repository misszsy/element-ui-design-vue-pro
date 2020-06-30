<template>
  <el-dialog
    :title="textMap[dialogStatus]"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <el-form ref="entity" :model="entity" label-position="right" label-width="80px">
      <template v-for="(c,index) in formList">
        <el-form-item
          :label="c.label"
          :prop="c.prop"
          :key="index"
          :rules="c.form.rules ? c.form.rules :[]"
        >
          <el-select
            v-if="c.form.type=='select'"
            v-model="entity[c.prop]"
            :placeholder="c.form.placeholder"
          >
            <el-option
              v-for="(o,index) in c.form.options"
              :key="index"
              :label="o.label"
              :value="o.value"
            ></el-option>
          </el-select>
          <el-upload
            v-else-if="c.form.type=='upload'"
            multiple
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-date-picker v-else-if="c.form.type=='date'"></el-date-picker>
          <el-input
            v-else-if="c.form.type=='textarea'"
            :type="c.form.type"
            :autosize="{ minRows: 4, maxRows: 6}"
            v-model="entity[c.prop]"
            :placeholder="c.form.placeholder"
          ></el-input>
          <el-input
            v-else
            :size="c.form.size ? c.form.size : 'small' "
            v-model="entity[c.prop]"
            maxlength="50"
            :placeholder="c.form.placeholder"
          ></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div class="dialog-footer" align="center" style="padding-top: 10px;">
      <el-button type="primary" @click="createData">确认</el-button>
      <el-button @click="handlerVisible">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    formList: {
      type: Array
    },
    dialogFormVisible: {
      type: Boolean
    },
    dialogStatus: {
      type: String
    }
  },
  data() {
    return {
      fileList: [],
      entity: {},
      textMap: {
        update: "编辑",
        create: "新增"
      }
    };
  },
  methods: {
    createData() {
      console.log("123");
    },
    handlerVisible() {
      this.$emit("close", this.dialogFormVisible);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>