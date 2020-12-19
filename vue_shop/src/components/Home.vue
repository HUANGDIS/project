<template>
  <div class="home">
    <el-container class="container">
      <el-header>
        <div class="title">电商后台管理系统</div>
        <el-button
          type="info"
          @click="dropOut"
        >退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse? '64px': '300px'">
          <div
            class="toggle-button"
            @click="toggle"
          >|||</div>
          <el-menu
            @open="handleOpen"
            @close="handleClose"
            background-color="#4a5064"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            :collapse-transition="false"
            :collapse="isCollapse"
            router
            :default-active="activePath"
          >
            <el-submenu
              :index="item.id+ ''"
              v-for="item in menus"
              :key="item.id"
            >
              <template slot="title">
                <i :class="iconObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group
                v-for="child in (item.children)"
                :key="child.id"
              >
                <el-menu-item
                  :index=" '/' + child.path"
                  @click="saveNavState('/' + child.path)"
                >
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{child.authName}}</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      menus: [],
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
      width: 200,
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
    }
  },
  created: async function () {
    const { data: res } = await this.$http.get('menus')
    // console.log(res)
    if (res.meta.status !== 200) return this.$message.error('获取列表失败')
    this.menus = res.data
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    dropOut() {
      window.sessionStorage.clear(), this.$router.push('/login')
    },
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    },
    handleOpen() {},
    handleClose() {},
  },
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .container {
    height: 100%;
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #4a5064;
      .title {
        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .el-aside {
      text-align: left;
      font-size: 18px;
      background-color: #4a5064;
      .toggle-button {
        background-color: #4a5064;
        color: #fff;
        text-align: center;
        font-size: 10px;
        line-height: 24px;
        letter-spacing: 0.2em;
        cursor: pointer;
      }
      .el-menu {
        border-right: none;
      }
      .el-submenu {
        i {
          font-size: 20px;
          padding-right: 10px;
        }
      }
    }
  }
}
.iconfont {
  margin-right: 10px;
}
</style>