<template>
  <el-form ref="form" :model="$attrs.entity" label-position="right" label-width="80px">
    <template v-for="(c,index) in $attrs.formList">
      <el-form-item
        :label="c.label"
        :prop="c.prop"
        :key="index"
        :rules="c.form.rules ? c.form.rules :[]"
      >
        <el-select
          v-if="c.form.type=='select'"
          v-model="$attrs.entity[c.prop]"
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
          :imageUrl="$attrs.entity.imageUrl"
          @upload="uploadFile"
        />
        <el-date-picker
          v-else-if="c.form.type=='date' || c.form.type=='datetime'"
          v-model="$attrs.entity[c.prop]"
          :placeholder="c.form.placeholder"
          :type="c.form.type"
        ></el-date-picker>
        <el-input
          v-else-if="c.form.type=='textarea'"
          :type="c.form.type"
          :autosize="{ minRows: 4, maxRows: 6}"
          v-model="$attrs.entity[c.prop]"
          :placeholder="c.form.placeholder"
        ></el-input>
        <el-input
          v-else
          :size="c.form.size ? c.form.size : 'small' "
          v-model="$attrs.entity[c.prop]"
          maxlength="50"
          :placeholder="c.form.placeholder"
        ></el-input>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { saveData } from "@/api/base";
import Upload from "@/components/upload";

export default {
  components: {
    Upload
  },
  inheritAttrs: false,
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    createData() {
      const _this = this;
      const resource = _this.$attrs.resource;
      _this.$refs["form"].validate(valid => {
        if (valid) {
          this.entity.content = "123";
          saveData(resource, this.entity).then(res => {
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
    validate() {
      let valids = false;
      this.$refs.form.validate(valid => {
        if (valid) {
          valids = true;
        }
      });
      return valids;
    },
    clearValidateForm() {
      const _this = this;
      _this.$nextTick(function() {
        _this.$refs.form.clearValidate();
      });
    },
    uploadFile(val) {
      this.entity.imageUrl = val;
    }
  }
};
</script>