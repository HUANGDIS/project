<template>
  <div class="login_container">
    <div class="login">
      <div class="img">
        <img src="../assets/logo.png">
      </div>
      <el-form class="login_form">
        <el-form-item>
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="username"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            prefix-icon="el-icon-goods"
            v-model="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button @click='check'>登录</el-button>
          <el-button @click="clear">重置</el-button>
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
      username: '',
      password: '',
    }
  },
  methods: {
    check() {
      if (this.username === 'admin' && this.password === 'admin') {
      }
    },
    clear() {
      ;(this.username = ''), (this.password = '')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 845px;
  min-height: 845px;
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
