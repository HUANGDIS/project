<template>
  <div v-if="total>0 || (total ===0 && !hideWhenTotal0)" class="pagination-wrap">
     <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes = "PAGE_SIZES"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
  </div>
</template>
<script>
import {PAGE_SIZES ,DEFAULT_PAGE_SIZE} from "../const/index"
export default {
  name: 'pagination',
  prop:{
    //当前页面
    currentPage: {
      type: Number,
      default: 1
    },
    //每页多少条
    pageSize: {
      type: Number,
      default: DEFAULT_PAGE_SIZE
    },
    //总数量
    total: {
      type: Number,
      default: 0
    },
    //当总数据量为0是是否隐藏分页组件
    hideWhenTotal0:{
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      PAGE_SIZES: PAGE_SIZES
    }
  },
  methods: {
    //当页数发生变化的回调
    handleSizeChange(){
      this.$emit('pageSizeChange',...arguments)
    },
    //当前页发生变化的回调
    handleCurrentPage(){
      this.$emit('currentPageChange',...arguments)
    }
  }
}
</script>
<style lang="scss" scoped>
  .pagination-wrap {
    padding: 20px 0;
    text-align: center;
    margin-buttom: 20px
  }
</style>