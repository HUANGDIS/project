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
        <el-col :span="24">
          <el-button type="primary" @click="showAddRoles">添加角色</el-button>
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
                <el-input
                  v-model="addRole.roleName"
                ></el-input>
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
      </el-row>
      <el-table :data="rolesList" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item1,i1) in (scope.row.children)" :key="item1.id"
             :class="['bdbottom',i1===0?'bdtop':'']"> 
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icn-caret-right"></i>
              </el-col>
              <!-- 渲染二级权限 -->
              <el-col :span="19" >
                <el-row :class="[i2===0?'bdtop':'']"
                  v-for="(item2,i2) in item1.children" 
                  :key="item2.id" >
                  <el-col :span="6">
                    <el-tag type="success" >{{item2.authName}}</el-tag>
                    <i class="el-icn-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                   <el-tag v-for="(item3) in item2.children" 
                   :key="item3.id"
                   type="warning"
                   >{{item3.authName}}</el-tag>
                   <i class="el-icn-caret-right"></i>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <pre>{{scope.row.children}}</pre>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template >
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return{
      rolesList: [],
      roledialogVisible: false,
      addRoleRules: {
         rolesname:[
           {required: true, message: '请输入角色名称',tigger: 'blur'},
           {min: 3,max:10, message: '长度在3到10之间',tigger: 'blur'}
         ]
      },
      addRole: {
        roleId: '',
        roleName:'',
        roleDesc:''
      }
    }
  },
  created(){
    this.getRolesList()
  },
  methods:{
    async getRolesList(){
      const {data: res} =await this.$http.get("roles")
      // console.log(res.data)
      if(res.meta.status!== 200)return this.$message.error(res.meta.msg)
      this.rolesList = res.data
      this.$message.success(res.meta.msg)
    },
    showAddRoles(){
      this.roledialogVisible = true
    },
    addRoleDialogClose(){
      // console.log(this.$refs)
      this.$refs.addRole.resetFields()
    },
    addRoleForm(){
      this.$refs.addRole.validate(async vaild=>{
        if(!vaild) return
        const {data:res}=await this.$http.post('roles',this.addRole)
        if(res.meta.status!==201) return this.$message.error(res.meta.msg)
        this.getRolesList()
        this.$message.success(res.meta.msg)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.roles{
  .el-row .el-col{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
  }
  .el-tag{
    margin: 7px; 
  }
  .bdtop{
    border-top: 1px solid #eee
    }
  .bdbottom{
    border-bottom: 1px solid #eee;
  }
}
</style>