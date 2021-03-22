<template>
  <el-upload
    multiple
    action
    name="files"
    class="upload-demo"
    :http-request="uploadFile"
    :before-upload="beforeUpload"
    :limit="limit"
    :on-exceed="handleExceed"
    :file-list="fileList"
    list-type="picture"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import { upload } from "@/api/base";

export default {
  props: {
    limit: {
      type: Number,
      default() {
        return 1;
      },
    },
    imageUrl: {
      type: String,
    },
  },
  data() {
    return { fileList: [] };
  },
  methods: {
    uploadFile(file) {
      const _this = this;
      let formData = new FormData();
      formData.set("files", file.file);
      upload(formData).then((res) => {
        if (res.code == 0) {
          _this.$message({
            message: "上传成功",
            type: "success",
            center: true,
          });
          _this.$emit("upload", res.data[0]);
        } else {
          this.fileList = [];
        }
      });
    },
    beforeUpload(file) {
      const _this = this;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        _this.$message.error("上传文件大小不能超过 2MB!");
        return false;
      }
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        _this.$message.error("上传文件只能是 jpg或png 格式!");
        return false;
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
  },
};
</script>
