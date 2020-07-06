<template>
  <el-dialog
    :title="dialogLabel"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :before-close="handlerVisible"
    center
  >
    <el-form ref="dataForm" :model="entity" label-position="right" label-width="80px">
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
          <Upload
            v-else-if="c.form.type=='upload'"
            :limit="1"
            :imageUrl="entity.imageUrl"
            @upload="uploadFile"
          />
          <el-date-picker
            v-else-if="c.form.type=='date' || c.form.type=='datetime'"
            v-model="entity[c.prop]"
            :placeholder="c.form.placeholder"
            :type="c.form.type"
          ></el-date-picker>
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
    <span class="dialog-footer" slot="footer" style="padding-top: 10px;">
      <el-button type="primary" @click="createData">确认</el-button>
      <el-button @click="handlerVisible">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveData } from "@/api/base";
import Upload from "@/components/upload";

export default {
  components: {
    Upload
  },
  props: {
    formList: {
      type: Array
    },
    dialogFormVisible: {
      type: Boolean
    },
    dialogLabel: {
      type: String,
      default() {
        return "新增";
      }
    },
    entity: {}
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    createData() {
      const _this = this;
      _this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.entity.content = "123";
          saveData("article", this.entity).then(res => {
            if (res.code == 0) {
              _this.$message({
                message: "添加成功",
                type: "success",
                center: true
              });
              _this.$emit("createData");
            }
          });
        }
      });
    },
    handlerVisible() {
      this.$emit("close", this.dialogFormVisible);
    },
    uploadFile(val) {
      this.entity.imageUrl = val;
    }
  }
};
</script>