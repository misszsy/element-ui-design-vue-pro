<template>
  <div class="app-container">
    <el-form
      :model="entity"
      :rules="rules"
      ref="entity"
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
      <el-form-item prop="code">
        <el-row :span="24">
          <el-col :span="16">
            <el-input
              type="text"
              v-model="entity.code"
              auto-complete="off"
              placeholder="请输入验证码"
            >
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <div class="login-code" style="margin:0 0 0 10px;">
              <img
                :src="entity.image"
                style="width:100px;cursor:pointer"
                @click="refreshCode"
              />
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-checkbox :checked="checked" class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from "md5";
import { mapActions } from "vuex";
import { getCaptcha } from "@/api/login";
import { timeFix } from "@/utils/util";

export default {
  data() {
    return {
      entity: {
        //临时变量，用于新增与修改
        username: "",
        password: "",
        code: "",
        key: "",
        image:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      },
      checked: true,
      rules: {
        //表单验证
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "change" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "change" }]
      }
    };
  },
  created() {
    this.refreshCode();
  },
  methods: {
    ...mapActions(["Login", "Logout"]),
    refreshCode() {
      getCaptcha().then(res => {
        const data = res.data;
        this.entity.key = data.key;
        this.entity.image = data.image;
      });
    },
    handleSubmit() {
      const { Login } = this;

      this.$refs.entity.validate(valid => {
        if (valid) {
          const loginParams = { ...this.entity };
          loginParams.password = md5(this.entity.password);
          const loading = this.$loading({
            lock: true,
            text: "登录中,请稍后。。。",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          Login(loginParams)
            .then(() => {
              this.loginSuccess();
              loading.close();
            })
            .catch(() => {
              loading.close();
              this.refreshCode();
            });
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
