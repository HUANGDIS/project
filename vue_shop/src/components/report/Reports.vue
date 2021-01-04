<template>
  <div class="report">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <div
        id="myChart"
        style="width: 750px; height: 400px;"
      ></div>
    </el-card>
  </div>
</template>
<script>
// 导入echarts
import echarts from 'echarts'
// import _ from 'loadash'
export default {
  data() {
    return {
      options: {
        title: {
          text: '用户来源',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
      },
    }
  },
  methods: {
    async draw() {
      var echarts = require('echarts')
      let myChart = echarts.init(document.getElementById('myChart'))
      const { data: res } = await this.$http.get('reports/type/1')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取option失败')
      }
      // const result = _.merge(res.data, this.options)
      myChart.setOption(res.data)
    },
  },
  mounted() {
    this.draw()
  },
}
</script>
<style lang="less" scoped>
</style>