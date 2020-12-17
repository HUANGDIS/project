<template>
  <div class="login_container">
    <div class="login">
      <div class="img">
        <img src="../assets/logo.png">
      </div>
      <el-form
        class="login_form"
        :rules="loginFormRules"
        :model="loginForm"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-goods"
            v-model="loginForm.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click='login'
          >登录</el-button>
          <el-button
            type="info"
            @click="clear()"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String,
  },
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3到15之间', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        // 解构赋值 重命名为result
        const { data: result } = await this.$http.post('login', this.loginForm)
        console.log(result)
        // 判断返回状态码
        if (result.meta.status !== 200) return this.$message.error('用户名或密码错误')
        this.$message.success('登录成功')
        // 1、将成功之后的token保存在客户端的sessionStorage中
        // 1.1页面中除了登录之外的接口，必须在登录之后才能访问
        // 1.2.token只应该在当前网站打开期间生效，所以将token保存在sessionStorage中
        // 2.通过编程式导航将页面跳转到后台主页
        window.sessionStorage.setItem('token', result.data.token)
        this.$router.push('/home')
      })
    },
    clear() {
      this.$refs.loginFormRef.resetFields()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
  .login {
    width: 450px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 3px;
  }
  .img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    padding: 10px;
    transform: translate(-50%, -50%);
    border: 1px solid #eee;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
