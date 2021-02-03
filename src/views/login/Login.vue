<template>
  <div class="app-container">
    <el-form
      :model="entity"
      :rules="rules"
      ref="dataForm"
      label-position="left"
      label-width="0px"
      class="login-container"
    >
      <h3 class="title">后台系统</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="entity.username"
          auto-complete="off"
          placeholder="请输入用户名"
        >
          <template slot="prepend">
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="entity.password"
          auto-complete="off"
          placeholder="请输入登录密码"
        >
          <template slot="prepend">
            <i class="el-icon-unlock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-checkbox :checked="state.checked" class="remember"
        >记住密码</el-checkbox
      >
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click="handleSubmit"
          :loading="state.loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from "md5";
import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";

export default {
  data() {
    return {
      entity: {
        //临时变量，用于新增与修改
        username: "",
        password: ""
      },
      state: {
        loading: false,
        checked: true
      },
      rules: {
        //表单验证
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["Login", "Logout"]),

    handleSubmit() {
      const { state, Login } = this;

      state.loading = true;

      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const loginParams = { ...this.entity };
          loginParams.password = md5(this.entity.password);
          Login(loginParams)
            .then(() => this.loginSuccess())
            .catch(() => this.requestFailed())
            .finally(() => {
              state.loading = false;
            });
          state.loading = false;
        } else {
          setTimeout(() => {
            state.loading = false;
          }, 600);
        }
      });
    },
    loginSuccess() {
      this.$router.push({ path: "/" });
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notify({
          title: "登录成功",
          message: `${timeFix()}，欢迎回来`,
          type: "success"
        });
      }, 1000);
    },
    requestFailed() {
      this.$notify({
        title: "登录失败",
        message: `请求出现错误，请稍后再试`,
        type: "error"
      });
    }
  }
};
</script>

<style scoped>
.app-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(~@/assets/bg_login.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 300px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.remember {
  margin: 0px 0px 35px 0px;
}
</style>
