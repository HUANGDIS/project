<template>
  <div class="goods-page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图区域 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row>
        <el-col
          :span="6"
          class="search-box"
        >
          <el-input>
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            @click="addGoodsFormVisible"
          >添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表区域 -->
      <el-table
        border
        :data="goodsList"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="商品名称"
          prop="goods_name"
        ></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
        ></el-table-column>
        <el-table-column
          label="商品重量(元)"
          prop="goods_weight"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="add_time"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="el-icon-edit"
              type="primary"
              @click="editGoodsDialogVisible(scope.row)"
            ></el-button>
            <el-button
              class="el-icon-delete"
              type="danger"
              @click="delGoods(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change='handleSizeChange'
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5,10,15,20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 编辑商品对话框 -->
    <el-dialog
      title="编辑商品信息"
      width="40%"
      :visible.sync='editDialogVisible'
    >
      <el-form
        v-model="editGoods"
        :ref="editGoods"
      >
        <el-form-item
          label="商品名称"
          label-width="100px"
        >
          <el-input v-model="editGoods.goods_name"></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格"
          label-width="100px"
        >
          <el-input v-model="editGoods.goods_price"></el-input>
        </el-form-item>
        <el-form-item
          label="商品重量"
          label-width="100px"
        >
          <el-input v-model="editGoods.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editGoodsForm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsList: [],
      currentPage: 1,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      editDialogVisible: false,
      editGoods: {},
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      // console.log(res)
      this.total = res.data.total
      this.goodsList = res.data.goods
    },
    addGoodsFormVisible() {
      this.$router.push('/goods/add')
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getGoodsList()
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getGoodsList()
    },
    dateFormat(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      var moment = require('moment')
      return moment.unix(date).format('YYYY-MM-DD HH:mm:ss')
    },
    async editGoodsDialogVisible(val) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('goods/' + val.goods_id)
      console.log(res)
      this.editGoods = res.data
    },
    editGoodsForm() {
      this.editGoodsDialogVisible = false
    },
    delGoods(val) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const { data: res } = await this.$http.delete('goods/' + val.goods_id)
          // console.log(res)
          if (res.meta.status !== 200) return this.$message.error('删除失败')
          this.getGoodsList()
          this.$message.success('删除商品成功')
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除操作' })
        })
    },
  },
}
</script>
<style lang="less" scoped>
.goods-page {
  .search-box {
    display: flex;
    justify-content: start;
    margin-bottom: 20px;
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>