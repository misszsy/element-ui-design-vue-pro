<template>
  <el-row :gutter="16">
    <el-col :md="24" :lg="6">
      <el-form
        ref="form"
        label-position="top"
        :model="entity"
        label-width="80px"
      >
        <el-form-item label="昵称">
          <el-input v-model="entity.name" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="entity.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="entity.phone" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="entity.pasword" placeholder="登录密码"></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input
            type="textarea"
            v-model="entity.desc"
            placeholder="个人简介"
          ></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button size="small" type="primary" @click="onSubmit"
            >更新基本信息</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :sm="24" :md="6" :style="{ textAlign: 'center' }">
      <el-avatar :size="150" :src="entity.avatar"></el-avatar>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-button size="small" icon="el-icon-upload2">更换头像</el-button>
      </el-upload>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    entity() {
      return this.$store.state.user.info;
    }
  },
  methods: {
    onSubmit() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-avatar {
  margin: 10px auto;
}
</style>
