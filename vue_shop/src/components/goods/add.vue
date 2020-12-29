<template>
  <div class="add-goods">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加商品视图 -->
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        class="title"
        :closable="false"
      >
      </el-alert>
      <el-row>
        <el-col :span="18">
          <el-steps
            :active="active"
            finish-status="success"
            align-center
          >
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      <!-- tab栏区域 -->
      <el-form
        class="tab-area"
        :model="addForm"
        :rules="addFormRules"
      >
        <el-tabs tab-position="left">
          <el-tab-pane label="基本信息">
            <el-form-item
              label="商品名称"
              prop="goods_name"
            >
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item
              label="商品价格"
              type="number"
              prop="goods_price"
            >
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item
              label="商品重量"
              prop="goods_weight"
              type="number"
            >
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item
              label="商品数量"
              prop="goods_number"
              type="number"
            >
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item
              label="商品分类"
              prop="goods_cat"
              class="cascader"
            >
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cateProps"
                expand-trigger="hover"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">

          </el-tab-pane>
          <el-tab-pane label="商品属性">

          </el-tab-pane>
          <el-tab-pane label="商品图片">

          </el-tab-pane>
          <el-tab-pane label="商品图片">

          </el-tab-pane>
        </el-tabs>
      </el-form>

    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      classification: '',
      addForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        // 商品所属的分类数组
        goods_cat: [],
      },
      //商品分类列表
      cateList: [],
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
      },
      //基本信息校验
      addFormRules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      console.log(res)
      this.cateList = res.data
    },
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>
 <style lang="less" scoped>
.add-goods {
  .title {
    margin-bottom: 20px;
  }
  .tab-area {
    margin-top: 20px;
  }
  .cascader {
    height: 80px !important;
  }
  .el-cascader {
    height: 50px;
    margin-top: 40px;
    position: absolute;
    left: 0;
  }
}
</style>