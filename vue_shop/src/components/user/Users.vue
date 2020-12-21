<template>
  <div class="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <div style="margin-top: 15px;">
            <el-input
              v-model="queryInfo.query"
              placeholder="请输入内容"
              clearable
              @clear="getUserList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUserList"
              ></el-button>
            </el-input>

          </div>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            class="add-user"
            @click="dialogShow"
          >添加用户</el-button>
          <!-- 添加用户的对话框 -->
          <el-dialog
            title="添加用户"
            :visible.sync="dialogVisible"
            width="40%"
            @close="addDialogClose"
          >
            <el-form
              ref="addForm"
              :rules="addFormRules"
              :model="addForm"
              label-width="100px"
            >
              <el-form-item
                label="用户名"
                prop="username"
              >
                <el-input v-model="addForm.username"></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password"
              >
                <el-input
                  v-model="addForm.password"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="邮箱"
                prop="email"
              >
                <el-input v-model="addForm.email"></el-input>
              </el-form-item>
              <el-form-item
                label="手机"
                prop="mobile"
              >
                <el-input v-model="addForm.mobile"></el-input>
              </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="addUser"
              >确 定</el-button>
            </span>
          </el-dialog>
          <!-- 修改用户对话框 -->
          <el-dialog
            title="修改用户信息"
            :visible.sync="editdialogVisible"
            width="40%"
            @close="editDialogClose"
          >
            <el-form
              ref="editForm"
              :rules="editFormRules"
              :model="editForm"
              label-width="100px"
            >
              <el-form-item label="用户名">
                <el-input
                  v-model="editForm.username"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="邮箱"
                prop="email"
              >
                <el-input v-model="editForm.email"></el-input>
              </el-form-item>
              <el-form-item
                label="手机"
                prop="mobile"
              >
                <el-input v-model="editForm.mobile"></el-input>
              </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="editdialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="editUser"
              >确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 表单区域 -->
      <el-table
        :data="usersList"
        border
        style="width: 100%"
      >
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
        >
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <el-button
                @click="showEditDialog(scope.row.id)"
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>

            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delUser(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="设置"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // 验证邮箱
    var validateEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱地址'))
    }
    //校验手机号
    var validateMobile = (rule, value, callback) => {
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      tableData: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      usersList: [],
      total: 0,
      dialogVisible: false,
      editdialogVisible: false,
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15之间', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' },
        ],
      },
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  mounted() {},
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status != 200) return this.$message.error('获取用户列表失败')
      this.usersList = res.data.users
      this.total = res.data.total
      // console.log(res)
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getUserList()
    },
    async userStateChange(userInfo) {
      console.log(await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`))
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        return
        this.$message.error('更新用户状态失败')
        userInfo.mg_state = !userInfo.mg_state
      }
      this.$message.success('更新用户状态成功')
    },
    dialogShow() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    addDialogClose() {
      // console.log(this.$refs)
      this.$refs.addForm.resetFields()
    },
    // 点击按钮添加用户
    addUser() {
      this.$refs.addForm.validate(async (vaild) => {
        // 预校验失败直接返回
        if (!vaild) return
        // 预校验成功添加用户
        const { data: res } = await this.$http.post('users', this.addForm)
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success('添加用户成功!')
        this.dialogVisible = false
      })
      this.getUserList()
    },
    // 编辑用户
    async showEditDialog(val) {
      this.editdialogVisible = true
      // console.log(val)
      const { data: res } = await this.$http.get('users/' + val)
      // console.log(res)
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      this.editForm = res.data
      // console.log(this.editForm)
    },
    editDialogClose() {
      console.log(this.$refs)
      this.$refs.editForm.resetFields()
    },
    editUser() {
      this.$refs.editForm.validate(async (vaild) => {
        console.log(this.editForm)
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        })
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)

        // 关闭对话框
        this.editdialogVisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('修改用户信息成功')
      })
    },
    delUser(val) {
      console.log(val)
      this.$confirm('此操作将永久此用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const { data: res } = await this.$http.delete('users/' + val)
          if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
          // 刷新列表
          this.getUserList()
          // 提示删除成功
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>
<style lang="less" scoped>
.app {
  .el-breadcrumb {
    font-size: 12px;
    margin-bottom: 15px;
  }
  .el-card {
    margin-bottom: 15px;
    box-shadow: 0px, 1px, 1px, rgb(0, 0, 0, 0, 5) !important;
    .el-table {
      margin: 15px 0;
    }
  }
  .add-user {
    margin-top: 15px;
  }
}
</style>