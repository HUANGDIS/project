<template>
  <div class="roles">
    <!-- 面包屑视图 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/roles' }">角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加角色按钮区 -->
      <el-row>
        <el-col
          :span="24"
          class="addRoleBtn"
        >
          <el-button
            type="primary"
            @click="showAddRoles"
          >添加角色</el-button>
        </el-col>
        <!-- 添加角色的对话框 -->
        <el-dialog
          title="添加角色"
          :visible.sync="roledialogVisible"
          width="40%"
          @close="addRoleDialogClose"
        >
          <el-form
            ref="addRole"
            :rules="addRoleRules"
            :model="addRole"
            label-width="100px"
          >
            <el-form-item
              label="角色ID"
              prop="roleId"
            >
              <el-input v-model="addRole.roleId"></el-input>
            </el-form-item>
            <el-form-item
              label="角色名称"
              prop="roleName"
            >
              <el-input v-model="addRole.roleName"></el-input>
            </el-form-item>
            <el-form-item
              label="角色描述"
              prop="roleDesc"
            >
              <el-input v-model="addRole.roleDesc"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="roledialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="addRoleForm"
            >确 定</el-button>
          </span>
        </el-dialog>
        <!-- 编辑角色对话框 -->
        <el-dialog
          title="添加角色"
          :visible.sync="editRoledialogVisible"
          width="40%"
          @close="addRoleDialogClose"
        >
          <el-form
            ref="addRole"
            :rules="addRoleRules"
            :model="editRole"
            label-width="100px"
          >
            <el-form-item
              label="角色ID"
              prop="roleId"
            >
              <el-input v-model="editRole.roleId"></el-input>
            </el-form-item>
            <el-form-item
              label="角色名称"
              prop="roleName"
            >
              <el-input v-model="editRole.roleName"></el-input>
            </el-form-item>
            <el-form-item
              label="角色描述"
              prop="roleDesc"
            >
              <el-input v-model="editRole.roleDesc"></el-input>
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="editRoledialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="editRoleForm"
            >确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
      <el-table
        :data="rolesList"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1,i1) in (scope.row.children)"
              :key="item1.id"
              :class="['bdbottom',i1===0?'bdtop':'','bdcenter']"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row.id ,item1.id)"
                >{{item1.authName}}</el-tag>
              </el-col>
              <!-- 渲染二级权限 -->
              <el-col :span="19">
                <el-row
                  :class="[i2===0?'':'bdtop','bdcenter']"
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(item2.id)"
                    >{{item2.authName}}</el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3) in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRightById(item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>{{scope.row.children}}</pre> -->
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
        >
        </el-table-column>
        <el-table-column
          label="角色描述"
          prop="roleDesc"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRoleClick(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delRole(scope.row.id)"
            >删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="SetRightDialogVisible">
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        default-expand-all
        ref="tree"
        :default-checked-keys="rightsCheckedKeys"
        :props="rightsProps"
      >
      </el-tree>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="SetRightDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="setRights"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rolesList: [],
      roledialogVisible: false,
      editRoledialogVisible: false,
      addRoleRules: {
        rolesname: [
          { required: true, message: '请输入角色名称', tigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10之间', tigger: 'blur' },
        ],
      },
      addRole: {
        roleId: '',
        roleName: '',
        roleDesc: '',
      },
      editRole: {
        roleId: '',
        roleName: '',
        roleDesc: '',
      },
      SetRightDialogVisible: false,
      rightsList: [],
      rightsProps: {
        children: 'children',
        label: 'authName',
      },
      roleId: '',
      rightsCheckedKeys: [],
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      // console.log(res.data)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.rolesList = res.data
      this.$message.success(res.meta.msg)
    },
    showAddRoles() {
      this.roledialogVisible = true
    },
    addRoleDialogClose() {
      // console.log(this.$refs)
      this.$refs.addRole.resetFields()
    },
    addRoleForm() {
      this.$refs.addRole.validate(async (vaild) => {
        if (!vaild) return
        const { data: res } = await this.$http.post('roles', this.addRole)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.getRolesList()
        this.$message.success(res.meta.msg)
        this.roledialogVisible = false
      })
    },
    async editRoleClick(val) {
      this.editRoledialogVisible = true
      const { data: res } = await this.$http.get('roles/' + val)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.editRole.roleId = res.data.roleId
      this.editRole.roleName = res.data.roleName
      this.editRole.roleDesc = res.data.roleDesc
    },
    // 编辑角色
    async editRoleForm() {
      const { data: result } = await this.$http.put('roles/' + this.editRole.roleId, this.editRole)
      console.log(result)
      if (result.meta.status !== 200) return this.$message.error('编辑角色信息失败')
      this.$message.success('编辑角色信息成功')
      this.editRoledialogVisible = false
    },
    // 删除角色
    async delRole(val) {
      if (!val) return
      this.$confirm('此操作将永久此用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const { data: res } = await this.$http.delete('roles/' + val)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getRolesList()
      })
    },
    // 删除角色的权限
    async removeRightById(roleId, rightId) {
      console.log(roleId, rightId)
      if (!roleId && !rightId) return
      const { data: res } = await this.$http.delete('roles/' + roleId + '/rights/' + rightId)
      console.log(res)
      if (res.meta.status != 200) return this.$message.error('删除权限失败')
      this.$message.success('删除角色权限成功')
      this.getRolesList()
    },
    async showSetRightDialog(val) {
      this.roleId = val.id
      const { data: res } = await this.$http.get('rights/' + 'tree')
      console.log(res)
      if (res.meta.status != 200) return this.$message.error('获取所有权限失败')
      this.rightsList = res.data
      this.$message.success('获取所有权限成功')
      // console.log(this.rightsList)
      console.log(val)
      this.getLeafKey(val, this.rightsCheckedKeys)
      this.SetRightDialogVisible = true
      console.log(this.rightsCheckedKeys)
    },
    // 递归获取所有的已有权限
    getLeafKey(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => {
        this.getLeafKey(item, arr)
      })
    },
    async setRights() {
      const keys = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
      const idStrs = keys.join(',')
      console.log(idStrs)
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStrs })
      if (res.meta.status != 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      this.getRolesList()
      this.SetRightDialogVisible = false
    },
  },
}
</script>
<style lang="less" scoped>
.roles {
  .el-row .addRoleBtn {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
  }
  .el-tag {
    margin: 7px;
  }
  .bdtop {
    border-top: 1px solid #eee;
  }
  .bdbottom {
    border-bottom: 1px solid #eee;
  }
  .bdcenter {
    display: flex;
    align-items: center;
  }
}
</style>