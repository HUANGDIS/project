<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图区域 -->
    <el-card>
      <!-- 搜索输入框 -->
      <el-row
        :gutter="20"
        class="search-box"
      >
        <el-col :span="8">
          <div style="margin-top: 15px;">
            <el-input
              placeholder="请输入内容"
              v-model="inputOrder"
              class="input-with-select"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 编辑订单区域 -->
      <el-dialog
        title="修改订单状态"
        width="40%"
        :visible.sync="editOrderDialogVisible"
      >
        <el-form
          :model="orderForm"
          label-width="100px"
        >
          <el-form-item label="订单编号">
            <el-input v-model="orderForm.order_id"></el-input>
          </el-form-item>
          <el-form-item label="是否发货">
            <el-input v-model="orderForm.is_send"></el-input>
          </el-form-item>
          <el-form-item label="订单支付">
            <el-input v-model="orderForm.order_pay"></el-input>
          </el-form-item>
          <el-form-item label="订单数量">
            <el-input v-model="orderForm.order_number"></el-input>
          </el-form-item>
          <el-form-item label="支付状态">
            <el-input v-model="orderForm.pay_status"></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="editOrderDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="updateEditOrder"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看表达区域 -->
      <el-dialog
        title="查看订单状态"
        width="40%"
        :visible.sync="editOrderDialogVisible"
      >
        <el-form
          :model="orderFormInfo"
          label-width="100px"
        >
          <el-form-item label="订单编号">
            <el-input
              v-model="orderFormInfo.order_id"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="是否发货">
            <el-input
              v-model="orderFormInfo.is_send"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="订单支付">
            <el-input
              v-model="orderFormInfo.order_pay"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="订单数量">
            <el-input
              v-model="orderForm.order_number"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="支付状态">
            <el-input
              v-model="orderFormInfo.pay_status"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="editOrderDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="editOrderDialogVisible = false"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 订单表单区域 -->
      <el-table
        :data="ordersList"
        border
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="order_number"
          label="订单编号"
        ></el-table-column>
        <el-table-column
          prop="order_price"
          label="订单价格"
        ></el-table-column>
        <el-table-column
          prop="pay_status"
          label="是否付款"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              plain
              v-if="scope.row.pay_status=== '0'"
            >未付款</el-button>
            <el-button
              type="success"
              plain
              v-else
            >已付款</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="下单时间"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editOrder(scope.row.order_id)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-location-outline"
              @click="orderInfo(scope.row.order_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryOrders.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryOrders.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ordersListTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ordersList: [],
      queryOrders: {
        query: '',
        pagenum: 1,
        pagesize: 10,
        user_id: '',
        pay_status: '',
        is_send: '',
        order_fapiao_title: '',
        order_fapiao_company: '',
        order_fapiao_content: '',
        consignee_addr: '',
      },
      ordersListTotal: 0,
      inputOrder: '',
      editOrderDialogVisible: false,
      orderForm: {},
      orderFormInfo: {},
      updateOrderForm: {
        id: '',
        is_send: '',
        order_pay: '',
        order_number: '',
        pay_status: '',
      },
    }
  },
  created() {
    this.getOrdersList()
  },
  methods: {
    async getOrdersList() {
      const { data: res } = await this.$http.get('orders', { params: this.queryOrders })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.ordersList = res.data.goods
      this.ordersListTotal = res.data.total
      this.$message.success(res.meta.msg)
    },
    handleSizeChange(val) {
      this.queryOrders.pagesize = val
      this.getOrdersList()
    },
    handleCurrentChange(val) {
      this.queryOrders.pagenum = val
      this.getOrdersList()
    },
    dateFormat(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      var moment = require('moment')
      return moment.unix(date).format('YYYY-MM-DD HH:mm:ss')
    },
    async editOrder(val) {
      this.editOrderDialogVisible = true
      console.log(val)
      if (!val) return
      const { data: res } = await this.$http.get('orders/' + val)
      console.log(res)
      this.orderForm = res.data
    },
    updateEditOrder() {},
    async orderInfo(val) {
      this.editOrderDialogVisible = true
      console.log(val)
      if (!val) return
      const { data: res } = await this.$http.get('orders/' + val)
      console.log(res)
      this.orderFormInfo = res.data
    },
  },
}
</script>
<style lang="less" scoped>
.el-card {
  margin-bottom: 15px;
  .search-box {
    margin-bottom: 20px;
  }
}
</style>